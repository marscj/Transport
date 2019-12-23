<template>
  <vs-card>
    <div>
      <div v-if="step == 1" class="mb-5">
        <div>
          <div class="flex flex-wrap mt-5 text-base">
            <div class="w-1/12 py-1">
              <span>*Date:</span>
            </div>
            <div class="w-11/12">
              <datepicker
                placeholder="Start Date"
                v-model="start_date"
                class="w-40 inline-block py-1 px-3 mx-2"
              ></datepicker>-
              <datepicker
                placeholder="End Date"
                v-model="end_date"
                class="w-40 inline-block py-1 px-3 mx-2"
              ></datepicker>
            </div>
          </div>
          <div class="flex flex-wrap mt-5 text-base">
            <div class="w-1/12 py-1">
              <span>*Category:</span>
            </div>
            <div class="w-11/12">
              <a
                @click="onCategory(data)"
                v-for="data in categoryData"
                :key="data.id"
                :class="category === data.id ? 'inline-block border border-blue-500 rounded bg-blue-500 text-white py-1 px-3 mx-2' : 
                                           'inline-block border border-white rounded hover:border-gray-200 text-blue-500 hover:bg-gray-200 py-1 px-3 mx-2'"
              >
                <p :class="category === data.id ? 'text-white' : 'text-blue-500' ">{{ data.name }}</p>
              </a>
            </div>
          </div>
          <div class="flex flex-wrap mt-5 text-base">
            <div class="w-1/12 py-1">
              <span>*Seats:</span>
            </div>
            <div class="w-11/12">
              <a
                @click="onSeat(data)"
                v-for="(data, index) in seatData"
                :key="index"
                :class="seat === data.seats ? 'inline-block border border-blue-500 rounded bg-blue-500 text-white py-1 px-3 mx-2' : 
                                           'inline-block border border-white rounded hover:border-gray-200 text-blue-500 hover:bg-gray-200 py-1 px-3 mx-2'"
              >
                <p
                  :class="seat === data.seats ? 'text-white' : 'text-blue-500' "
                >{{ data.seats }} (SEAT)</p>
              </a>
            </div>
          </div>
          <div class="flex flex-wrap mt-5 text-base">
            <div class="w-1/12 py-1">
              <span>*Itinerary:</span>
            </div>
            <div class="w-5/12">
              <div class="mx-4">
                <vs-textarea v-model="itinerary" height="200" />
              </div>
            </div>
            <div class="w-6/12">
              <div class="flex flex-wrap">
                <div v-for="data in itineraryData" :key="data.id" class="mx-4 my-1">
                  <vs-button>
                    {{data.name}}
                  </vs-button>
                </div>
              </div>
            </div>
          </div>
          <div class="flex flex-wrap mt-5 text-base">
            <div class="w-1/12 py-1">
              <span>Remark:</span>
            </div>
            <div class="w-5/12">
              <div class="mx-4">
                <vs-textarea v-model="itinerary" height="100" />
              </div>
            </div>
          </div>
          <div class="flex flex-wrap mt-10">
            <button
              class="ml-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-10 rounded"
            >Next</button>
          </div>
        </div>
      </div>
    </div>

    <price-table
      class="mt-10"
      :category="this.query ? this.query.category : null"
      :showSidebar="false"
      :showThead="false"
      :showID="false"
    />
  </vs-card>
</template>

<script>
import { FormWizard, TabContent } from "vue-form-wizard";
import "vue-form-wizard/dist/vue-form-wizard.min.css";
import PriceTable from "@/views/price/Table.vue";
import Datepicker from "vuejs-datepicker";

import { getCategory, getSeats, getItinerary } from "@/http/requests/vehicle/index.js";

export default {
  components: {
    FormWizard,
    TabContent,
    PriceTable,
    Datepicker
  },
  computed: {
    queryBase64() {
      return {
        query: this.$base64.encode(
          JSON.stringify({
            category: this.category,
            seat: this.seat
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
    seat() {
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
    let category = query ? query.category : undefined;
    let seat = query ? query.seat : undefined;

    return {
      step: 1,
      query: query,
      category: category,
      seat: seat,
      start_date: undefined,
      end_date: undefined,
      itinerary: "",
      categoryData: [],
      seatData: [],
      itineraryData: [],
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
        category: this.query ? this.query.category : null
      }).then(res => {
        this.seatData = res.result;
      });
    },
    getItineraryData() {
      getItinerary().then(res => {
        this.itineraryData = res.result
      })
    },
    onCategory(data) {
      this.category = data.id;
    },
    onSeat(data) {
      this.seat = data.seats;
    },
    formSubmitted() {
      alert("Form submitted!");
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