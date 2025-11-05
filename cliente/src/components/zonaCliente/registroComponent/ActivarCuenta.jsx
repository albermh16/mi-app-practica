import React from "react";
import { useEffect } from "react";
import { use } from "react";

function ActivarCuenta() {

  return (
    <div className="bg-light min-vh-100 d-flex align-items-center">
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="card shadow-sm">
              <div className="card-body text-center p-5">
                {/* Icono de éxito */}
                <div className="mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="60"
                    height="60"
                    fill="#28a745"
                    className="bi bi-check-circle-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.97 
                      11.03a.75.75 0 0 0 1.07.022l3.992-3.992a.75.75 
                      0 0 0-1.06-1.06L7.5 9.439 5.53 7.47a.75.75 0 0 
                      0-1.06 1.06l2.5 2.5z"/>
                  </svg>
                </div>

                {/* Título principal */}
                <h2 className="fw-bold text-danger mb-3">¡Correo verificado!</h2>

                {/* Mensaje */}
                <p className="text-muted mb-4">
                  Tu dirección de correo electrónico ha sido activada correctamente.  
                  Ahora puedes acceder a tu cuenta y disfrutar de todas las ventajas de HSN.
                </p>

                {/* Botón para volver a login */}
                <a href="/login" className="btn btn-success btn-lg px-4">
                  Ir a Iniciar Sesión
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ActivarCuenta;

