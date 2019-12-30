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

    <div class="px-4" action:add v-if="!selectModel">
      <vs-button type="border" icon-pack="feather" icon="icon-plus" @click="addNewData">Add New</vs-button>
    </div>

    <s-table
      ref="table"
      class="p-4"
      :columns="columns"
      :data="loadData"
      :rowKey="(record) => record.id"
    >
      <template slot="license_plate" slot-scope="text, data">
        <a @click="editData(data)" v-if="text">{{ text }}</a>
      </template>

      <template slot="model" slot-scope="text, data">
        <a @click="editData(data)" v-if="text">{{ text }}</a>
      </template>

      <template slot="seats" slot-scope="text, data">
        <a @click="editData(data)" v-if="text">{{ text }}</a>
      </template>

      <template slot="category" slot-scope="text, data">
        <a @click="editData(data)" v-if="text">{{ text.name }}</a>
      </template>

      <template slot="driver" slot-scope="text, data">
        <a @click="editData(data)" v-if="text">{{ text.username }}</a>
      </template>

      <template slot="supplier" slot-scope="text, data">
        <a @click="editData(data)" v-if="text">{{ text }}</a>
      </template>

      <template slot="active" slot-scope="text, data">
        <a-checkbox @click="editData(data)" :checked="text" disabled></a-checkbox>
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
import { getVehicle, deleteVehicle } from "@/http/requests/vehicle/index.js";
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
    }
  },
  data() {
    return {
      columns: [
        {
          title: "LICENSE PLATE",
          dataIndex: "license_plate",
          scopedSlots: { customRender: "license_plate" },
          align: "center",
          sorter: true
        },
        {
          title: "MODEL",
          dataIndex: "model",
          scopedSlots: { customRender: "model" },
          align: "center",
          sorter: true
        },
        {
          title: "SEATS",
          dataIndex: "seats",
          scopedSlots: { customRender: "seats" },
          align: "center",
          sorter: true
        },
        {
          title: "CATEGORY",
          dataIndex: "category",
          scopedSlots: { customRender: "category" },
          align: "center",
          sorter: true
        },
        {
          title: "DRIVER",
          dataIndex: "driver",
          scopedSlots: { customRender: "driver" },
          align: "center",
          sorter: true
        },
        {
          title: "SUPPLIER",
          dataIndex: "supplier",
          scopedSlots: { customRender: "supplier" },
          align: "center",
          sorter: true
        },
        {
          title: "ACTIVE",
          dataIndex: "is_active",
          scopedSlots: { customRender: "active" },
          align: "center",
          sorter: true
        },
        {
          title: "ACTION",
          scopedSlots: { customRender: "action" },
          align: "center"
        }
      ].filter(f => {
        if (f.title == "ACTION") {
          if (this.$auth("itinerary.delete")) {
            return f;
          }
        } else {
          return f;
        }
      }),
      addNewDataSidebar: false,
      sidebarData: {},
      selected: [],
      loadData: parameter => {
        return getVehicle(Object.assign(parameter, {})).then(res => {
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
        this.$emit('vehicle', data)
      } else {
        if (this.$auth("vehicle.change")) {
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
      deleteVehicle(id).then(() => {
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