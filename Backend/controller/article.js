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

    //CREAR NUEVO ARTICULO

    save: (req, res)=>{

        //recoger parametros por post 
            var params = req.body;
               
            console.log(params);
     
        //VALIDAR DATOS
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
                        article: articleStore
                    }); 
            }else{
                return res.status(200).send({
                    status: 'error',
                    message: 'Los datos no son validos!!'
                });  
            }
      
    }, 

    //SACAR TODOS LOS ARTÍCULOS

    getArticles: (req, res)=>{

        var query = Article.find({});

        var last = req.params.last;
        
        if(last || last!=undefined){
                query.limit(2);
        }
   
            //Find sacar los datos de la bd
            query.sort('-id').exec((err,articles)=>{

                if(err){
                    return res.status(500).send({
                        status:'error',
                        message:'Error  al  devolver los articulos!!'
                    })
                }
        
                if(!articles){
                    return res.status(404).send({
                        status:'error',
                        message:'No hay articulos para mostrar!!'
                    })
                }

                return res.status(200).send({
                    status: 'success',
                    articles
                });  
            });

      
    },

        getArticle: (req, res)=>{

            //recoger el id de la URL

                var articleId =req.params.id;

            //comprobar que existe
                if(!articleId || articleId == null){
                    return res.status(404).send({
                        status:'error',
                        message:'No existe el articulo!!'
                    });
                }
                
            //buscar el articulo
                Article.findById(articleId, (err,article)=>{
                      
                        if(err || !article){
                            return res.status(404).send({
                                status:'error',
                                message:'No existe el articulos!!'
                            });
                        }
                        return res.status(200).send({
                            status: 'success',
                           article
                        }); 
                });
            //Devolver en json
           
        },

        //EDITAR ARTICULOS

        update: (req, res) =>{

            //Recoger el ID del articulo por la URL

            var articleId = req.params.id;


            //Regoger los datos que llegan por put 
                var params = req.body;

            //Validar datos

                try{
                        var validate_title = !validator.isEmpty(params.title);
                        var validate_content = !validator.isEmpty(params.content);
                         
                }catch(err){

                    return res.status(200).send({
                        status:'error',
                    message:'Faltan datos por enviar!!'
                    });
                  
                }

                    if(validate_title && validate_content){
                            //Find and Update

                            Article.findOneAndUpdate({_id:articleId}, params,{new:true},(err,articleUpdate)=>{
                                    if(err){
                                        return res.status(500).send({
                                            status: 'error',
                                            message:'Error al actualizar'
                                        });  
                                    }


                                    if(!articleUpdate){
                                        return res.status(404).send({
                                            status: 'error',
                                            message:'No existe el articulos!!'
                                        });  
                                    }
                                        return res.status(404).send({
                                            status: 'success',
                                            article: articleUpdate    
                                        });  
                                    
                            });
                    }else{
                        return res.status(200).send({
                            status: 'error',
                            message:'La validación no es correcta'
                        });  
                    }
           

            //devolver una respuesta

            return res.status(200).send({
                status: 'success',
                message:'prueba!!'
            });  
        },

        //ELIMINAR ARTICULO

        delete: (req, res)=>{


            //RECOGER EL ID DEL LA URL
                var articleId= req.params.id;
                
            //fing and delete

            Article.findOneAndDelete({_id: articleId},(err,articleremove)=>{
                if(err){
                    return res.status(500).send({
                        status: 'error',
                        message:'Error al eliminar'
                    });  
                }
                if(!articleremove){
                    return res.status(404).send({
                        status: 'error',
                        message:'No existe el articulo!!'
                    });  
                }
                return res.status(200).send({
                    status: 'succes',
                   article: articleremove
                }); 

            });

       
            
        }



}; //end controller

module.exports= controller;