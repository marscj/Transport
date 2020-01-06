<template>
  <vs-card>
    
    <a-divider />
    <div class="flex flex-wrap pt-4">
      <div class="px-4">
        <a-form-item label="CUSTOMER">
          <a-input
            v-model="localQueryParam.customer"
            class="hover:border-teal-500 focus:border-teal-500"
          ></a-input>
        </a-form-item>
      </div>
      <div class="px-4">
        <a-form-item label="START DATE">
          <a-range-picker
            v-model="localQueryParam.start"
            class="hover:border-teal-500 focus:border-teal-500"
          ></a-range-picker>
        </a-form-item>
      </div>

      <div class="px-4">
        <a-form-item label="STATUS">
          <a-select class="w-48" v-model="localQueryParam.status" disabled>
            <a-select-option key="1" value="Confirm">Confirm</a-select-option>
          </a-select>
        </a-form-item>
      </div>
      <div class="px-4">
        <a-form-item>
          <button
            @click="()=>$refs.table.refresh()"
            class="bg-teal-500 hover:bg-teal-700 focus:outline-none text-white font-bold rounded px-6 my-10"
          >Search</button>
        </a-form-item>
      </div>
    </div>

    <s-table
      class="p-4"
      ref="table"
      :rowKey="(record) => record.id"
      :columns="columns"
      :data="loadData"
      size="middle"
    >
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
          <pre
            v-for="pre in text"
            :key="pre.id"
            class="whitespace-no-wrap font-normal text-pink-500"
          >
            <span>{{pre.price}}</span>
          </pre>
        </router-link>
      </template>

      <template slot="payment" slot-scope="text, data">
        <router-link :to="{name: 'order_detail', params: {id: data.id}}">
          <pre
            v-for="pre in text"
            :key="pre.id"
            class="whitespace-no-wrap font-normal text-pink-500"
          >
            <span>{{pre.payment}}</span>
          </pre>
        </router-link>
      </template>
    </s-table>
  </vs-card>
</template>

<script>
import { getOrders } from "@/http/requests/order";
import STable from "@/components/s-table";
import moment from "moment";

export default {
  props: {
    isEdit: Boolean,
    default: () => false
  },
  components: {
    STable
  },
  data() {
    return {
      localQueryParam: {
        status: "Confirm"
      },
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
          title: "STARTDATE",
          dataIndex: "start_date",
          scopedSlots: { customRender: "start_date" },
          align: "center",
          width: 110,
          sorter: true
        },
        {
          title: "VEHICLE",
          dataIndex: "vehicle.license_plate",
          align: "center",
          width: 110,
          sorter: true
        },
        {
          title: "ITINERARY",
          children: [
            {
              title: "ORDER",
              dataIndex: "order_itinerary",
              scopedSlots: { customRender: "o-itinerary" }
            },
            {
              title: "PRICE",
              children: [
                {
                  title: "PRICE(AED)",
                  dataIndex: "order_itinerary",
                  scopedSlots: { customRender: "price" },
                  width: 100
                },
                {
                  title: "PAYMENT(AED)",
                  dataIndex: "order_itinerary",
                  scopedSlots: { customRender: "payment" },
                  width: 100
                }
              ]
            }
          ]
        }
      ],
      loadData: parameter => {
        return getOrders(Object.assign(parameter, this.localQueryParam)).then(
          res => {
            return res.result;
          }
        );
      }
    };
  }
};
</script>