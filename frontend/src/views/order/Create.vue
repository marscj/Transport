<template>
  <vs-card>
    <validation-observer ref="observer" v-slot="{ validate, dirty }">
      <div v-if="step == 1" class="mb-5">
        <div class="p-10">
          <div class="flex flex-wrap mt-5 text-base">
            <div class="w-1/12 py-1">
              <span>*Date:</span>
            </div>
            <div class="w-11/12">
              <validation-provider name="start_date" rules="required"  v-slot="{ errors }">
                <a-date-picker placeholder="Start Date" v-model="start_date" class="py-1 mx-2"></a-date-picker> - 
                <span class="text-red-600 text-base">{{ errors[0] }}</span>
              </validation-provider>
              <validation-provider name="end_date" rules="required" v-slot="{ errors }">
                <a-date-picker placeholder="End Date" v-model="end_date" class="py-1 mx-2 "></a-date-picker>
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
                  :class="( category && category.id === data.id) ? 'inline-block border border-teal-500 rounded bg-teal-500 text-white py-1 px-3 mx-2' : 
                                           'inline-block border border-white rounded hover:border-gray-200 text-teal-500 hover:bg-gray-200 py-1 px-3 mx-2'"
                >
                  <p
                    :class="( category && category.id === data.id) ? 'text-white font-bold' : 'text-teal-500 font-bold' "
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
            <div class="w-1/12">
              <span>*Passengers:</span>
            </div>
            <div class="w-11/12">
              <validation-provider
                name="passenger"
                rules="required|min_value:0"
                v-slot="{ errors }"
              >
                <a-input-number v-model="passenger" class="hover:border-teal-500 focus:border-teal-500 mx-2" ></a-input-number>
                <span class="text-red-600 text-base">{{ errors[0] }}</span>
              </validation-provider>
            </div>
          </div>
          <div class="flex flex-wrap mt-5 text-base">
            <div class="w-1/12">
              <span>*Itinerary:</span>
            </div>
            <div class="w-4/12">
              <div class="mx-2">
                <validation-provider name="itinerary" rules="required" v-slot="{ errors }">
                  <a-textarea
                    v-model="itinerary"
                    :rows="13"
                    class="hover:border-teal-500 focus:border-teal-500"
                  ></a-textarea>
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
                    class="text-xs font-hairline bg-transparent hover:bg-teal-500 text-teal-700 font-semibold hover:text-white py-2 px-4 mx-4 border border-teal-500 hover:border-teal-500 rounded"
                  >{{data.name}}</button>
                </div>
              </div>
            </div>
          </div>
          <div class="flex flex-wrap mt-5 text-base">
            <div class="w-1/12 ">
              <span>RelatedID:</span>
            </div>
            <div class="w-11/12">
              <div class="py-1 px-2">
                <vs-input v-model="relatedId"></vs-input>
              </div>
            </div>
          </div>
          <a-divider class="mt-10"></a-divider>
          <div class="flex flex-wrap mt-10">
            <div class="mr-auto">
              <validation-provider name="non_field_errors" v-slot="{ errors }" >
                <span class="text-red-600 text-base">{{ errors[0] }}</span>
              </validation-provider>
              <button
                @click="onCheck()"
                class="bg-teal-500 hover:bg-teal-700 focus:outline-none text-white font-bold py-2 px-10  rounded"
              >CheckOut</button>
            </div>
          </div>
        </div>
      </div>
    </validation-observer>

    <div v-if="step === 2" class="mb-5">
      <div class="text-center p-4">
        <h1 class="text-4xl font-bold">Check out</h1>
      </div>
      <a-form class="p-10" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
        <a-form-item label="RelatedID" class="m-0">{{relatedId}}</a-form-item>
        <a-form-item label="Start Date" class="m-0"> {{start_date | moment('YYYY-MM-DD')}} </a-form-item>
        <a-form-item label="End Date" class="m-0"> {{end_date | moment('YYYY-MM-DD')}}</a-form-item>
        <a-form-item label="Category" class="m-0">{{category ? category.name : ''}}</a-form-item>
        <a-form-item label="Seats" class="m-0">{{seats}}</a-form-item>
        <a-form-item label="Passengers" class="m-0">{{passenger}}</a-form-item>
        <a-form-item label="Itinerary" class="m-0"><pre>{{itinerary}}</pre></a-form-item>
        <a-divider class="mt-10"></a-divider>
        <a-button class="bg-teal-500 hover:bg-teal-700 focus:outline-none text-white font-bold mr-2 px-10 rounded" @click="step = 1">Back</a-button>
        <a-button class="bg-teal-500 hover:bg-teal-700 focus:outline-none text-white font-bold ml-2 px-10  rounded" @click="onCreate()">Submit</a-button>
      </a-form>
    </div>

    <div v-if="step === 3" class="mb-5">
      <div class="text-center p-4">
        <h1 class="text-4xl font-bold">Success</h1>
      </div>
      <a-form class="p-10" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
        <a-divider class="mt-64"></a-divider>
        <a-button class="bg-teal-500 hover:bg-teal-700 focus:outline-none text-white font-bold mr-2 px-10 rounded" @click="$router.go(-1)">Back</a-button>
        <a-button class="bg-teal-500 hover:bg-teal-700 focus:outline-none text-white font-bold ml-2 px-10  rounded" @click="onContinue()">Continue</a-button>
      </a-form>

    </div>

    <price-table
      class="mt-10"
      v-if="category"
      :category="category.id"
      :showSidebar="false"
      :showThead="false"
      :showID="false"
    />
  </vs-card>
</template>

<script>
import PriceTable from "@/views/price/Table.vue";
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
  },
  watch: {
    "category"() {
      this.getSeatData();
    },
  },
  data() {
    return {
      step: 1,
      category: undefined,
      seats: undefined,
      start_date: undefined,
      end_date: undefined,
      passenger: undefined,
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
        category: this.category ? this.category.id : null
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
    onCheck() {
      this.step = 2;
    },
    onCreate() {
      let form = {
        start_date: this.start_date
          ? moment(this.start_date).format("YYYY-MM-DD")
          : null,
        end_date: this.end_date
          ? moment(this.end_date).format("YYYY-MM-DD")
          : null,
        category: this.category ? this.category.name : null,
        seats: this.seats,
        itinerary: this.itinerary,
        passenger: this.passenger,
        relatedId: this.relatedId
      };
      createOrder(form)
        .then(() => {
          this.step = 3;
        })
        .catch(error => {
          this.step = 1;
          if (error.response) {
            this.$nextTick(() => {
              this.$refs.observer.setErrors(error.response.data.result);
            })
          }
        });
    },
    onContinue() {
      this.step = 1;
      this.category = undefined;
      this.seats= undefined;
      this.start_date= undefined;
      this.end_date= undefined;
      this.passenger= undefined;
      this.itinerary= "";
      this.remark= "";
      this.relatedId= "";
    }
  }
};
</script>