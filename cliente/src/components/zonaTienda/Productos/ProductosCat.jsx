import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Miniproducto from './MiniProductoComponent/MiniProducto';
import useGlobalState from '../../../globalState/globalState';

function ProductosCat() {

    const {pathCategoria}=useParams();
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                setLoading(true);
                const response = await fetch(`http://localhost:3000/api/Tienda/Productos?pathCategoria=${pathCategoria}`);
                const data = await response.json();
                console.log(`Productos recibidos en ProductosCat.jsx: ${JSON.stringify(data)}`);
                if (data.exito) {
                    setProductos(data.datos);
                    setError(null);
                } else {
                    setError('Error al cargar productos');
                }
            } catch (err) {
                console.error('Error fetching productos:', err);
                setError('Error al cargar productos');
            }
            setLoading(false);
        };

        fetchProductos();
    }, [pathCategoria]);

    //console.log(`pathCat recibido en ProductosCat.jsx a traves de useParams(): ${JSON.stringify(pathCat)}`);
    //console.log(`productos recibidos en ProductosCat.jsx a traves de useLoaderData(): ${JSON.stringify(productos)}`);
    
    return (
        <div className="container">

            <div className='row'>
                <div className='col d-flex flex-row justify-content-between align-items-center'>
                    <div style={{ fontSize:'1.5em', color:'#57cad9', fontWeight:'bold'}}> 
                        {loading
                            ? 'Cargando productos...'
                            : error
                                ? error
                                : `Productos en la categoría: ${pathCategoria}`
                        }
                    </div>
                    <div>
                        <select className="form-select" aria-label="Default select example">
                            <option defaultValue={1}>Ordenar por: Relevancia</option>
                            <option value="2">Recomendados HSN</option>
                            <option value="3">Mayor descuento</option>
                            <option value="4">Mejor valorados</option>
                            <option value="5">Más vendidos</option>
                            <option value="6">Precio: de más alto a más bajo</option>
                            <option value="7">Precio: de más bajo a más alto</option>
                        </select>                        
                    </div>
                </div>
            </div>
            <hr />
            {
                productos.length > 0 && (
                    productos.map( (producto, index) => 
                                    <div className='row' key={index}>
                                        <div className='col'>
                                            <Miniproducto producto={producto} />
                                        </div>
                                    </div>
                                )
                )
            }
        </div>
    );
}
export default ProductosCat;