<template>
  <vs-card>
    <div>
      <div class="flex flex-wrap pt-4">
        <div class="px-4">
          <a-form-item label="ORDERID">
            <a-input class="hover:border-teal-500 focus:border-teal-500"></a-input>
          </a-form-item>
        </div>
        <div class="px-4">
          <a-form-item label="RELATEDID">
            <a-input class="hover:border-teal-500 focus:border-teal-500"></a-input>
          </a-form-item>
        </div>
        <div class="px-4">
          <a-form-item label="START DATE">
            <a-date-picker class="hover:border-teal-500 focus:border-teal-500"></a-date-picker>
          </a-form-item>
        </div>
        <div class="px-4">
          <a-form-item label="END DATE">
            <a-date-picker class="hover:border-teal-500 focus:border-teal-500"></a-date-picker>
          </a-form-item>
        </div>
        <div class="px-4">
          <a-form-item label="VEHICLE">
            <a-input class="hover:border-teal-500 focus:border-teal-500"></a-input>
          </a-form-item>
        </div>
        <div class="px-4">
          <a-form-item label="DRIVER">
            <a-input class="hover:border-teal-500 focus:border-teal-500"></a-input>
          </a-form-item>
        </div>
        <div class="px-4" v-if="!myOrder">
          <a-form-item label="CUSTOMER">
            <a-input class="hover:border-teal-500 focus:border-teal-500"></a-input>
          </a-form-item>
        </div>
        <div class="px-4">
          <a-form-item label="STATUS">
            <a-input class="hover:border-teal-500 focus:border-teal-500"></a-input>
          </a-form-item>
        </div>
        <div class="px-4">
          <a-form-item>
            <button
              class="bg-teal-500 hover:bg-teal-700 focus:outline-none text-white font-bold rounded px-6 my-10"
            >Search</button>
          </a-form-item>
        </div>
      </div>
    </div>

    <div class="px-4" v-if="myOrder">
      <vs-button type="border" icon-pack="feather" icon="icon-plus" @click="addNewData">Add New</vs-button>
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
        <pre>{{data.itinerary}}</pre>
        <!-- <p class="whitespace-pre-line">{{data.itinerary}}</p> -->
      </template>

      <template slot="invoice" slot-scope="data">
        <a href="#" v-if="data">invoice</a>
        <span v-else>unknow</span>
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
          fixed: "left",
          sorter: true,
        },
        {
          title: "RELATEDID",
          dataIndex: "relatedId",
          align: "center",
          width: 80,
          sorter: true,
        },
        {
          title: "CREATEDATE",
          dataIndex: "create_at",
          scopedSlots: { customRender: "create_date" },
          align: "center",
          width: 110,
          sorter: true,
        },
        {
          title: "STARTDATE",
          dataIndex: "start_date",
          align: "center",
          width: 110,
          sorter: true,
        },
        {
          title: "ENDDATE",
          dataIndex: "end_date",
          align: "center",
          width: 110,
          sorter: true,
        },
        {
          title: "CUSTOMER ITINERARY",
          scopedSlots: { customRender: "itinerary" }
        },
        {
          title: "ORDER ITINERARY",
          scopedSlots: { customRender: "o_itinerary" }
        },
        {
          title: "PRICE",
          scopedSlots: { customRender: "price" }
        },
        {
          title: "Vehicle",
          dataIndex: "vehicle",
          align: "center",
          width: 100,
          sorter: true,
        },
        {
          title: "Driver",
          dataIndex: "driver",
          align: "center",
          width: 100,
          sorter: true,
        },
        {
          title: "Phone",
          dataIndex: "driver_phone",
          align: "center",
          width: 100,
          sorter: true,
        },
        {
          title: "Status",
          dataIndex: "status",
          align: "center",
          width: 80,
          sorter: true,
        },
        {
          title: "Customer",
          dataIndex: "customer",
          align: "center",
          width: 100,
          sorter: true,
        },
        {
          title: "Operator",
          dataIndex: "operator",
          align: "center",
          width: 100,
          sorter: true,
        },
        {
          title: "Invoice",
          dataIndex: "invoice_id",
          scopedSlots: { customRender: "invoice" },
          align: "center",
          width: 100,
          sorter: true,
        }
      ],
      page_size: 10,
      loadData: parameter => {
        return getOrder(Object.assign(parameter, this.filter)).then(res => {
          console.log(res, '=--=')
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

