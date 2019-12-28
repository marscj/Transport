<template>
  <vs-card>
    <validation-observer ref="observer" v-slot="{ validate, dirty }">
      <div v-if="step == 1" class="mb-5">
        <div>
          <div class="flex flex-wrap mt-5 text-base">
            <div class="w-1/12 py-1">
              <span>*Date:</span>
            </div>
            <div class="w-11/12">
              <validation-provider name="start_date" v-slot="{ errors }">
                <datepicker
                  placeholder="Start Date"
                  v-model="start_date"
                  class="w-40 inline-block py-1 mx-2"
                ></datepicker>-
                <span class="text-red-600 text-base">{{ errors[0] }}</span>
              </validation-provider>
              <validation-provider name="end_date" v-slot="{ errors }">
                <datepicker
                  placeholder="End Date"
                  v-model="end_date"
                  class="w-40 inline-block py-1 mx-2"
                ></datepicker>
                <span class="text-red-600 text-base">{{ errors[0] }}</span>
              </validation-provider>
            </div>
          </div>
          <div class="flex flex-wrap mt-5 text-base">
            <div class="w-1/12 py-1">
              <span>*Category:</span>
            </div>
            <div class="w-11/12">
              <validation-provider name="category" v-slot="{ errors }">
                <a
                  @click="onCategory(data)"
                  v-for="data in categoryData"
                  :key="data.id"
                  :class="category.id === data.id ? 'inline-block border border-teal-500 rounded bg-teal-500 text-white py-1 px-3 mx-2' : 
                                           'inline-block border border-white rounded hover:border-gray-200 text-teal-500 hover:bg-gray-200 py-1 px-3 mx-2'"
                >
                  <p
                    :class="category.id === data.id ? 'text-white font-bold' : 'text-teal-500 font-bold' "
                  >{{ data.name }}</p>
                </a>
                <span class="text-red-600 text-base">{{ errors[0] }}</span>
              </validation-provider>
            </div>
          </div>
          <div class="flex flex-wrap mt-5 text-base">
            <div class="w-1/12 py-1">
              <span>*Seats:</span>
            </div>
            <div class="w-11/12">
              <validation-provider name="seats" v-slot="{ errors }">
                <a
                  @click="onSeat(data)"
                  v-for="(data, index) in seatData"
                  :key="index"
                  :class="seats === data.seats ? 'inline-block border border-teal-500 rounded bg-teal-500 text-white py-1 px-3 mx-2' : 
                                           'inline-block border border-white rounded hover:border-gray-200 text-teal-500 hover:bg-gray-200 py-1 px-3 mx-2'"
                >
                  <p
                    :class="seats === data.seats ? 'text-white font-bold' : 'text-teal-500 font-bold' "
                  >{{ data.seats }} (SEAT)</p>
                </a>
                <span class="text-red-600 text-base">{{ errors[0] }}</span>
              </validation-provider>
            </div>
          </div>
          <div class="flex flex-wrap mt-5 text-base">
            <div class="w-1/12 py-1">
              <span>*Itinerary:</span>
            </div>
            <div class="w-4/12">
              <div class="mx-4">
                <validation-provider name="itinerary" v-slot="{ errors }">
                  <vs-textarea v-model="itinerary" height="180" />
                  <span class="text-red-600 text-base">{{ errors[0] }}</span>
                </validation-provider>
              </div>
              <p class="mx-4 text-gray-400 text-sm">e.g.</p>
              <p class="mx-4 text-gray-400 text-sm">12-12 06:30, DXB TO CITY HOTEL</p>
              <p class="mx-4 text-gray-400 text-sm">12-13, SHARJHA CITY TOUR FULL DAY</p>
              <p class="mx-4 text-gray-400 text-sm">12-14, DUBAI CITY TOUR HALF DAY</p>
            </div>
            <div class="w-6/12 pl-10">
              <div class="flex flex-wrap">
                <div v-for="data in itineraryData" :key="data.id" class="mb-4 w-1/2">
                  <button
                    @click="onItinerary(data)"
                    class="text-xs font-hairline bg-transparent hover:bg-teal-500 text-teal-700 font-semibold hover:text-white py-2 px-4 mx-4 border border-teal-500 hover:border-transparent rounded"
                  >{{data.name}}</button>
                </div>
              </div>
            </div>
          </div>
          <div class="flex flex-wrap mt-5 text-base">
            <div class="w-1/12 py-1">
              <span>RelatedID:</span>
            </div>
            <div class="w-11/12">
              <div class="py-1 px-3 mx-1">
                <vs-input v-model="relatedId"></vs-input>
              </div>
            </div>
          </div>
          <div class="flex flex-wrap mt-10">
            <div class="ml-auto">
              <validation-provider name="non_field_errors" v-slot="{ errors }" class="mx-4">
                <span class="text-red-600 text-base">{{ errors[0] }}</span>
              </validation-provider>
              <button
                @click="onCreate()"
                class="bg-teal-500 hover:bg-teal-700 focus:outline-none text-white font-bold py-2 px-10 rounded"
              >Submit</button>
            </div>
          </div>
        </div>
      </div>
    </validation-observer>

    <price-table
      class="mt-10"
      v-if="this.query && this.query.category"
      :category="this.query.category.id"
      :showSidebar="false"
      :showThead="false"
      :showID="false"
    />
  </vs-card>
