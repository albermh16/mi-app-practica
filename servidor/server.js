require('dotenv').config();
console.log('SMTP_USER?', !!process.env.SMTP_USER, 'SMTP_HOST?', process.env.SMTP_HOST);

console.log("✅ URI_MONGODB cargada:", process.env.URI_MONGODB);
const configExpress = require('express');

const configPipeline = require('./config_enrrutamiento/config_pipeline');

const serverExpress = configExpress();

configPipeline(serverExpress);

serverExpress.listen(3000, () => {
    console.log('Servidor escuchando en http://localhost:3000');
});



