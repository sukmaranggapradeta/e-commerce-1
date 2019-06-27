<template>
<div class="col s12 m6">
  <div class="card hoverable">
    <div class="card-image">
      <img :src="product.image_url ? product.image_url : 'https://lh3.googleusercontent.com/zV-y-t47LGjNh-WuN90jHDMnB1ifHmgy59Ab65HITNzJpMFX3zr1MiCPJwKyriEP-pXOzRY3=w1080-h608-p-no-v0'">
      <span class="card-title">{{ product.name }}</span>
      <span v-if="!isAdmin" class="btn-floating halfway-fab waves-effect waves-light red">
        <i class="material-icons">add_shopping_cart</i>
      </span>
    </div>
    <div class="card-content">
      {{product }}
      <p>{{ product.description }}</p>
    </div>
    <div v-if="isAdmin" class="card-action">
      <div class="col s6 m6 l6">
        <span @click="trigger_edit_page(product._id)" class="btn orange lighten-2"><i class="material-icons left">edit</i>EDIT</span>
      </div>
      <div class="">
        <span @click="delete_product(product._id)" class="btn red darken-1"><i class="material-icons right">delete_forever</i>DELETE</span>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: ['product'],
  computed: {
    ...mapState([
      'isAdmin'
    ])
  },
  methods: {
    delete_product (id) {
      this.$emit('delete_product', id)
    },
    trigger_edit_page (id) {
      this.$emit('trigger_edit_page', id)
    }
  }
}
</script>

<style scoped>
.card-image img{
  height: 100%;
}
</style>