</template>

<script>
import "vue-form-wizard/dist/vue-form-wizard.min.css";
import PriceTable from "@/views/price/Table.vue";
import Datepicker from "vuejs-datepicker";
import moment from "moment";

import {
  getCategory,
  getSeats,
  getItinerary
} from "@/http/requests/vehicle/index.js";

import { createOrder } from "@/http/requests/order/index.js";

export default {
  components: {
    PriceTable,
    Datepicker
  },
  computed: {
    queryBase64() {
      return {
        query: this.$base64.encode(
          JSON.stringify({
            category: this.category,
            seats: this.seats
          })
        )
      };
    }
  },
  watch: {
    "$route.query"(oldVal, newVal) {
      if (newVal) {
        this.query = JSON.parse(this.$base64.decode(this.$route.query.query));
      } else {
        this.query = null;
      }
    },
    "query.category"() {
      this.getSeatData();
    },
    category() {
      this.$router.push({
        name: "create_order",
        query: this.queryBase64
      });
    },
    seats() {
      this.$router.push({
        name: "create_order",
        query: this.queryBase64
      });
    }
  },
  data() {
    let query = this.$route.query.query
      ? JSON.parse(this.$base64.decode(this.$route.query.query))
      : undefined;
    let category = query ? query.category : { id: undefined };
    let seats = query ? query.seats : undefined;

    return {
      step: 1,
      query: query,
      category: category,
      seats: seats,
      start_date: undefined,
      end_date: undefined,
      itinerary: "",
      remark: "",
      relatedId: "",
      categoryData: [],
      seatData: [],
      itineraryData: []
    };
  },
  mounted() {
    this.getCategoryData();
    this.getSeatData();
    this.getItineraryData();
  },
  methods: {
    getCategoryData() {
      getCategory().then(res => {
        this.categoryData = res.result;
      });
    },
    getSeatData() {
      getSeats({
        category: this.query ? this.query.category.id : null
      }).then(res => {
        this.seatData = res.result;
      });
    },
    getItineraryData() {
      getItinerary().then(res => {
        this.itineraryData = res.result;
      });
    },
    onCategory(data) {
      this.category = data;
    },
    onSeat(data) {
      this.seats = data.seats;
    },
    onItinerary(data) {
      this.itinerary += data.name + "\n";
    },
    onCreate() {
      let form = {
        start_date: this.start_date
          ? moment(this.start_date).format("YYYY-MM-DD")
          : null,
        end_date: this.end_date
          ? moment(this.end_date).format("YYYY-MM-DD")
          : null,
        category: this.category.name,
        seats: this.seats,
        itinerary: this.itinerary,
        relatedId: this.relatedId
      };
      createOrder(form)
        .then(res => {
        })
        .catch(error => {
          if (error.response) {
            this.$refs.observer.setErrors(error.response.data.result);
          }
        });
    }
  }
};
</script>

<style>
.vue-form-wizard .wizard-tab-content {
  padding: 20px 0px 0px;
}

.vdp-datepicker input {
  padding: 3px;
  font-size: 1rem;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  color: #626262;
  width: 100%;
}
</style>