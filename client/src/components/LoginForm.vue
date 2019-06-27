<template>
  <div class="">
    <div class="row">
      <div class="col m6 l4 s12 offset-l4 offset-m3">
        <div class="card-panel center">
          <form @submit.prevent="login_button">
            <div class>
              <h5>Login Form</h5>
              <div class="input-field">
                <i class="material-icons prefix">email</i>
                <input
                  type="email"
                  v-model="login_email"
                  id="login_email"
                  class="validate"
                  required
                >
                <label for="login_email">Email</label>
              </div>
              <div class="input-field">
                <i class="material-icons prefix">vpn_key</i>
                <input type="password" v-model="login_password" id="login_password">
                <label for="login_password">Password</label>
              </div>
            </div>
            <button class="btn grey darken-3" type="submit">Sign In</button>
            <p>
              Not a member?
              <router-link to="/register">Register</router-link>
            </p>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import myServer from '../api/myServer.js'

export default {
  data () {
    return {
      login_email: '',
      login_password: ''
    }
  },
  methods: {
    login_button () {
      // console.log('login button trigger')
      myServer
        .post('/login', {
          email: this.login_email,
          password: this.login_password
        })
        .then((user) => {
          localStorage.setItem('token', user.data.token)
          localStorage.setItem('id', user.data.id)
          localStorage.setItem('name', user.data.name)
          localStorage.setItem('email', user.data.email)
          localStorage.setItem('role', user.data.role)
          this.$store.commit('userLogin')
          this.$router.push('/')
          Swal.fire({
            position: 'center',
            type: 'success',
            title: `welcome ${user.data.name}`,
            showConfirmButton: false,
            timer: 1500
          })
        })
        .catch((err) => {
          Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: `${err.response.data.message}`,
            footer: '<a href>forget username/password?</a>'
          })
        })
    }
  }
}
</script>

<style scoped>
a:hover {
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg id='squiggle-link' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:ev='http://www.w3.org/2001/xml-events' viewBox='0 0 20 4'%3E%3Cstyle type='text/css'%3E.squiggle{animation:shift .3s linear infinite;}@keyframes shift {from {transform:translateX(0);}to {transform:translateX(-20px);}}%3C/style%3E%3Cpath fill='none' stroke='%23ff9800' stroke-width='2' class='squiggle' d='M0,3.5 c 5,0,5,-3,10,-3 s 5,3,10,3 c 5,0,5,-3,10,-3 s 5,3,10,3'/%3E%3C/svg%3E");
  background-position: 0 100%;
  background-size: auto 6px;
  background-repeat: repeat-x;
  text-decoration: none;
}
</style>
