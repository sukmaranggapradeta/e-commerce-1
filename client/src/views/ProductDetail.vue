<template>
  <div class="container">
    <div class="row">
      <div>
        <ProductCard
          v-for="product in products"
          :key="product.id"
          :product="product"
          @delete_product="delete_product"
          @update_product="update_product"
          @trigger_edit_page="trigger_edit_page"
          @add_to_cart="add_to_cart"
        ></ProductCard>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import myServer from '../api/myServer.js'
import ProductCard from '../components/ProductCard'

export default {
  components: {
    ProductCard,
  },
  data () {
    return {
      products: [],
    }
  },
  methods: {
    fetchDataProducts () {
      myServer
        .get('/products', {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(({ data }) => {
          this.products = data
        })
        .catch((err) => {
          Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: `${err.response.data}`
          })
        })
    }
  },
  created () {
    this.fetchDataProducts()
  }
}
</script>
