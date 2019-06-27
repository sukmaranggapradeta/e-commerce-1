<template>
  <div class="row">
    <div class="col m6 l4 s12 offset-l4 offset-m3">
      <div class="card-panel center">
        <form @submit.prevent="register_button">
          <div class>
            <h5>Register Form</h5>
            <div class="input-field">
              <i class="material-icons prefix">account_circle</i>
              <input
                v-model="register_name"
                type="text"
                id="register_name"
                required
                class="validate"
              >
              <label for="register_name">Name</label>
            </div>
            <div class="input-field">
              <i class="material-icons prefix">email</i>
              <input
                v-model="register_email"
                type="email"
                id="register_email"
                class="validate"
                required
              >
              <label for="register_email">Email</label>
            </div>
            <div class="input-field">
              <i class="material-icons prefix">vpn_key</i>
              <input
                v-model="register_password"
                type="password"
                id="register_password"
                class="validate"
                required
              >
              <label for="register_password">Password</label>
            </div>
            <div class="input-field">
              <i class="material-icons prefix">vpn_key</i>
              <input
                v-model="confirmpassword"
                type="password"
                id="confirmpassword"
                class="validate"
                required
              >
              <label for="confirmpassword">Confirm Password</label>
            </div>
          </div>
          <button class="btn grey darken-3" type="submit">Sign Up</button>
          <p>
            Already have an account?
            <router-link to="/login">Login</router-link>
          </p>
        </form>
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
      register_name: '',
      register_email: '',
      register_password: '',
      confirmpassword: ''
    }
  },
  methods: {
    register_button () {
      if (this.register_password === this.confirmpassword) {
        myServer
          .post('/register', {
            name: this.register_name,
            email: this.register_email,
            password: this.register_password
          })
          .then((newUser) => {
            Swal.fire({
              position: 'center',
              type: 'success',
              title: 'Your Account has active, Please login',
              showConfirmButton: false,
              timer: 1500
            })
            this.$router.push('/login')
            console.log(newUser)
          })
          .catch((err) => {
            console.log(err.response.data.err)
            Swal.fire({
              type: 'error',
              title: 'Oops...',
              text: `${err.response.data.err}`
            })
          })
      } else {
        Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: 'Your password and confirmation password do not match'
        })
      }
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
