import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ './views/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import(/* webpackChunkName: "register" */ './views/Register.vue')
    },
    {
      path: '/products',
      name: 'products',
      component: () => import(/* webpackChunkName: "products" */ './views/Product.vue')
    },
    {
      path: '/carts',
      name: 'carts',
      component: () => import(/* webpackChunkName: "carts" */ './views/MyCart.vue')
    },
    {
      path: '/transactions',
      name: 'transactions',
      component: () => import(/* webpackChunkName: "transactions" */ './views/MyTransaction.vue')
    },
    {
      path: '/addproduct',
      name: 'addproduct',
      component: () => import(/* webpackChunkName: "addproduct" */ './views/AddProduct.vue')
    }

  ]
})
