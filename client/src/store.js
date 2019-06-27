import Vue from 'vue'
import Vuex from 'vuex'
// import { stat } from 'fs';
// import Swal from 'sweetalert'
// import myServer from './api/myServer.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    isAdmin: false,
    userName: '',
    cart: []
  },
  mutations: {
    userLogin (state) {
      state.isLogin = true
      state.userName = localStorage.getItem('name')
      if (localStorage.getItem('role') === 'admin') {
        state.isAdmin = true
      } else {
        state.isAdmin = false
      }
    },
    userLogout (state) {
      state.isLogin = false
      state.isAdmin = false
    },
    addToCart (state, data) {
      state.cart.push(data)
    }
  },
  actions: {

  }
})
