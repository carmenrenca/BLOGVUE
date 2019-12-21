<template>
  <div class="general">
    <div class="center">
      <section id="content">
        <br />
        <h2 class="subheader">Clientes</h2>

        <br />
        <form v-on:submit.prevent="save()">
          <b-container fluid>
            <b-row class="my-1">
              <b-col sm="2">
                <label for="input-none">Nombre:</label>
              </b-col>
              <b-col sm="4">
                <b-form-input id="input-none" :state="null" v-model="clientes.nombre" />
                <div v-if="submite && !$v.cliente.nombre.required">Este campo es requerido</div>
                <div v-if="submite && !$v.cliente.nombre.minLength">Este campo Debe tener mas letras</div>
              </b-col>
              <b-col sm="2">
                <label for="input-none">Apellido:</label>
              </b-col>
              <b-col sm="4">
                <b-form-input id="input-none" :state="null" v-model="clientes.apellido" />
                <div v-if="submite && !$v.cliente.apellidos.required">Este campo es requerido</div>
                <div
                  v-if="submite && !$v.cliente.apellidos.minLength"
                >Este campo Debe tener mas letras</div>
              </b-col>

              <b-col sm="2">
                <label for="input-none">DNI:</label>
              </b-col>
              <b-col sm="4">
                <b-form-input id="input-none" :state="null" v-model="clientes.dni" />
              </b-col>

              <b-col sm="2">
                <label for="input-none">Teléfono:</label>
              </b-col>
              <b-col sm="4">
                <b-form-input id="input-none" :state="null" v-model="clientes.telefono" />
                <div v-if="submite && !$v.cliente.telefono.minLength">Teléfono no válido</div>
              </b-col>
            </b-row>

            <b-row class="my-1">
              <b-col sm="2">
                <label for="input-none">Direccion:</label>
              </b-col>
              <b-col sm="7">
                <b-form-input id="input-none" :state="null" v-model="clientes.direccion" />
              </b-col>
            </b-row>

            <b-row class="my-1">
              <b-col sm="2">
                <label for="input-none">Email:</label>
              </b-col>
              <b-col sm="7">
                <b-form-input id="input-none" :state="null" v-model="clientes.email" />
                <div v-if="submite && !$v.cliente.apellidos.required">Este campo es requerido</div>
              </b-col>
            </b-row>
          </b-container>

          <div class="clearfix"></div>

          <input type="submit" value="Guardar" class="btn btn-success" />
        </form>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />

        <div class="article-item">
          <table class="table">
            <thead class="thead-dark">
              <tr>
                <th scope="col">DNI</th>
                <th scope="col">Nombre</th>
                <th scope="col">Apellido</th>
                <th scope="col">Direccion</th>
                <th scope="col">Teléfono</th>
                <th scope="col">Email</th>
                <th scope="col">Eliminar</th>
                <th scope="col">Editar</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="cliente in cliente" :key="cliente._id">
                <th scope="row">{{cliente.dni}}</th>
                <td>{{cliente.nombre}}</td>
                <td>{{cliente.apellido}}</td>
                <td>{{cliente.direccion}}</td>
                <td>{{cliente.telefono}}</td>
                <td>{{cliente.email}}</td>
                <td>
                  <a
                    @click="deleteCliente(cliente._id)"
                    to="/eliminar"
                    class="btn btn-danger"
                  >Eliminar</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <b-table striped hover :clientesList="clientesList" :cliente="cliente"></b-table>
        </div>
      </section>
      <Sidebar></Sidebar>
    </div>
    <div class="clearfix"></div>
  </div>
</template>

<script>
import { required, minLength } from "vuelidate/lib/validators";
import axios from "axios";
import { global } from "../global";
import Sidebar from "./sidebar.vue";
import swal from "sweetalert";
import Cliente from "../models/Cliente.js";
export default {
  name: "Cliente",

  components: {
    Sidebar
  },
  validations: {
    cliente: {
      nombre: {
        required,
        minLength: minLength(2)
      },
      apellidos: {
        required,
        minLength: minLength(2)
      },
      telefono: {
        minLength: minLength(9)
      },
      email: {
        required
      }
    }
  },
  data() {
    return {
      url: global.url,
      submite: false,
      cliente: new Cliente("", "", "", 0, "", "", ""),
       clientes: new Cliente("", "", "", 0, "", "", ""),
      clientesList: []
    };
  },
  mounted() {
    this.getClientes();
  },
  methods: {
    mostrarusuario() {
      console.log(this.cliente);
      this.submite = true;
      this.$v.$touch();

      if (this.$v.$invalid) {
        return false;
      }

      alert("Validacion Pasada");
    },

    save() {
      console.log(this.url);
        console.log(this.clientes);
      axios
        .post(this.url + "cliente/save", this.clientes)
        .then(res => {
        
          if (res.data.status == "success") {
            swal(
              "Cliente Creado",
              "el Cliente se ha creado correctamente :)",
              "success"
            );
            this.clientes = res.data.cliente;
            this.$router.push("/Blog");
          } else {
            swal(
              "Creación fallida",
              "El articulo no se ha creado bien :(",
              "error"
            );
          }
        })
        .catch(err => {
          console.log(err);
          console.log(this.cliente);
        });
    },
    getClientes() {
      axios
        .get(this.url + "clientes")
        .then(res => {
          if (res.data.status == "success") {
            this.cliente = res.data.clientes;
            this.clientesList.push(res.data.clientes);
            console.log(this.clientesList);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    deleteCliente(clienteId) {
      axios.delete(this.url + "clientes-delete/" + clienteId).then(res => {
        console.log(res);
        swal(
          "Cliente Eliminado",
          "El Cliente se ha borrado correctamente",
          "success"
        );
        this.$router.push("/Cliente");
      });
    }
  }
};
</script>