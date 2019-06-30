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
    countCart: null,
    notifCustomer: 0,
    notifAdmin: 0
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
    setupCountCart (state, payload) {
      state.countCart = payload
    },
    plusCountCart (state) {
      state.countCart++
    },
    minCountCart (state) {
      state.countCart--
    },
    plusNotifCust (state) {
      state.notifCustomer++
    },
    resetNotifCust (state) {
      state.notifCustomer = 0
    },
    addnotifAdmin (state) {
      state.notifAdmin++
    },
    resetCountCart (state) {
      state.countCart = 0
    }
  },
  actions: {

  }
})
