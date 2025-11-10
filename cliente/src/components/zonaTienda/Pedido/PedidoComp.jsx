import './PedidoComp.css'
import ItemPedido from './ItemPedido/ItemPedido'
import { Link } from 'react-router-dom';
import useGlobalState from '../../../globalState/globalState';
import { useNavigate } from 'react-router-dom';
import { use } from 'react';

function PedidoComp() {
    const { pedido, setPedido, datosCliente:cliente } = useGlobalState();
    const navigate = useNavigate();

    return (
        <div className='container'>

                        <div className='row'>
                            {/* .... items compra... */}
                            <div className='col-9 mt-4'>
                                    <h3>Tu cesta tiene {pedido.itemsPedido.length} artículo(s)</h3>
                                    <hr/>
                                    <div className='container'>
                                    { /* ...deberemos recorrernos el array de items del pedido y por cada item renderizar un componente ItemPedido.jsx ... */}
                                    {pedido.itemsPedido.map((item, index) => (
                                        <ItemPedido key={index} item={item} setPedido={setPedido} />
                                    ))}
                                    </div>
                            </div>
                            {/* .... subtotal, gastos envio, total y finalizar pedido ... */}
                            <div className='col-3 mt-4'>
                                    <div className='d-flex flex-row justify-content-between align-items-center'>
                                        <span style={{ font:'normal 1.3em "Roboto", "Open Sans", "sans-serif"', fontWeight:'400'}}>Total Parcial</span>
                                        <span style={{ font:'normal 1.1em "Roboto", "Open Sans", "sans-serif"', fontWeight:'400'}}>{pedido.subTotal?.toFixed(2) || '0.00'} €</span>
                                    </div>
                                    <div className='d-flex flex-row justify-content-between align-items-center'>
                                        <span style={{ font:'normal 1.3em "Roboto", "Open Sans", "sans-serif"', fontWeight:'400', color:'#999'}}>Gastos de Envio</span>
                                        <span style={{ color:'#00b22d', fontWeight:'800', fontSize:'1em'}}>{pedido.gastosEnvio?.toFixed(2) || '0.00'} €</span>
                                    </div>
                                    <div className='d-flex flex-row justify-content-between align-items-center'>
                                        <span style={{ font:'normal 2em "Roboto", "Open Sans", "sans-serif"', fontWeight:'800'}}>Total</span>
                                        <span style={{ font:'normal 2em "Roboto", "Open Sans", "sans-serif"', fontWeight:'800'}}>{pedido.totalPagar?.toFixed(2) || '0.00'} €</span>
                                    </div>
                                    <div className='mt-3'>
                                        <span style={{ fontSize:'0.75em'}}>Con esta compra añadiras <strong>0 HSNpoints = 0,00 €</strong></span>
                                        <span style={{ fontSize:'0.75em'}}>¿Quieres canjear tus puntos? <strong><Link to='/Cliente/Login'>Identificate</Link></strong></span>
                                    </div>
                                    <button type="button" className='btn btn-hs1 w-100 mt-2' onClick={()=>navigate('/Pedido/FinalizarPedido')}>Finalizar Pedido</button>
                            </div>
                        </div>

        </div>
    )
}

export default PedidoComp