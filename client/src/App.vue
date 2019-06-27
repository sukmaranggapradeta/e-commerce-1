<template>
  <div id="app">
    <NavBar></NavBar>
    <MenuBar></MenuBar>
    <router-view/>
    <Footer></Footer>
  </div>
</template>
<script>
import NavBar from './components/NavBar'
import MenuBar from './components/MenuBar'
import Footer from './components/Footer'

export default {
  components: {
    NavBar,
    MenuBar,
    Footer
  },
  data () {
    return {
    }
  },
  created () {
    if (localStorage.getItem('token')) {
      this.$store.commit('userLogin')
    } else {
      this.$router.push('/login')
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

</style>
