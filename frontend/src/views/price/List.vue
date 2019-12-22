<template>
  <vs-card id="data-list-thumb-view" class="data-list-container">
    <price-table />
  </vs-card>
</template>

<script>
import PriceTable from "@/views/price/Table.vue";

export default {
  components: {
    PriceTable
  },
};
</script>