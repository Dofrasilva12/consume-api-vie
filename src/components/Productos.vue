
<template>

 <div id="productos">
 <h2>Clientes</h2>
  <div v-for="(producto, index) in productos" :key="producto.id">
   <p>ID producto: {{producto.id}}</p>
   <p>Nombre: {{producto.nombre_producto}} </p> 
   <p>Precio: {{producto.precio}} </p>
  </div>
 </div>
</template>

<script>
import axios from 'axios'
export default {
  name:'Productos',
 data() {
  return {
   productos: [],
   errors: []
  }
 },
 created() {
  axios.get('https://creating-rails-5-api-flower.herokuapp.com/productos') 
  .then(response => {
   this.productos = response.data
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