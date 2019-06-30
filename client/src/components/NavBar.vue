<template>
  <div class="navbar-fixed">
    <nav>
      <div class="nav-wrapper grey darken-4">
        <div id="logonavbar" class="left">
          <router-link to="/" class="brand-logo">
            <i class="material-icons">local_drink</i>CoffeeMe
         </router-link>
          <a href="#" data-target="mobile-demo" class="sidenav-trigger">
            <i class="material-icons">menu</i>
          </a>
          <ul class="sidenav" id="mobile-demo">
            <li v-if="isLogin && !isAdmin">
              <a @click.prevent="logout">
                <i class="material-icons">shopping_cart</i>
              </a>
            </li>
          </ul>
        </div>
        <div id="menunavbar" class>
          <ul class="right hide-on-med-and-down">
            <li v-if="isLogin && !isAdmin">
              <router-link to="/carts">
                <i class="material-icons left">shopping_cart</i>{{ countCart }}
              </router-link>
            </li>
            <li v-if="false">
              <router-link to="/orders">
                <i class="material-icons left">notifications</i>{{ notifCustomer }} cust
              </router-link>
            </li>
            <li v-if="false">
              <router-link to="/transactions">
                <i class="material-icons left">notifications</i>{{ notifAdmin }} admin
              </router-link>
            </li>
            <li v-if="!isLogin">
              <router-link to="/login">
                <i class="material-icons left">account_circle</i>Login
              </router-link>
            </li>
            <li v-if="!isLogin">
              <router-link to="/register">
                <i class="material-icons left">assignment_ind</i>Register
              </router-link>
            </li>
            <li v-if="isLogin">
              <router-link to="/transactions">
                <i class="material-icons right">face</i>{{ userName }}
              </router-link>
            </li>
            <li v-if="isLogin">
              <router-link id="logout_link" to="/logout" @click.native="logout()"><i class="material-icons right">last_page</i>Logout</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <!-- <div class>
      <div class="fixed-action-btn">
        <a class="btn-floating btn-large red">
          <i class="large material-icons">menu</i>
        </a>
        <ul>
          <li v-if="isLogin && !isAdmin">
            <a class="btn-floating red">
              <i class="material-icons">shopping_cart</i>
            </a>
          </li>
          <li v-if="!isLogin">
            <router-link to="/login" class="btn-floating green"></router-link>
          </li>
          <li v-if="!isLogin">
            <a class="btn-floating green">
              <i class="material-icons">assignment_ind</i>
            </a>
          </li>
          <li v-if="isLogin">
            <router-link to="/login" @click="logout" class="btn-floating green"><i class="material-icons">last_page</i>Logout</router-link>
          </li>
        </ul>
      </div>
    </div> -->
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState([
      'isLogin',
      'isAdmin',
      'userName',
      'countCart',
      'notifCustomer',
      'notifAdmin'
    ])
  },
  methods: {
    logout () {
      console.log('logout')
      this.$store.commit('userLogout')
      localStorage.removeItem('token')
      localStorage.removeItem('id')
      localStorage.removeItem('name')
      localStorage.removeItem('email')
      localStorage.removeItem('role')
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
li {
  font-family: 'Fira Sans Extra Condensed', sans-serif;
}
.brand-logo {
font-family: 'Oleo Script Swash Caps', cursive;
}
#logonavbar {
  margin-left: 40px;
}
#menunavbar {
  margin-right: 40px;
}
:root {
  --mainColor: #ff9800;
}

body {
  align-items: center;
  display: flex;
  font-family: "Montserrat", sans-serif;
  font-size: 2em;
  height: 100vh;
  justify-content: center;
}

a:hover {
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg id='squiggle-link' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:ev='http://www.w3.org/2001/xml-events' viewBox='0 0 20 4'%3E%3Cstyle type='text/css'%3E.squiggle{animation:shift .3s linear infinite;}@keyframes shift {from {transform:translateX(0);}to {transform:translateX(-20px);}}%3C/style%3E%3Cpath fill='none' stroke='%23ff9800' stroke-width='2' class='squiggle' d='M0,3.5 c 5,0,5,-3,10,-3 s 5,3,10,3 c 5,0,5,-3,10,-3 s 5,3,10,3'/%3E%3C/svg%3E");
  background-position: 0 100%;
  background-size: auto 6px;
  background-repeat: repeat-x;
  text-decoration: none;
}
</style>
