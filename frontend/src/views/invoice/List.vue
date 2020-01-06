<template>
  <vs-card>
    <div>
      <div class="flex flex-wrap pt-4">
        
      </div>
    </div>

    <div class="px-4" >
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
    </s-table>
  </vs-card>
</template>

<script>
import { getInvoices } from "@/http/requests/invoice";
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
        return {}
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
          dataIndex: "id",
          scopedSlots: { customRender: "orderId" },
          align: "center",
          width: 80,
          sorter: true
        },
      ],
      loadData: parameter => {
        return getInvoices(Object.assign(parameter, {
          month: this.localQueryParam.month,
          status: this.localQueryParam.status
        })).then(res => {
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
    }
  }
};
</script>

