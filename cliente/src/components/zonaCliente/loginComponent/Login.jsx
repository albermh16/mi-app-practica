import React, { use, useState } from "react";
import InputBox from "../../compGlobales/inputBoxComponent/InputBox";
import useGlobalState from "../../../globalState/globalState";


function Login() {

    const { cliente, setCliente } = useGlobalState();

    const [login, setLogin] = useState({
        email: "",
        password: ""
    });

    const onBlurHandler = (ev) => {
        const { name, value } = ev.target;

        setLogin({
            ...login, [name]: value
        });
    }


    async function handleSubmitForm(event) {
        event.preventDefault();
        try {
            const response = await fetch("http://localhost:3000/api/Cliente/Login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(login)
            });

            const data = await response.json();

            if (response.ok) {
                // Manejar el inicio de sesión exitoso
                console.log("Inicio de sesión exitoso:", data);
            } else {
                // Manejar errores de inicio de sesión
                console.error("Error en el inicio de sesión:", data);
            }
            setCliente(data.datosCliente);
        } catch (error) {
            console.error("Error en la solicitud de inicio de sesión:", error);
        }
    }

    return (
        <div className="container my-5">
            <div className="border p-4">
                <div className="row">
                    {/* Sección de acceso (izquierda) */}
                    <div className="col-lg-6">
                        <h1 style={{ color: "#e1522e" }} className="fw-bold mb-2">
                            Acceso a mi cuenta HSN
                        </h1>
                        <p className="mb-4">
                            Si ya eres usuario registrado, introduce tu email y la contraseña que
                            utilizaste en el registro
                        </p>
                        <form className="needs-validation" noValidate onSubmit={handleSubmitForm}>
                            {["email", "password"].map((campo, pos) => (

                                <InputBox className="mb-3"
                                    labelInput={campo === "email" ? "Email *" : campo === "password" ? "Contraseña *" : ""}
                                    typeInput={campo === "email" ? "email" : campo === "password" ? "password" : "text"}
                                    key={pos}
                                    nameInput={campo}
                                    eventoOnBlur={(ev) => onBlurHandler(ev)}

                                />
                            ))}


                            {/* Botón de iniciar sesión */}
                            <button
                                type="submit"
                                className="btn w-100"
                                style={{
                                    backgroundColor: "#fff",
                                    borderColor: "#e1522e",
                                    color: "#e1522e",
                                    fontWeight: 600,
                                }}
                            >
                                INICIAR SESIÓN
                            </button>
                            {/*{mensaje && <p>{mensaje}</p>}*/}

                            {/* Links debajo del botón */}
                            <div className="mt-2 d-flex justify-content-between align-items-center">
                                <a href="#" className="text-primary small">
                                    ¿Olvidó su contraseña?
                                </a>
                                <span className="text-success small d-flex align-items-center">
                                    {/* Icono de candado (simplificado) */}
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="14"
                                        height="14"
                                        fill="currentColor"
                                        viewBox="0 0 16 16"
                                        className="me-1"
                                    >
                                        <path d="M8 1a3 3 0 00-3 3v2h6V4a3 3 0 00-3-3z" />
                                        <path d="M3.5 8V7a1 1 0 011-1h7a1 1 0 011 1v1a1 1 0 011 1v5a1 1 0 01-1 1h-9a1 1 0 01-1-1V9a1 1 0 011-1z" />
                                    </svg>
                                    Conexión segura
                                </span>
                            </div>

                        </form>
                    </div>

                    {/* Sección de alta y redes (derecha) */}
                    <div className="col-lg-6 mt-4 mt-lg-0">
                        <div className="p-4 bg-light h-100">
                            <h5 className="fw-bold text-uppercase mb-1">
                                ¿Todavía no tienes cuenta?
                            </h5>
                            <p className="mb-3">
                                Acumula puntos, obtén descuentos exclusivos, recibe regalos sorpresa...
                                todas estas ventajas y muchas más con la cuenta HSN
                            </p>
                            <button className="btn btn-success w-100 mb-4">
                                CREAR UNA CUENTA
                            </button>
                            <h6 className="fw-bold text-uppercase mb-2">
                                Crea o accede con tus redes sociales
                            </h6>
                            <button
                                type="button"
                                className="btn w-100 mb-2 d-flex align-items-center border"
                                style={{ backgroundColor: "#fff", borderColor: "#dadce0" }}
                            >
                                <img
                                    src="https://developers.google.com/identity/images/g-logo.png"
                                    alt="Google"
                                    width={20}
                                    height={20}
                                    className="me-2"
                                />
                                <span className="flex-grow-1 text-center">
                                    Continuar con Google
                                </span>
                            </button>
                            <button
                                type="button"
                                className="btn w-100 d-flex align-items-center border"
                                style={{ backgroundColor: "#fff", borderColor: "#dadce0" }}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    fill="#1877F2"
                                    className="me-2"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M12.73 2h-2.6C8.84 2 8.5 2.77 8.5 4v1H11l-.5 3H8.5v7H5.5V8H3.5V5h2v-.75C5.5 2.83 6.79 1 9.73 1H12v3z" />
                                </svg>
                                <span className="flex-grow-1 text-center">
                                    Continuar con Facebook
                                </span>
                            </button>

                        </div>
                    </div>
                </div>
                {/* Nota legal inferior */}
                <p className="small text-muted mt-4">
                    Si haces clic en Continuar con Facebook, Google o Amazon y no eres usuario
                    de HSN, pasarás a estar registrado y aceptas los{" "}
                    <a href="#" className="text-primary text-decoration-underline">
                        Términos y Condiciones
                    </a>{" "}
                    y la{" "}
                    <a href="#" className="text-primary text-decoration-underline">
                        Política de Privacidad
                    </a>{" "}
                    de HSN.
                </p>
            </div>
        </div>
    );
}



export default Login;