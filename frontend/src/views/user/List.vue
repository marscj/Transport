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
            <a-input class="hover:border-teal-500 focus:border-teal-500" v-model="localQueryParam.username"></a-input>
          </a-form-item>
        </div>
        <div class="px-4">
          <a-form-item label="EMAIL">
            <a-input class="hover:border-teal-500 focus:border-teal-500" v-model="localQueryParam.email"></a-input>
          </a-form-item>
        </div>
        <div class="px-4">
          <a-form-item label="COMPANY">
            <a-input class="hover:border-teal-500 focus:border-teal-500" v-model="localQueryParam.company"></a-input>
          </a-form-item>
        </div>
        <div class="px-4">
          <a-form-item label="Role" >
            <a-select v-model="localQueryParam.role" class="w-64" allowClear>
              <a-select-option v-for="data in Role" :key="data" :value="data">{{data}}</a-select-option>
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
    </div>

    <div class="px-4" v-action:add_user v-if="!selectModel">
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

const Role = ["Customer", "Driver", "Operator", "Accounting"];

export default {
  components: {
    DataViewSidebar,
    STable
  },
  props: {
    selectModel: {
      type: Boolean,
      default: false
    },
    queryParam: {
      type: Object,
      default: () => {
        return { 
          is_active: true
        }
      }
    }
  },
  data() {
    return {
      localQueryParam: Object.assign({}, this.queryParam),
      Role,
      columns: [
        {
          title: "USERNAME",
          dataIndex: "username",
          scopedSlots: { customRender: "username" },
          align: "center",
          sorter: true
        },
        {
          title: "EMAIL",
          dataIndex: "email",
          scopedSlots: { customRender: "email" },
          align: "center",
          sorter: true
        },
        {
          title: "PHONE",
          dataIndex: "phone",
          scopedSlots: { customRender: "phone" },
          align: "center",
          sorter: true
        },
        {
          title: "COMPANY",
          dataIndex: "company",
          scopedSlots: { customRender: "company" },
          align: "center",
          sorter: true
        },
        {
          title: "Role",
          dataIndex: "role",
          scopedSlots: { customRender: "role" },
          align: "center",
          sorter: true
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
          sorter: true
        },
        {
          title: "ACTIVE",
          dataIndex: "is_active",
          scopedSlots: { customRender: "active" },
          align: "center",
          width: 40,
          sorter: true
        }
      ],
      addNewDataSidebar: false,
      sidebarData: {},
      loadData: parameter => {
        return getUser(Object.assign(parameter, this.localQueryParam)).then(res => {
          return res.result;
        });
      }
    };
  },
  methods: {
    addNewData() {
      this.sidebarData = Object.assign({});
      this.toggleDataSidebar(true);
    },
    editData(data) {
      if (this.selectModel) {
        this.$emit("driver", data);
      } else {
        if (this.$auth("user.change_user")) {
          this.sidebarData = data;
          this.toggleDataSidebar(true);
        }
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