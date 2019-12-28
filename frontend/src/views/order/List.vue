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
    >
    </s-table>
  </vs-card>
</template>

<script>
import { getOrder } from "@/http/requests/order";
import STable from "@/components/s-table/STable.vue";
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
          title: 'ORDERID',
          dataIndex: 'orderId',
          align: 'left'
        },
        {
          title: 'RELATEDID',
          dataIndex: 'relatedId',
        },
        {
          title: 'START DATE',
          dataIndex: 'start_date',
          customRender: (text, record, index) => {
            return <p> {text} </p>
          }
        },
        {
          title: 'END DATE',
          dataIndex: 'end_date',
          customRender: (text, record, index) => {
            return <p> {text} </p>
          }
        },
        {
          title: 'CREATE DATE',
          dataIndex: 'create_at',
          customRender: (text, record, index) => {
            return <p> {text | moment('YYYY-MM-DD')} </p>
          }
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

