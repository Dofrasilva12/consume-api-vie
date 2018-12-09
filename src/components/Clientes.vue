<template>

 <div id="clientes">
 <h2>Clientes</h2>
  <div v-for="(cliente, index) in clientes" :key="cliente.id">
   <p>ID cliente: {{cliente.id}}</p>
   <p>Nombre: {{cliente.nombre_cliente}} </p> 
   <p>RFC: {{cliente.rfc}} </p>
  </div>
 </div>
</template>

<script>
import axios from 'axios'
export default {
  name:'Clientes',
 data() {
  return {
   clientes: [],
   errors: []
  }
 },
 created() {
  axios.get('https://creating-rails-5-api-flower.herokuapp.com/clientes') 
  .then(response => {
   this.clientes = response.data
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