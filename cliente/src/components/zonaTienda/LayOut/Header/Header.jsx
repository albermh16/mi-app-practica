import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import useGlobalState from '../../../../globalState/globalState';


const Header = () => {
  const hideTimer = useRef(null);
  const { pedido } = useGlobalState();
  

  // Estados principales
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Estados del panel (subcategorías)
  const [activeParent, setActiveParent] = useState(null); // pathCategoria de la categoría principal activa
  const [showPanel, setShowPanel] = useState(false);
  const [subcategorias, setSubcategorias] = useState([]);
  const [loadingSub, setLoadingSub] = useState(false);
  const [errorSub, setErrorSub] = useState(null);

  // Estados de nietas (nivel 3)
  const [activeSub, setActiveSub] = useState(null);  // p.ej. "1-1"
  const [nietas, setNietas] = useState([]);
  const [loadingNietas, setLoadingNietas] = useState(false);

  // 1) Cargar categorías principales al montar
  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:3000/api/Tienda/Categorias?pathCat=principales');
        const data = await response.json();
        if (data.exito) {
          setCategorias(data.datos || []);
          setError(null);
        } else {
          setError('Error al cargar categorías');
        }
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError('Error al cargar categorías');
      }
      setLoading(false);
    };
    fetchCategorias();
  }, []);

  // 2) Cargar subcategorías cuando cambia la categoría principal activa
  useEffect(() => {
    const fetchSubcategorias = async () => {
      try {
        setLoadingSub(true);
        setErrorSub(null);
        const response = await fetch(`http://localhost:3000/api/Tienda/Categorias?pathCat=${activeParent}`);
        const data = await response.json();
        if (data.exito) {
          setSubcategorias(Array.isArray(data.datos) ? data.datos : []);
          setErrorSub(null);
        } else {
          setSubcategorias([]);
          setErrorSub('Error al cargar subcategorías');
        }
      } catch (err) {
        console.error('Error fetching subcategorias:', err);
        setSubcategorias([]);
        setErrorSub('Error al cargar subcategorías');
      }
      setLoadingSub(false);
    };

    if (activeParent) {
      fetchSubcategorias();
    } else {
      setSubcategorias([]);
      setErrorSub(null);
    }
  }, [activeParent]);

  // 3) Cargar nietas cuando cambia la subcategoría activa
  useEffect(() => {
    const fetchNietas = async () => {
      if (!activeSub) { setNietas([]); return; }
      try {
        setLoadingNietas(true);
        const response = await fetch(`http://localhost:3000/api/Tienda/Categorias?pathCat=${activeSub}`);
        const data = await response.json();
        if (data.exito) {
          setNietas(Array.isArray(data.datos) ? data.datos : []);
        } else {
          setNietas([]);
        }
      } catch (err) {
        console.error('Error fetching nietas:', err);
        setNietas([]);
      }
      setLoadingNietas(false);
    };
    fetchNietas();
  }, [activeSub]);

  // Handlers de hover
  const handleEnterParent = (categoria) => {
    if (hideTimer.current) {
      clearTimeout(hideTimer.current);
      hideTimer.current = null;
    }
    setActiveParent(categoria.pathCategoria);
    setShowPanel(true);
  };

  const handleLeaveAll = () => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => {
      setShowPanel(false);
      setActiveParent(null);
      setActiveSub(null);
      setNietas([]);
      setLoadingNietas(false);
      setErrorSub(null);
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

      {/* Franja superior */}
      <div className='row'>
        <div className='col d-flex flex-row justify-content-between' style={{ color: '#999', borderBottom: '1px solid #f1f1f1', fontWeight: '400', fontFamily: '"Roboto","Open Sans",sans-serif' }}>
          <div><p>Envio gratuito a partir de 29,99€*</p></div>
          <div><p style={{ textAlign: 'center' }}><a href="https://www.hsnstore.com/contacts" style={{ textDecoration: 'underline', color: 'inherit' }}>Contacta con nosotros aqui</a></p></div>
          <div>
            <a href="/Cliente/Login" style={{ marginRight: 8 }}>Iniciar sesión</a>
            <a href="/Cliente/Registro">Crear Cuenta</a>
          </div>
        </div>
      </div>

      {/* Navbar principal */}
        <div className='row'>
          <div className='col'>
            <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom">
          <div className="container">
            <a className="navbar-brand d-flex align-items-center" href="#">
              <img src="https://www.hsnstore.com/skin/frontend/default/hsnreborn/images/logoHSNReduced.svg" alt="HSN" style={{ width: 115, height: 40, marginRight: 8 }} />
            </a>

            <form className="d-none d-lg-flex flex-grow-1 mx-3">
              <div className="input-group w-100">
            <input type="search" className="form-control" placeholder="Buscar por: Producto, Objetivo, Ingrediente..." aria-label="Buscar" />
            <button className="btn btn-outline-secondary" type="submit">Buscar</button>
              </div>
            </form>

            <div className="d-flex align-items-center">
              <Link to="/Pedido/PedidoActual" className="text-muted me-2 position-relative">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-cart-fill" viewBox="0 0 16 16">
              <path d="M0 1.5A.5.5 0 0 1 .5 1h1a.5.5 0 0 1 .485.379L2.89 5H14.5a.5.5 0 0 1 .491.592l-1.5 6A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L1.01 1.607 1 1.5H.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
            </svg>
            <span className="badge bg-danger rounded-pill position-absolute hsn-cart-badge">{pedido.itemsPedido.length}</span>
              </Link>
            </div>
          </div>
            </nav>
          </div>
        </div>

        {/* Barra de categorías principales */}
      <div className='row'>
        <div className='col'>
          <div className="border-bottom">
            <div className="container">
              <ul id="catsppales" className="nav d-flex align-items-center overflow-auto" style={{ whiteSpace: 'nowrap' }}>
                {loading && (
                  <li className="nav-item px-3 py-2 text-muted">Cargando categorías...</li>
                )}

                {(error || (!loading && categorias.length === 0)) && (
                  <li className="nav-item px-3 py-2 text-danger">Error cargando categorías</li>
                )}

                {!loading && !error && categorias.length > 0 && categorias.map((categoria) => (
                  <li
                    className="nav-item"
                    key={categoria.pathCategoria}
                    onMouseEnter={() => handleEnterParent(categoria)}
                    onMouseLeave={handleLeaveAll}
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

      {/* Mega panel: subcategorías y nietas */}
      {showPanel && (
        <div onMouseEnter={handleEnterPanel} onMouseLeave={handleLeavePanel} className="bg-white border-bottom">
          <div className="container py-3">
            {loadingSub && <div className="text-muted small">Cargando subcategorías…</div>}
            {errorSub && !loadingSub && <div className="text-danger small">{errorSub}</div>}

            {!loadingSub && !errorSub && (
              subcategorias.length > 0 ? (
                <div className="row g-3">
                  {subcategorias.map((sub) => (
                    <div
                      className="col-6 col-md-3"
                      key={sub.pathCategoria}
                      onMouseEnter={() => { setActiveSub(sub.pathCategoria); }}
                      onMouseLeave={() => { setActiveSub(null); setNietas([]); }}
                    >
                      <Link className="btn btn-light w-100 mb-1" to={`/Productos/${sub.pathCategoria}`}>
                        {sub.nombreCategoria}
                      </Link>

                      {activeSub === sub.pathCategoria && (
                        <NietasList
                          subPath={activeSub}
                          nietas={nietas}
                          loadingNietas={loadingNietas}
                          onFetchStart={() => { setActiveSub(sub.pathCategoria); }}
                          onFetch={() => { /* no-op here */ }}
                        />
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-muted small">Sin subcategorías</div>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// Componente pequeño para disparar la carga y renderizar nietas
function NietasList({ subPath, nietas, loadingNietas }) {
  const firstRunRef = useRef(true);

  useEffect(() => {
    if (!subPath) return;
    if (firstRunRef.current) { firstRunRef.current = false; return; }
  }, [subPath]);

  return (
    <div className="ps-2">
      {loadingNietas && <span className="small text-muted">Cargando…</span>}
      {!loadingNietas && nietas.length === 0 && (
        <span className="small text-muted">Sin más niveles</span>
      )}
      {!loadingNietas && nietas.length > 0 && nietas.map((nieta) => (
        <Link
          key={nieta.pathCategoria}
          to={`/Productos/${nieta.pathCategoria}`}
          className="link-secondary small d-block"
          style={{ lineHeight: 1.2 }}
        >
          {nieta.nombreCategoria}
        </Link>
      ))}
    </div>
  );
}

export default Header;
