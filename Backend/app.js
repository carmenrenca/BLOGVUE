'use strict'

//cargar modulos de node  para crear el sevidor
var express = require('express');
var bodyParser =require('body-parser');


//Ejecurar express (http)
var app = express();

//Cargar ficheros rutas
var article_router = require('./routes/article');

//Midelwares

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());



//CORS


// Añadir prefijos a rutas /cargar rutas
app.use('/api',article_router);


//rutas o metodo de prueba para el API REST
/*
app.post('/probando', (req, res)=>{
    var hola = req.body.hola;
  
return res.status(200).send({
    curso: 'Master en Framenworks JS',
    autor: 'carmen Rendon WEB',
    URL:'carmenrendon.es',
    hola

});
});*/

//Exportar modulo(fichero actual)

module.exports = app;