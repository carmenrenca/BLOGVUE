'use strict'
var validator = require('validator');
var Article = require('../models/articles');


var controller= {

   datosCurso: (req, res)=>{
        var hola = req.body.hola;
      
    return res.status(200).send({
        curso: 'Master en Framenworks JS',
        autor: 'carmen Rendon WEB',
        URL:'carmenrendon.es',
        hola
    
    });


    },

    test: (req, res)=>{
        return res.status(200).send({
            message: 'Soy la acción test de mi controlador de articulos'
        });
    },

    //crear un nuevo articulo

    save: (req, res)=>{

        //recoger parametros por post 
            var params = req.body;
               
            console.log(params);
     
        //validar datos(validator)
            try{
                var validateTitle= !validator.isEmpty(params.title);
                var validate_cotent= !validator.isEmpty(params.content);
            }catch(err){
                status: 'error'
                return res.status(200).send({
                   message:'Faltan datos por enviar!!'
                }); 
            }

            if(validateTitle && validate_cotent){
             //crear el objeto a guardar
              var article = new Article();
              article.title=params.title;
              
              article.content= params.title;
              article.imagen= null;
        //asignar valores

        //guardar el articulo
                article.save((err, articleStore)=>{
                    if(err || !articleStore){
                        return res.status(404).send({
                            status:'error',
                            message:'El artículo no se ha guardado !!'
                        })
                    }

                });
        //devolver una respuesta
        return res.status(200).send({
            status:'success',
            article
        }); 
            }else{
                return res.status(200).send({
                    status: 'error',
                    message: 'Los datos no son validos!!'
                });  
            }
      
    }
}; //end controller

module.exports= controller;