<template>
  <vs-card>
    <div class="px-4">
      <div class="flex flex-wrap mt-5 text-base">
        <div class="w-1/12 py-1">
          <span>Category:</span>
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
          <span>Seats:</span>
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
    </div>

    <price-table class="mt-10" :parameter="query" />
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
      return Object.assign({ category: this.category }, { seat: this.seat });
    }
  },
  watch: {
    category() {
      this.$router.push({
        name: "create_order",
        query: this.query
      });
      this.seat = undefined;
      this.getSeatData();
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
      seatData: []
    };
  },
  mounted() {
    this.getCategoryData();
    this.getSeatData();
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

Array.prototype.pushNoRepeat = function() {
  for (var i = 0; i < arguments.length; i++) {
    var ele = arguments[i];
    if (this.indexOf(ele) == -1) {
      this.push(ele);
    }
  }
};
</script>