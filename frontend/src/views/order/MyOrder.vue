<template>
  <my-order :canCreate="true"/>
</template>

<script>
import { getOrder } from "@/http/requests/order/index.js";
import MyOrder from "./List.vue";

export default {
  components: {
    MyOrder
  },
  data() {
    return {
      
    };
  },
  computed: {
   
  },

  methods: {
  }
};
</script>
