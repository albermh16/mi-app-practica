import React, { useState } from "react";
import { tieneMinimo, tieneMayuscula, tieneArroba, seleccionValida } from "../../../utils/validaciones.js";
import InputBox from "../../compGlobales/inputBoxComponent/InputBox";
import { useEffect } from "react";
import { use } from "react";
import { useNavigate } from "react-router-dom";


export default function RegistroHSN() {
    const [modo, setModo] = useState("particular");
    const [provincia, setProvincia] = useState([]);
    const [municipio, setMunicipio] = useState([]);
    const [provinciaSeleccionada, setProvinciaSeleccionada] = useState("");

    const navigate = useNavigate();

    

    {/*PARTICULAR*/ }
    const [particular, setParticular] = useState({
        nombre: "",
        apellido: "",
        email: "",
        genero: "",
        password: "",
        direccion: {
            calle: "",
            provincia: "",
            municipio: "",
            codigoPostal: ""
        },


    });

    const nombreValido = tieneMinimo(particular.nombre);
    const apellidoValido = tieneMinimo(particular.apellido);
    const emailValido = tieneArroba(particular.email);
    const generoValido = seleccionValida(particular.genero);
    const passwordValido = tieneMinimo(particular.password) && tieneMayuscula(particular.password);

    const VITE_GEO_API = import.meta.env.VITE_GEO_API;

    useEffect( () => {
        async function fetchProvincias() {
            try {
                const response = await fetch(`https://apiv1.geoapi.es/provincias?key=${VITE_GEO_API}&type=JSON`);

                if (!response.ok) throw new Error("Error al cargar provincias");

                const data = await response.json();
                setProvincia(data.data);
            } catch (err) {
                console.error("Error cargando provincias:", err);
                setProvincia([]);
            }
        }
        fetchProvincias();
    }, [] );

    useEffect( () => {
        async function fetchMunicipios() {
            try {
                const response = await fetch(`https://apiv1.geoapi.es/municipios?CPRO=${provinciaSeleccionada}&key=${VITE_GEO_API}&type=JSON`);

                if (!response.ok) throw new Error("Error al cargar municipios");

                const data = await response.json();
                setMunicipio(data.data);
            } catch (err) {
                console.error("Error cargando municipios:", err);
                setMunicipio([]);
            }
        }
        fetchMunicipios();
    }, [provinciaSeleccionada] );

    const handleInputChange = (ev) => {

        if (modo === "particular") {

            setParticular({ ...particular, [ev.target.name]: ev.target.value })
        } else {
            setEmpresa({ ...empresa, [ev.target.name]: ev.target.value })
        }
    };

    {/*EMPRESA*/ }

    const [empresa, setEmpresa] = useState({
        nombre: "",
        apellido: "",
        email: "",
        genero: "",
        password: "",

    });

    const handleOnSubmit = async (ev) => {
        try {
            console.log(`Enviando formulario... ${JSON.stringify(modo === "particular" ? particular : empresa)}`);

            ev.preventDefault();

            const respuestaServer = await fetch("http://localhost:3000/api/Cliente/Registro", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(modo === "particular" ? particular : empresa)
            });
            const datosRespuesta = await respuestaServer.json();
            console.log(`Respuesta del servidor: ${JSON.stringify(datosRespuesta)}`);

        } catch (error) {
            console.log(`Error en la petición: ${error.message}`);

        }
    };


    return (
        <div className="container py-5 bg-light">
            <div className="row justify-content-center">
                {/* Columna izquierda */}
                <div className="col-md-5 mb-4">
                    <h3 className="text-danger">Hola, ¿creamos tu cuenta?</h3>
                    <p>
                        Estás a punto de crear tu cuenta en HSNstore con lo que conseguirás
                        acceder a promociones especiales, acumular puntos, y ahorrarte
                        dinero...
                    </p>
                    <p>
                        <a href="#">Uy, si yo ya tengo una cuenta creada.</a>
                    </p>
                    <ul className="list-unstyled">
                        <li>✅ Accederás a promociones y descuentos antes que nadie.</li>
                        <li>✅ Acumularás puntos = dinero para futuras compras.</li>
                        <li>✅ Recibirás cupones, regalos sorpresa sólo para registrados.</li>
                        <li>
                            ✅ Podrás invitar a tus amigos y conseguir 5€ en futuras compras.
                        </li>
                        <li>✅ Puedes cargar tus pedidos anteriores con un solo click.</li>
                        <li>✅ Y mucho más...</li>
                    </ul>
                    <div className="p-3 bg-light border">
                        <p className="fw-bold">CREA O ACCEDE CON TUS REDES SOCIALES</p>
                        <div className="d-flex gap-2">
                            <button className="btn btn-outline-danger w-50">
                                <img
                                    src="https://img.icons8.com/color/24/000000/google-logo.png"
                                    alt="Google"
                                />{" "}
                                Continuar con Google
                            </button>
                            <button className="btn btn-outline-primary w-50">
                                <img
                                    src="https://img.icons8.com/color/24/000000/facebook.png"
                                    alt="Facebook"
                                />{" "}
                                Continuar con Facebook
                            </button>
                        </div>
                    </div>
                </div>

                {/* Columna derecha (formulario) */}
                <div className="col-md-6">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h5 className="mb-3">Datos de identificación de cuenta</h5>

                            <div className="btn-group mb-3">
                                <button
                                    className={`btn ${modo === "particular" ? "btn-danger" : "btn-outline-secondary"
                                        }`}
                                    onClick={() => setModo("particular")}
                                >
                                    Particular
                                </button>
                                <button
                                    className={`btn ${modo === "empresa" ? "btn-danger" : "btn-outline-secondary"
                                        }`}
                                    onClick={() => setModo("empresa")}
                                >
                                    Empresa
                                </button>
                            </div>
                            <p className="text-danger small">
                                * Atención: si eres autónomo o empresa y necesitas una factura
                                selecciona la opción EMPRESA.
                            </p>

                            {/* Formulario para PARTICULAR */}
                            {modo === "particular" && (
                                <form onSubmit={handleOnSubmit}>

                                    {
                                        ["nombre", "apellido", "email", "password"].map((campo, pos) => (
                                            <InputBox className="mb-3"
                                                key={pos}
                                                nameInput={campo}
                                                typeInput={campo === "email" ? "email" : campo === "password" ? "password" : "text"}
                                                labelInput={campo === "nombre" ? "Nombre *" : campo === "apellido" ? "Apellido *" : campo === "email" ? "Email *" : campo === "password" ? "Contraseña *" : ""}
                                                eventoOnBlur={(ev) => handleInputChange(ev, "particular")}
                                                nombreValidoInput={campo === "nombre" ? nombreValido : campo === "apellido" ? apellidoValido : campo === "email" ? emailValido : campo === "genero" ? generoValido : campo === "password" ? passwordValido : false}
                                                nombreInput={particular[campo]}
                                                mensajeError={campo === "nombre" ? "El nombre debe tener al menos 6 caracteres." :
                                                    campo === "apellido" ? "El apellido debe tener al menos 6 caracteres." :
                                                        campo === "email" ? "El email debe contener una @." :
                                                            campo === "password" ? "La contraseña debe tener al menos 6 caracteres y una mayúscula." :
                                                                ""
                                                }
                                                mensajeOk={campo === "nombre" ? "Nombre válido." :
                                                    campo === "apellido" ? "Apellido válido." :
                                                        campo === "email" ? "Email válido." :
                                                            campo === "password" ? "Contraseña válida." :
                                                                ""
                                                }
                                            />
                                        ))

                                    }

                                    <div className="row">
                                        <div className="col-6">
                                            <label className="form-label">Provincia *</label>
                                            <select
                                                className="form-select"
                                                value={particular.direccion.provincia}
                                                onChange={(ev) => {
                                                    setProvinciaSeleccionada(ev.target.value);
                                                    setParticular((prev) => ({
                                                        ...prev,
                                                        direccion: { ...prev.direccion, provincia: ev.target.value },
                                                    }))
                                                }}
                                            >
                                                <option value="">Selecciona una provincia</option>
                                                {provincia.map((prov, i) => (
                                                    <option key={i} value={prov.CPRO}>{prov.PRO}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="col-6">
                                            <label className="form-label">Municipio *</label>
                                            <select
                                                className="form-select"
                                                value={particular.direccion.municipio}
                                                onChange={(ev) =>
                                                    setParticular((prev) => ({
                                                        ...prev,
                                                        direccion: { ...prev.direccion, municipio: ev.target.value },
                                                    }))
                                                }
                                            >
                                                <option value="">Selecciona un municipio</option>
                                                {municipio.map((mun, i) => (
                                                    <option key={i} value={mun.DMUN50}>{mun.DMUN50}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    {/* Dirección */}
                                    <div className="mb-3 mt-3">
                                        <label className="form-label">Calle *</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Calle, número, piso..."
                                            value={particular.direccion.calle}
                                            onChange={(ev) =>
                                                setParticular((prev) => ({
                                                    ...prev,
                                                    direccion: { ...prev.direccion, calle: ev.target.value },
                                                }))
                                            }
                                        />
                                    </div>
                                    <div className="mb-3 mt-3">
                                        <label className="form-label">Código Postal *</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Código Postal"
                                            value={particular.direccion.codigoPostal}
                                            onChange={(ev) =>
                                                setParticular((prev) => ({
                                                    ...prev,
                                                    direccion: { ...prev.direccion, codigoPostal: ev.target.value },
                                                }))
                                            }
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Género *</label>
                                        <select className="form-select" defaultValue="" name="genero" onChange={(ev) => handleInputChange(ev, "particular")}>
                                            <option value="">
                                                Selecciona...
                                            </option>
                                            <option value="hombre">Hombre</option>
                                            <option value="mujer">Mujer</option>
                                            <option value="otro">Prefiero no decirlo</option>
                                        </select>
                                        {!generoValido && <span className="text-danger">Debes seleccionar una opción.</span>}
                                        {generoValido && <span className="text-success">Selección válida.</span>}
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Código Plan Amigo</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Código Plan Amigo"
                                        />
                                    </div>
                                    <div className="form-check mb-2">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id="promo"
                                        />
                                        <label className="form-check-label" htmlFor="promo">
                                            Quiero recibir promociones exclusivas y contenidos
                                            personalizados
                                        </label>
                                    </div>
                                    <div className="form-check mb-3">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id="privacidad"
                                        />
                                        <label className="form-check-label" htmlFor="privacidad">
                                            He leído y acepto la <a href="#">Política de privacidad</a>
                                        </label>
                                    </div>
                                    <button className="btn btn-success w-100 fw-bold">
                                        REGISTRARME YA
                                    </button>
                                </form>
                            )}

                            {/* Formulario para EMPRESA */}
                            {modo === "empresa" && (
                                <form onSubmit={handleOnSubmit}>
                                    <div className="mb-3">
                                        <label className="form-label">Nombre de la Empresa *</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Nombre de la Empresa"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">CIF / NIF *</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="CIF / NIF"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Email *</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            placeholder="Email"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Teléfono *</label>
                                        <input
                                            type="tel"
                                            className="form-control"
                                            placeholder="Teléfono de contacto"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Introduce tu contraseña *</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            placeholder="Introduce tu contraseña"
                                        />
                                    </div>
                                    <div className="form-check mb-2">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id="promoEmpresa"
                                        />
                                        <label className="form-check-label" htmlFor="promoEmpresa">
                                            Quiero recibir promociones exclusivas y contenidos
                                            personalizados
                                        </label>
                                    </div>
                                    <div className="form-check mb-3">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id="privacidadEmpresa"
                                        />
                                        <label className="form-check-label" htmlFor="privacidadEmpresa">
                                            He leído y acepto la <a href="#">Política de privacidad</a>
                                        </label>
                                    </div>
                                    <button className="btn btn-success w-100 fw-bold">
                                        REGISTRARME YA
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
