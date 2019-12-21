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

        <vs-dropdown vs-trigger-click class="cursor-pointer mr-4">
          <div
            class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium"
          >
            <span
              class="mr-6"
            >{{ currentPage * page_size - (page_size - 1) }} - {{ total - currentPage * page_size > 0 ? currentPage * page_size : total }}</span>
            <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
          </div>
          <vs-dropdown-menu>
            <vs-dropdown-item @click="page_size=10">
              <span>10</span>
            </vs-dropdown-item>
            <vs-dropdown-item @click="page_size=20">
              <span>20</span>
            </vs-dropdown-item>
            <vs-dropdown-item @click="page_size=50">
              <span>50</span>
            </vs-dropdown-item>
            <vs-dropdown-item @click="page_size=100">
              <span>100</span>
            </vs-dropdown-item>
          </vs-dropdown-menu>
        </vs-dropdown>
      </div>

      <template slot="thead">
        <vs-th style-key="id" style="width: 80px;">ID</vs-th>
        <vs-th style-key="license_plate">license plate</vs-th>
        <vs-th style-key="seat">seat</vs-th>
        <vs-th style-key="driver">driver</vs-th>
        <vs-th style-key="seats">seats</vs-th>
        <vs-th style-key="is_active">active</vs-th>
      </template>

      <template slot-scope="{data}">
        <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data" :activeEdit="true">
          <vs-td :data="tr.id">
            <span v-if="tr.id">{{ tr.id }}</span>
          </vs-td>
          <vs-td :data="tr.license_plate">
            <a @click="editData(tr)" v-if="tr.license_plate">{{ tr.license_plate }}</a>
          </vs-td>
          <vs-td :data="tr.seats">
            <a @click="editData(tr)" v-if="tr.seats">{{ tr.seats }}</a>
          </vs-td>
          <vs-td :data="tr.driver">
            <a @click="editData(tr)" v-if="tr.driver">{{ tr.driver }}</a>
          </vs-td>
          <vs-td :data="tr.seat">
            <a @click="editData(tr)" v-if="tr.seat">{{ tr.seat }}</a>
          </vs-td>
          <vs-td :data="tr.is_active">
            <vs-checkbox v-model="tr.is_active" :disabled="true" style="float:left;" />
          </vs-td>
        </vs-tr>
      </template>
    </vx-table>
  </vs-card>
</template>

<script>
import { getVehicle } from "@/http/requests/vehicle/index.js";
import DataViewSidebar from "./DataViewSidebar.vue";

const UserType = [
  { value: 1, label: "Customer" },
  { value: 2, label: "Driver" },
  { value: 3, label: "Operator" },
  { value: 4, label: "Accounting" }
];

export default {
  components: {
    DataViewSidebar
  },
  data() {
    return {
      UserType,
      isMounted: false,
      page_size: 10,
      addNewDataSidebar: false,
      sidebarData: {},
      selected: [],
      loadData: parameter => {
        return getVehicle(Object.assign(parameter, {})).then(res => {
          return res.result;
        });
      }
    };
  },
  computed: {
    currentPage() {
      return this.isMounted ? this.$refs.table.page : 0;
    },
    total() {
      return this.isMounted ? this.$refs.table.total : 0;
    }
  },
  mounted() {
    this.isMounted = true;
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
