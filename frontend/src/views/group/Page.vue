<template>
  <vs-card>
    <data-view-sidebar
      :isSidebarActive="addNewDataSidebar"
      @closeSidebar="toggleDataSidebar"
      :data="sidebarData"
    />

    <vs-button type="border" icon-pack="feather" icon="icon-plus" @click="addNewData" class="mb-8">Add New</vs-button>

    <vs-tabs v-if="roleData.length" position="left" class style="width:100%;" v-model="curTab">
      <vs-tab v-for="data in roleData" :key="data.id" :label="data.name">
        <div v-for="(permission, index) in rolePermissionData" :key="index" class="flex h-12">
          <div class="w-1/6">
            <span>{{index}} :</span>
          </div>
          <div v-for="data in permission" :key="data.id" class="w-1/6">
            <vs-checkbox
              v-model="data.check"
              @click="onClick(data)"
            >{{data.codename.substring(0, data.codename.indexOf('_'))}}</vs-checkbox>
          </div>
        </div>
      </vs-tab>
    </vs-tabs>
  </vs-card>
</template>

<script>
import DataViewSidebar from "./DataViewSidebar.vue";
import {
  getGroups,
  getPermissions,
  updateGroup
} from "@/http/requests/user/index.js";

export default {
  components: {
    DataViewSidebar
  },
  data() {
    return {
      curTab: 0,
      roleData: [],
      permissionData: [],
      rolePermissionData: [],
      addNewDataSidebar: false,
      sidebarData: {}
    };
  },
  mounted() {
    this.getList();
  },
  watch: {
    curTab(val) {
      this.setRole(this.roleData[val], this.permissionData);
    }
  },
  methods: {
    getList() {
      return getGroups()
        .then(res => {
          const { result } = res;
          this.roleData = result;
          return getPermissions();
        })
        .then(res => {
          const { result } = res;
          this.permissionData = result;
          this.setRole(this.roleData[this.curTab], this.permissionData);
        });
    },
    updatePermission(permission) {
      return updateGroup(this.roleData[this.curTab].id, {
        permission: permission.id
      }).then(res => {
        const { result } = res;
        this.roleData[this.curTab] = Object.assign({}, result);
      });
    },
    setRole(role, permission) {
      var _inter = this.$_.intersectionBy(role.permissions, permission, "id");

      var _per = permission.map(f => {
        if (_inter.find(f1 => f.id === f1.id)) {
          return Object.assign(f, { check: true });
        }
        return Object.assign(f, { check: false });
      });

      this.rolePermissionData = _per.reduce(function(pre, current) {
        pre[current.content_type.model] = pre[current.content_type.model] || [];
        pre[current.content_type.model].push(current);
        return pre;
      }, {});
    },
    onClick(permission) {
      this.updatePermission(permission);
    },
    addNewData() {
      this.sidebarData = {};
      this.toggleDataSidebar(true);
    },
    deleteData(id) {

    },
    editData(data) {
      this.sidebarData = data;
      this.toggleDataSidebar(true);
    },
    toggleDataSidebar(val = false) {
      this.addNewDataSidebar = val;
    }
  }
};
</script>

<style lang="scss">
.con-slot-tabs {
  width: 100%;
}
</style>