<template>
  <vs-card id="data-list-thumb-view" class="data-list-container">
    <data-view-sidebar
      :isSidebarActive="addNewDataSidebar"
      @closeSidebar="toggleDataSidebar"
      :data="sidebarData"
    />

    <vx-table ref="table" :data="loadData">
      <div slot="header" class="flex flex-wrap-reverse items-center flex-grow justify-between py-4">
        <vs-button type="border" icon-pack="feather" icon="icon-plus" @click="addNewData" v-action:add>Add New</vs-button>
      </div> 

      <template slot="thead">
        <vs-th key="id" style="width: 80px;">ID</vs-th>
        <vs-th key="name">NAME</vs-th>
        <vs-th style="width: 80px;" v-action:delete >Action</vs-th>
      </template>

      <template slot-scope="{data}">
        <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data" :activeEdit="true">
          <vs-td :data="tr.id">
            <span v-if="tr.id">{{ tr.id }}</span>
          </vs-td>
          <vs-td :data="tr.name">
            <a @click="editData(tr)" v-if="tr.name">{{ tr.name }}</a>
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
import {
  getItinerary,
  deleteItinerary
} from "@/http/requests/vehicle/index.js";
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
      if (this.$auth('itinerary.change')) {
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
      deleteItinerary(id).then(() => {
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