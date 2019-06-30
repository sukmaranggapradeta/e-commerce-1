<template>
  <div class="container center">
    <div class v-if="myCarts.length == 0">
      <!-- <h1>EMPTY CART</h1> -->
      <div class="center">
        <img id="emptycart" src="../../public/empty-cart.png" alt="empty cart" />
      </div>
    </div>
    <table v-else id="cart" class="table table-hover table-condensed">
      <thead>
        <tr>
          <th style="width:40%">Product</th>
          <th style="width:15%">Price</th>
          <th style="width:10%" class="center">Quantity</th>
          <th style="width:25%" class="center">Subtotal</th>
          <th style="width:10%"></th>
        </tr>
      </thead>
      <!-- CART LIST -->
      <tbody>
        <tr v-for="(myCart, index) in myCarts" :key="index">
          <td data-th="Product">
            <div class="row">
              <div class="col s5 hidden-xs">
                <img :src="myCart.product.image_url" alt="product image" />
              </div>
              <div class="col s10">
                <span class="nomargin">{{ myCart.product.name }}</span>
              </div>
            </div>
          </td>
          <td data-th="Price">IDR {{ rupiah(myCart.product.price) }}</td>
          <td data-th="Quantity">
            <div class="col center">
              <div class="row">
                <span @click="remove_quantity(myCart._id, myCart.quantity)">
                  <i class="material-icons red-text">remove</i>
                </span>
              </div>
              <div class="row">{{ myCart.quantity }}</div>
              <div class="row">
                <span @click="add_quantity(myCart._id, myCart.quantity)">
                  <i class="material-icons green-text">add</i>
                </span>
              </div>
            </div>
          </td>
          <td
            data-th="Subtotal"
            class="center"
          >IDR {{ rupiah(myCart.quantity * myCart.product.price) }}</td>
          <td class="actions center" data-th>
            <button @click="delete_cart(myCart._id)" class="btn red darken-1">
              <i class="material-icons">delete_forever</i>
            </button>
          </td>
        </tr>
      </tbody>
      <!-- SUB TOTAL -->
      <tfoot>
        <tr>
          <td>
            <span @click="continue_shopping" class="waves-effect waves-light btn">
              <i class="material-icons left">navigate_before</i>
              Continue Shopping
            </span>
          </td>
          <td colspan="2" class></td>
          <td class>
            <strong>Total IDR {{ rupiah(total) }}</strong>
          </td>
          <td>
            <span @click="checkout" class="waves-effect waves-light btn">
              <i class="material-icons right"></i>
              Checkout
            </span>
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState([
      'isAdmin'
    ])
  },
  props: ['myCarts', 'total'],
  methods: {
    remove_quantity (id, beforeQuantity) {
      this.$emit('remove_quantity', { id, beforeQuantity })
    },
    add_quantity (id, beforeQuantity) {
      // console.log('add quantity trigger cart detail')
      this.$emit('add_quantity', { id, beforeQuantity })
    },
    continue_shopping () {
      this.$router.push('/products')
    },
    delete_cart (id) {
      this.$emit('delete_cart', id)
    },
    rupiah (value) {
    //   this.$emit('rupiah', value)
      let newString = String(value)
      let count = 0
      let ubah = ''
      for (let i = newString.length - 1; i >= 0; i--) {
        if (count === 3) {
          ubah = '.' + ubah
          count = 0
        }
        ubah = newString[i] + ubah
        count++
      }
      return ubah
    },
    checkout () {
      this.$emit('checkout')
    }
  }
}
</script>

<style scope>
th, td, h1 {
  font-family: 'B612 Mono', monospace;
}
#emptycart {
  width: 50%;
}
img {
  width: 150px;
}
span {
  cursor: pointer;
}
</style>
