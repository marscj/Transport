<template>
  <vs-card class="shadow-none">
    <div>
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
        <div class="p-3">
          <vs-button class="mt-8">Search</vs-button>
        </div>
      </div>
    </div>

    <s-table
      class="p-4"
      ref="table"
      :rowKey="(record) => record.id"
      :columns="columns"
      :data="loadData"
      :scroll="{ x: 1300 }"
    >
      <template slot="create_date" slot-scope="data">{{ data | moment('YYYY-MM-DD')}}</template>

      <template slot="itinerary" slot-scope="data">
        <p>Category: {{data.category}}</p>
        <p>Seats: {{data.seats}}</p>
        <p>Passengers: {{data.passenger}}</p>
        <p>Itinerary:</p>
        <p class="whitespace-pre-line">{{data.itinerary}}</p>
      </template>

      <template slot="invoice" slot-scope="data">
        <a href="#" v-if="!data">invoice</a>
        <span v-else> unknow</span>
      </template>
    </s-table>
  </vs-card>
</template>

<script>
import { getOrder } from "@/http/requests/order";
import STable from "@/components/s-table";
import moment from "moment";
export default {
  components: {
    STable
  },
  props: {
    myOrder: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      columns: [
        {
          title: "ORDERID",
          dataIndex: "orderId",
          align: "center",
          width: 80,
          fiexd: "left"
        },
        {
          title: "RELATEDID",
          dataIndex: "relatedId",
          align: "center",
          width: 80
        },
        {
          title: "CREATEDATE",
          dataIndex: "create_at",
          scopedSlots: { customRender: "create_date" },
          align: "center",
          width: 110
        },
        {
          title: "STARTDATE",
          dataIndex: "start_date",
          align: "center",
          width: 110
        },
        {
          title: "ENDDATE",
          dataIndex: "end_date",
          align: "center",
          width: 110
        },
        {
          title: "ITINERARY",
          scopedSlots: { customRender: "itinerary" }
        },
        {
          title: "O-ITINERARY",
          scopedSlots: { customRender: "o_itinerary" }
        },
        {
          title: "Vehicle",
          dataIndex: "vehicle",
          align: "center",
          width: 100
        },
        {
          title: "Driver",
          dataIndex: "driver",
          align: "center",
          width: 100
        },
        {
          title: "Phone",
          dataIndex: "driver_phone",
          align: "center",
          width: 100
        },
        {
          title: "Status",
          dataIndex: "status",
          align: "center",
          width: 80
        },
        {
          title: "Customer",
          dataIndex: "customer",
          align: "center",
          width: 100
        },
        {
          title: "Operator",
          dataIndex: "operator",
          align: "center",
          width: 100
        },
        {
          title: "Invoice",
          dataIndex: "invoice_id",
          scopedSlots: { customRender: "invoice" },
          align: "center",
          width: 100
        }
      ],
      page_size: 10,
      loadData: parameter => {
        return getOrder(Object.assign(parameter, this.filter)).then(res => {
          return res.result;
        });
      }
    };
  },
  computed: {
    filter() {
      return this.myOrder ? { customer__id: this.$store.state.auth.id } : {};
    }
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

