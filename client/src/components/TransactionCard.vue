<template>
  <div class>
    <div class="row">
      <div class="card">
        <div class="col s12 m3 l3 valign-wrapper">
          <div class="card-action">
            <span class="link" @click="selectStatus('')">SEMUA PESANAN</span>
          </div>
        </div>
        <div class="col s12 m3 l3 valign-wrapper">
          <div class="card-action">
            <span class="link" @click="selectStatus('PESANAN DIPROSES')">PESANAN DIPROSES</span>
          </div>
        </div>
        <div class="col s12 m3 l3 valign-wrapper">
          <div class="card-action center-align">
            <span class="link" @click="selectStatus('PESANAN DIKIRIM')">PESANAN DIKIRIM</span>
          </div>
        </div>
        <div class="col s12 m3 l3 valign-wrapper">
          <div class="card-action">
            <span class="link" @click="selectStatus('PESANAN SELESAI')">PESANAN SELESAI</span>
          </div>
        </div>
      </div>
    </div>
    <div v-if="tansactionFilter.length == 0" class="">
      <img id="emptyorder" src="../../public/e896b3cc9c.svg" alt="">
    </div>
    <div v-if="tansactionFilter.length > 0" class="">

    <div v-for="(myTransaction, index) in tansactionFilter" :key="index" class="card">
      <div class="card row hoverable">
        <div id="myarticel_image" class="col s12 m6">
          <div class>
            <div class="card-content">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Image</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <!-- {{ myTransaction.cartItem[0] }} -->
                <tbody v-for="(Transaction, index) in myTransaction.cartItem" :key="index">
                  <tr v-for="(listItem, index) in Transaction" :key="index">
                    <td>{{ listItem.product.name }}</td>
                    <img id="imagetrans" :src="listItem.product.image_url" alt />
                    <td class="center">{{ listItem.quantity }}</td>
                    <td class="center">{{ rupiah(listItem.product.price) }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="col s12 m6">
          <div class>
            <div class="card-content">
              <h5>Total: IDR {{ rupiah(myTransaction.total) }}</h5>
              <h5 v-if="myTransaction.status === 'PESANAN SELESAI'" class="green-text">- {{ myTransaction.status }} -</h5>
              <h5 v-if="myTransaction.status === 'PESANAN DIPROSES'" class="red-text">- {{ myTransaction.status }} -</h5>
              <h5 v-if="myTransaction.status === 'PESANAN DIKIRIM'" class="orange-text">- {{ myTransaction.status }} -</h5>

              <h6 class="center">Name: {{ myTransaction.customer.name }}</h6>
              <h6 class="center">Address: {{ myTransaction.address }}</h6>
              <h6 class="center">Phone: {{ myTransaction.phone }}</h6>
              <span>OrderTime: {{ getDate(myTransaction.createdAt) }}</span><br>
              <span>Invoice: {{ myTransaction._id }}</span>
            </div>
            <div class="card-action center">
              <span @click="send_order(myTransaction._id)" v-if="isAdmin && myTransaction.status == 'PESANAN DIPROSES'" class="waves-effect waves-light green darken-1 btn">
                <i class="material-icons right">local_shipping</i>SEND
              </span>
              <span @click="order_received(myTransaction._id)" v-if="!isAdmin && myTransaction.status == 'PESANAN DIKIRIM'" class="waves-effect waves-light green darken-1 btn">
                <i class="material-icons right">widgets</i>DITERIMA
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: ['myTransactions'],
  data () {
    return {
      selected_status: ''
    }
  },
  methods: {
    fetchDataTransaction () {
      this.$emit('fetchDataTransaction')
    },
    selectStatus (value) {
      this.fetchDataTransaction()
      this.selected_status = value
      console.log(this.selected_status)
    },
    send_order (id) {
      console.log('send_order', id)
      this.$emit('send_order', id)
    },
    order_received (id) {
      this.$emit('order_received', id)
    },
    getDate (datetime) {
      let date = new Date(datetime)
      let dateString = date.toDateString()
      return dateString
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
  computed: {
    tansactionFilter: function () {
      console.log('filter trigger')
      return this.myTransactions.filter((transaction) => {
        return transaction.status
          .match(this.selected_status)
      })
    },
    ...mapState([
      'isLogin',
      'isAdmin'
    ])
  }
}
</script>

<style scope>
#emptyorder {
  width: 200px;
}
#imagetrans {
  width: 90px;
}
.link{
  cursor: pointer;
}

.link:hover {
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg id='squiggle-link' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:ev='http://www.w3.org/2001/xml-events' viewBox='0 0 20 4'%3E%3Cstyle type='text/css'%3E.squiggle{animation:shift .3s linear infinite;}@keyframes shift {from {transform:translateX(0);}to {transform:translateX(-20px);}}%3C/style%3E%3Cpath fill='none' stroke='%23ff9800' stroke-width='2' class='squiggle' d='M0,3.5 c 5,0,5,-3,10,-3 s 5,3,10,3 c 5,0,5,-3,10,-3 s 5,3,10,3'/%3E%3C/svg%3E");
  background-position: 0 100%;
  background-size: auto 6px;
  background-repeat: repeat-x;
  text-decoration: none;
}
</style>
