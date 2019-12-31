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
            <td class="border px-4 py-4 text-center">{{form.customer ? form.customer.username : ''}}</td>
            <td class="border px-4 py-4 text-center">{{form.operator ? form.operator.username : ''}}</td>
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
            <th class="w-40 text-center py-4">DATE</th>
            <th class="w-40 text-center py-4">TIME</th>
            <th class="text-center py-4">ITINERARY</th>
            <th class="w-40 text-center py-4">PRICE</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="data in form.order_itinerary" :key="data.id">
            <td class="border px-4 py-4 text-center">{{data.date}}</td>
            <td class="border px-4 py-4 text-center">{{data.time}}</td>
            <td class="border px-4 py-4 text-center">{{data.itinerary ? data.itinerary.name : ''}}</td>
            <td class="border px-4 py-4 text-center">{{data.price}}</td>
          </tr>
        </tbody>
        <t-foot >
          <button
            @click="itinerary_show=!itinerary_show"
            class="bg-teal-500 hover:bg-teal-700 focus:outline-none text-white font-bold py-2 px-3 rounded mt-4"
          >ADD ITINERARY</button>
        </t-foot>
      </table>
    </div>

    <div class="p-4">
      <div class="flex flex-wrap">
        <a-form-item label="VEHICLE" class="flex-1 mr-6">
          <a-input
            v-model="vehicle"
            @click="vehicle_table_show=!vehicle_table_show"
            @change="onVehicleChange"
            readonly
            allowClear
          ></a-input>
        </a-form-item>
        <a-form-item label="DRIVER" class="flex-1 mx-6">
          <a-input
            v-model="driver"
            @click="driver_table_show=!driver_table_show"
            @change="onDriverChange"
            readonly
            allowClear
          ></a-input>
        </a-form-item>

        <a-form-item label="PHONE" class="flex-1 mx-6">
          <a-input v-model="phone" disabled></a-input>
        </a-form-item>

        <a-form-item label="STATUS" class="flex-1 mx-6">
          <a-select class="w-full" v-model="form.status" @change="onStatus">
            <a-select-option v-for="data in Status" :key="data" :value="data">{{data}}</a-select-option>
          </a-select>
        </a-form-item>
      </div>
    </div>

    <a-modal v-model="itinerary_show" title="Itinerary" :width="800" @ok="handleItinerary">
      <validation-observer ref="observer_itinerary" v-slot="{ validate, dirty }">
        <a-form :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
          <a-form-item label="DATE" required>
            <validation-provider name="date" rules="required" v-slot="{ errors }">
              <a-date-picker v-model="itinerary.date" class="w-64"></a-date-picker>
              <span>{{ errors[0] }}</span>
            </validation-provider>
          </a-form-item>
          <a-form-item label="TIME">
            <validation-provider name="time" v-slot="{ errors }">
              <a-time-picker v-model="itinerary.time" class="w-64"></a-time-picker>
              <span>{{ errors[0] }}</span>
            </validation-provider>
          </a-form-item>
          <a-form-item label="ITINERARY">
            <validation-provider name="itinerary_id" v-slot="{ errors }">
              <a-select v-model="itinerary.itinerary" @change="onItineraryChange" >
                <a-select-option
                  v-for="data in itineraryData"
                  :key="data.id"
                  :value="data.id"
                >{{data.name}}</a-select-option>
              </a-select>
              <span>{{ errors[0] }}</span>
            </validation-provider>
          </a-form-item>
          <a-form-item label="PRICE">
            <validation-provider name="price" v-slot="{ errors }">
              <a-input v-model="itinerary.price" disabled addonAfter="AED"></a-input>
              <span>{{ errors[0] }}</span>
            </validation-provider>
          </a-form-item>
          <a-form-item label="PRICE">
            <validation-provider name="price" v-slot="{ errors }">
              <a-input v-model="itinerary.price" :disabled="$auth('order_itinerary.edit_payment')" addonAfter="AED"></a-input>
              <span>{{ errors[0] }}</span>
            </validation-provider>
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
  </vs-card>
</template>

<script>
import {
  getOrder,
  updateOrder,
  getOrderItinerary,
  createOrderItinerary,
  updateOrderItinerary
} from "@/http/requests/order";
import { getVehicle, getItinerary, getPriceExa } from "@/http/requests/vehicle";
import VehicleTable from "@/views/vehicle/List.vue";
import DriverTable from "@/views/user/List.vue";
import moment from 'moment';

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
      itinerary: {
        date: undefined,
        time: undefined,
        itinerary: undefined,
        price: undefined
      },
      vehicle: "",
      driver: "",
      phone: "",
      itineraryData: [],
      itinerary_show: false,
      vehicle_table_show: false,
      driver_table_show: false
    };
  },
  mounted() {
    this.getOrderData();
    this.getItineraryData();
  },
  methods: {
    getItineraryData() {
      getItinerary().then(res => {
        this.itineraryData = res.result;
      });
    },
    getOrderData() {
      return getOrder(this.$route.params.id).then(res => {
        this.form = res.result;
        this.vehicle = this.form.vehicle
          ? this.form.vehicle.license_plate
          : null;
        this.driver = this.form.driver ? this.form.driver.username : null;
        this.phone = this.form.driver ? this.form.driver.phone : null;
      });
    },
    updateOrderData() {
      updateOrder(this.$route.params.id, this.form).then(res => {
        this.form = res.result;
      });
    },
    onVehicleChange(event) {
      if (event.target.value === "") {
        this.onHandleVehicle(null);
      }
    },
    onHandleVehicle(data) {
      this.vehicle_table_show = false;
      if (data) {
        this.vehicle = data.license_plate;
        this.driver = data.driver ? data.driver.username : null;
        this.phone = data.driver ? data.driver.phone : null;

        this.form.vehicle_id = data.id;
        this.form.driver_id = data.driver ? data.driver.id : null;
      } else {
        this.vehicle = null;
        this.driver = null;
        this.phone = null;

        this.form.vehicle_id = null;
        this.form.driver_id = null;
      }

      this.updateOrderData();
    },
    onDriverChange(event) {
      if (event.target.value === "") {
        this.onHandleDriver(null);
      }
    },
    onHandleDriver(data) {
      this.driver_table_show = false;

      if (data) {
        this.driver = data.username;
        this.phone = data.phone;

        this.form.driver_id = data.id;
      } else {
        this.driver = null;
        this.phone = null;

        this.form.driver_id = null;
      }

      this.updateOrderData();
    },
    onStatus(data) {
      this.updateOrderData();
    },
    onItineraryChange(data) {
      getPriceExa({ category: this.form.category, itinerary: data }).then(
        res => {
          this.itinerary.price = res.result.price;
        }
      );
    },
    handleItinerary() {
      let form = {
        order_id: this.form.id,
        itinerary_id: this.itinerary.itinerary ? this.itinerary.itinerary : null,
        date: this.itinerary.date ? moment(this.itinerary.date).format('YYYY-MM-DD') : null,
        time: this.itinerary.time ? moment(this.itinerary.time).format('HH:mm:ss') : null,
        price: this.itinerary.price
      }
      createOrderItinerary(form).then(res => {
        this.getOrderData().then(() => {
          this.itinerary_show = false;
        });
      }).catch(error => {
        if (error.response) {
          this.$refs.observer_itinerary.setErrors(error.response.data.result);
        }
      });
    }
  }
};
</script>