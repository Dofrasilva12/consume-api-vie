<template>
<div class="scrolling-wrapper">
  <table class="table table-bordered">
            <thead class="thead-dark">
              <tr>
                  <th>Clientes</th>
              </tr>
              <tr>
                    <div v-if="crearCliente">
                          <input placeholder="nombre_cliente" v-model="nuevoCliente.nombre_cliente"/>
                          <input placeholder="rfc" v-model="nuevoCliente.rfc"/>

                          <button type="button" class="btn btn-outline-success border" v-on:click="newCliente(nuevoCliente)">Guardar</button>
                    </div>
                    <div v-else>
                          <button type="button" class="btn btn-outline-primary border" style="float: left" v-on:click="crearCliente = true">Agregar Nuevo</button>
                    </div>
              </tr>
            </thead>
      <li v-for="(producto, i) in clientes" v-bind:index="i" v-bind:key="producto.id">
        <div class="scrolling-wrapper" style="float: left">

            <tr>
                <td style="float: left">
                    <div v-if="editarCliente === producto.id" class="scrolling-wrapper">
                          <input v-on:keyup.13="editCliente(cliente.nombre_cliente)" v-model="nuevoCliente.nombre_cliente"/>
                          <input v-on:keyup.13="editCliente(cliente.rfc)" v-model="nuevoCliente.rfc"/>
           
                          <button type="button" class="btn btn-outline-success border" v-on:click="editCliente(cliente)">Guardar</button>
                    </div>
                    <div v-else class="scrolling-wrapper font-weight-bold">
                        <button type="button" class="btn btn-outline-success border" style="float: left" v-on:click="editarCliente = cliente.id"> Editar </button>
                        <button type="button" class="btn btn-outline-success border" style="float: left" v-on:click="deleteCliente(cliente.id)"> Eliminar </button>
                        {{cliente}}
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
        editarCliente: null,
        crearCliente: false,
        nuevoCliente: {},
        clientes: [],
    }
  },
  methods: {
      deleteCliente(id, i) {
          fetch("https://creating-rails-5-api-flower.herokuapp.com/clientes" + id, {
                  method: "DELETE"
              })
              .then(() => {
                  this.clientes.splice(i, 1);
                  console.log("DELETED! xD");
              })
      },
      editCliente(cliente) {
          fetch("https://creating-rails-5-api-flower.herokuapp.com/clientes" + cliente.id, {
                  body: JSON.stringify(cliente),
                  method: "PUT",
                  headers: {
                      "Content-Type": "application/json",
                  },
              })
              .then(() => {

                  this.editarCliente = null;
                  console.log("UPDATED! xD");
              })
      },
      newCliente(nuevoCliente){
          fetch("https://creating-rails-5-api-flower.herokuapp.com/clientes", {
                  body: JSON.stringify(nuevoCliente),
                  method: "POST",
                  headers: {
                      "Content-Type": "application/json",
                  },
              })
              .then(() => {

                  this.nuevoCliente = {};
                  this.crearCliente = false;
                  fetch("https://creating-rails-5-api-flower.herokuapp.com/clientes")
                  .then(response => response.json())
                  .then((data) => {
                      console.log(data);
                      this.clientes = data;
                  })
                  console.log("POSTED! xD");
              })
      },
  },
  created() {
      console.log("mounted!");
      fetch("https://creating-rails-5-api-flower.herokuapp.com/clientes")
      .then(response => response.json())
      .then((data) => {
          console.log(data);
          this.clientes = data;
      })
  },
}
  //  beforeCreate(){

  //  },

</script>

<style>

</style>
