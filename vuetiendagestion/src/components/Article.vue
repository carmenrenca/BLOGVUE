<template>
  <div class="general">
   
    <div class="center">
      <section id="content">
        <article class="article-item article-detail" v-if="article">
          <div class="image-wrap">
            <img
            :src="url+'get-image/'+article.imagen" :alt="article.title" v-if="article.imagen"
            />
       
          </div>

          <h1 class="subheader">{{article.title}}</h1>
          <span class="date">{{article.date | moment("from", "now")}}</span>
        <p>{{article.content}}</p>
          <div class="clearfix"></div>
          <router-link :to="'/editarticle/'+article._id" class="btn btn-warning">Editar</router-link>
                <a @click="deleteArticle(article._id)" to="/eliminar" class="btn btn-danger">Eliminar</a>
        </article>
      </section>
      <Sidebar></Sidebar>
    </div>
    <div class="clearfix"></div>
  </div>
</template>

<script>


import Sidebar from "./sidebar.vue";
import {global} from '../global';
import axios from "axios";
import swal from "sweetalert";
export default {
    name: 'Article',
    
    components:{
   
        Sidebar
    },
    data(){
        return {
            url: global.url,
            article:null
        }
    }, mounted(){
      var  articleId=this.$route.params.id;
 this.getArticle(articleId);
    },
    methods:{
        getArticle(articleId){
            axios.get(this.url+'article/'+articleId).then(res=>{
                    if(res.data.status=='success'){
                        this.article= res.data.article; 
                    }
            });
        },

        
        deleteArticle(articleId){
         axios.delete(this.url+'article/'+articleId).then(res=>{
           console.log(res);
               swal('Articulo Eliminado','El articulo se ha borrado correctamente','success' );
          this.$router.push('/Blog');
         });
        }
    }

}
</script>