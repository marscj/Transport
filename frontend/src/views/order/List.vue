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
      size="middle"
      :scroll="{ x: '130%' }"
    >
      <template slot="orderId" slot-scope="text, data">
        <router-link :to="{name: 'order_detail', params: {id: data.id}}"><p class="text-gray-700">{{text}}</p></router-link>
      </template>

      <template slot="relatedId" slot-scope="text, data">
        <router-link :to="{name: 'order_detail', params: {id: data.id}}"><pre class="text-gray-700">{{text}}</pre></router-link>
      </template>

      <template slot="create_date" slot-scope="text, data">
        <router-link
          :to="{name: 'order_detail', params: {id: data.id}}"
        ><pre class="text-gray-700">{{ text | moment('YYYY-MM-DD')}}</pre></router-link>
      </template>

      <template slot="start_date" slot-scope="text, data">
        <router-link :to="{name: 'order_detail', params: {id: data.id}}"><pre class="text-gray-700">{{text}}</pre></router-link>
      </template>

      <template slot="end_date" slot-scope="text, data">
        <router-link :to="{name: 'order_detail', params: {id: data.id}}"><pre class="text-gray-700">{{text}}</pre></router-link>
      </template>

      <template slot="o-itinerary" slot-scope="text, data">
        <router-link :to="{name: 'order_detail', params: {id: data.id}}">
          <pre v-for="pre in text" :key="pre.id" class="whitespace-no-wrap font-normal">
            <span class="text-blue-500">{{pre.date | moment('MM-DD')}}</span>
            <span class="text-blue-500" v-if="pre.time">,{{pre.time.substring(0,5)}}</span>
            <span class="text-blue-500">,{{pre.itinerary.name}}</span>
          </pre>
        </router-link>
      </template>

      <template slot="price" slot-scope="text, data">
        <router-link :to="{name: 'order_detail', params: {id: data.id}}">
          <pre v-for="pre in text" :key="pre.id" class="whitespace-no-wrap font-normal text-pink-500">
            <span>{{pre.price}}</span>
          </pre>
        </router-link>
      </template>

      <template slot="payment" slot-scope="text, data">
        <router-link :to="{name: 'order_detail', params: {id: data.id}}">
          <pre v-for="pre in text" :key="pre.id" class="whitespace-no-wrap font-normal text-pink-500">
            <span>{{pre.payment}}</span>
          </pre>
        </router-link>
      </template>

      <template slot="itinerary" slot-scope="text, data">
        <router-link :to="{name: 'order_detail', params: {id: data.id}}">
          <p>Category: {{text.category}}</p>
          <p>Seats: {{text.seats}}</p>
          <p>Passengers: {{text.passenger}}</p>
          <p>Itinerary:</p>
          <pre>{{text.itinerary}}</pre>
        </router-link>
      </template>

      <template slot="vehicle" slot-scope="text, data">
        <router-link
          :to="{name: 'order_detail', params: {id: data.id}}"
          v-if="text"
        ><pre class="text-gray-700">{{text.license_plate}}</pre></router-link>
      </template>

      <template slot="driver" slot-scope="text, data">
        <router-link
          :to="{name: 'order_detail', params: {id: data.id}}"
          v-if="text"
        ><pre class="text-gray-700">{{text.username}}</pre></router-link>
      </template>

      <template slot="driver_phone" slot-scope="text, data">
        <router-link :to="{name: 'order_detail', params: {id: data.id}}" v-if="text"><pre class="text-gray-700">{{text.phone}}</pre></router-link>
      </template>

      <template slot="status" slot-scope="text, data">
        <router-link :to="{name: 'order_detail', params: {id: data.id}}"><pre class="text-gray-700">{{text}}</pre></router-link>
      </template>

      <template slot="customer" slot-scope="text, data">
        <router-link
          :to="{name: 'order_detail', params: {id: data.id}}"
          v-if="text"
        ><pre class="text-gray-700">{{text.username}}</pre></router-link>
      </template>

      <template slot="operator" slot-scope="text, data">
        <router-link
          :to="{name: 'order_detail', params: {id: data.id}}"
          v-if="text"
        ><pre class="text-gray-700">{{text.username}}</pre></router-link>
      </template>

      <template slot="invoice" slot-scope="text">
        <a href="#" v-if="text">invoice</a>
        <pre v-else class="text-gray-700">unknow</pre>
      </template>
    </s-table>
  </vs-card>
</template>

<script>
import { getOrders } from "@/http/requests/order";
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
          scopedSlots: { customRender: "orderId" },
          align: "center",
          width: 80,
          sorter: true
        },
        {
          title: "RELATEDID",
          dataIndex: "relatedId",
          scopedSlots: { customRender: "relatedId" },
          align: "center",
          width: 80,
          sorter: true
        },
        {
          title: "CREATEDATE",
          dataIndex: "create_at",
          scopedSlots: { customRender: "create_date" },
          align: "center",
          width: 110,
          sorter: true
        },
        {
          title: "STARTDATE",
          dataIndex: "start_date",
          scopedSlots: { customRender: "start_date" },
          align: "center",
          width: 110,
          sorter: true
        },
        {
          title: "ENDDATE",
          dataIndex: "end_date",
          scopedSlots: { customRender: "end_date" },
          align: "center",
          width: 110,
          sorter: true
        },
        {
          title: "ITINERARY",
          children: [
            {
              title: "CUSTOMER ",
              scopedSlots: { customRender: "itinerary" },
              width: 350
            },
            {
              title: "ORDER",
              dataIndex: "order_itinerary",
              scopedSlots: { customRender: "o-itinerary" }
            },
            {
              title: "PRICE",
              children: [
                {
                  title: "SELLING PRICE",
                  dataIndex: "order_itinerary",
                  scopedSlots: { customRender: "price" }
                },
                {
                  title: "PAYMENT",
                  dataIndex: "order_itinerary",
                  scopedSlots: { customRender: "payment" }
                }
              ]
            }
          ]
        },
        {
          title: "Vehicle",
          dataIndex: "vehicle",
          scopedSlots: { customRender: "vehicle" },
          align: "center",
          width: 100,
          sorter: true
        },
        {
          title: "Driver",
          dataIndex: "driver",
          scopedSlots: { customRender: "driver" },
          align: "center",
          width: 100,
          sorter: true
        },
        {
          title: "Phone",
          dataIndex: "driver",
          scopedSlots: { customRender: "driver_phone" },
          align: "center",
          width: 100,
          sorter: true
        },
        {
          title: "Status",
          dataIndex: "status",
          scopedSlots: { customRender: "status" },
          align: "center",
          width: 80,
          sorter: true
        },
        {
          title: "Customer",
          dataIndex: "customer",
          scopedSlots: { customRender: "customer" },
          align: "center",
          width: 100,
          sorter: true
        },
        {
          title: "Operator",
          dataIndex: "operator",
          scopedSlots: { customRender: "operator" },
          align: "center",
          width: 100,
          sorter: true
        },
        {
          title: "Invoice",
          dataIndex: "invoice_id",
          scopedSlots: { customRender: "invoice" },
          align: "center",
          width: 100,
          sorter: true
        }
      ],
      loadData: parameter => {
        return getOrders(Object.assign(parameter, this.filter)).then(res => {
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

