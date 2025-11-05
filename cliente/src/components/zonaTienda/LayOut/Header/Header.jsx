import React, { useEffect, useState,useRef } from 'react';
import {Link, Navigate} from 'react-router-dom';
import './Header.css';

/*
  Header inspirado en la cabecera de HSN
  - Usa clases Bootstrap puras
  - Realiza fetch a /api/Tienda/Categorias?pathCategoria=raices
  - Renderiza un navbar horizontal con las categorías principales
  - Mantiene estilos mínimos en línea para ajustar espaciado y colores
*/

const Header = () => {
  const hideTimer = useRef(null); // timer para ocultar el mega panel

  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeParent, setActiveParent] = useState(null); // pathCategoria activa
  const [showPanel, setShowPanel] = useState(false); // mostrar/ocultar mega panel
  
  useEffect(() => {
    let mounted = true;
    fetch('http://localhost:3000/api/Tienda/Categorias?pathCat=raices')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((datosBody) => {
        if (!mounted) return;
        setCategorias(Array.isArray(datosBody.datos) ? datosBody.datos : []);
      })
      .catch((err) => {
        if (!mounted) return;
        console.error('Error cargando categorias:', err);
        setError(err.message || 'Error');
      })
      .finally(() => {
        if (!mounted) return;
        setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  // Construir árbol simple de categorías cuando cambian las categorias


//   // manejar timers para mostrar/ocultar el panel sin parpadeos
  const handleEnterParent = (categoria) => {
    if (hideTimer.current) {
      clearTimeout(hideTimer.current);
      hideTimer.current = null;
    }
    setActiveParent(categoria.pathCategoria);
    setShowPanel(true);
  };

  const handleLeaveAll = () => {
    // esperar un poco antes de ocultar para permitir mover el raton al panel
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => {
      setShowPanel(false);
      setActiveParent(null);
      hideTimer.current = null;
    }, 180);
  };

  const handleEnterPanel = () => {
    if (hideTimer.current) {
      clearTimeout(hideTimer.current);
      hideTimer.current = null;
    }
    setShowPanel(true);
  };

  const handleLeavePanel = () => {
    handleLeaveAll();
  };

  return (
    <div className='container'>

      <div className='row'>
        <div className='col d-flex flex-row justify-content-between' style={{ color: '#999', borderBottom:'1px solid #f1f1f1', fontWeight:'400', fontFamily:'"Roboto","Open Sans",sans-serif' }}>          
          <div><p>Envio gratuito a partir de 29,99€*</p></div>
          <div><p style={{ textAlign:'center'}}><a href="https://www.hsnstore.com/contacts" style={{ textDecoration:'underline', color:'inherit' }}>Contacta con nosotros aqui</a></p></div>
          <div>
            <a href="/Cliente/Login" style={{  marginRight:8 }}>Iniciar sesión</a>
            <a href="/Cliente/Registro" >Crear Cuenta</a>
          </div>
        </div>
      </div> 

      <div className='row'>
          <div className='col'>
              {/* Main navbar */}
              <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom">
                  <div className="container">
                  <a className="navbar-brand d-flex align-items-center" href="#">
                      <img src="https://www.hsnstore.com/skin/frontend/default/hsnreborn/images/logoHSNReduced.svg" alt="HSN" style={{ width:115,height: 40, marginRight: 8 }} />
                  </a>

                  <form className="d-none d-lg-flex flex-grow-1 mx-3">
                      <div className="input-group w-100">
                      <input type="search" className="form-control" placeholder="Buscar por: Producto, Objetivo, Ingrediente..." aria-label="Buscar" />
                      <button className="btn btn-outline-secondary" type="submit">Buscar</button>
                      </div>
                  </form>

                  <div className="d-flex align-items-center">
                      <a href="#" className="text-muted me-2 position-relative">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-cart-fill" viewBox="0 0 16 16">
                          <path d="M0 1.5A.5.5 0 0 1 .5 1h1a.5.5 0 0 1 .485.379L2.89 5H14.5a.5.5 0 0 1 .491.592l-1.5 6A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L1.01 1.607 1 1.5H.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/>
                      </svg>
                      <span className="badge bg-danger rounded-pill position-absolute hsn-cart-badge">0</span>
                      </a>
                  </div>
                  </div>
              </nav>
          </div>
      </div>

      <div className='row'>
        <div className='col'>
          {/* Categories navbar */}
          <div className=" border-bottom">
            <div className="container">
              <ul id="catsppales" className="nav d-flex align-items-center overflow-auto" style={{ whiteSpace: 'nowrap' }}>
                {loading && (
                  <li className="nav-item px-3 py-2 text-muted">Cargando categorías...</li>
                )}

                {error || categorias.length === 0 && (
                  <li className="nav-item px-3 py-2 text-danger">Error cargando categorías</li>
                )}

                {!loading && !error && categorias.length > 0 && categorias.map((categoria,pos) => (
                  <li
                    className="nav-item"
                    key={pos}
                    onMouseEnter={() => handleEnterParent(categoria)}
                    onMouseLeave={() => handleLeaveAll()}
                  >
                    <Link className={`nav-link px-3 ${activeParent === categoria.pathCategoria ? 'active' : ''}`} to={`/Productos/${encodeURIComponent(categoria.pathCategoria)}`}>
                      <span className="catsppales">{categoria.nombreCategoria} <i className='fas fa-chevron-down'></i></span>   
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Mega panel: aparece bajo la barra de categorias */}
      { showPanel && (
        <div
          onMouseEnter={handleEnterPanel}
          onMouseLeave={handleLeavePanel}
        >
          <h1>subcats...</h1>
        </div>
      )}

    </div>
  );
};

export default Header;
