<template>
  <div class="container">
    <div class="card">
      <div class="row">
        <div class="col m12 l12">
          <i class="material-icons large">local_shipping</i>
        </div>
        <div class="col m12 l12">
          <h4>Delivery Address</h4>
        </div>
      </div>
      <div class="">

      </div>
      <div class="row">
        <form class="col s12">
          <div class="row">
            <div class="input-field col s6">
              <i class="material-icons prefix">home</i>
              <input id="icon_prefix" type="text" class="validate" />
              <label for="icon_prefix">Address</label>
            </div>
            <div class="input-field col s6">
              <i class="material-icons prefix">phone</i>
              <input id="icon_telephone" type="tel" class="validate" />
              <label for="icon_telephone">Telephone</label>
            </div>
          </div>
        </form>
      </div>

    <div class="row">
      <form class="col s12">
        <div class="row">
          <div class="input-field col s6">
            <input id="input_text" type="text" data-length="10">
            <label for="input_text">Input text</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <textarea id="textarea2" class="materialize-textarea" data-length="120"></textarea>
            <label for="textarea2">Textarea</label>
          </div>
        </div>
      </form>
    </div>
    </div>
  </div>
</template>

<script>
import { truncate } from "fs";
export default {
  data() {
    return {
      payment_setup: true,
      address_setup: false,
      send_order: false
    };
  },
  methods: {
    payment_link() {
      (this.payment_setup = true),
        (this.address_setup = false),
        (this.send_order = false);
    },
    address_link() {
      (this.payment_setup = false),
        (this.address_setup = true),
        (this.send_order = false);
    },
    send_link() {
      (this.payment_setup = false),
        (this.address_setup = false),
        (this.send_order = true);
    }
  }
};
</script>

<style>
</style>
