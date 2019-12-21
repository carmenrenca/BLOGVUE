<template>
  <div id="app">
   <HeaderComponent></HeaderComponent>
   <Slider></Slider>
  </div>
</template>

<script>

import HeaderComponent from './components/HeaderComponent';
import Slider from './components/Slider';

export default {
  name: 'app',

  components: {

   
    HeaderComponent,
    Slider
  },

  data: () => ({
    //
  }),
};
</script>
