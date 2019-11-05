'use strict'

//cargar modulos de node  para crear el sevidor
var express = require('express');
var bodyParser =require('body-parser');


//Ejecurar express (http)
var app = express();

//Cargar ficheros rutas


//Midelwares

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//CORS


// Añadir prefijos a rutas 

//rutas o metodo de prueba para el API REST

app.get('/probando', (req, res)=>{
return res.status(404).send({
    curso: 'Master en Framenworks JS',
    autor: 'carmen Rendon WEB',
    URL:'carmenrendon.es'
});
});

//Exportar modulo(fichero actual)

module.exports = app;