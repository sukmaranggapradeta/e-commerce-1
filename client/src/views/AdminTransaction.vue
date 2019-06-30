<template>
  <div class="container">
    <TransactionCard
      :myTransactions="myTransactions"
      @send_order="send_order"
      @fetchDataTransaction="fetchDataTransaction"
    ></TransactionCard>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import myServer from '../api/myServer.js'
import TransactionCard from '../components/TransactionCard.vue'

export default {
  data () {
    return {
      myTransactions: []
    }
  },
  components: {
    TransactionCard
  },
  methods: {
    send_order (id) {
      myServer
        .put(`/transactions/admin/${id}`, {
          status: 'PESANAN DIKIRIM'
        }, {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(({ data }) => {
          let myTransTemp = this.myTransactions
          myTransTemp.map(el => {
            if (el._id === data._id) {
              el.status = data.status
            }
          })
          // this.$store.commit('plusNotifCust')
          this.myTransactions = myTransTemp
          // console.log(myTransTemp)
          // this.fetchDataTransaction()
        })
        .catch((err) => {
          Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: `${err.response.data}`
          })
        })
    },
    fetchDataTransaction () {
      myServer
        .get(`/transactions/`, {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(({ data }) => {
          this.myTransactions = data
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
    this.fetchDataTransaction()
  }
}
</script>

<style>

</style>
