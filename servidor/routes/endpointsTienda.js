const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();


router.get('/Categorias', async (req, res) => {
    try {
        const pathCategoria = req.query.pathCat;

        let patronBusqueda = pathCategoria === "principales" ? /^\d+$/ : new RegExp(`^${pathCategoria}-\\d+$`);

        await mongoose.connect(process.env.URI_MONGODB);
    
        const categoriasCollection = mongoose.connection
                                            .collection('categorias')
                                            .find({ pathCategoria: { $regex: patronBusqueda } });

        let categoriasArray = await categoriasCollection.toArray();
        console.log(`Categorias encontradas: ${JSON.stringify(categoriasArray)}`);

        res.status(200).json({ exito: true, mensaje: 'Categorias obtenidas', datos: categoriasArray });

    } catch (error) {
        console.error('Error al obtener categorias:', error);
        res.status(500).json({ exito: false, mensaje: 'Error interno del servidor', categorias: [] });
    }
});

router.get('/Productos', async (req, res) => {
    try {
        const pathCategoria = req.query.pathCategoria;

        await mongoose.connect(process.env.URI_MONGODB);

        //si categoria es de 2º nivel, recuperamos productos que CONTENGAN el path...si es de 3º nivel, tienen q coincidir exactamente con ese pathCategoria
        let patron=pathCategoria.split('-').length == 2 ? new RegExp(`^${pathCategoria}-`) : new RegExp(`^${pathCategoria}$`);
    
        const productosCollection = mongoose.connection
                                            .collection('productos')
                                            .find({ pathCategoria: { $regex: patron } });

        let productosArray = await productosCollection.toArray();
        console.log(`Productos encontrados: ${JSON.stringify(productosArray)}`);

        res.status(200).json({ exito: true, mensaje: 'Productos obtenidos', datos: productosArray });

    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).json({ exito: false, mensaje: 'Error interno del servidor', productos: [] });
    }
});


module.exports = router;