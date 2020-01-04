'use strict'

const User = require('../models/user')
const service = require('../services/index')
var f = true;
var controlemai = true;
function signUp(req, res) {

    var params = req.body;
    const user = new User({
        nombre: params.nombre,
        apellido: params.apellido,
        direccion: params.direccion,
        telefono: params.telefono,
        email: params.email,
        dni: params.dni,
        password: params.password

    })

    var query = User.find({ email: req.body.email });

    //Find sacar los datos de la bd
    query.sort('-email').exec((err, USER) => {

        if (USER.length == 0) {
            controlemai=false;
            user.save((err) => {
                if (err) return res.status(500).send({ message: `Error al crear el usuario: ${err}` })
    
                return res.status(201).send({ token: service.createToken(user) })
            })
        } else {
            controlemai=true;
            return res.status(200).send({
                status: 'error',
                message: 'existee!!',

            })
        }
    });


    if (controlemai == false) {
        user.save((err) => {
            if (err) return res.status(500).send({ message: `Error al crear el usuario: ${err}` })

            return res.status(201).send({ token: service.createToken(user) })
        })
    }

}

function getsesiones(req, res) {

    var query = User.find({ email: req.body.email });

    //Find sacar los datos de la bd
    query.sort('-email').exec((err, user) => {

        if (user.length == 0) {
            return res.status(404).send({
                status: 'error',
                message: 'No hay sesiones!!',

            })
        } else {
            return res.status(200).send({
                status: 'success',
                message: 'existee!!',

            })
        }
    });


}



function signIn(req, res) {
    console.log(req.body.email)

    console.log(req.body.password)
    var query = User.find({ email: req.body.email });
    var querypass = User.find({ password: req.body.password });

    console.log(f = false)
    querypass.exec((err, pass) => {
        if (err) {
            f = false
            return res.status(500).send({
                status: 'error',
                message: 'Error  en la contraseña!!',

            })
        } else if (pass.length == 0) {
            f = false
            return res.status(404).send({
                status: 'error',
                message: 'No existe esa contraseña!!',

            })
        } else {
            f = true;
            query.sort('-email').exec((err, user) => {
                console.log(req.body.email);
                if (err) {

                    return res.status(500).send({
                        status: 'error',
                        message: 'Error  al  las sesiones!!',

                    })
                }
                if (user.length == 0) {

                    return res.status(404).send({
                        status: 'error',
                        message: 'No hay sesiones!!',

                    })
                }



                req.user = user

                return res.status(200).send({

                    message: 'Te has logueado correctamente',
                    token: service.createToken(user)


                })


            })
        }


    })







}

module.exports = {
    signUp,
    signIn, getsesiones
}