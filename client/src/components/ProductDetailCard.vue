<template>
  <div id="#detailproduct" class="container">
  <div class="col s12 m12 l12">
    <div class="card horizontal">
      <div class="card-image">
        <img :src="productDetail.image_url">
      </div>
      <div class="card-stacked">
        <div class="card-content">
          <h5>{{ productDetail.name }}</h5>
          <p>{{ productDetail.description }}</p>
          <h6>IDR {{ rupiah(productDetail.price) }}</h6>
        </div>
        <div class="card-action">
          <router-link :to="'/products/'" >HIDE</router-link>
        </div>
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
      productDetail: ''
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
          data.forEach(element => {
            if (element._id === this.$route.params.id) {
              this.productDetail = element
            }
          })
        })
        .catch((err) => {
          Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: `${err.response.data}`
          })
        })
    },
    rupiah (value) {
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
    }
  },
  created () {
    this.fetchDataProducts()
  },
  watch: {
    $route () {
      this.fetchDataProducts()
    }
  }
}
</script>

<style>
</style>
