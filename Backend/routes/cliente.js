'use strict'

var express = require('express');
var ClienteController = require('../controller/cliente');
const userCtrl = require('../controller/auth')
const auth = require('../middlewares/auth');
var router = express.Router();
var multipart = require('connect-multiparty');
//const auth = require('../middlewares/auth');
//const userCtrl = require('../controller/auth');
//var md_upload= multipart({uploadDir:'./upload/article'});

//RUTAS DE PRUEBAS

router.get('/cliente/datos-curso',auth, ClienteController.datosCurso);
router.post('/cliente/save', ClienteController.save);
router.get('/clientes/:last?', auth, ClienteController.getClientes);
router.delete('/clientes-delete/:id', ClienteController.delete);
router.get('/cliente-search/:search', ClienteController.search);
router.post('/signup', userCtrl.signUp)
router.post('/signin', userCtrl.signIn)
router.post('/getClientes', userCtrl.getsesiones)
router.get('/private', auth, (req, res) => {
    res.status(200).send({ message: 'Tienes acceso' })
  })

module.exports = router;
