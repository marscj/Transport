<template>
  <vs-card>
    <div class="px-4">
      <div class="flex flex-wrap mt-5 text-lg">
        <div class="w-1/12">
          <span>Category:</span>
        </div>
        <div class="w-11/12">
          <a
            @click="onCategory(data)"
            v-for="data in categoryData"
            :key="data.id"
            class="inline-block border border-blue-500 rounded hover:bg-gray-200 py-1 px-3 text-white mx-4"
          >
            <p>{{ data.name }}</p>
          </a>
        </div>
      </div>
      <div class="flex flex-wrap mt-5 text-lg">
        <div class="w-1/12">
          <span>Seats:</span>
        </div>
        <div class="w-11/12">
          <a
            @click="onSeat(data)"
            v-for="(data, index) in seatData"
            :key="index"
            class="inline-block border border-blue-500 rounded hover:bg-gray-200 py-1 px-3 text-white mx-4"
          >
            <p>{{ data.seats }}</p>
          </a>
        </div>
      </div>

      <div class="flex flex-wrap mt-5 text-lg">
        <div class="w-1/12">
          <span>Select:</span>
        </div>
        <div class="w-11/12">
          <vs-chip
            @click="remove(chip)"
            v-for="(chip, index) in chips"
            :key="index"
            closable
            color="primary"
            class="py-1 px-3 mx-4"
          >{{ chip }}</vs-chip>
        </div>
      </div>
    </div>
    <price-table class="mt-10" />
  </vs-card>
</template>

<script>
import { FormWizard, TabContent } from "vue-form-wizard";
import "vue-form-wizard/dist/vue-form-wizard.min.css";
import PriceTable from "@/views/price/Table.vue";

import { getCategory, getSeats } from "@/http/requests/vehicle/index.js";

export default {
  components: {
    FormWizard,
    TabContent,
    PriceTable
  },
  computed: {
    query() {
      return Object.assign({ category: this.category }, { seat: this.seat })
    }
  },
  watch: {
    category() {
      this.$router.push({
        name: "create_order",
        query: this.query
      });
      this.getSeatData()
    },
    seat() {
      this.$router.push({
        name: "create_order",
        query: this.query
      });
    }
  },
  data() {
    return {
      category: undefined,
      seat: undefined,
      categoryData: [],
      seatData: [],
      chips: ["10 SEAT HIACE / 30 SEAT COASTER", "15"]
    };
  },
  mounted() {
    this.getCategoryData();
    this.getSeatData()
  },
  methods: {
    remove(item) {
      this.chips.splice(this.chips.indexOf(item), 1);
    },
    getCategoryData() {
      getCategory().then(res => {
        this.categoryData = res.result;
      });
    },
    getSeatData() {
      getSeats({ category: this.$route.query.category }).then(res => {
        this.seatData = res.result;
      });
    },
    onCategory(data) {
      this.category = data.id;
    },
    onSeat(data) {
      this.seat = data.seats;
    }
  }
};
</script>