<template>

 <div id="ordenes">
 <h2>Clientes</h2>
  <div v-for="(orden, index) in ordenes" :key="orden.id">

   <p>ID cliente: {{orden.cliente_id}}</p>
   <p>ID prodcuto: {{orden.producto_id}}</p>
   <p>Num. orden: {{orden.numero_orden}} </p> 
   <p>Fecha: {{orden.fecha}} </p>
   <p>Precio venta: {{orden.precio_venta}} </p>
  </div>
 </div>
</template>

<script>
import axios from 'axios'
export default {
  name:'Ordenes',
 data() {
  return {
   ordenes: [],
   errors: []
  }
 },
 created() {
  axios.get('https://creating-rails-5-api-flower.herokuapp.com/ordenes') 
  .then(response => {
   this.ordenes = response.data
  })
 .catch(e => {
  this.error.push(e)
  })
 },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>