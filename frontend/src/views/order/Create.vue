<template>
  <vs-card>
    <div class="px-4">
      <div class="flex flex-wrap mt-5 text-lg">
        <div class="w-1/12">
          <span>Category:</span>
        </div>
        <div class="w-11/12">
          <a href v-for="data in categoryData" :key="data.id" class="h-12 px-4 inline-block">
            <p>{{ data.name }}</p>
          </a>
        </div>
      </div>
      <div class="flex flex-wrap mt-5 text-lg">
        <div class="w-1/12">
          <span>Seats:</span>
        </div>
        <div class="w-11/12">
          <a href v-for="(data, index) in seatData" :key="index" class="h-12 mx-4 inline-block">
            <p>{{ data.seats }}</p>
          </a>
        </div>
      </div>

      <div class="flex flex-wrap mt-5 text-lg">
        <div class="w-1/12">
          <span>Select:</span>
        </div>
        <div class="w-11/12">
          <vs-chip @click="remove(chip)" v-for="(chip, index) in chips" :key="index" closable color="primary" class="h-8 mx-4">
            {{ chip }}
          </vs-chip>
        </div>
      </div>
    </div>

    <price-view class="mt-10" />
  </vs-card>
</template>

<script>
import { FormWizard, TabContent } from "vue-form-wizard";
import "vue-form-wizard/dist/vue-form-wizard.min.css";
import PriceView from "@/views/price/List.vue";

import { getCategory, getSeats } from "@/http/requests/vehicle/index.js";

export default {
  components: {
    FormWizard,
    TabContent,
    PriceView
  },
  data() {
    return {
      categoryData: [],
      seatData: [],
      chips:[
        '10 SEAT HIACE / 30 SEAT COASTER',
        '15',
      ],
    };
  },
  mounted() {
    this.getCategoryData();
  },
  methods: {
    remove (item) {
      this.chips.splice(this.chips.indexOf(item), 1)
    },
    getCategoryData() {
      getCategory()
        .then(res => {
          this.categoryData = res.result;
          return getSeats();
        })
        .then(res => {
          this.seatData = res.result;
        });
    }
  }
};
</script>