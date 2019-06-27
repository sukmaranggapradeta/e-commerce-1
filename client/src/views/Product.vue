<template>
  <div class="container">
    <div class="row">
      <div>
        <FormEditProduct
          class="center"
          v-if="edit_mode"
          :edit_mode="edit_mode"
          :data_edit="data_edit"
          @cancel_edit="cancel_edit"
          @update_data_after_edit="update_data_after_edit"
        ></FormEditProduct>

        <ProductCard
          v-else
          v-for="product in products"
          :key="product.id"
          :product="product"
          @delete_product="delete_product"
          @update_product="update_product"
          @trigger_edit_page="trigger_edit_page"
        ></ProductCard>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import myServer from '../api/myServer.js'
import ProductCard from '../components/ProductCard'
import FormEditProduct from '../components/FormEditProduct'
// import { truncate } from 'fs'

export default {
  components: {
    ProductCard,
    FormEditProduct
  },
  data () {
    return {
      products: [],
      edit_mode: false,
      data_edit: ''
    }
  },
  methods: {
    update_data_after_edit (data) {
      this.products = this.products.map(el => {
        console.log(el)
        if (el._id === data._id) {
          el.name = data.name
          el.description = data.description
          el.price = data.price
          el.image_url = data.image_url
          el.stock = data.stock
        }
        return el
      })
      this.edit_mode = false
    },
    cancel_edit () {
      this.edit_mode = false
    },
    trigger_edit_page (id) {
      this.edit_mode = true
      this.products.forEach(el => {
        if (el._id === id) {
          this.data_edit = el
        }
      })
      console.log('edit mode', id)
      console.log(this.data_edit)
    },
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
    },
    delete_product (id) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          myServer
            .delete(`/products/${id}`, {
              headers: {
                token: localStorage.getItem('token')
              }
            })
            .then((deleted) => {
              this.products = this.products.filter(el => {
                if (el._id !== deleted.data._id) {
                  return el
                }
              })
              Swal.fire({
                position: 'center',
                type: 'success',
                title: 'Product deleted',
                showConfirmButton: false,
                timer: 1500
              })
            })
            .catch((err) => {
              Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: `${err.response.data.msg}`
              })
            })
        }
      })
    },
    update_product (id) {
      console.log('update_product')
      myServer
        .put(`/products/id`, {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then((updated) => {
          Swal.fire({
            position: 'center',
            type: 'success',
            title: 'content updated',
            showConfirmButton: false,
            timer: 1500
          })
        })
        .catch((err) => {
          Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: `${err.response.data.msg}`
          })
        })
    }
  },
  created () {
    this.fetchDataProducts()
  }
}
</script>
