<template>
  <vs-card>
    <data-view-sidebar
      :isSidebarActive="addNewDataSidebar"
      @closeSidebar="toggleDataSidebar"
      :data="sidebarData"
    />

    <vs-button type="border" icon-pack="feather" icon="icon-plus" @click="addNewData" class="mb-8">Add New</vs-button>

    <vs-tabs v-if="groupData.length" position="left" class style="width:100%;" v-model="curTab">
      <vs-tab v-for="data in groupData" :key="data.id" :label="data.name">
        <div v-for="(permission, index) in groupPermissionData" :key="index" class="flex h-12">
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
      groupData: [],
      permissionData: [],
      groupPermissionData: [],
      addNewDataSidebar: false,
      sidebarData: {}
    };
  },
  mounted() {
    this.getList();
  },
  watch: {
    curTab(val) {
      this.setGroup(this.groupData[val], this.permissionData);
    }
  },
  methods: {
    getList() {
      return getGroups()
        .then(res => {
          const { result } = res;
          this.groupData = result;
          return getPermissions();
        })
        .then(res => {
          const { result } = res;
          this.permissionData = result;
          this.setGroup(this.groupData[this.curTab], this.permissionData);
        });
    },
    updatePermission(permission) {
      return updateGroup(this.groupData[this.curTab].id, {
        permission: permission.id
      }).then(res => {
        const { result } = res;
        this.groupData[this.curTab] = Object.assign({}, result);
      });
    },
    setGroup(group, permission) {
      if (group) {
        var _inter = this.$_.intersectionBy(group.permissions, permission, "id");

        var _per = permission.map(f => {
          if (_inter.find(f1 => f.id === f1.id)) {
            return Object.assign(f, { check: true });
          }
          return Object.assign(f, { check: false });
        });

        this.groupPermissionData = _per.reduce(function(pre, current) {
          pre[current.content_type.model] = pre[current.content_type.model] || [];
          pre[current.content_type.model].push(current);
          return pre;
        }, {});
      }
    },
    onClick(permission) {
      this.updatePermission(permission);
    },
    addNewData() {
      this.sidebarData = {};
      this.toggleDataSidebar(true);
    },
    editData(data) {
      this.sidebarData = data;
      this.toggleDataSidebar(true);
    },
    toggleDataSidebar(val = false) {
      this.addNewDataSidebar = val;
      this.getList();
    }
  }
};
</script>

<style lang="scss">
.con-slot-tabs {
  width: 100%;
}
</style>