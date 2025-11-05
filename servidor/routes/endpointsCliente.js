const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jsonwebtoken = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Endpoint para el registro de un nuevo cliente

router.post('/Registro', async (req, res) => {
    try {
        console.log("Datos recibidos en el servidor:", JSON.stringify(req.body));

        await mongoose.connect(process.env.URI_MONGODB);

        const resInsert = await mongoose.connection
            .collection('clientes')
            .insertOne(
                {
                    nombre: req.body.nombre,
                    apellido: req.body.apellido,
                    genero: req.body.genero,
                    cuenta: {
                        email: req.body.email,
                        password: bcrypt.hashSync(req.body.password, 10),
                        cuentaActivada: false,
                        fechaCreacion: Date.now(),
                        telefonoContacto: req.body.telefonoContacto
                    },
                    direccion: [{
                        calle: req.body.direccion.calle,
                        codigoPostal: req.body.direccion.codigoPostal,
                        provincia: req.body.direccion.provincia,
                        municipio: req.body.direccion.municipio
                    }],
                    pedidos: [],
                    listaFavoritos: [],
                    pedidoActual: {},
                    metodosPago: []

                }
            );

        console.log(`La opeacion ha ido bien, usuario registrado ${JSON.stringify(resInsert)}`);

        const tokenActivacionCuenta = jsonwebtoken.sign(
            {
                email: req.body.email,
                idCliente: resInsert.insertedId
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '1d'
            }
        );

        const bodyFetchBrevo = {
            sender: {
                email: 'alber16.pruebas@gmail.com',
                name: 'Administrador Tienda HSN'
            },
            to: [{ email: req.body.email, name: req.body.nombre || '' }],
            subject: 'Activación de cuenta',
            htmlContent:
                `
                    <div style="text-align:center;">
                    <img src="https://www.hsnstore.com/skin/frontend/ultimo/default/hreborn/images/logoHSNRediced.svg" alt="Logo HSN" style="width:150px;"/>
                    </div>
                    <div>
                    <h3>Gracias por registrarte en nuestra tienda</h3>
                    <p>Para terminar el registro debes ACTIVAR TU CUENTA.</p>
                    <p>
                        <a href="http://localhost:3000/api/Cliente/ActivarCuenta?email=${req.body.email}&idCliente=${resInsert.insertedId.toString()}&token=${tokenActivacionCuenta}">
                        Pulsa aquí
                        </a>
                    </p>
                    </div>
                `
        };

        const resp = await fetch('https://api.brevo.com/v3/smtp/email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'api-key': process.env.BREVO_API_KEY   // <-- NO "Authorization: Bearer"
            },
            body: JSON.stringify(bodyFetchBrevo)           // <-- usa bodyBrevo, no "respuestaBrevo"
        });

        const datosRespuestaBrevo = await resp.json();

        console.log("Respuesta de Brevo:", datosRespuestaBrevo);

        console.log('Brevo status:', resp.status);
        console.log('Brevo body:', JSON.stringify(datosRespuestaBrevo, null, 2));

        if (!resp.ok) {
            throw new Error('No se pudo enviar el correo de activación');
        }

        res.status(201).json({ message: "Usuario registrado correctamente. Por favor, activa tu cuenta a través del correo enviado." });

    } catch (error) {
        console.error("Error al registrar usuario:", error);
        res.status(500).json({ error: "Error al registrar usuario" });
    }
}
);

router.post('/Login', async (req, res) => {
    try {
        console.log("Datos de login recibidos en el servidor:", JSON.stringify(req.body));

        await mongoose.connect(process.env.URI_MONGODB);
        const resFindEmail = await mongoose.connection
            .collection('clientes')
            .findOne({ "cuenta.email": req.body.email });

        if (!resFindEmail) return res.status(401).json({ error: "Email o contraseña incorrectos" });

        if (!bcrypt.compareSync(req.body.password, resFindEmail.cuenta.password)) res.status(401).json({ error: "Email o contraseña incorrectos" });



        const tokenLogin = jsonwebtoken.sign(
            {
                idCliente: resFindEmail._id,
                email: resFindEmail.cuenta.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '2h'
            }
        );

        res.status(200).json(
            {
                message: "Login exitoso",
                datosCliente: resFindEmail,
                token: tokenLogin
            });

    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        res.status(500).json({ error: "Error al iniciar sesión" });
    }
});

router.get('/ActivarCuenta', async (req, res) => {
    try {
        const { email, idCliente, token } = req.query;

        await mongoose.connect(process.env.URI_MONGODB);

        // Verificar el token
        const verifyedToken = jsonwebtoken.verify(token, process.env.JWT_SECRET);

        let activarCuenta
        if (verifyedToken) {
            activarCuenta = await mongoose.connection
                                        .collection('clientes')
                                        .updateOne(
                                            { _id: new mongoose.Types.ObjectId(idCliente), "cuenta.email": email },
                                            { $set: { "cuenta.cuentaActivada": true } }
                                        );
        } else {
            return res.status(400).json({ error: "Token inválido o expirado" });
        }

        console.log(`Resultado de la activación de cuenta: ${JSON.stringify(activarCuenta)}`);
        console.log("Cuenta activada correctamente");
        res.redirect('http://localhost:3000/activacion-cuenta-exitosa');

    } catch (error) {
        console.error("Error al activar cuenta:", error);
        res.status(500).json({ error: "Error al activar cuenta" });
    }
});


module.exports = router;