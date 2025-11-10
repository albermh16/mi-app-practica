import { create } from "zustand";
import { persist } from "zustand/middleware";

const useGlobalState = create(
    persist(
        (set, get, store) => {
            console.log(`En funcion CREATE para generar el store global, 
            - set: ${set}, 
            - get: ${get}, 
            - store: ${store}`);

            return {
                cliente: null,
                accessToken: null,
                pedido: {
                    itemsPedido: [],
                    codigoDescuento: [],
                    metodoPago: {},
                    metodoEnvio: {},
                    fechaPago: null,
                    fechaEnvio: null,
                    estado: '',
                    direccionEnvio: null,
                    direccionFacturacion: null,
                    subTotal: 0,
                    gastosEnvio: 0,
                    total: 0
                },
                //acciones
                setCliente: (nuevoDatoCliente) => {
                    set(state => ({ ...state, cliente: { ...state.cliente, ...nuevoDatoCliente } }));
                },
                setAccessToken: (nuevoAccessToken) => {
                    set(state => ({ ...state, accessToken: nuevoAccessToken }));
                },
                setPedido: (accion, itemPedido) => {
                    console.log(`En accion setPedido, ${accion}, ${JSON.stringify(itemPedido)}`);
                    set(state => {
                        switch (accion) {
                            case 'setDirEnvio':
                            case 'setDirFacturacion':
                                return {
                                    ...state,
                                    pedido: {
                                        ...state.pedido,
                                        [accion === 'setDirEnvio' ? 'direccionEnvio' : 'direccionFacturacion']: itemPedido
                                    }
                                };
                            case 'setMetodoPago':
                                return {
                                    ...state,
                                    pedido: {
                                        ...state.pedido,
                                        metodoPago: itemPedido
                                    }
                                };
                            default:

                                let _items = [...state.pedido.itemsPedido];
                                let index = _items.findIndex(it => it.producto._id === itemPedido.producto._id);

                                switch (accion) {
                                    case 'agregar':
                                        console.log(`Estamos agregando un producto al pedido: ${JSON.stringify(itemPedido)}`);
                                        if (index >= 0) {
                                            _items[index].cantidad += itemPedido.cantidad;
                                        } else {
                                            _items.push(itemPedido);
                                        }
                                        break;
                                    case 'modificar':
                                        console.log(`Estamos modificando un item del pedido: ${JSON.stringify(itemPedido)}`);
                                        if (index >= 0) {
                                            _items[index].cantidad = itemPedido.cantidad;
                                        }
                                        break;
                                    case 'eliminar':
                                        console.log(`Estamos eliminando un item del pedido: ${JSON.stringify(itemPedido)}`);
                                        if (index >= 0) {
                                            _items = _items.filter(item => item.producto._id !== itemPedido.producto._id);
                                        }
                                        break;

                                }
                                const _subTotal = _items.reduce((acc, it) => {
                                    const precioConDto = it.producto.Precio * (1 - it.producto.Oferta / 100);
                                    return acc + precioConDto * it.cantidad;
                                }, 0);

                                let _totalPagar = _subTotal + state.pedido.gastosEnvio;
                                return {
                                    ...state,
                                    pedido: {
                                        ...state.pedido,
                                        totalPagar: _totalPagar,
                                        itemsPedido: _items,
                                        subTotal: _subTotal,
                                    }
                                };
                        }
                    });
                }
            };
        },

        { name: "global-state-storage" }
    )
);

export default useGlobalState;

