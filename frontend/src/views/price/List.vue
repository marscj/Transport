<template>
  <vs-card id="data-list-thumb-view" class="data-list-container">
    <data-view-sidebar
      :isSidebarActive="addNewDataSidebar"
      @closeSidebar="toggleDataSidebar"
      :data="sidebarData"
    />

    <vx-table ref="table" :data="loadData">
      <template slot="thead">
        <vs-th style-key="id" style="width: 80px;">ID</vs-th>
        <vs-th key="category">CATEGORY</vs-th>
        <vs-th key="itinerary">ITINERARY</vs-th>
        <vs-th key="price">PRICE(AED)</vs-th>
      </template>

      <template slot-scope="{data}">
        <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data" :activeEdit="true">
          <vs-td :data="tr.id">
            <span v-if="tr.id">{{ tr.id }}</span>
          </vs-td>
          <vs-td :data="tr.category">
            <a @click="editData(tr)" v-if="tr.category">{{ tr.category.name }}</a>
          </vs-td>
          <vs-td :data="tr.itinerary">
            <a @click="editData(tr)" v-if="tr.itinerary">{{ tr.itinerary.name }}</a>
          </vs-td>
          <vs-td :data="tr.price">
            <a @click="editData(tr)" v-if="tr.price">{{ tr.price }}</a>
          </vs-td>
        </vs-tr>
      </template>
    </vx-table>
  </vs-card>
</template>

<script>
import { getPrice } from "@/http/requests/vehicle/index.js";
import DataViewSidebar from "./DataViewSidebar.vue";

export default {
  components: {
    DataViewSidebar
  },
  data() {
    return {
      page_size: 10,
      addNewDataSidebar: false,
      sidebarData: {},
      selected: [],
      loadData: parameter => {
        return getPrice(Object.assign(parameter, {})).then(res => {
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
      this.sidebarData = data;
      this.toggleDataSidebar(true);
    },
    toggleDataSidebar(val = false) {
      this.addNewDataSidebar = val;
      this.$refs.table.refresh();
    }
  }
};
</script>

<style lang="scss">
#data-list-thumb-view {
  .vs-con-table {
    .vs-table--header {
      display: flex;
      flex-wrap: wrap-reverse;
      margin-left: 1rem;
      margin-right: 1rem;
      > span {
        display: flex;
        flex-grow: 1;
      }

      .vs-table--search {
        padding-top: 2;

        .vs-table--search-input {
          padding: 0.9rem 2.5rem;
          font-size: 1rem;

          & + i {
            left: 1rem;
          }

          &:focus + i {
            left: 1rem;
          }
        }
      }
    }

    .vs-table {
      border-collapse: collapse;
      // border-collapse: separate;
      // border-spacing: 10px 2px;
      // padding: 10px;
      tr {
        // box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.05);
        td {
          padding: 20px;
        }
        td.td-check {
          padding: 20px !important;
        }
      }
      th,
      tr,
      td {
        border: 1px solid #e8e8e8;
      }
    }

    .vs-table--thead {
      th {
        padding-top: 20;
        padding-bottom: 20;

        .vs-table-text {
          text-transform: uppercase;
          font-weight: 600;
        }
      }
      th.td-check {
        padding: 0 15px !important;
      }
      tr {
        background: none;
        box-shadow: none;
      }
    }

    .vs-table--pagination {
      justify-content: center;
    }
  }
}
</style>
