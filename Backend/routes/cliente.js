'use strict'

var express = require('express');
var ClienteController =require('../controller/cliente');

var router = express.Router();
var multipart= require('connect-multiparty');
//var md_upload= multipart({uploadDir:'./upload/article'});

//RUTAS DE PRUEBAS

router.get('/cliente/datos-curso', ClienteController.datosCurso);
router.post('/cliente/save', ClienteController.save);
router.get('/clientes/:last?', ClienteController.getClientes);
router.delete('/clientes-delete/:id', ClienteController.delete);
router.get('/cliente-search/:search', ClienteController.search);
module.exports = router;
