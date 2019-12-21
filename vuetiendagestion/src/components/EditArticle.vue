<template>
  <div class="general">
    <div class="center">
      <section id="content">
        <h1 class="subheader">Edita Articulo</h1>
        <form class="mid-form" v-on:submit.prevent="save()">
          <div class="form-group">
            <label for="title">Titulo</label>
            <input type="text" name="title" v-model="article.title" />
          </div>

          <div class="form-group">
            <label for="precio">Precio</label>
            <input type="text" name="title" v-model="article.precio" />
          </div>
          <div class="form-group">
            <label for="stock">Stock</label>
            <input type="text" name="stock" v-model="article.stock" />
          </div>

          <div class="form-group">
            <label for="content">Descripcion</label>
            <textarea name="content" v-model="article.content" />
          </div>
          <div class="form-group">
            <label for="imagen">Imagen</label>
            <input type="file" id="file" ref="file" name="file0" @change="fileChange()" />

            <img
              :src="url+'get-image/'+article.imagen"
              :alt="article.title"
              class="image-small"
              v-if="article.imagen"
            />
          </div>

          <input type="submit" value="Guardar" class="btn btn-success" />
        </form>
      </section>
      <Sidebar></Sidebar>
    </div>
    <div class="clearfix"></div>
  </div>
</template>

<script>
import Sidebar from "./sidebar.vue";
import { global } from "../global";
import Article from "../models/Article";
import axios from "axios";
import swal from "sweetalert";
//import {required, minLength} from 'vuelidate/lib/validators';
export default {
  name: "EditArticle",
  components: {
    Sidebar
  },
  data() {
    return {
      file: "",
      url: global.url,
      article: new Article("", "", null, "", "",""),
      isEdit: true
    };
  },
  mounted() {
    var articleID = this.$route.params.id;
    console.log(articleID);
    this.getArticle(articleID);
  },
  methods: {
    save() {
      var articleid = this.$route.params.id;
    console.log(this.article.data+"%%%%%%%%%%%%%%%%%%%%%%%%%");
      axios
        .put(this.url + "article/" + articleid, this.article)
        .then(res => {
          if (res.data.status == "success") {
            if (
              this.file != null &&
              this.file != undefined &&
              this.file != ""
            ) {
              //subida del archivo, crep un formulario ficticio para poder guardat mi imagen
              const formData = new FormData();
              formData.append("file0", this.file, this.file.name);
              var articleId = res.data.article._id;

              axios
                .post(this.url + "upload-image/" + articleId, formData)
                .then(res => {
                  if (res.data.article) {
                    swal(
                      "Articulo Editado",
                      "el articulo se ha editadp correctamente :)",
                      "succes"
                    );
                    this.article = res.data.article;

                    this.$router.push("/articulo/" + this.article._id);
                  }
                })
                .catch(err => {
                  console.log(err);
                });
            } else {
              swal(
                "Articulo Editado",
                "el articulo se ha editado correctamente :)",
                "success"
              );
              this.article = res.data.article;

              this.$router.push("/Blog");
            }
            console.log(res.data);
          } else {
            swal(
              "Edición fallida",
              "El articulo no se ha editado bien :(",
              "error"
            );
          }
        })
        .catch(error => {
          console.log(error);
             this.$router.push("/articulo/" + this.article._id);
        });
    },
    fileChange() {
      this.file = this.$refs.file.files[0];
      console.log(this.file);
    },

    getArticle(articleId) {
      axios.get(this.url + "article/" + articleId).then(res => {
        if (res.data.status == "success") {
          this.article = res.data.article;
        }
      });
    }
  }
};
</script>