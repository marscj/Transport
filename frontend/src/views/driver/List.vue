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
          <a-form-item label="NAME">
            <a-input
              class="hover:border-teal-500 focus:border-teal-500"
              v-model="localSearchParam.search"
            ></a-input>
          </a-form-item>
        </div>

        <div class="px-4">
          <a-form-item label="ACTIVE">
            <vs-checkbox v-model="localQueryParam.is_active"></vs-checkbox>
          </a-form-item>
        </div>

        <div class="px-4">
          <a-form-item>
            <button
              @click="() => $refs.table.refresh()"
              class="bg-teal-500 hover:bg-teal-700 focus:outline-none text-white font-bold rounded px-6 my-10"
            >
              Search
            </button>
          </a-form-item>
        </div>
      </div>
    </div>

    <div class="p-4" v-action:add_driver>
      <vs-button
        type="border"
        icon-pack="feather"
        icon="icon-plus"
        @click="addNewData"
        >Add New</vs-button
      >
    </div>

    <s-table
      class="p-4"
      ref="table"
      :columns="columns"
      :data="loadData"
      :showPagination="false"
      :rowKey="record => record.id"
    >
      <template slot="name" slot-scope="text, data">
        <a @click="editData(data)" v-if="text">{{ text }}</a>
      </template>

      <template slot="phone" slot-scope="text, data">
        <a @click="editData(data)" v-if="text">{{ text }}</a>
      </template>

      <template slot="active" slot-scope="text">
        <a-checkbox
          @click="editData(data)"
          :checked="text"
          disabled
        ></a-checkbox>
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
import { getDrivers, deleteDriver } from "@/http/requests/driver/index.js";
import DataViewSidebar from "./DataViewSidebar.vue";

import STable from "@/components/s-table";

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
      default: () => {}
    }
  },
  data() {
    return {
      localQueryParam: Object.assign({}, this.queryParam),
      localSearchParam: {},
      columns: [
        {
          title: "NAME",
          dataIndex: "name",
          scopedSlots: { customRender: "name" }
        },
        {
          title: "PHONE",
          dataIndex: "phone",
          scopedSlots: { customRender: "name" }
        },
        {
          title: "ACTIVE",
          dataIndex: "is_active",
          scopedSlots: { customRender: "active" }
        },
        {
          title: "ACTION",
          scopedSlots: { customRender: "action" }
        }
      ].filter(f => {
        if (f.title == "ACTION") {
          if (this.$auth("driver.delete_driver")) {
            return f;
          }
        } else {
          return f;
        }
      }),
      addNewDataSidebar: false,
      sidebarData: {},
      loadData: parameter => {
        return getDrivers(
          Object.assign(parameter, this.localQueryParam, this.localSearchParam)
        ).then(res => {
          return res.result;
        });
      }
    };
  },
  methods: {
    addNewData() {
      this.sidebarData = {};
      this.toggleDataSidebar(true);
    },
    editData(data) {
      if (this.selectModel) {
        this.$emit("driver", data);
      } else {
        if (this.$auth("driver.change_driver")) {
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
    },
    deleteData(id) {
      deleteDriver(id).then(() => {
        this.$refs.table.refresh();
      });
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
