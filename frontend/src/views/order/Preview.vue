<template>
  <div class="px-10 py-4">
    <img src="@/assets/images/title.jpg" class="w-2/3 h-full object-cover" />

    <div class="pt-10">
      <table class="table-auto w-full text-black">
        <tbody>
          <tr>
            <td class="border border-black px-4 py-4 text-center w-64">Vehicle</td>
            <td
              class="border border-black px-4 py-4"
            >{{form.vehicle ? form.vehicle.license_plate : ''}}</td>
          </tr>
          <tr>
            <td class="border border-black px-4 py-4 text-center w-64">Driver</td>
            <td class="border border-black px-4 py-4">{{form.driver ? form.driver.name : ''}}</td>
          </tr>
          <tr>
            <td class="border border-black px-4 py-4 text-center w-64">RelatedId</td>
            <td class="border border-black px-4 py-4">{{form.relatedId}}</td>
          </tr>
          <tr>
            <td class="border border-black px-4 py-4 text-center w-64">Customer</td>
            <td
              class="border border-black px-4 py-4"
            >{{form.customer ? form.customer.username : ''}}</td>
          </tr>
          <tr>
            <td class="border border-black px-4 py-4 text-center w-64">Remark</td>
            <td class="border border-black px-4 py-4">{{form.remark}}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="pt-10">
      <table class="table-auto w-full text-black">
        <tbody>
          <tr v-for="data in form.order_itinerary" :key="data.id">
            <td class="border border-black px-4 py-3 text-center">{{data.date}}</td>
            <td class="border border-black px-4 py-3 text-center">{{data.time}}</td>
            <td
              class="border border-black px-4 py-3 text-center"
            >{{data.itinerary ? data.itinerary.name : ''}}</td>
            <td class="border border-black px-4 py-3 text-center w-32"></td>
            <td class="border border-black px-4 py-3 text-center w-32"></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { getOrder } from "@/http/requests/order";

export default {
  data() {
    return {
      form: {}
    };
  },
  mounted() {
    this.getOrderData();
  },
  methods: {
    getOrderData() {
      return getOrder(this.$route.params.id).then(res => {
        this.form = res.result;
        this.$nextTick(() => {
          window.print();
        });
      });
    }
  }
};
</script>