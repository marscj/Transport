<template>
  <vs-card>
    <div class="p-4">
      <table class="table-auto w-full">
        <thead>
          <tr>
            <th class="text-center py-4">ORDERID</th>
            <th class="text-center py-4">RELATEDID</th>
            <th class="text-center py-4">CREATE DATE</th>
            <th class="text-center py-4">START DATE</th>
            <th class="text-center py-4">END DATE</th>
            <th class="text-center py-4">ITINERARY</th>
            <th class="text-center py-4">CUSTOMER</th>
            <th class="text-center py-4">OPERATOR</th>
            <th class="text-center py-4">INVOICE</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="border px-4 py-4 text-center">{{form.orderId}}</td>
            <td class="border px-4 py-4 text-center">{{form.relatedId}}</td>
            <td class="border px-4 py-4 text-center">{{form.create_at | moment('YYYY-MM-DD')}}</td>
            <td class="border px-4 py-4 text-center">{{form.start_date}}</td>
            <td class="border px-4 py-4 text-center">{{form.end_date}}</td>
            <td class="border px-4 py-4">
              <p>Category: {{form.category}}</p>
              <p>Seats: {{form.seats}}</p>
              <p>Passengers: {{form.passenger}}</p>
              <p>Itinerary:</p>
              <pre>{{form.itinerary}}</pre>
            </td>
            <td class="border px-4 py-4 text-center">{{form.customer}}</td>
            <td class="border px-4 py-4 text-center">{{form.operator}}</td>
            <td class="border px-4 py-4 text-center">
              <a href="#" v-if="data">invoice</a>
              <span v-else>unknow</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="p-4">
      <table class="table-fixed w-full">
        <thead>
          <tr>
            <th class="text-center py-4">DATE</th>
            <th class="text-center py-4">TIME</th>
            <th class="text-center py-4">ITINERARY</th>
            <th class="text-center py-4">PRICE</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="data in form.order_itinerary" :key="data.id">
            <td class="border px-4 py-4 text-center">{{data.date}}</td>
            <td class="border px-4 py-4 text-center">{{data.time}}</td>
            <td class="border px-4 py-4 text-center">{{data.itinerary.name}}</td>
            <td class="border px-4 py-4 text-center">{{data.price}}</td>
          </tr>
        </tbody>
        <t-foot>
          <button @click="itinerary_show=!itinerary_show" class="bg-teal-500 hover:bg-teal-700 focus:outline-none text-white font-bold py-2 px-3 rounded">ADD ITINERARY</button>
        </t-foot>
      </table>
    </div>

    <div class="p-4">
      <div class="flex flex-wrap">
        <a-form-item label="VEHICLE" class="flex-1 mr-6">
          <a-select class="w-full">
            <a-select-option
              v-for="data in vehicleData"
              :key="data.id"
              :value="data"
            >{{data.license_plate}}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="DRIVER" class="flex-1 mx-6">
          <a-select class="w-full">
            <a-select-option
              v-for="data in vehicleData"
              :key="data.id"
              :value="data"
            >{{data.license_plate}}</a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item label="PHONE" class="flex-1 mx-6">
          <a-select class="w-full">
            <a-select-option
              v-for="data in vehicleData"
              :key="data.id"
              :value="data"
            >{{data.license_plate}}</a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item label="STATUS" class="flex-1 mx-6">
          <a-select class="w-full">
            <a-select-option v-for="data in Status" :key="data" :value="data">{{data}}</a-select-option>
          </a-select>
        </a-form-item>
      </div>
    </div>

    <a-modal v-model="itinerary_show" title="Itinerary">

    </a-modal>
  </vs-card>
</template>

<script>
import { getOrder, getOrderItinerary } from "@/http/requests/order";
import { getVehicle } from "@/http/requests/vehicle";
const Status = ["New", "Confirm", "Pending", "Cancel", "Complete"];

export default {
  mounted() {
    this.getOrderData(this.$route.params.id);
    this.getVehicleData();
  },
  data() {
    return {
      Status,
      vehicleData: [],
      form: {},
      itinerary: {},
      itinerary_show: false,
    };
  },
  methods: {
    getOrderData(id) {
      getOrder(id).then(res => {
        this.form = res.result;
      });
    },
    getVehicleData() {
      getVehicle().then(res => {
        this.vehicleData = res.result;
      });
    }
  }
};
</script>