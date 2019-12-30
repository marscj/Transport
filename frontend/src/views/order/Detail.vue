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

    <div class="p-4" v-if="form.vehicle">
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
          <button
            @click="itinerary_show=!itinerary_show"
            class="bg-teal-500 hover:bg-teal-700 focus:outline-none text-white font-bold py-2 px-3 rounded"
          >ADD ITINERARY</button>
        </t-foot>
      </table>
    </div>

    <div class="p-4">
      <div class="flex flex-wrap">
        <a-form-item label="VEHICLE" class="flex-1 mr-6">
          <button @click="vehicle_table_show=!vehicle_table_show" class="bg-transparent hover:bg-teal-500 text-teal-700 font-semibold hover:text-white border border-teal-500 hover:border-transparent rounded px-4 w-full"> {{form.vehicle ? form.vehicle : 'Choose Vehicle'}} </button>
        </a-form-item>
        <a-form-item label="DRIVER" class="flex-1 mx-6">
          <button @click="driver_table_show=!driver_table_show" class="text-center bg-transparent hover:bg-teal-500 text-teal-700 font-semibold hover:text-white border border-teal-500 hover:border-transparent rounded px-4 w-full"> {{form.driver ? form.driver : 'Choose Driver'}} </button>
        </a-form-item>

        <a-form-item label="PHONE" class="flex-1 mx-6">
          <a-input v-model="form.driver_phone" ></a-input>
        </a-form-item>

        <a-form-item label="STATUS" class="flex-1 mx-6">
          <a-select class="w-full" v-model="form.status">
            <a-select-option v-for="data in Status" :key="data" :value="data">{{data}}</a-select-option>
          </a-select>
        </a-form-item>
      </div>
    </div>

    <a-modal v-model="itinerary_show" title="Itinerary">
      <validation-observer ref="observer" v-slot="{ validate, dirty }">
        <a-form :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
          <a-form-item label="DATE" required>
            <validation-provider name="date" rules="required" v-slot="{ errors }">
              <a-date-picker v-model="itinerary.date"></a-date-picker>
            </validation-provider>
          </a-form-item>
          <a-form-item label="TIME">
            <validation-provider name="time" v-slot="{ errors }">
              <a-time-picker v-model="itinerary.time"></a-time-picker>
            </validation-provider>
          </a-form-item>
          <a-form-item label="ITINERARY">
            <validation-provider name="itinerary_id" v-slot="{ errors }"></validation-provider>
          </a-form-item>
        </a-form>
      </validation-observer>
    </a-modal>

    <a-modal v-model="vehicle_table_show" title="Vehicle" :width="1024">
      <vehicle-table :selectModel="true" @vehicle="onHandleVehicle" />
    </a-modal>

    <a-modal v-model="driver_table_show" title="Driver" :width="1024">
      <driver-table :selectModel="true" @driver="onHandleDriver" />
    </a-modal>

    <div class="p-4">
      <button
        @click="updateOrderData"
        class="bg-teal-500 hover:bg-teal-700 focus:outline-none text-white font-bold py-2 px-3 rounded"
      >Update</button>
    </div>
  </vs-card>
</template>

<script>
import {
  getOrder,
  updateOrder,
  getOrderItinerary
} from "@/http/requests/order";
import { getVehicle } from "@/http/requests/vehicle";
import VehicleTable from "@/views/vehicle/List.vue";
import DriverTable from "@/views/user/List.vue";

const Status = ["New", "Confirm", "Pending", "Cancel", "Complete"];

export default {
  components: {
    VehicleTable,
    DriverTable
  },
  data() {
    return {
      Status,
      form: {},
      itinerary: {},
      itinerary_show: false,
      vehicle_table_show: false,
      driver_table_show: false
    };
  },
  mounted() {
    this.getOrderData();
  },
  methods: {
    getOrderData() {
      getOrder(this.$route.params.id).then(res => {
        this.form = res.result;
      });
    },
    updateOrderData(id) {
      updateOrder(this.$route.params.id, this.form).then(res => {
        this.form = res.result;
      });
    },
    onHandleVehicle(data) {
      this.vehicle_table_show = false;
      this.form.vehicle = data.license_plate;
      this.form.vehicle_id = data.id;
      this.form.driver = data.driver ? data.driver.username : null;
      this.form.driver_id = data.driver ? data.driver.id : null;
      this.form.driver_phone = data.driver ? data.driver.phone : null;
    },
    onHandleDriver(data) {
      this.driver_table_show = false;
      this.form.driver = data.username;
      this.form.driver_id = data.id;
      this.form.driver_phone = data.phone;
    }
  }
};
</script>