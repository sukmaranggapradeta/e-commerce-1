<template>
  <div class="container">
    <div class="card">
      <div class="row">
        <div class="col s12 m12 l12">
          <i class="material-icons large">local_shipping</i>
        </div>
        <div class="col s12 m12 l12">
          <h4>Delivery Address</h4>
        </div>
        <div class="container">
          <form @submit.prevent="order" class="col s12 m12 l12">
            <div class="row">
              <div class="input-field col s12 m12 l12">
                <i class="material-icons prefix">home</i>
                <textarea v-model="input_address" id="textarea2" class="materialize-textarea" data-length="250" required></textarea>
                <label for="textarea2">Address</label>
              </div>
              <div class="input-field col s12 m12 l12">
                <i class="material-icons prefix">phone</i>
                <input v-model="input_phone" id="icon_telephone" type="text" class="validate" required/>
                <label for="icon_telephone">Telephone</label>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div class="row">
        <div class="col s12 m12 l12">
          <i class="material-icons large">payment</i>
        </div>
        <div class="col s12 m12 l12">
          <h4>Payment</h4>
        </div>
        <div class="container">
          <p>
            <label>
              <input type="checkbox" checked="checked" />
              <span>Cash On Delivery</span>
            </label>
          </p>
        </div>
      </div>
      <div class="row">
        <div class="col s6 m6 l6">
          <span @click="back_to_cart" class="waves-effect waves-light btn">
            <i class="material-icons left">navigate_before</i>
            Back
          </span>
        </div>
        <div class="col s6 m6 l6">
          <span @click="order" class="waves-effect waves-light btn">
            <i class="material-icons right">navigate_next
            </i>ORDER
          </span>
        </div>
      </div>
      <br>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import myServer from '../api/myServer.js'

// import { truncate } from 'fs'
export default {
  props: ['myCarts', 'total'],
  data () {
    return {
      payment_setup: true,
      address_setup: false,
      send_order: false,
      input_address: '',
      input_phone: ''
    }
  },
  methods: {
    order () {
      // console.log('order')
      if (!this.input_address || !this.input_phone) {
        Swal.fire({
          type: 'info',
          title: 'Oops...',
          text: `Please complete the delivery address from`
        })
      } else {
        let custCarts = []
        this.myCarts.forEach(element => {
          custCarts.push([
            {
              product: {
                id: element.product._id,
                name: element.product.name,
                price: element.product.price,
                image_url: element.product.image_url
              },
              quantity: element.quantity
            }
          ])
        })
        myServer
          .post('/transactions', {
            cartItem: custCarts,
            customer: localStorage.getItem('id'),
            total: this.total,
            address: this.input_address,
            phone: this.input_phone
          }, {
            headers: {
              token: localStorage.getItem('token')
            }
          })
          .then(({ data }) => {
            // console.log('transaction=========')
            // console.log(data.customer === localStorage.getItem('id'))
            return myServer
              .delete(`/carts/all/${data.customer}`, {
                headers: {
                  token: localStorage.getItem('token')
                }
              })
              .then((Response) => {
                // console.log('response -----------------')
                // console.log(Response)
                this.$store.commit('resetCountCart')
                this.$emit('resetMyCarts')
                this.$router.push('/thanks')
              })
          })
          .catch((err) => {
            // console.log(err)
            Swal.fire({
              type: 'error',
              title: 'Oops...',
              text: `${err}`
            })
          })
      }
    },
    back_to_cart () {
      this.$emit('back_to_cart')
    }
  }
}
</script>

<style>
</style>
