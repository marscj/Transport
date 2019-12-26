<template>
  <div id="data-list-thumb-view" class="data-list-container">
    <data-view-sidebar
      :isSidebarActive="addNewDataSidebar"
      @closeSidebar="toggleDataSidebar"
      :data="sidebarData"
      v-if="showSidebar"
    />

    <vx-table ref="table" :data="loadData" >
      <template slot="thead" v-if="showThead">
        <vs-th key="id" style="width: 80px;">ID</vs-th>
        <vs-th key="category">CATEGORY</vs-th>
        <vs-th key="itinerary">ITINERARY</vs-th>
        <vs-th key="price">PRICE(AED)</vs-th>
      </template>

      <template slot-scope="{data}">
        <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data" :activeEdit="true">
          <vs-td :data="tr.id" v-if="showID">
            <span v-if="tr.id">{{ tr.id }}</span>
          </vs-td>
          <vs-td :data="tr.category" >
            <a @click="editData(tr)" v-if="tr.category">{{ tr.category.name }}</a>
          </vs-td>
          <vs-td :data="tr.itinerary">
            <a @click="editData(tr)" v-if="tr.itinerary">{{ tr.itinerary.name }}</a>
          </vs-td>
          <vs-td :data="tr.price" >
            <a @click="editData(tr)" v-if="tr.price">{{ tr.price }} AED</a>
          </vs-td>
        </vs-tr>
      </template>
    </vx-table>
  </div>
</template>

<script>
import { getPrice } from "@/http/requests/vehicle/index.js";
import DataViewSidebar from "./DataViewSidebar.vue";

export default {
  name: 'PriceTable',
  components: {
    DataViewSidebar
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
    showThead: {
      type: Boolean,
      default: true
    },
    showID: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    category() {
      this.$refs.table.refresh()
    }
  },
  data() {
    return {
      page_size: 10,
      addNewDataSidebar: false,
      sidebarData: {},
      selected: [],
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
      if(this.$auth('price.change')) {
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