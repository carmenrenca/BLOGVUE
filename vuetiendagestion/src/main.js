import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import Vuelidate from 'vuelidate';
import VueMoment from 'vue-moment';
import moment from 'moment';
import 'moment/locale/es';
import LastArticle from './components/LastArticle.vue';
import  MiComponente  from './components/MiComponente.vue';
import  HelloWorld  from './components/HelloWorld.vue';
import  Blog from './components/Blog.vue';
import Pagina from './components/Pagina.vue';
import ErrorComponent from'./components/ErrorComponent.vue';
import BootstrapVue from 'bootstrap-vue'
import Articulos from './components/Articulos.vue';
import Factura from './components/Factura.vue';
import Cliente from './components/Cliente.vue';
import Search from './components/Search.vue';
import Redirect from './components/redirect.vue';
import Article from './components/Article.vue';
import CreateArticle from './components/CreateArticle.vue';
import EditArticle from './components/EditArticle.vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';


Vue.use(VueRouter);
Vue.use(BootstrapVue)
Vue.use(Vuelidate);

Vue.use(VueMoment,{
  moment
});
const routes=[
  //RUTAS BLOG CLIENTE
  {path:'/home', component: LastArticle},
  {path:'/ultimos-articulos', component: LastArticle},
  {path:'/mi-componente', component: MiComponente},
  {path:'/Hola-word', component: HelloWorld},
  {path:'/', component: LastArticle},
  {path:'/Blog', component:Blog},
  {path:'/articulo/:id', name:'article', component: Article},
  {path:'/Pagina1', component:Pagina},
  {path:'/Cliente', component:Cliente},
  {path:'/Articulos', name:'Articulos', component:Articulos},
  {path:'/redirect/:searchString',  component:Redirect},
  {path:'/buscador/:searchString', component:Search},
  {path:'/Factura', name:'Factura', component:Factura},
  {path:'/createarticle', name:'create', component:CreateArticle},
  {path:'/editarticle/:id', name:'edit', component:EditArticle},
  //RUTAS GESTION

  {path:'*', component: ErrorComponent}
  
];

const router = new VueRouter({
  routes,
  mode: 'history'
});

new Vue({
  router,
 
  render: h => h(App)
}).$mount('#app')
