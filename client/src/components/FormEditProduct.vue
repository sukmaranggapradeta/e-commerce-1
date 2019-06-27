<template>
  <div class="card">
    <div v-if="loading">
      <div class="progress">
        <div class="indeterminate"></div>
      </div>
      <h1>L.O.A.D.I.N.G.</h1>
    </div>
    <div v-if="form_edit_page" class="">
      <form @submit.prevent="edit_product" class="col s12">
        <div class="row">
          <div id="inputtop" class="center">
            <div class="input-field col s12">
              <i class="material-icons prefix">N</i>
              <input v-model="edit_product_name" ref="product_name" id="icon_prefix" type="text" class="validate">
              <label class="active" for="icon_prefix">Name</label>
            </div>
          </div>
          <div class="center">
            <div class="input-field col s12">
              <i class="material-icons prefix">D</i>
              <textarea v-model="edit_product_description" id="textarea1" class="materialize-textarea"></textarea>
              <label class="active" for="textarea1">Description</label>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <div class="left">
                <div class="input-field col s12">
                  <i class="material-icons prefix">P</i>
                  <input v-model="edit_product_price" id="product_price" type="number" class="validate">
                  <label class="active" for="product_price">Price</label>
                </div>
              </div>
              <div class="left">
                <div class="input-field col s12">
                  <i class="material-icons prefix">S</i>
                  <input v-model="edit_product_stock" id="product_stock" type="number" class="validate">
                  <label class="active" for="product_stock">Stock</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col l6 m6">
            <div class="file-field input-field">
              <div class="btn grey darken-3">
                <i class="material-icons right">image</i>
                <span>Change Image</span>
                <input type="file" ref="file" v-on:change="handleFileUpload()">
              </div>
              <div class="">
                <input class="file-path validate" type="text">
              </div>
            </div>
          </div>
          <div class="col l6 m6">
            <div class="center edit-image">
              <img id="imagetemp" :src="edit_urlTemp" alt>
            </div>
          </div>
        </div>
        <div v-if="edit_mode" class="center row">
          <div class="col">
            <button @click.prevent="cancel_edit" class="btn waves-effect waves-light" type="submit" name="action">
              CANCEL
              <i class="material-icons left">settings_backup_restore</i>
            </button>
          </div>
          <div class="col">
            <button @click.prevent="edit_product" class="btn waves-effect waves-light" type="submit" name="action">
              UPDATE PRODUCT
              <i class="material-icons right">edit</i>
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import myServer from '../api/myServer.js'

export default {
  props: ['edit_mode', 'data_edit'],
  data () {
    return {
      loading: false,
      form_edit_page: true,
      edit_product_name: this.data_edit.name,
      edit_product_description: this.data_edit.description,
      edit_product_price: this.data_edit.price,
      edit_product_stock: this.data_edit.stock,
      file: '',
      edit_urlTemp: this.data_edit.image_url
    }
  },
  methods: {
    cancel_edit () {
      this.$emit('cancel_edit')
    },
    edit_product () {
      this.loading = true
      this.form_edit_page = false
      if (this.edit_product_name === '') {
        Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: `Please fill product name`
        })
        this.loading = false
        this.form_edit_page = true
      } else if (this.edit_product_description === '') {
        Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: `Please fill product description`
        })
        this.loading = false
        this.form_edit_page = true
      } else if (this.edit_product_price === '') {
        Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: `Please fill product price`
        })
        this.loading = false
        this.form_edit_page = true
      } else if (this.edit_product_stock === '') {
        Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: `Please fill product stock`
        })
        this.loading = false
        this.form_edit_page = true
      } else if (this.data_edit.image_url === this.edit_urlTemp) {
        console.log('foto sama')
        this.update_product(this.urlTemp)
      } else {
        console.log('foto beda')
        let formData = new FormData()
        formData.append('image', this.file)
        myServer
          .post(`/products/image/upload`, formData, {
            headers: {
              token: localStorage.getItem('token'),
              'Content-Type': 'multipart/form-data'
            }
          })
          .then(({ data }) => {
            this.update_product(data)
          })
          .catch(err => {
            Swal.fire({
              type: 'error',
              title: 'Oops...',
              text: `${err.response.data.message}`
            })
          })
      }
    },
    update_product (imageUrl) {
      myServer
        .put(`/products/${this.data_edit._id}`, {
          name: this.edit_product_name,
          description: this.edit_product_description,
          image_url: imageUrl,
          price: this.edit_product_price,
          stock: this.edit_product_stock
        }, {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(({ data }) => {
          Swal.fire({
            position: 'center',
            type: 'success',
            title: `${data.name} success updated`,
            showConfirmButton: false,
            timer: 1500
          })
          this.edit_product_name = ''
          this.edit_product_description = ''
          this.product_image = ''
          this.edit_product_price = ''
          this.edit_product_stock = ''
          this.file = ''
          this.edit_urlTemp = ''
          this.loading = false
          this.form_edit_page = true
          this.update_data_after_edit(data)
        })
        .catch((err) => {
          Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: `${err.response.data.message}`
          })
          this.loading = false
          this.form_edit_page = true
        })
    },
    update_data_after_edit (data) {
      this.$emit('update_data_after_edit', data)
    },
    handleFileUpload () {
      this.file = this.$refs.file.files[0]
      const file = this.$refs.file.files[0]
      this.edit_urlTemp = URL.createObjectURL(file)
    }
  }
}
</script>

<style scoped>
#buttonaddproduct {
  padding: 20px;
}
#inputtop {
  padding-top: 20px;
}
#imagetemp{
  height: 100%;
  width: 100%;
}
</style>
