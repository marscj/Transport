<template>
  <vs-card id="data-list-thumb-view" class="data-list-container">
    <div slot="header">
      <div class="flex flex-wrap">
        <div class="p-4">
          <p class="pb-2 font-bold">OrderID:</p>
          <vs-input />
        </div>
        <div class="p-4">
          <p class="pb-2 font-bold">RelatedID:</p>
          <vs-input />
        </div>
        <div class="p-4">
          <p class="pb-2 font-bold">Start Date:</p>
          <vs-input />
        </div>
        <div class="p-4">
          <p class="pb-2 font-bold">End Date:</p>
          <vs-input />
        </div>
        <div class="p-4">
          <p class="pb-2 font-bold">Vehicle:</p>
          <vs-input />
        </div>
        <div class="p-4">
          <p class="pb-2 font-bold">Driver:</p>
          <vs-input />
        </div>
        <div class="p-4" v-if="!myOrder">
          <p class="pb-2 font-bold">Customer:</p>
          <vs-input />
        </div>
        <div class="p-4">
          <p class="pb-2 font-bold">Status:</p>
          <vs-input />
        </div>
        <div class="p-4">
          <vs-button class="mt-8">Search</vs-button>
        </div>
      </div>
    </div>

    <vx-table ref="table" pagination :data="loadData" :page_size="page_size">
      <div slot="header" class="flex flex-wrap-reverse items-center flex-grow justify-between py-6">
        <vs-button
          type="border"
          icon-pack="feather"
          icon="icon-plus"
          @click="addNewData"
          v-if="myOrder"
        >Add New</vs-button>

        <vs-dropdown vs-trigger-click class="cursor-pointer">
          <div
            class="p-2 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium"
          >
            <span
              class="mr-4"
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
        <vs-th key="orderId" class="w-32">ORDERID</vs-th>
        <vs-th key="relatedId" class="w-32">RELATEDID</vs-th>
        <vs-th key="start_date" class="w-28">START</vs-th>
        <vs-th key="end_date" class="w-28">END</vs-th>
        <vs-th key="itinerary" class="w-96">ITINERARY</vs-th>
        <vs-th key="order_itinerary" class="w-96">ITINERARY</vs-th>
        <vs-th key="vehicle" class="w-40">VEHICLE</vs-th>
        <vs-th key="driver" class="w-40">DRIVER</vs-th>
        <vs-th key="driver_phone" class="w-40">PHONE</vs-th>
        <vs-th key="remark" class="w-64">REMARK</vs-th>
      </template>

      <template slot-scope="{data}">
        <vs-tr
          :data="tr"
          :key="indextr"
          v-for="(tr, indextr) in data"
          :activeEdit="true"
          class="text-xs whitespace-pre-wrap"
        >
          <vs-td :data="tr.orderId">
            <a v-if="tr.orderId">{{ tr.orderId }}</a>
          </vs-td>
          <vs-td :data="tr.relatedId">
            <a v-if="tr.relatedId">{{ tr.relatedId }}</a>
          </vs-td>
          <vs-td :data="tr.start_date">
            <a v-if="tr.start_date">{{ tr.start_date | moment('YY-MM-DD') }}</a>
          </vs-td>
          <vs-td :data="tr.end_date">
            <a v-if="tr.end_date">{{ tr.end_date | moment('YY-MM-DD') }}</a>
          </vs-td>
          <vs-td :data="tr.itinerary">
            <a v-if="tr.itinerary">
              <p>
                Category:
                <span>{{tr.category}}</span>
              </p>
              <p>
                Seats:
                <span>{{tr.seats}}</span>
              </p>
              <p>Itinerary:</p>
              <p>{{tr.itinerary}}</p>
            </a>
          </vs-td>
          <vs-td :data="tr.order_itinerary">
            <a v-if="tr.order_itinerary">{{ tr.order_itinerary }}</a>
          </vs-td>
          <vs-td :data="tr.vehicle">
            <a v-if="tr.vehicle">{{ tr.vehicle }}</a>
          </vs-td>
          <vs-td :data="tr.driver">
            <a v-if="tr.driver">{{ tr.driver }}</a>
          </vs-td>
          <vs-td :data="tr.driver_phone">
            <a v-if="tr.driver_phone">{{ tr.driver_phone }}</a>
          </vs-td>
          <vs-td :data="tr.remark">
            <a v-if="tr.remark">{{ tr.remark }}</a>
          </vs-td>
        </vs-tr>
      </template>
    </vx-table>

    <va-table />
  </vs-card>
</template>

<script>
import { getOrder } from "@/http/requests/order/index.js";


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

