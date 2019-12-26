<template>
  <vs-card id="data-list-thumb-view" class="data-list-container">
    <data-view-sidebar
      :isSidebarActive="addNewDataSidebar"
      @closeSidebar="toggleDataSidebar"
      :data="sidebarData"
    />

    <vx-table ref="table" pagination search :data="loadData" :page_size="page_size">
      <div slot="header" class="flex flex-wrap-reverse items-center flex-grow justify-between">
        <vs-button type="border" icon-pack="feather" icon="icon-plus" @click="addNewData" v-action:add>Add New</vs-button>

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
        <vs-th key="id" style="width: 80px;">ID</vs-th>
        <vs-th key="license_plate">license plate</vs-th>
        <vs-th key="model">model</vs-th>
        <vs-th key="seats">seats</vs-th>
        <vs-th key="driver">driver</vs-th>
        <vs-th key="category">category</vs-th>
        <vs-th key="is_active">active</vs-th>
        <vs-th key="supplier">supplier</vs-th>
        <vs-th style="width: 80px;" v-action:delete >Action</vs-th>
      </template>

      <template slot-scope="{data}">
        <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data" :activeEdit="true">
          <vs-td :data="tr.id">
            <span v-if="tr.id">{{ tr.id }}</span>
          </vs-td>
          <vs-td :data="tr.license_plate">
            <a @click="editData(tr)" v-if="tr.license_plate">{{ tr.license_plate }}</a>
          </vs-td>
          <vs-td :data="tr.model">
            <a @click="editData(tr)" v-if="tr.model">{{ tr.model }}</a>
          </vs-td>
          <vs-td :data="tr.seats">
            <a @click="editData(tr)" v-if="tr.seats">{{ tr.seats }}</a>
          </vs-td>
          <vs-td :data="tr.driver">
            <a @click="editData(tr)" v-if="tr.driver">{{ tr.driver.username }}</a>
          </vs-td>
          <vs-td :data="tr.category">
            <a @click="editData(tr)" v-if="tr.category">{{ tr.category.name }}</a>
          </vs-td>
          <vs-td :data="tr.is_active">
            <vs-checkbox v-model="tr.is_active" :disabled="true" style="float:left;" />
          </vs-td>
          <vs-td :data="tr.supplier">
            <a @click="editData(tr)" v-if="tr.supplier">{{ tr.supplier }}</a>
          </vs-td>
          <vs-td class="whitespace-no-wrap" v-action:delete>
            <feather-icon
              icon="TrashIcon"
              svgClasses="w-5 h-5 hover:text-danger stroke-current"
              class="ml-2"
              @click.stop="openConfirm(tr.id)"
            />
          </vs-td>
        </vs-tr>
      </template>
    </vx-table>
  </vs-card>
</template>

<script>
import { getVehicle, deleteVehicle } from "@/http/requests/vehicle/index.js";
import DataViewSidebar from "./DataViewSidebar.vue";

export default {
  components: {
    DataViewSidebar
  },
  data() {
    return {
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
      if(this.$auth('vehicle.change')) {
        this.sidebarData = data;
        this.toggleDataSidebar(true);
      }
    },
    toggleDataSidebar(val = false) {
      this.addNewDataSidebar = val;
      if(!val) {
        this.$refs.table.refresh();
      }
    },
    deleteData(id) {
      deleteVehicle(id).then(() => {
        this.$refs.table.refresh();
      });
    },
    openConfirm(id) {
      this.$vs.dialog({
        type: "confirm",
        color: "danger",
        title: `Confirm`,
        text: "Are you sure delete?",
        accept: () => this.deleteData(id)
      });
    }
  }
};
</script>