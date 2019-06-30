<template>
  <div class="login">
      <LoginForm
        @fetchDataCarts="fetchDataCarts"
      ></LoginForm>
  </div>
</template>

<script>
import LoginForm from '../components/LoginForm'

export default {
  components: {
    LoginForm
  },
  methods: {
    fetchDataCarts () {
      this.$emit('fetchDataCarts')
    }
  }
}
</script>
