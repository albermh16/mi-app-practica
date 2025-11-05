//const cookieParser = require('cookie-parser'); // <---- importamos la funcion que exporta el modulo cookie-parser que genera funcion middlewarepara procesar cookies
const express=require('express');
const mongoose=require('mongoose');
//const bcrypt=require('bcrypt');
const cors=require('cors');

module.exports= (serverExpress)=> {
    //configuraciones del pipeline de procesamiento de peticiones
    serverExpress.use(express.json());
    serverExpress.use(express.urlencoded({extended:false}));
    serverExpress.use(cors());
    //serverExpress.use(cookieParser()); // <---- registramos la funcion middleware para procesar cookies

    serverExpress.use("/api/Cliente", require('../routes/endpointsCliente.js'));
    //serverExpress.use("/api/Tienda", require('../routes/endpointsTienda.js'));

}