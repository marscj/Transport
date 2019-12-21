<template>
  <vs-card id="data-list-thumb-view" class="data-list-container">
    <data-view-sidebar
      :isSidebarActive="addNewDataSidebar"
      @closeSidebar="toggleDataSidebar"
      :data="sidebarData"
    />

    <vx-table ref="table" pagination search :data="loadData" :page_size="page_size">
      <div slot="header" class="flex flex-wrap-reverse items-center flex-grow justify-between">
        <vs-button type="border" icon-pack="feather" icon="icon-plus" @click="addNewData">Add New</vs-button>
      </div>

      <template slot="thead">
        <vs-th style-key="id" style="width: 80px;">ID</vs-th>
        <vs-th key="name">NAME</vs-th>
      </template>

      <template slot-scope="{data}">
        <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data" :activeEdit="true">
          <vs-td :data="data[indextr].id">{{ data[indextr].id }}</vs-td>
          <vs-td :data="data[indextr].name">
            <a @click="editData(data[indextr])">{{ data[indextr].name }}</a>
          </vs-td>
        </vs-tr>
      </template>
    </vx-table>
  </vs-card>
</template>

<script>
import { getItinerary } from "@/http/requests/vehicle/index.js";
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
        return getItinerary(Object.assign(parameter, {})).then(res => {
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
