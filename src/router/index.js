import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Clientes from '@/components/Clientes'
import Ordenes from '@/components/Ordenes'
import Productos from '@/components/Productos'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/clientes',
      name: 'Clientes',
      component: Clientes
    },
    {
      path: '/productos',
      name: 'Productos',
      component: Productos
    },
    {
      path: '/ordenes',
      name: 'Ordenes',
      component: Ordenes
    },
  ]
})
