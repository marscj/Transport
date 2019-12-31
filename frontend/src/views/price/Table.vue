<template>
  <div id="data-list-thumb-view" class="data-list-container">
    <data-view-sidebar
      :isSidebarActive="addNewDataSidebar"
      @closeSidebar="toggleDataSidebar"
      :data="sidebarData"
      v-if="showSidebar"
    />

    <s-table
      class="p-4"
      ref="table"
      :columns="columns"
      :data="loadData"
      :showPagination="false"
      :rowKey="(record) => record.id"
    >
      <template slot="itinerary" slot-scope="text, data">
        <a @click="editData(data)" v-if="text">{{ text.name }}</a>
      </template>

      <template slot="category" slot-scope="text, data">
        <a @click="editData(data)" v-if="text">{{ text.name }}</a>
      </template>

      <template slot="price" slot-scope="text, data">
        <a @click="editData(data)" v-if="text">{{ text }} AED</a>
      </template>
      
    </s-table>
  </div>
</template>

<script>
import { getPrice } from "@/http/requests/vehicle/index.js";
import DataViewSidebar from "./DataViewSidebar.vue";
import STable from "@/components/s-table";

export default {
  name: 'PriceTable',
  components: {
    DataViewSidebar,
    STable
  },
  props: {
    category: {
      type: Number,
      default: undefined
    },
    showSidebar: {
      type: Boolean,
      default: true
    },
  },
  watch: {
    category() {
      this.$refs.table.refresh()
    }
  },
  data() {
    return {
      columns: [
        {
          title: "Itinerary",
          dataIndex: "itinerary",
          scopedSlots: { customRender: "itinerary" }
        },
        {
          title: "Category",
          dataIndex: "category",
          scopedSlots: { customRender: "category" }
        },
        {
          title: "Price",
          dataIndex: "price",
          scopedSlots: { customRender: "price" }
        },
      ],
      addNewDataSidebar: false,
      sidebarData: {},
      loadData: parameter => {
        return getPrice(Object.assign(parameter, { category: this.category })).then(res => {
          return res.result;
        });
      }
    };
  },
  methods: {
    addNewData() {
      this.sidebarData = {};
      this.toggleDataSidebar(true);
    },
    editData(data) {
      if(this.$auth('price.change_price')) {
        this.sidebarData = data;
        this.toggleDataSidebar(true);
      }
    },
    toggleDataSidebar(val = false) {
      this.addNewDataSidebar = val;
      if (!val) {
        this.$refs.table.refresh();
      }
    }
  }
};
</script>