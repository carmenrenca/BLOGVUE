<template>
<div class="general">
   
    <div class="center">
  <section id="content">
    <h2 class="subheader">Articulos</h2>

    <!--Listado articulos-->
    <div id="articles">
 
  <div  v-for="articulo in articulos" v-bind:key="articulo.title">
  <Articulo :articulo="articulo"></Articulo>

  </div>

    </div>
  </section>
  <Sidebar></Sidebar>
    </div>
    <div class="clearfix"></div>
  </div>
</template>

<script>

import Sidebar from "./sidebar.vue";
import Articulo from './Articulo';
export default {
  name: "Articulos",
components : {
Articulo,

 Sidebar 
},
  data() {
    return {
      articulos: [
        {
          title: "Yamaha F310 Acoustic",
          year: "2004",
          imagen:
            "https://d1aeri3ty3izns.cloudfront.net/media/27/270638/1200/preview.jpg"
        },
        {
          title: "Yamaha YUS 1 SH PE Silent Piano",
          year: "2003",
          imagen:
            "https://www.thomann.de/pics/bdb/305967/6520066_800.jpg"
        },
        {
          title: "Vidaxl Saxofón Alto Amarillo Latón ",
          year: "2019",
          imagen: "https://static.carrefour.es/hd_510x_/imagenes/products/87184/75508/878/8718475508878/imagenGrande1.jpg"
        }
      ]
    };
  }
};
</script>