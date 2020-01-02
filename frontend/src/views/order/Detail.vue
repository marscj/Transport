<template>
  <div>
    <a-checkbox v-model="form.is_lock" class="pb-4" :disabled="!canChangeLock">Lock</a-checkbox>
    <vs-card :style="form.is_lock || !canChangeOrder ? 'background-color:#f5f5f5;' : ''">
      <div class="p-4 border border-gray-300">
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
              <td
                class="border px-4 py-3 text-center"
              >{{form.customer ? form.customer.username : ''}}</td>
              <td
                class="border px-4 py-3 text-center"
              >{{form.operator ? form.operator.username : ''}}</td>
              <td class="border px-4 py-3 text-center">
                <a href="#" v-if="data">invoice</a>
                <span v-else>unknow</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="p-4 mt-4 border border-gray-300">
        <table class="table-fixed w-full">
          <thead>
            <tr>
              <th class="w-40 text-center py-3">DATE</th>
              <th class="w-40 text-center py-3">TIME</th>
              <th class="text-center py-3">ITINERARY</th>
              <th class="w-40 text-center py-3">PRICE</th>
              <th class="w-40 text-center py-3">PAYMENT</th>
              <th class="w-40 text-center py-3" v-if="canDelItinerary">ACTION</th>
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
              <td class="border px-4 py-3 text-center" v-if="canDelItinerary">
                <feather-icon
                  icon="TrashIcon"
                  svgClasses="w-5 h-5 hover:text-danger stroke-current"
                  class="ml-2"
                  @click.stop="openConfirm(data.id)"
                />
              </td>
            </tr>
          </tbody>
          <t-foot>
            <button
              v-if="canAddItinerary"
              @click="openItinerary()"
              class="bg-teal-500 hover:bg-teal-700 focus:outline-none text-white font-bold py-2 px-3 rounded mt-4"
            >ADD ITINERARY</button>
          </t-foot>
        </table>
      </div>

      <div class="p-4" v-if="canChangeOrder">
        <div class="flex flex-wrap">
          <a-form-item label="VEHICLE" class="flex-1 mr-6">
            <a-input
              v-model="vehicle"
              @click="openVehicle"
              @change="onVehicleChange"
              :disabled="!canChangeOrder"
              readonly
              allowClear
            ></a-input>
          </a-form-item>
          <a-form-item label="DRIVER" class="flex-1 mx-6">
            <a-input
              v-model="driver"
              @click="driver_table_show=!driver_table_show"
              @change="onDriverChange"
              :disabled="!canChangeOrder"
              readonly
              allowClear
            ></a-input>
          </a-form-item>

          <a-form-item label="PHONE" class="flex-1 mx-6">
            <a-input v-model="phone" disabled></a-input>
          </a-form-item>

          <a-form-item label="STATUS" class="flex-1 mx-6">
            <a-select class="w-full" v-model="form.status" :disabled="!canChangeOrder">
              <a-select-option v-for="data in Status" :key="data" :value="data">{{data}}</a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item label="REMARK" class="w-1/3 mr-6">
            <a-textarea v-model="form.remark" :disabled="!canChangeOrder"></a-textarea>
          </a-form-item>
        </div>

        <button
          v-if="canChangeOrder"
          @click="updateOrderData"
          class="bg-teal-500 hover:bg-teal-700 focus:outline-none text-white font-bold py-2 px-3 rounded mt-4"
        >Update</button>
      </div>

      <a-modal
        v-model="itinerary_show"
        :title="itinerary_edit ? 'Itinerary Update' : 'Itinerary Create'"
        :width="800"
        @ok="handleItinerary"
      >
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
                <a-time-picker v-model="itinerary.time" format="HH:mm" class="w-64"></a-time-picker>
                <span>{{ errors[0] }}</span>
              </validation-provider>
            </a-form-item>
            <a-form-item label="ITINERARY" required>
              <validation-provider name="itinerary_id" v-slot="{ errors }">
                <a-select v-model="itinerary.itinerary" @change="onItineraryChange">
                  <a-select-option
                    v-for="data in itineraryData"
                    :key="data.id"
                    :value="data.id"
                  >{{data.name}}</a-select-option>
                </a-select>
                <span>{{ errors[0] }}</span>
              </validation-provider>
            </a-form-item>
            <a-form-item label="PRICE" required>
              <validation-provider name="price" v-slot="{ errors }">
                <a-input v-model="itinerary.price" disabled addonAfter="AED"></a-input>
                <span>{{ errors[0] }}</span>
              </validation-provider>
            </a-form-item>
            <a-form-item label="PAYMENT" required>
              <validation-provider name="payment" v-slot="{ errors }">
                <a-input
                  v-model="itinerary.payment"
                  :disabled="!canEditPayment"
                  addonAfter="AED"
                ></a-input>
                <span>{{ errors[0] }}</span>
              </validation-provider>
            </a-form-item>
          </a-form>
        </validation-observer>
      </a-modal>

      <a-modal v-model="vehicle_table_show" title="Vehicle" :width="1024">
        <vehicle-table
          ref="vehicle"
          :selectModel="true"
          @vehicle="onHandleVehicle"
          :queryParam="{
        is_active: true,
        start_0: this.form.start_date,
        start_1: this.form.end_date,
        end_0: this.form.start_date,
        end_1: this.form.end_date,
      }"
        />
      </a-modal>

      <a-modal v-model="driver_table_show" title="Driver" :width="1024">
        <driver-table
          :selectModel="true"
          @driver="onHandleDriver"
          :queryParam="{
        role: 'Driver',
        start_0: this.form.start_date,
        start_1: this.form.end_date,
        end_0: this.form.start_date,
        end_1: this.form.end_date,
      }"
        />
      </a-modal>
    </vs-card>
  </div>
