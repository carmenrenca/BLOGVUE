'use strict'

//cargar modulos de node  para crear el sevidor
var express = require('express');
var bodyParser =require('body-parser');


//Ejecurar express (http)
var app = express();

//Cargar ficheros rutas
var article_router = require('./routes/article');
var article_cliente = require('./routes/cliente');
var evento = require('./routes/evento');
//Midelwares

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());



//CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

// Añadir prefijos a rutas /cargar rutas
app.use('/',article_router);
app.use('/',article_cliente);
app.use('/',evento);

//rutas o metodo de prueba para el API REST
/** 
app.get('/probando', (req, res)=>{
  //  var hola = req.body.hola;
  
return res.status(200).send({
    curso: 'Master en Framenworks JS',
    autor: 'carmen Rendon WEB',
    URL:'carmenrendon.es',
   // hola

});
});*/

//Exportar modulo(fichero actual)

module.exports = app;