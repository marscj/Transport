<template>
  <div>
    <div id="pdfDom" class="px-10 py-4">
      <img src="@/assets/images/title.jpg" class="w-2/3 h-full object-cover" />

      <div class="flex flex-row items-start text-2xl py-10">
        <div class="flex-1 flex-col items-start">
          <pre>Account: {{formData.customer ? formData.customer.username : ''}} </pre>
          <pre>Date: {{formData.start_date}} - {{formData.end_date}}</pre>
        </div>
        <div class="flex flex-col items-end">
          <pre>#402 indigo building.international city Dubai</pre>
          <pre>Tel.: +971-4-368-8740 Fax: +971-4-368-8136</pre>
        </div>
      </div>

      <div class="mt-10">
        <table class="table-auto w-full">
          <thead>
            <tr>
              <th class="w-40 text-center py-3">Start Date</th>
              <th class="w-40 text-center py-3">Itinerary</th>
              <th class="w-40 text-center py-3">Vehicle</th>
              <th class="w-40 text-center py-3">Category</th>
              <th class="w-40 text-center py-3">RelatedId</th>
              <th class="w-40 text-center py-3">Payment</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="data in selectedData">
              <tr v-for="(_data) in data.order_itinerary" :key="_data.id">
                <td
                  class="border px-4 py-3 text-center"
                  :key="index"
                >{{_data.date}} {{_data.time ? _data.time.substring(0,5): ''}}</td>
                <td class="border px-4 py-3 text-center" :key="index">{{_data.itinerary.name}}</td>
                <td
                  class="border px-4 py-3 text-center"
                  :key="index"
                >{{data.vehicle ? data.vehicle.license_plate : ''}}</td>
                <td class="border px-4 py-3 text-center" :key="index">{{data.category}}</td>
                <td class="border px-4 py-3 text-center" :key="index">{{data.relatedId}}</td>
                <td class="border px-4 py-3 text-center" :key="index">{{_data.payment}}</td>
              </tr>
              <tr :key="data.id">
                <td class="border"></td>
                <td class="border"></td>
                <td class="border"></td>
                <td class="border"></td>
                <td class="border"></td>
                <td class="border px-4 py-3 text-center">total: {{data.total}}</td>
              </tr>

              <div class="py-4" :key="data.id" />
            </template>
          </tbody>
        </table>
        <div class="flex items-end flex-col">
          <pre>Total: {{total}}</pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getOrders } from "@/http/requests/order";
import { getInvoice } from "@/http/requests/invoice";

export default {
  data() {
    return {
      formData: {},
      selectedData: []
    };
  },
  mounted() {
    this.getData();
  },
  computed: {
    total() {
      return this.$_.sum(this.selectedData.map(f => f.total));
    }
  },
  methods: {
    getData() {
      getInvoice(this.$route.params.id)
        .then(res => {
          this.formData = res.result;
          return getOrders({ invoice_id: this.$route.params.id });
        })
        .then(res => {
          this.selectedData = res.result;
        });
    }
  }
};
</script>