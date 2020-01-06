<template>
  <vs-card class="py-4">
    <validation-observer ref="observer" v-slot="{ validate, dirty }">
      <div class="flex flex-wrap">
        <div class="flex-1 px-4">
          <a-form-item label="Customer" >
            <a-select v-model="formData.customer" class="w-full" :disabled="isEdit">
              <a-select-option v-for="data in customerData" :key="data.id" :value="data">{{data.username}}</a-select-option>
            </a-select>
          </a-form-item>
        </div>
        <div class="flex-1 px-4">
          <a-form-item label="Date">
            <a-range-picker v-model="selectDate"></a-range-picker>
          </a-form-item>
        </div>
        <div class="flex-1 px-4">
          <a-form-item label="Status">
            <a-select v-model="formData.status" class="w-full">
              <a-select-option key="1" value="Unpaid">Unpaid</a-select-option>
              <a-select-option key="2" value="Paid">Paid</a-select-option>
            </a-select>
          </a-form-item>
        </div>
        <div class="flex-1 px-4">
          <a-form-item label="Remark">
            <a-textarea v-model="formData.remark" class="w-full"></a-textarea>
          </a-form-item>
        </div>
        <validation-provider name="non_field_errors" v-slot="{ errors }">
          <span>{{ errors[0] }}</span>
        </validation-provider>
      </div>
    </validation-observer>

    <s-table
      ref="table"
      class="px-4"
      :rowKey="(record) => record.id"
      :columns="columns"
      :data="loadData"
      :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
      :showPagination="false"
    >
      <template slot="orderId" slot-scope="text, data">
        <router-link :to="{name: 'order_detail', params: {id: data.id}}">
          <p class="text-gray-700">{{text}}</p>
        </router-link>
      </template>

      <template slot="relatedId" slot-scope="text, data">
        <router-link :to="{name: 'order_detail', params: {id: data.id}}">
          <pre class="text-gray-700">{{text}}</pre>
        </router-link>
      </template>

      <template slot="start_date" slot-scope="text, data">
        <router-link :to="{name: 'order_detail', params: {id: data.id}}">
          <pre class="text-gray-700">{{text}}</pre>
        </router-link>
      </template>

      <template slot="vehicle" slot-scope="text, data">
        <router-link :to="{name: 'order_detail', params: {id: data.id}}" v-if="text">
          <pre class="text-gray-700">{{text.license_plate}}</pre>
        </router-link>
      </template>

      <template slot="category" slot-scope="text, data">
        <router-link :to="{name: 'order_detail', params: {id: data.id}}" v-if="text">
          <pre class="text-gray-700">{{text}}</pre>
        </router-link>
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

      <template slot="total" slot-scope="text, data">
        <router-link :to="{name: 'order_detail', params: {id: data.id}}">
          <pre> <span>{{text}}</span></pre>
        </router-link>
      </template>
    </s-table>

    <div class="flex flex-wrap">
      <div class="p-4" v-if="!isEdit">
        <a-button type="primary" @click="createInvoiceData()">Create</a-button>
      </div>
      <div class="p-4" v-else>
        <a-button type="primary" @click="updateInvoiceData()">Update</a-button>
      </div>
    </div>
  </vs-card>
</template>

<script>
import { getOrders } from "@/http/requests/order";
import { getUser } from "@/http/requests/user";
import {
  getInvoice,
  createInvoice,
  updateInvoice
} from "@/http/requests/invoice";
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
      formData: {
        status: "Unpaid"
      },
      localQueryParam: {
        status: "Confirm"
      },
      selectedRowKeys: [],
      customerData: [],
      selectDate: [],
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
          dataIndex: "vehicle",
          scopedSlots: { customRender: "vehicle" },
          align: "center",
          width: 110,
          sorter: true
        },
        {
          title: "CATEGORY",
          dataIndex: "category",
          scopedSlots: { customRender: "category" },
          align: "center",
          width: 200,
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
                  align: "center",
                  width: 100
                },
                {
                  title: "PAYMENT(AED)",
                  dataIndex: "order_itinerary",
                  scopedSlots: { customRender: "payment" },
                  align: "center",
                  width: 100
                },
                {
                  title: "TOTAL(AED)",
                  dataIndex: "total",
                  scopedSlots: { customRender: "total" },
                  align: "center",
                  width: 100
                }
              ]
            }
          ]
        },
        {
          title: "CUSTOMER",
          dataIndex: "customer.username",
          align: "center",
          width: 200,
          sorter: true
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
  },
  mounted() {
    if (this.isEdit) {
      this.getInvoiceData();
    }
    this.getCustomerData()
  },
  watch: {
    selectDate(value) {

      if(value && value[0] && value[1]) {
        let start = moment(value[0]).format("YYYY-MM-DD");
        let end = moment(value[1]).format("YYYY-MM-DD");
        this.formData.start_date = start;
        this.formData.end_date = end;
      }
    }
  },
  methods: {
    getCustomerData() {
      getUser({ role: "Customer" }).then(res => {
        this.customerData = res.result;
      });
    },
    onSelectChange(selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys;
    },
    getInvoiceData() {
      getInvoice(this.$route.params.id).then(res => {
        this.formData = res.result;
        this.selectedRowKeys = this.formData.order;
        this.selectDate[0] = moment(this.formData.start_date);
        this.selectDate[1] = moment(this.formData.end_date);
      });
    },
    createInvoiceData() {
      createInvoice({
        status: this.formData.status,
        start_date: this.formData.start_date,
        end_date: this.formData.end_date,
        remark: this.formData.remark,
        customer_id: this.formData.customer ? this.formData.customer.id : null,
        order: this.selectedRowKeys
      }).then(res => {
        this.$router.replace({
          name: "invoice_detail",
          params: { id: res.result.id }
        });
      });
    },
    updateInvoiceData() {
      updateInvoice(this.$route.params.id, {
        status: this.formData.status,
        start_date: this.formData.start_date,
        end_date: this.formData.end_date,
        remark: this.formData.remark,
        customer_id: this.formData.customer ? this.formData.customer.id : null,
        order: this.selectedRowKeys
      }).then(res => {});
    },
    initDate(data) {

    }
  }
};
</script>