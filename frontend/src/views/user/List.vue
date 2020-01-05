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
            <a-input
              class="hover:border-teal-500 focus:border-teal-500"
              v-model="localQueryParam.username"
            ></a-input>
          </a-form-item>
        </div>
        <div class="px-4">
          <a-form-item label="EMAIL">
            <a-input
              class="hover:border-teal-500 focus:border-teal-500"
              v-model="localQueryParam.email"
            ></a-input>
          </a-form-item>
        </div>
        <div class="px-4">
          <a-form-item label="COMPANY">
            <a-input
              class="hover:border-teal-500 focus:border-teal-500"
              v-model="localQueryParam.company"
            ></a-input>
          </a-form-item>
        </div>
        <div class="px-4">
          <a-form-item label="Role">
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

      <template slot="action" slot-scope="text, data">
        <feather-icon
          icon="LockIcon"
          svgClasses="w-5 h-5 hover:text-danger stroke-current"
          class="ml-2"
          @click.stop="openChangePassword(data.id)"
        />
      </template>
    </s-table>

    <a-modal v-model="isShowNew" title="CREATE USER" @ok="createUserData">
      <validation-observer ref="observer" v-slot="{ validate, dirty }">
        <a-form :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
          <a-form-item label="EMAIL" required>
            <validation-provider name="email" rules="email|required" v-slot="{ errors }">
              <a-input v-model="userForm.email"></a-input>
              <span>{{ errors[0] }}</span>
            </validation-provider>
          </a-form-item>

          <a-form-item label="PHONE" required>
            <validation-provider name="phone" rules="required" v-slot="{ errors }">
              <a-input v-model="userForm.phone"></a-input>
              <span>{{ errors[0] }}</span>
            </validation-provider>
          </a-form-item>

          <a-form-item label="PASSWORD">
            <validation-provider name="password1" rules="required|max:16|min:8" v-slot="{ errors }">
              <a-input-password v-model="userForm.password1" />
              <span>{{ errors[0] }}</span>
            </validation-provider>
          </a-form-item>
          <a-form-item label="PASSWORD">
            <validation-provider name="password2" rules="required|max:16|min:8" v-slot="{ errors }">
              <a-input-password v-model="userForm.password2" />
              <span>{{ errors[0] }}</span>
            </validation-provider>
          </a-form-item>

          <validation-provider name="non_field_errors" v-slot="{ errors }">
            <span>{{ errors[0] }}</span>
          </validation-provider>
        </a-form>
      </validation-observer>
    </a-modal>

    <a-modal v-model="isShowChange" title="CHANGE PASSWORD" @ok="changePasswordData">
      <validation-observer ref="changePassword" v-slot="{ validate, dirty }">
        <a-form :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
          <a-form-item label="PASSWORD">
            <validation-provider name="password" rules="required|max:16|min:8" v-slot="{ errors }">
              <a-input-password v-model="userForm.new_password" />
              <span>{{ errors[0] }}</span>
            </validation-provider>
          </a-form-item>

          <validation-provider name="non_field_errors" v-slot="{ errors }">
            <span>{{ errors[0] }}</span>
          </validation-provider>
        </a-form>
      </validation-observer>
    </a-modal>
  </vs-card>
</template>

<script>
import { getUser, changePassword } from "@/http/requests/user/index.js";
import { register } from "@/http/requests/auth/index.js";
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
        };
      }
    }
  },
  data() {
    return {
      localQueryParam: Object.assign({}, this.queryParam),
      Role,
      isShowNew: false,
      isShowChange: false,
      changeUserId: undefined,
      userForm: {},
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
        },
        {
          title: "ACTION",
          scopedSlots: { customRender: "action" },
          width: 40,
        }
      ],
      addNewDataSidebar: false,
      sidebarData: {},
      loadData: parameter => {
        return getUser(Object.assign(parameter, this.localQueryParam)).then(
          res => {
            return res.result;
          }
        );
      }
    };
  },
  methods: {
    addNewData() {
      this.isShowNew = true;
      this.userForm = {};
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
    },
    createUserData() {
      register(this.userForm)
        .then(() => {
          this.isShowNew = false;
          this.$refs.table.refresh();
        })
        .catch(error => {
          if (error.response) {
            this.$refs.observer.setErrors(error.response.data.result);
          }
        });
    },
    openChangePassword(id) {
      this.isShowChange = true;
      this.userForm = {};
      this.changeUserId = id;
    },
    changePasswordData() {
      changePassword(this.changeUserId, this.userForm)
        .then(() => {
          this.isShowChange = false;
        })
        .catch(error => {
          if (error.response) {
            this.$refs.changePassword.setErrors(error.response.data.result);
          }
        });
    },
  }
};
</script>