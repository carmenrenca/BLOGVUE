<template>
<div class="general">
    <Slider></Slider>
    <div class="center">
  <section id="content">
    <br>
    <br>
    <h2 class="subheader">Últimos artículos</h2>

    <!--Listado articulos-->
    <div id="articles">
      <Articles v-bind:articles="articles"></Articles>
    </div>
  </section>
      <Sidebar></Sidebar>
    </div>
    <div class="clearfix"></div>
  </div>
</template>

<script>
import axios from 'axios';
import Slider from "./Slider";
import Sidebar from "./sidebar.vue";
import {global} from "../global";
import Articles from './Articles';
export default {
  name: "LastArticle",
  components:{
        Slider,
    Sidebar ,
    Articles
  },
  mounted(){
    this.getLastArticle();
  },
    data() {
   
    return {
       url: global.url,
      articles: []
    };
  },
  methods: {
    getLastArticle() {
        
      axios.get(this.url+"articles/true").then(res => {
        if (res.data.status == "success") {
          this.articles = res.data.articles;
          console.log(this.articles);
        }
      });
    }
  }
};
</script>