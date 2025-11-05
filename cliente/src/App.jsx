import Registro from './components/zonaCliente/registroComponent/Registro.jsx'
import Login from './components/zonaCliente/loginComponent/Login.jsx'
import ActivarCuenta from './components/zonaCliente/registroComponent/ActivarCuenta.jsx'
import Layout from './components/zonaTienda/LayOut/Layout.jsx'
import Home from './components/zonaTienda/Inicio/Home.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';


const rutasAplicacion = createBrowserRouter(
   [
    {
      element: <Layout />,
      children: [
        { path: '/', element: <Home /> },
        {
          path: 'Cliente',
          children: [
            { path: 'Login', element: <Login /> },
            { path: 'Registro', element: <Registro /> },
            { path: 'ActivarCuenta', element: <ActivarCuenta /> }
          ]
        },
        { path:'*', element: <div><img src="/images/error404.png" alt="404 Not Found" /></div>}
      ],
      
    },
  ]
);

function App() {
  return (
    <div className="App">
      <RouterProvider router={rutasAplicacion} />
    </div>
  );
}

export default App;
