<template>
<div class="scrolling-wrapper">
  <table class="table table-bordered">
            <thead class="thead-dark">
              <tr>
                  <th>Productos</th>
              </tr>
              <tr>
                    <div v-if="crearProducto">
                          <input placeholder="nombre_producto" v-model="nuevoProducto.nombre_producto"/>
                          <input placeholder="precio" v-model="nuevoProducto.precio"/>

                          <button type="button" class="btn btn-outline-success border" v-on:click="newProducto(nuevoProducto)">Guardar</button>
                    </div>
                    <div v-else>
                          <button type="button" class="btn btn-outline-primary border" style="float: left" v-on:click="crearProducto = true">Agregar Nuevo</button>
                    </div>
              </tr>
            </thead>
      <li v-for="(producto, i) in productos" v-bind:index="i" v-bind:key="producto.id">
        <div class="scrolling-wrapper" style="float: left">

            <tr>
                <td style="float: left">
                    <div v-if="editarProducto === producto.id" class="scrolling-wrapper">
                          <input v-on:keyup.13="editProducto(producto.nombre_producto)" v-model="nuevoProducto.nombre_producto"/>
                          <input v-on:keyup.13="editProducto(producto.precio)" v-model="nuevoProducto.precio"/>
           
                          <button type="button" class="btn btn-outline-success border" v-on:click="editProducto(producto)">Guardar</button>
                    </div>
                    <div v-else class="scrolling-wrapper font-weight-bold">
                        <button type="button" class="btn btn-outline-success border" style="float: left" v-on:click="editarProducto = producto.id"> Editar </button>
                        <button type="button" class="btn btn-outline-success border" style="float: left" v-on:click="deleteProducto(producto.id)"> Eliminar </button>
                        {{producto}}
                    </div>
                </td>
            </tr>

        </div>
      </li>
    </table>
    <br>
    <br>
    <br>
    <br>
  </div>
</template>


<script>
import Vue from 'vue'

   export default {
      name: 'Clientes',
      componets:{

      },
  data() {
    return {
        editarProducto: null,
        crearProducto: false,
        nuevoProducto: {},
        productos: [],
    }
  },
  methods: {
      deleteProducto(id, i) {
          fetch("https://creating-rails-5-api-flower.herokuapp.com/productos" + id, {
                  method: "DELETE"
              })
              .then(() => {
                  this.productos.splice(i, 1);
                  console.log("DELETED! xD");
              })
      },
      editProducto(producto) {
          fetch("https://creating-rails-5-api-flower.herokuapp.com/productos" + producto.id, {
                  body: JSON.stringify(producto),
                  method: "PUT",
                  headers: {
                      "Content-Type": "application/json",
                  },
              })
              .then(() => {

                  this.editarProducto = null;
                  console.log("UPDATED! xD");
              })
      },
      newProducto(nuevoProducto){
          fetch("https://creating-rails-5-api-flower.herokuapp.com/productos", {
                  body: JSON.stringify(nuevoProducto),
                  method: "POST",
                  headers: {
                      "Content-Type": "application/json",
                  },
              })
              .then(() => {

                  this.nuevoProducto = {};
                  this.crearProducto = false;
                  fetch("https://creating-rails-5-api-flower.herokuapp.com/productos")
                  .then(response => response.json())
                  .then((data) => {
                      console.log(data);
                      this.productos = data;
                  })
                  console.log("POSTED! xD");
              })
      },
  },
  created() {
      console.log("mounted!");
      fetch("https://creating-rails-5-api-flower.herokuapp.com/productos")
      .then(response => response.json())
      .then((data) => {
          console.log(data);
          this.productos = data;
      })
  },
}
  //  beforeCreate(){

  //  },

</script>

<style>

</style>
