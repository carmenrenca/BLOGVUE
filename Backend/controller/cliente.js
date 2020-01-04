var validator = require('validator');
var Cliente = require('../models/cliente');
var fs = require('fs');
var path = require('path');

const User = require('../models/user')
const service = require('../services')

var controller = {

    datosCurso: (req, res) => {


        return res.status(200).send({
            status:'success',
            curso: 'Estoy en cliente',
            autor: 'carmen Rendon WEB',
            URL: 'carmenrendon.es',


        });


    },


      
    //CREAR NUEVO CLIENTE

    save: (req, res) => {

        //recoger parametros por post 
        var params = req.body;
        var validate_email = !validator.isEmpty(params.email);
        var validate_password = !validator.isEmpty(params.password);
        console.log(params);

        //VALIDAR DATOS
        try {
            var validateNombre = !validator.isEmpty(params.nombre);
            var validate_apellido = !validator.isEmpty(params.apellido);
            var validate_telefono = !validator.isEmpty(params.telefono);
            var validate_direccion = !validator.isEmpty(params.direccion);
            var validate_email = !validator.isEmpty(params.email);
            var validate_dni = !validator.isEmpty(params.dni);
            var validate_password = !validator.isEmpty(params.password);
        } catch (err) {
          
            return res.status(200).send({
                status: 'error',
                message: 'Faltan datos por enviar!!'
            });
        }

        if (validateNombre && validate_password && validate_dni && validate_apellido && validate_telefono && validate_direccion && validate_email) {
            //crear el objeto a guardar
            var cliente = new Cliente();
            cliente.nombre = params.nombre;
            cliente.apellido = params.apellido;
            cliente.direccion = params.direccion;
            cliente.telefono = params.telefono;
            cliente.email = params.email;
            cliente.dni = params.dni;
            cliente.password= params.password;




            //asignar valores

            //guardar el articulo

            cliente.save((err, clienteStore) => {


                if (err || !clienteStore) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'El cliente no se ha guardado !!'
                    })
                }
                //devolver una respuesta

                return res.status(200).send({
                    status: 'success',
                    article: clienteStore
                });
            });

        } else {
            return res.status(200).send({
                status: 'error',
                message: 'Los datos no son validos!!'
            });
        }

    },

    //SACAR TODOS LOS CLIENTES

    getClientes: (req, res) => {

        var query = Cliente.find({});

        var last = req.params.last;

        if (last || last != undefined) {
            query.limit(2);
        }

        //Find sacar los datos de la bd
        query.sort('-id').exec((err, clientes) => {

            if (err) {
                return res.status(500).send({
                    status: 'error',
                    message: 'Error  al  devolver los articulos!!'
                })
            }

            if (!clientes) {
                return res.status(404).send({
                    status: 'error',
                    message: 'No hay articulos para mostrar!!'
                })
            }

            return res.status(200).send({
                status: 'success',
                clientes
            });
        });


    },

    //ELIMINAR ARTICULO

    delete: (req, res) => {


        //RECOGER EL ID DEL LA URL
        var clienteId = req.params.id;

        //fing and delete

        Cliente.findOneAndDelete({ _id: clienteId }, (err, clienteremove) => {
            if (err) {
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al eliminar'
                });
            }
            if (!clienteremove) {
                return res.status(404).send({
                    status: 'error',
                    message: 'No existe el cliente!'
                });
            }
            return res.status(200).send({
                status: 'succes',
                article: clienteremove
            });

        });



    },
    search: (req, res) => {

           //SACAR EL STRING A BUSCAR

        var searchstring = req.params.search;


        //FIND OR
        Cliente.find({
            "$or": [
                { "nombre": { "$regex": searchstring, "$options": "i" } },
                { "apellido": { "$regex": searchstring, "$options": "i" } },
                { "dni": { "$regex": searchstring, "$options": "i" } },
                { "direccion": { "$regex": searchstring, "$options": "i" } },
                { "email": { "$regex": searchstring, "$options": "i" } },

            ]
        }).sort([['date', 'descending']]).exec((err, clientes) => {


            if (err) {
                return res.status(500).send({
                    status: 'error',
                    message: "Error en la petición!!!"

                });
            }
            if (!clientes || clientes.length <= 0) {
                return res.status(404).send({
                    status: 'error',
                    message: "No hay articulos para mostrar con tu busquedad!!"

                });
            }
            return res.status(200).send({
                status: 'success',
                clientes

            });
        })



    },



}//end controller

module.exports = controller;