'use strict'

var express = require('express');
var ArticleController =require('../controller/article');

var router = express.Router();

//RUTAS DE PRUEBAS

router.post('/datos-curso', ArticleController.datosCurso);
router.get('/test-de-controlador', ArticleController.test);

//RUTAS PARA ÚTILES

router.post('/save',ArticleController.save);


module.exports = router;
