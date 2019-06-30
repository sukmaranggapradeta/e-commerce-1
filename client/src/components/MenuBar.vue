<template>
  <div>
    <div class="row container">
      <div v-if="!isAdmin" class="row">
        <ul class="tabs">
          <li class="tab col col s12 m3 l3">
            <router-link to="/">HOME</router-link>
          </li>
          <li v-if="isLogin" class="tab col s12 m3 l3">
            <router-link to="/products">PRODUCT</router-link>
          </li>
          <li v-if="isLogin" class="tab col s12 m3 l3">
            <router-link to="/carts">MY CART</router-link>
          </li>
          <li v-if="isLogin" class="tab col s12 m3 l3">
            <router-link to="/orders">MY ORDERS</router-link>
          </li>
        </ul>
      </div>

      <div v-if="isAdmin" class="row">
        <div class="col s12 m4 l4">
          <div class="link-7 menulink">
          <router-link to="/addproduct">
              <span class="thin">ADD</span>
              <span class="thick">PRODUCT</span>
          </router-link>
          </div>
        </div>
        <div class="col s12 m4 l4">
          <div class="link-7 menulink">
          <router-link to="/products">
              <span class="thin">PRO</span>
              <span class="thick">DUCTS</span>
          </router-link>
          </div>
        </div>
        <div class="col s12 m4 l4">
          <div class="link-7 menulink">
          <router-link to="/transactions">
              <span class="thin">TRAN</span>
              <span class="thick">SACTIONS</span>
          </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['isAdmin', 'isLogin'])
  },
  data () {
    return {}
  }
}
</script>

<style scoped>
:root {
  --mainColor: #ff9800;
}
.thin {
  font-weight: 300;
}
.thick {
  font-weight: 900;
}

a {
  text-transform: uppercase;
  font-size: 20px;
  color: #434343;
  text-decoration: none;
  position: relative;
  display: block;
}

p {
  font-weight: 100;
  font-size: 80%;
  margin: 1px;
}

[class^="link-"] {
  display: inline-block;
  margin: 1em;
}

/* linkseven */
.link-7 a:before {
  content: "";
  border-bottom: solid 1px #d9534f;
  position: absolute;
  bottom: 0;
  left: 30%;
  width: 0;
  -webkit-transform: scale(0);
  -moz-transform: scale(0);
  -ms-transform: scale(0);
  -o-transform: scale(0);
  transform: scale(0);
}

.link-7 a:hover:before {
  border-bottom: solid thin #d9534f;
  width: 40%;
  -webkit-animation: heartbeat-x 1.7s infinite ease-in;
  animation: heartbeat-x 1.7s infinite ease-in;
}

.link-7 a:hover {
  -webkit-animation: heartbeat 1.7s infinite ease-in;
  animation: heartbeat 1.7s infinite ease-in;
}

@-webkit-keyframes heartbeat {
  0% {
    -webkit-transform: scale(1);
  }
  10% {
    -webkit-transform: scale(1.1);
  }
  20% {
    -webkit-transform: scale(1);
  }
  30% {
    -webkit-transform: scale(1.1);
  }
  40% {
    -webkit-transform: scale(1);
  }
}

@-webkit-keyframes heartbeat-x {
  0% {
    -webkit-transform: scaleX(0);
  }
  10% {
    -webkit-transform: scaleX(1);
  }
  20% {
    -webkit-transform: scaleX(0);
  }
  30% {
    -webkit-transform: scaleX(1);
  }
  40% {
    -webkit-transform: scaleX(0);
  }
}

@keyframes heartbeat {
  0% {
    transform: scale(1);
  }
  10% {
    transform: scale(1.1);
  }
  20% {
    transform: scale(1);
  }
  30% {
    transform: scale(1.1);
  }
  40% {
    transform: scale(1);
  }
}

@keyframes heartbeat-x {
  0% {
    transform: scaleX(0);
  }
  10% {
    transform: scaleX(1);
  }
  20% {
    transform: scaleX(0);
  }
  30% {
    transform: scaleX(1);
  }
  40% {
    transform: scaleX(0);
  }
}
/* a:hover {
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg id='squiggle-link' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:ev='http://www.w3.org/2001/xml-events' viewBox='0 0 20 4'%3E%3Cstyle type='text/css'%3E.squiggle{animation:shift .3s linear infinite;}@keyframes shift {from {transform:translateX(0);}to {transform:translateX(-20px);}}%3C/style%3E%3Cpath fill='none' stroke='%23ff9800' stroke-width='2' class='squiggle' d='M0,3.5 c 5,0,5,-3,10,-3 s 5,3,10,3 c 5,0,5,-3,10,-3 s 5,3,10,3'/%3E%3C/svg%3E");
  background-position: 0 100%;
  background-size: auto 6px;
  background-repeat: repeat-x;
  text-decoration: none;
} */
</style>
