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
          <a href class="h-12 px-4 inline-block">
            <p>10</p>
          </a>
          <a href class="h-12 px-4 inline-block">
            <p>15</p>
          </a>
          <a href class="h-12 px-4 inline-block">
            <p>30</p>
          </a>
          <a href class="h-12 px-4 inline-block">
            <p>33</p>
          </a>
          <a href class="h-12 px-4 inline-block">
            <p>35</p>
          </a>
          <a href class="h-12 px-4 inline-block">
            <p>37</p>
          </a>
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

import { getCategory } from "@/http/requests/vehicle/index.js";

export default {
  components: {
    FormWizard,
    TabContent,
    PriceView
  },
  data() {
    return {
      categoryData: [],
      seatData:[],
    };
  },
  mounted() {
    this.getCategoryData();
  },
  methods: {
    formSubmitted() {},
    getCategoryData() {
      return getCategory().then(res => {
        this.categoryData = res.result;
      });
    }
  }
};
</script>