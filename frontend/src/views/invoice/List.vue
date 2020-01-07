<template>
  <vs-card>
    <div>
      <div class="flex flex-wrap pt-4"></div>
    </div>

    <div class="px-4">
      <vs-button type="border" icon-pack="feather" icon="icon-plus" @click="addNewData">Add New</vs-button>
    </div>

    <s-table
      class="p-4"
      ref="table"
      :rowKey="(record) => record.id"
      :columns="columns"
      :data="loadData"
    >
      <template slot="invoiceId" slot-scope="text, data">
        <router-link :to="{name: 'invoice_detail', params: {id: data.id}}"><p class="text-gray-700">{{text}}</p></router-link>
      </template>

      <template slot="customer" slot-scope="text, data">
        <router-link :to="{name: 'invoice_detail', params: {id: data.id}}" v-if="text"><p class="text-gray-700">{{text.username}}</p></router-link>
      </template>

      <template slot="start_date" slot-scope="text, data">
        <router-link :to="{name: 'invoice_detail', params: {id: data.id}}"><p class="text-gray-700">{{text}}</p></router-link>
      </template>

      <template slot="end_date" slot-scope="text, data">
        <router-link :to="{name: 'invoice_detail', params: {id: data.id}}"><p class="text-gray-700">{{text}}</p></router-link>
      </template>

      <template slot="remark" slot-scope="text, data">
        <router-link :to="{name: 'invoice_detail', params: {id: data.id}}"><p class="text-gray-700">{{text}}</p></router-link>
      </template>

      <template slot="status" slot-scope="text, data">
        <router-link :to="{name: 'invoice_detail', params: {id: data.id}}"><p class="text-gray-700">{{text}}</p></router-link>
      </template>

      <template slot="action" slot-scope="text, data">
        <feather-icon
          icon="TrashIcon"
          svgClasses="w-5 h-5 hover:text-danger stroke-current"
          class="ml-2"
          @click.stop="openConfirm(data.id)"
        />
      </template>
    </s-table>
  </vs-card>
</template>

<script>
import { getInvoices, deleteInvoice } from "@/http/requests/invoice";
import STable from "@/components/s-table";
import moment from "moment";

const Status = ["Unpaid", "Paid"];

export default {
  components: {
    STable
  },
  props: {
    queryParam: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      Status,
      localQueryParam: Object.assign({}, this.queryParam),
      columns: [
        {
          title: "ID",
          dataIndex: "invoiceId",
          scopedSlots: { customRender: "invoiceId" },
          align: "center",
          width: 200,
          sorter: true
        },
        {
          title: "CUSTOMER",
          dataIndex: "customer",
          scopedSlots: { customRender: "customer" },
          align: "center",
          width: 200,
          sorter: true
        },
        {
          title: "STARTDATE",
          dataIndex: "start_date",
          scopedSlots: { customRender: "start_date" },
          align: "center",
          width: 200,
          sorter: true
        },
        {
          title: "ENDDATE",
          dataIndex: "end_date",
          scopedSlots: { customRender: "end_date" },
          align: "center",
          width: 200,
          sorter: true
        },
        {
          title: "REMARK",
          dataIndex: "remark",
          scopedSlots: { customRender: "remark" },
          align: "center",
          sorter: true
        },
        {
          title: "STATUS",
          dataIndex: "status",
          scopedSlots: { customRender: "status" },
          align: "center",
          width: 80,
          sorter: true
        },
        {
          title: "ACTION",
          scopedSlots: { customRender: "action" },
          align: "center",
          width: 80
        }
      ],
      loadData: parameter => {
        return getInvoices(
          Object.assign(parameter, {
            month: this.localQueryParam.month,
            status: this.localQueryParam.status
          })
        ).then(res => {
          return res.result;
        });
      }
    };
  },
  methods: {
    addNewData() {
      this.$router.push({
        name: "invoice_create"
      });
    },
    deleteData(id) {
      deleteInvoice(id).then(() => {
        this.refresh();
      });
    },
    refresh() {
      this.$refs.table.refresh();
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

