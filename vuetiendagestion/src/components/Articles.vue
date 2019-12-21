<template>
  <div id="articles-list">
    <article class="article-item" v-for="articles in articles" :key="articles._id">
      <div class="image-wrap">
        <img :src="url+'get-image/'+articles.imagen" :alt="articles.title" v-if="articles.imagen" />
      </div>

   <h2>  <router-link :to="{name:'article', params:{id: articles._id}}">{{articles.title}}</router-link> </h2>
      <span class="date">{{articles.date | moment('from', 'now')}}</span>
   <router-link :to="{name:'article', params:{id: articles._id}}">Leer más</router-link>

      <div class="clearfix"></div>
    </article>
  </div>
</template>

<script>
import { global } from "../global";

export default {
  name: "Articles",

  props: ["articles"],
  data() {
    return {
      url: global.url
    };
  }
};
</script>