import './MiniProducto.css'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import useGlobalState from '../../../../globalState/globalState';

function Miniproducto({ producto }) {
    const navigate = useNavigate();
    const { pedido, setPedido } = useGlobalState();

    const [cantidad, setCantidad] = useState(pedido.itemsPedido.find(it => it.producto._id === producto._id)?.cantidad || 0);
    useEffect(
        () => {
            console.log('actualizando itempedido...', cantidad);

            setPedido('modificaItem', { producto, cantidad })
        }, [cantidad, producto, setPedido]
    )



    return (
        <div id={producto._id} className="card m-3">
            <div className='row'>

                <div className='col-3' style={{ "cursor": "pointer" }} onClick={() => navigate(`/Tienda/Producto/${producto._id}`)}>
                    <div className="d-flex flex-col justify-content-center align-items-center">
                        <div><img src={producto.Imagenes[0]} className="img-fluid rounded-start" style={{ "width": "170px", "height": "170px" }} alt={producto.Nombre} /></div>
                        {/* el icono cuando se clickea del corazon seria:  <i className="fa-solid fa-heart"></i> */}
                        <div className='d-flex flex-row justify-content-center align-items-center'>
                            <span className='bubbles'>TOP VENTAS</span>
                        </div>
                    </div>
                </div>

                <div className='col-5'>
                    <div className="card-body">
                        <h5 className="card-title"><strong>{producto.Nombre}</strong></h5>
                        {
                            /*  estrellas segun array  producto.valoraciones y puntuacion media de las mismas */
                            Array.from({ length: 5 }, (_, i) => i).map((el, pos) => <i key={pos} className="fa-solid fa-star" style={{ color: '#ff6000' }}></i>)
                        }
                        <span style={{ color: '#ff6000' }}>(0)</span>


                        <p className="card-text">{producto.Descripcion}</p>
                    </div>
                </div>

                <div className='col-4 d-flex flex-column justify-content-between mb-3 mt-2'>
                    {/* precios del producto y rebajas */}
                    <div className='d-flex flex-row justify-content-start align-items-center mb-2'>
                        <span style={{ fontStyle: 'italic', fontWeight: 'bold', fontSize: '1.1em' }}> {(producto.Precio * producto.Oferta / 100).toFixed(2)}€</span>
                        <span style={{ textDecoration: 'line-through', color: '#ccc', fontStyle: 'italic' }}>{producto.Precio}€</span>
                        <span className='discount-percentage'>-{producto.Oferta}%</span>
                    </div>

                    {/* lista formatos producto */}
                    <select className="form-select form-select-sm mb-2" aria-label="Default select example">
                        {
                            producto.Formato.map((formato, index) => <option key={index} value={formato}>{formato}</option>)
                        }
                    </select>

                    {/* lista sabores producto */}
                    <select className="form-select form-select-sm mb-2" aria-label="Default select example">
                        {
                            producto.Sabores.map((sabor, index) => <option key={index} value={sabor}>{sabor}</option>)
                        }
                    </select>

                    {/* lista cantidades producto */}
                    <select className="form-select form-select-sm mb-2" aria-label="Default select example">
                        {
                            Array.from({ length: 12 }, (_, i) => i + 1).map((cantidad, index) => <option key={index} value={cantidad}>{cantidad}</option>)
                        }
                    </select>

                    {/* boton añadir al carrito */}
                    <button
                        type="button"
                        className="btn btn-success"
                        style={{ fontSize: '1.4em', backgroundColor: '#00b22d', color: 'white', border: '1px solid #00b22d', boxShadow: '0 5px 0 0 #2c942f', fontWeight: 'bold', fontStyle: 'italic' }}
                        onClick={() => { setPedido('agregar', { producto, cantidad }) }}>
                            
                        <i className="fa-solid fa-cart-shopping"></i> AÑADIR <i className="fa-solid fa-arrow-right"></i>  {(producto.Precio * producto.Oferta / 100).toFixed(2)}€
                    </button>

                </div>

            </div>

        </div>
    )

}

export default Miniproducto;