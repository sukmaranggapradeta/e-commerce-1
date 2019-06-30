<template>
  <div class="">
    <CartDetail
      v-if="!checkout_page"
      :myCarts="myCarts"
      :total="total"
      @remove_quantity="remove_quantity"
      @add_quantity="add_quantity"
      @delete_cart="delete_cart"
      @checkout="checkout"
    ></CartDetail>

    <Checkout
      v-if="checkout_page"
      @back_to_cart="back_to_cart"
      :myCarts="myCarts"
      :total="total"
      @resetMyCarts="resetMyCarts"
    ></Checkout>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import myServer from '../api/myServer.js'
import CartDetail from '../components/CartDetail'
import Checkout from '../components/Checkout'
import { platform } from 'os';
import { truncate } from 'fs';

export default {
  props: ['myCarts', 'total'],
  components: {
    CartDetail,
    Checkout
  },
  data () {
    return {
      checkout_page: false
    }
  },
  methods: {
    back_to_cart () {
      this.checkout_page = false
    },
    remove_quantity (payload) {
      this.$emit('remove_quantity', payload)
    },
    add_quantity (payload) {
      this.$emit('add_quantity', payload)
    },
    checkout () {
      this.checkout_page = true
      console.log('checkout')
      console.log(this.myCarts)
      console.log(localStorage.getItem('id'))
      console.log(this.total)
    },
    resetMyCarts() {
      this.$emit('resetMyCarts')
    },
    delete_cart (id) {
      this.$emit('delete_cart', id)
    }
  }
}
</script>

<style scoped>
</style>
