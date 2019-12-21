<template>
  <div class="general">
    <div class="center">
      <section id="content">
        <h2 class="subheader">Factura</h2>
        <br />
        <div></div>
        <form>
          <h5>Cliente</h5>
          <div id="search" class="sidebar-item">
            <h3>Buscador</h3>
            <p>Encuentra el cliente que buscas para su</p>
            <form @submit.prevent="getClienteBySearch(searchString)">
              <input type="text" name="search" v-model="searchString" />
              <input type="submit" name="submit" value="Buscar" class="btn" />
            </form>
          </div>
      <br>
          <div class="row">
            <table class="table  col-2" >
            
              <tbody >
               
                <div  v-for="clientes in clientes" :key="clientes._id">
                  <tr>
                  <th scope="row">{{clientes.dni}}</th>
                  <td>{{clientes.nombre}}</td>
                  <td>{{clientes.apellido}}</td>
                  <td>{{clientes.direccion}}</td>
                  <td>{{clientes.telefono}}</td>
                  <td>{{clientes.email}}</td>
                  </tr>
                </div>
              </tbody>
            </table>

            
          </div>
        </form>
        <div id="botonesf" class="col-3 mt-4" >
              <button
                type="button"
                class="btn btn-outline-primary"
                data-toggle="modal"
                data-target="#exampleModal" @click="show()"
              >+Producto</button>
            </div>
        <br />
        <br />
        <table class="table mt-9 table-striped" id="tablafactura">
          <thead class="thead-dark">
            <tr>
              <th scope="col">CODIGO</th>

              <th scope="col">NOMBRE ART.</th>
              <th scope="col">PRECIO UNIT.</th>
              <th scope="col">CANT.</th>
              <th scope="col">PRECIO TOTAL</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody id="lineaf"></tbody>
          <tfoot id="lineafooter">
            <td></td>
            <td></td>
            <td></td>
            <td>SUBTOTAL €</td>
            <td>
              <input id="preciototal" type="text" class="form-control col-5" />
            </td>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td>{{clientes.dni}}</td>
              <td>
                <input id="iva" type="text" class="form-control col-5" />
              </td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td>TOTAL</td>
              <td>
                <input id="total" type="text" class="form-control col-5" />
              </td>
            </tr>
          </tfoot>
        </table>
       
      </section>
      <Sidebar></Sidebar>
    </div>
    <div class="clearfix"></div>
  <v-dialog v-model="dialog" widht="500">
  <v-card> <v-card-title>Este es el titulo</v-card-title>
    <v-card-text>lalallala</v-card-text>
    <v-card-actions><button>Cerrar</button></v-card-actions>
  </v-card>
  </v-dialog>

  </div>

  
</template>

<script>
import Sidebar from "./sidebar.vue";
import axios from "axios";
import { global } from "../global";
import Cliente from "../models/Cliente";
//import VModal from 'vue-js-modal'

export default {
  name: "Factura",
  components: {
    Sidebar
  },
  data() {
    return {
      dialog:false,
      searchString: null,
      url: global.url,
      cliente: {
        nombre: "",
        apellidos: "",
        telefono: "",
        direccion: "",
        email: "",
        dni: ""
      },
      clientes: new Cliente("", "", "", 0, "", "", "")
    };
  },
  methods: {
    show () {
    this.$modal.show('hello-world');
    console.log("entraa");
  },
    getClientes() {
      axios
        .get(this.url + "clientes")
        .then(res => {
          if (res.data.status == "success") {
            this.cliente = res.data.clientes;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getClienteBySearch(searchString) {
      axios
        .get(this.url + "cliente-search/" + searchString)
        .then(res => {
          if (res.data.status == "success") {
            this.clientes = res.data.clientes;

            console.log(searchString);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.getClientes();
  }
};
</script>