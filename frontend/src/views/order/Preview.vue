<template>
  <div class="px-10 py-4">
    <img src="@/assets/images/title.jpg" class="w-2/3 h-full object-cover" />

    <div class="flex flex-col items-start text-2xl py-10">
      <pre>Vehicle: {{form.vehicle ? form.vehicle.license_plate : ''}} </pre>
      <pre>Driver: {{form.driver ? form.driver.username : ''}}</pre>
      <pre>Phone: {{form.driver ? form.driver.phone : ''}}</pre>
    </div>

    <div class="py-5">
      <table class="table-auto w-full">
        <thead>
          <tr>
            <th class="w-40 text-center py-3">ORDERID</th>
            <th class="w-40 text-center py-3">RELATEDID</th>
            <th class="w-40 text-center py-3">CREATE DATE</th>
            <th class="w-40 text-center py-3">START DATE</th>
            <th class="w-40 text-center py-3">END DATE</th>
            <th class="text-center py-3">ITINERARY</th>
            <th class="w-40 text-center py-3">CUSTOMER</th>
            <th class="w-40 text-center py-3">OPERATOR</th>
            <th class="w-40 text-center py-3">INVOICE</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="border px-4 py-3 text-center">{{form.orderId}}</td>
            <td class="border px-4 py-3 text-center">{{form.relatedId}}</td>
            <td class="border px-4 py-3 text-center">{{form.create_at | moment('YYYY-MM-DD')}}</td>
            <td class="border px-4 py-3 text-center">{{form.start_date}}</td>
            <td class="border px-4 py-3 text-center">{{form.end_date}}</td>
            <td class="border px-4 py-3">
              <p>Category: {{form.category}}</p>
              <p>Seats: {{form.seats}}</p>
              <p>Passengers: {{form.passenger}}</p>
              <p>Itinerary:</p>
              <pre>{{form.itinerary}}</pre>
            </td>
            <td class="border px-4 py-3 text-center">{{form.customer ? form.customer.username : ''}}</td>
            <td class="border px-4 py-3 text-center">{{form.operator ? form.operator.username : ''}}</td>
            <td class="border px-4 py-3 text-center">
              <div v-if="form.invoice">
                <pre class="text-gray-700">{{form.invoice.status}}</pre>
              </div>
              <span v-else>unknow</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="py-5">
      <table class="table-auto w-full">
        <thead>
          <tr>
            <th class="w-40 text-center py-3">DATE</th>
            <th class="w-40 text-center py-3">TIME</th>
            <th class="text-center py-3">ITINERARY</th>
            <th class="w-40 text-center py-3">PRICE</th>
            <th class="w-40 text-center py-3">PAYMENT</th>
            <th class="text-center py-3">SIGN</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="data in form.order_itinerary" :key="data.id">
            <td class="border px-4 py-3 text-center">
              <a @click="openItinerary(data)">{{data.date}}</a>
            </td>
            <td class="border px-4 py-3 text-center">
              <a @click="openItinerary(data)">{{data.time}}</a>
            </td>
            <td class="border px-4 py-3 text-center">
              <a @click="openItinerary(data)">{{data.itinerary ? data.itinerary.name : ''}}</a>
            </td>
            <td class="border px-4 py-3 text-center">
              <a @click="openItinerary(data)">{{data.price}}</a>
            </td>
            <td class="border px-4 py-3 text-center">
              <a @click="openItinerary(data)">{{data.payment}}</a>
            </td>
            <td class="border px-4 py-3 text-center"></td>
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