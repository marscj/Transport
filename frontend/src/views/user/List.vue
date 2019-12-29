<template>
  <vs-card id="data-list-thumb-view" class="data-list-container">
    <data-view-sidebar
      :isSidebarActive="addNewDataSidebar"
      @closeSidebar="toggleDataSidebar"
      :data="sidebarData"
    />

    <div>
      <div class="flex flex-wrap pt-4">
        <div class="px-4">
          <a-form-item label="USERNAME">
            <a-input class="hover:border-teal-500 focus:border-teal-500"></a-input>
          </a-form-item>
        </div>
        <div class="px-4">
          <a-form-item label="EMAIL">
            <a-input class="hover:border-teal-500 focus:border-teal-500"></a-input>
          </a-form-item>
        </div>
        <div class="px-4">
          <a-form-item label="COMPANY">
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

    <div class="px-4" action:add>
      <vs-button type="border" icon-pack="feather" icon="icon-plus" @click="addNewData">Add New</vs-button>
    </div>

    <s-table
      ref="table"
      class="p-4"
      :columns="columns"
      :data="loadData"
      :rowKey="(record) => record.id"
    >
      <template slot="username" slot-scope="text, data">
        <a @click="editData(data)" v-if="text">{{ text }}</a>
      </template>

      <template slot="email" slot-scope="text, data">
        <a @click="editData(data)" v-if="text">{{ text }}</a>
      </template>

      <template slot="phone" slot-scope="text, data">
        <a @click="editData(data)" v-if="text">{{ text }}</a>
      </template>

      <template slot="company" slot-scope="text, data">
        <a @click="editData(data)" v-if="text">{{ text }}</a>
      </template>

      <template slot="role" slot-scope="text, data">
        <a @click="editData(data)" v-if="text">{{ text }}</a>
      </template>

      <template slot="group" slot-scope="text, data">
        <a @click="editData(data)" v-if="text">{{ $_.join(text.map(f=> f.name), ', ') }}</a>
      </template>

      <template slot="admin" slot-scope="text, data">
        <a-checkbox @click="editData(data)" :checked="text" disabled></a-checkbox>
      </template>

      <template slot="active" slot-scope="text, data">
        <a-checkbox @click="editData(data)" :checked="text" disabled></a-checkbox>
      </template>
    </s-table>
  </vs-card>
</template>

<script>
import { getUser } from "@/http/requests/user/index.js";
import DataViewSidebar from "./DataViewSidebar.vue";
import STable from "@/components/s-table";

export default {
  components: {
    DataViewSidebar,
    STable
  },
  data() {
    return {
      columns: [
        {
          title: "USERNAME",
          dataIndex: "username",
          scopedSlots: { customRender: "username" },
          align: "center",
          sorter: true,
        },
        {
          title: "EMAIL",
          dataIndex: "email",
          scopedSlots: { customRender: "email" },
          align: "center",
          sorter: true,
        },
        {
          title: "PHONE",
          dataIndex: "phone",
          scopedSlots: { customRender: "phone" },
          align: "center",
          sorter: true,
        },
        {
          title: "COMPANY",
          dataIndex: "company",
          scopedSlots: { customRender: "company" },
          align: "center",
          sorter: true,
        },
        {
          title: "Role",
          dataIndex: "role",
          scopedSlots: { customRender: "role" },
          align: "center",
          sorter: true,
        },
        {
          title: "GROUP",
          dataIndex: "groups",
          scopedSlots: { customRender: "group" },
          align: "center"
        },
        {
          title: "ADMIN",
          dataIndex: "is_superuser",
          scopedSlots: { customRender: "admin" },
          align: "center",
          width: 40,
          sorter: true,
        },
        {
          title: "ACTIVE",
          dataIndex: "is_active",
          scopedSlots: { customRender: "active" },
          align: "center",
          width: 40,
          sorter: true,
        }
      ],
      addNewDataSidebar: false,
      sidebarData: {},
      selected: [],
      loadData: parameter => {
        return getUser(Object.assign(parameter, {})).then(res => {
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
    }
  },
  mounted() {
    this.isMounted = true;
  },
  methods: {
    addNewData() {
      this.sidebarData = {};
      this.toggleDataSidebar(true);
    },
    editData(data) {
      if (this.$auth("user.change")) {
        this.sidebarData = data;
        this.toggleDataSidebar(true);
      }
    },
    toggleDataSidebar(val = false) {
      this.addNewDataSidebar = val;
      if (!val) {
        this.$refs.table.refresh();
      }
    }
  }
};
</script>