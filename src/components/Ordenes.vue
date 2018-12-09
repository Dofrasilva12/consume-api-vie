
<template>
<div class="scrolling-wrapper">
  <table class="table table-bordered">
            <thead class="thead-dark">
              <tr>
                  <th>ORDENES</th>
              </tr>
              <tr>
                    <div v-if="crearOrden">
                          <input placeholder="numero_orden" v-model="nuevoOrden.numero_orden"/>
                          <input placeholder="fecha" v-model="nuevoOrden.fecha"/>

                          <input placeholder="cliente id" v-model="nuevoOrden.cliente_id"/>
                          <input placeholder="producto id" v-model="nuevoOrden.producto_id"/>

                          <input placeholder="cantidad" v-model="nuevoOrden.cantidad"/>
                          <input placeholder="precio_venta" v-model="nuevoOrden.precio_venta"/>

                          <button type="button" class="btn btn-outline-success border" v-on:click="newOrden(nuevoOrden)">Guardar</button>
                    </div>
                    <div v-else>
                          <button type="button" class="btn btn-outline-primary border" style="float: left" v-on:click="crearOrden = true">Agregar Nuevo</button>
                    </div>
              </tr>
            </thead>
      <li v-for="(orden, i) in ordenes" v-bind:index="i" v-bind:key="orden.id">
        <div class="scrolling-wrapper" style="float: left">

            <tr>
                <td style="float: left">
                    <div v-if="editarOrden === orden.id" class="scrolling-wrapper">
                          <input v-on:keyup.13="editOrden(orden.numero_orden)" v-model="orden.numero_orden"/>
                          <input v-on:keyup.13="editOrden(orden.fecha)" v-model="orden.fecha"/>
                          <input v-on:keyup.13="editOrden(orden.cliente_id)" v-model="nuevoOrden.cliente_id"/>
                          <input v-on:keyup.13="editOrden(orden.producto_id)" v-model="nuevoOrden.producto_id"/>
                          <input v-on:keyup.13="editOrden(orden.cantidad)" v-model="nuevoOrden.cantidad"/>
                          <input v-on:keyup.13="editOrden(orden.precio_venta)" v-model="nuevoOrden.precio_venta"/>
                          <button type="button" class="btn btn-outline-success border" v-on:click="editOrden(orden)">Guardar</button>
                    </div>
                    <div v-else class="scrolling-wrapper font-weight-bold">
                        <button type="button" class="btn btn-outline-success border" style="float: left" v-on:click="editarOrden = orden.id"> Editar </button>
                        <button type="button" class="btn btn-outline-success border" style="float: left" v-on:click="deleteOrden(orden.id)"> Eliminar </button>
                        {{orden}}
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
        editarOrden: null,
        crearOrden: false,
        nuevoOrden: {},
        ordenes: [],
    }
  },
  methods: {
      deleteOrden(id, i) {
          fetch("https://creating-rails-5-api-flower.herokuapp.com/ordenes" + id, {
                  method: "DELETE"
              })
              .then(() => {
                  this.ordenes.splice(i, 1);
                  console.log("DELETED! xD");
              })
      },
      editOrden(orden) {
          fetch("https://creating-rails-5-api-flower.herokuapp.com/ordenes" + orden.id, {
                  body: JSON.stringify(orden),
                  method: "PUT",
                  headers: {
                      "Content-Type": "application/json",
                  },
              })
              .then(() => {

                  this.editarOrden = null;
                  console.log("UPDATED! xD");
              })
      },
      newOrden(nuevoOrden){
          fetch("https://creating-rails-5-api-flower.herokuapp.com/ordenes", {
                  body: JSON.stringify(nuevoOrden),
                  method: "POST",
                  headers: {
                      "Content-Type": "application/json",
                  },
              })
              .then(() => {

                  this.nuevoOrden = {};
                  this.crearOrden = false;
                  fetch("https://creating-rails-5-api-flower.herokuapp.com/ordenes")
                  .then(response => response.json())
                  .then((data) => {
                      console.log(data);
                      this.ordenes = data;
                  })
                  console.log("POSTED! xD");
              })
      },
  },
  created() {
      console.log("mounted!");
      fetch("https://creating-rails-5-api-flower.herokuapp.com/ordenes")
      .then(response => response.json())
      .then((data) => {
          console.log(data);
          this.ordenes = data;
      })
  },
}
  //  beforeCreate(){

  //  },

</script>

<style>

</style>