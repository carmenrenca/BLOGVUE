<template>
  <section id="content">
    <h2 class="subheader">Pagina de pruebas</h2>
      <button @click="redirigirAlblog()">Redirigir</button>
      <h4>{{nombre}}</h4>
  </section>

</template>

<script>
export default {
    name:'Pagina1',
 
    methods:{
      actualizarNombre(){
        this.nombre="CARMEN RENDON WEB";
       
      },
      redirigirAlblog(){
        this.$router.push('/Blog')
      }
    }

};
</script>