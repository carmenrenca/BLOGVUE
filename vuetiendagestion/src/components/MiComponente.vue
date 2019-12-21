<template>
  <section id="content">
    <h2 class="subheader">{{titulo}}</h2>
    <hr />
    <h1>Este es mi componente</h1>

    <h2>{{subtitulo}}</h2>

    <hr />
    <h2>Reactividad</h2>
    <!--lo que to escriba en este campo se estará cambiando en el data-->
    <!-- two-way binding  -->
    <input type="text" v-model="nombre"/>
    {{nombre}}
<h2>Directivas condicionales </h2>
 <input type="numbre" v-model="edad"/>
  Mi edad es: <strong>{{edad}}</strong>

  <p style="color:red; font-weight:bold" v-if="edad && edad>=18">
    Eres mayor de edad!!
    
    </p>
    <h2>Directivas Iterativas</h2>
    <ol>
      <li v-for="pelicula in peliculas" :key="pelicula">{{pelicula}}</li>

    </ol>
  </section>
</template>

<script>
export default {
  name: "MiComponente",
  data() {
    return {
        titulo:"Mi componente",
      subtitulo: "Soy el subtitulo de mi componente",
      nombre:'',
      edad:18,
      peliculas:['Batman','El señor de los anillos', 'Harry Potter']
    };
  }
};
</script>