</template>

<script>
import {
  getOrder,
  updateOrder,
  getOrderItinerary,
  createOrderItinerary,
  updateOrderItinerary,
  deleteOrderItinerary
} from "@/http/requests/order";
import { getVehicle, getItinerary, getPriceExa } from "@/http/requests/vehicle";
import VehicleTable from "@/views/vehicle/List.vue";
import DriverTable from "@/views/user/List.vue";
import moment from "moment";

const Status = ["New", "Confirm", "Cancel", "Complete", "Paid"];

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
      itinerary_edit: false,
      vehicle_table_show: false,
      driver_table_show: false
    };
  },
  mounted() {
    this.getOrderData();
    this.getItineraryData();
  },
  computed: {
    canChangeLock() {
      return this.$auth("order.change_lock") 
    },
    canChangeOrder() {
      return this.$auth("order.change_order") && !this.form.is_lock;
    },
    canDelItinerary() {
      return this.$auth("orderitinerary.delete_orderitinerary") && !this.form.is_lock;
    },
    canAddItinerary() {
      return this.$auth('orderitinerary.add_orderitinerary') && !this.form.is_lock;
    },
    canChangeItinerary() {
      return this.$auth("orderitinerary.change_orderitinerary") && !this.form.is_lock;
    },
    canEditPayment() {
      return this.$auth('orderitinerary.edit_payment') && !this.form.is_lock;
    }
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
      updateOrder(this.$route.params.id, this.form)
        .then(res => {
          this.form = res.result;
          this.$vs.notify({
            title: "Update ",
            text: "Success",
            iconPack: "feather",
            icon: "icon-alert-circle",
            color: "success"
          });
        })
        .catch(error => {
          this.$vs.notify({
            title: "Error",
            text: error.message,
            iconPack: "feather",
            icon: "icon-alert-circle",
            color: "danger"
          });
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
    },
    onItineraryChange(data) {
      getPriceExa({ category: this.form.category, itinerary: data }).then(
        res => {
          this.itinerary.price = Number(res.result.price);
          this.itinerary.payment = Number(res.result.price);
        }
      );
    },
    openItinerary(data) {
      if (data) {
        if (!this.canChangeItinerary) {
          return;
        }
      } else {
        if (!this.canAddItinerary) {
          return;
        }
      }

      this.itinerary_show = true;
      this.itinerary_edit = data ? true : false;
      this.itinerary = data
        ? {
            id: data.id,
            date: moment(data.date, "YYYY-MM-DD"),
            time: data.time ? moment(data.time, "HH:mm") : null,
            itinerary: data.itinerary.id,
            price: data.price,
            payment: data.payment
          }
        : {};
    },
    handleItinerary() {
      let form = {
        order_id: this.form.id,
        itinerary_id: this.itinerary.itinerary
          ? this.itinerary.itinerary
          : null,
        date: this.itinerary.date
          ? moment(this.itinerary.date).format("YYYY-MM-DD")
          : null,
        time: this.itinerary.time
          ? moment(this.itinerary.time).format("HH:mm")
          : null,
        price: this.itinerary.price,
        payment: this.itinerary.payment
      };

      if (this.itinerary_edit) {
        updateOrderItinerary(this.itinerary.id, form)
          .then(res => {
            this.getOrderData().then(() => {
              this.itinerary_show = false;
            });
          })
          .catch(error => {
            if (error.response) {
              this.$refs.observer_itinerary.setErrors(
                error.response.data.result
              );
            }
          });
      } else {
        createOrderItinerary(form)
          .then(res => {
            this.getOrderData().then(() => {
              this.itinerary_show = false;
            });
          })
          .catch(error => {
            if (error.response) {
              this.$refs.observer_itinerary.setErrors(
                error.response.data.result
              );
            }
          });
      }
    },
    deleteData(id) {
      deleteOrderItinerary(id).then(() => {
        this.getOrderData();
      });
    },
    openConfirm(id) {
      if (this.canDelItinerary) {
        this.$vs.dialog({
          type: "confirm",
          color: "danger",
          title: `Confirm`,
          text: "Are you sure delete?",
          accept: () => this.deleteData(id)
        });
      }
    },
    openVehicle() {
      this.vehicle_table_show = true;
      if (this.$refs.vehicle) {
        this.$refs.vehicle.refresh();
      }
    }
  }
};
</script>