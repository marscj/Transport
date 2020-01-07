<template>
  <div>
    <div v-if="!preview">
      <pre v-if="formData.invoiceId" class="py-4">ID: {{formData.invoiceId}}</pre>
      <vs-card class="py-4">
        <validation-observer ref="observer" v-slot="{ validate, dirty }">
          <div class="flex flex-wrap">
            <div class="flex-1 px-4">
              <validation-provider name="customer_id" v-slot="{ errors }">
                <a-form-item label="Customer">
                  <a-select
                    v-model="formData.customer_id"
                    class="w-full"
                    :disabled="isEdit"
                    allowClear
                  >
                    <a-select-option
                      v-for="data in customerData"
                      :key="data.id"
                      :value="data.id"
                    >{{data.username}}</a-select-option>
                  </a-select>
                </a-form-item>
                <span>{{ errors[0] }}</span>
              </validation-provider>
            </div>
            <div class="flex-1 px-4">
              <validation-provider name="start_date" v-slot="{ errors }">
                <a-form-item label="Date">
                  <a-range-picker v-model="selectDate" :disabled="isEdit"></a-range-picker>
                </a-form-item>
                <span>{{ errors[0] }}</span>
              </validation-provider>
            </div>
            <div class="flex-1 px-4">
              <validation-provider name="status" v-slot="{ errors }">
                <a-form-item label="Status">
                  <a-select v-model="formData.status" class="w-full">
                    <a-select-option key="1" value="Unpaid">Unpaid</a-select-option>
                    <a-select-option key="2" value="Paid">Paid</a-select-option>
                  </a-select>
                </a-form-item>
                <span>{{ errors[0] }}</span>
              </validation-provider>
            </div>
            <div class="flex-1 px-4">
              <validation-provider name="remark" v-slot="{ errors }">
                <a-form-item label="Remark">
                  <a-textarea v-model="formData.remark" class="w-full"></a-textarea>
                </a-form-item>
                <span>{{ errors[0] }}</span>
              </validation-provider>
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

          <template slot="customer" slot-scope="text, data">
            <router-link :to="{name: 'order_detail', params: {id: data.id}}" v-if="text">
              <pre class="text-gray-700">{{text}}</pre>
            </router-link>
          </template>

          <template slot="invoice" slot-scope="text">
            <router-link :to="{name: 'invoice_detail', params: {id: text.id}}" v-if="text">
              <pre class="text-gray-700">{{text.invoiceId}}</pre>
            </router-link>
            <pre v-else class="text-gray-700">unknow</pre>
          </template>
        </s-table>

        <div class="flex flex-wrap">
          <div class="p-4" v-if="!isEdit">
            <a-button type="primary" @click="createInvoiceData()">Create</a-button>
          </div>
          <div class="p-4" v-else>
            <a-button type="primary" @click="updateInvoiceData()">Update</a-button>
          </div>

          <div class="p-4" v-if="isEdit">
            <a-button type="primary" @click="openPreView()">Preview</a-button>
          </div>
        </div>
      </vs-card>
    </div>

    <div v-else>
      <div id="pdfDom" class="p-10">
        <img src="@/assets/images/title.jpg" class="w-2/3 h-full object-cover" />

        <div class="flex flex-row items-start text-2xl py-10">
          <div class="flex-1 flex-col items-start">
            <pre>Account: {{formData.customer.username}} </pre>
            <pre>Date: {{formData.start_date}} - {{formData.end_date}}</pre>
          </div>
          <div class="flex flex-col items-end">
            <pre>#402 indigo building.international city Dubai</pre>
            <pre>Tel.: +971-4-368-8740 Fax: +971-4-368-8136</pre>
          </div>
        </div>

        <div class="mt-10">
          <table class="table-auto w-full">
            <thead>
              <tr>
                <th class="w-40 text-center py-3">Start Date</th>
                <th class="w-40 text-center py-3">Itinerary</th>
                <th class="w-40 text-center py-3">Vehicle</th>
                <th class="w-40 text-center py-3">Category</th>
                <th class="w-40 text-center py-3">RelatedId</th>
                <th class="w-40 text-center py-3">Payment</th>
              </tr>
            </thead>
            <tbody>
              <template v-for="data in selectedData">
                <tr v-for="(_data) in data.order_itinerary" :key="_data.id">
                  <td
                    class="border px-4 py-3 text-center"
                    :key="index"
                  >{{_data.date}} {{_data.time ? _data.time.substring(0,5): ''}}</td>
                  <td class="border px-4 py-3 text-center" :key="index">{{_data.itinerary.name}}</td>
                  <td
                    class="border px-4 py-3 text-center"
                    :key="index"
                  >{{data.vehicle ? data.vehicle.license_plate : ''}}</td>
                  <td class="border px-4 py-3 text-center" :key="index">{{data.category}}</td>
                  <td class="border px-4 py-3 text-center" :key="index">{{data.relatedId}}</td>
                  <td class="border px-4 py-3 text-center" :key="index">{{_data.payment}}</td>
                </tr>
                <tr :key="data.id">
                  <td class="border"> </td>
                  <td class="border"> </td>
                  <td class="border"> </td>
                  <td class="border"> </td>
                  <td class="border"> </td>
                  <td class="border px-4 py-3 text-center">total: {{data.total}}</td>
                </tr>

                <div class="py-4" :key="data.id"/>
              </template>
            </tbody>
          </table>
        </div>
      </div>
      <div class="p-4" v-if="isEdit">
        <a-button type="primary" @click="getPdf('法律顾问')">Exload</a-button>
      </div>
      <div class="p-4" v-if="isEdit">
        <a-button type="primary" @click="preview = false">Back</a-button>
      </div>
    </div>
  </div>
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
      preview: false,
      formData: {
        status: "Unpaid"
      },
      localQueryParam: {
        status: "Confirm"
      },
      selectedRowKeys: [],
      selectedData: [],
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
          scopedSlots: { customRender: "customer" },
          align: "center",
          width: 100,
          sorter: true
        },
        {
          title: "Invoice",
          dataIndex: "invoice",
          scopedSlots: { customRender: "invoice" },
          align: "center",
          width: 80,
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
    this.getCustomerData();
  },
  watch: {
    selectDate(value) {
      let start = value[0] ? moment(value[0]).format("YYYY-MM-DD") : null;
      let end = value[1] ? moment(value[1]).format("YYYY-MM-DD") : null;
      this.formData.start_date = start;
      this.formData.end_date = end;
      this.localQueryParam = Object.assign(this.localQueryParam, {
        start_0: this.formData.start_date,
        start_1: this.formData.end_date
      });
      this.$refs.table.refresh();
    },
    "formData.customer"(val) {
      this.localQueryParam.customer = val.username;
      this.$refs.table.refresh();
    },
    "formData.status"(val) {
      this.localQueryParam.status = val;
      this.$refs.table.refresh();
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
        this.formData.customer_id = this.formData.customer.id;

        this.localQueryParam = Object.assign(this.localQueryParam, {
          start_0: this.formData.start_date,
          start_1: this.formData.end_date
        });
      });
    },
    createInvoiceData() {
      createInvoice({
        status: this.formData.status,
        start_date: this.formData.start_date,
        end_date: this.formData.end_date,
        remark: this.formData.remark,
        customer_id: this.formData.customer_id,
        order: this.selectedRowKeys
      })
        .then(res => {
          this.$router.replace({
            name: "invoice_detail",
            params: { id: res.result.id }
          });
        })
        .catch(error => {
          this.$vs.notify({
            title: "Error",
            text: error.message,
            iconPack: "feather",
            icon: "icon-alert-circle",
            color: "danger"
          });
          if (error.response) {
            this.$refs.observer.setErrors(error.response.data.result);
          }
        });
    },
    updateInvoiceData() {
      updateInvoice(this.$route.params.id, {
        status: this.formData.status,
        start_date: this.formData.start_date,
        end_date: this.formData.end_date,
        remark: this.formData.remark,
        customer_id: this.formData.customer_id,
        order: this.selectedRowKeys
      })
        .then(res => {
          this.formData = res.result;
        })
        .catch(error => {
          this.$vs.notify({
            title: "Error",
            text: error.message,
            iconPack: "feather",
            icon: "icon-alert-circle",
            color: "danger"
          });
          if (error.response) {
            this.$refs.observer.setErrors(error.response.data.result);
          }
        });
    },
    openPreView() {
      getOrders({ invoice_id: this.formData.id }).then(res => {
        this.selectedData = res.result;
        this.preview = true;
      });
    }
  }
};
</script>