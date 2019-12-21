<template>
     <article class="article-item" >
        <div class="image-wrap">
          <img :src="articulo.imagen" :alt="articulo.title" :title="articulo.title" />
        </div>

        <h2>{{articulo.title}}</h2>
        <span class="date">{{articulo.year}}</span>
        <a href="#">Leer más</a>

        <div class="clearfix"></div>
      </article>
</template> 

<script>

        export default{
         name: 'Articulo',
         props:['articulo']
        
        }
        </script>