<template>
  <vs-card id="data-list-thumb-view" class="data-list-container">
    <vx-table ref="table" pagination search :data="loadData" :page_size="page_size">
      <div slot="header" class="flex flex-wrap-reverse items-center flex-grow justify-between">
        <vs-button
          type="border"
          icon-pack="feather"
          icon="icon-plus"
          @click="addNewData"
          v-if="myOrder"
        >Add New</vs-button>
        <div v-else></div>

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

      <template slot="thead" >
        <vs-th key="orderId">ORDERID</vs-th>
        <vs-th key="relatedId" >RELATEDID</vs-th>
        <vs-th key="start_date" >STARTDATE</vs-th>
        <vs-th key="end_date" >ENDDATE</vs-th>
        <vs-th key="itinerary" style="width:500px;">ITINERARY</vs-th>
        <vs-th >ITINERARY</vs-th>
        <vs-th key="vehicle">VEHICLE</vs-th>
        <vs-th key="driver">DRIVER</vs-th>
        <vs-th key="driver_phone">PHONE</vs-th>
        <vs-th key="remark">REMARK</vs-th>
      </template>

      <template slot-scope="{data}" >
        <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data" :activeEdit="true" class="text-xs whitespace-pre-wrap">
          <vs-td :data="tr.orderId">
            <a v-if="tr.orderId">{{ tr.orderId }}</a>
          </vs-td>
          <vs-td :data="tr.relatedId">
            <a v-if="tr.relatedId">{{ tr.relatedId }}</a>
          </vs-td>
          <vs-td :data="tr.start_date">
            <a v-if="tr.start_date">{{ tr.start_date | moment('MM-DD') }}</a>
          </vs-td>
          <vs-td :data="tr.end_date">
            <a v-if="tr.end_date">{{ tr.end_date | moment('MM-DD') }}</a>
          </vs-td>
          <vs-td :data="tr.itinerary">
            <a v-if="tr.itinerary" >{{ tr.itinerary }}</a>
          </vs-td> 
          <vs-td :data="tr.itinerary" >
            <a v-if="tr.itinerary">{{ tr.itinerary }}</a>
          </vs-td>
          <vs-td :data="tr.vehicle">
            <a v-if="tr.vehicle">{{ tr.vehicle.license_plate }}</a>
          </vs-td>
          <vs-td :data="tr.driver">
            <a v-if="tr.driver">{{ tr.driver.username }}</a>
          </vs-td> 
          <vs-td :data="tr.driver">
            <a v-if="tr.driver">{{ tr.driver.phone }}</a>
          </vs-td>
          <vs-td :data="tr.remark">
            <a v-if="tr.remark">{{ tr.remark }}</a>
          </vs-td>
        </vs-tr>
      </template>
    </vx-table>
  </vs-card>
</template>

<script>
import { getOrder } from "@/http/requests/order/index.js";
// import moment from "moment";

export default {
  props: {
    myOrder: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isMounted: false,
      page_size: 10,
      loadData: parameter => {
        return getOrder(Object.assign(parameter, this.filter)).then(res => {
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
    },
    filter() {
      return this.myOrder ? { customer__id: this.$store.state.auth.id } : {};
    }
  },
  mounted() {
    this.isMounted = true;
  },
  methods: {
    addNewData() {
      this.$router.push({
        name: "create_order"
      });
    }
  }
};
</script>
