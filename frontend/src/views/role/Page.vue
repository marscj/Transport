<template>
  <div>
    <vs-tabs v-if="roleData.length" position="left" class style="width:100%;" v-model="curTab">
      <vs-tab v-for="data in roleData" :key="data.id" :label="data.name">
        <vs-row v-for="(permission, index) in rolePermissionData" :key="index" class="mt-2">
          <div class="mr-4">
            <span>{{index}} :</span>
          </div>
          <div v-for="data in permission" :key="data.id" class="mr-4 ">
            <vs-checkbox v-model="data.check">{{data.codename.substring(0, data.codename.indexOf('_'))}}</vs-checkbox>
          </div>
        </vs-row>
      </vs-tab>
    </vs-tabs>
  </div>
</template>

<script>
import { getRoles } from "@/http/requests/role/index.js";
import { getPermissions } from "@/http/requests/user/index.js";

export default {
  data() {
    return {
      curTab: 0,
      roleData: [],
      permissionData: [],
      rolePermissionData: []
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
      return getRoles()
        .then(res => {
          const { result } = res;
          this.roleData = result;
          return getPermissions();
        })
        .then(res => {
          const { result } = res;
          this.permissionData = result;
          this.setRole(this.roleData[this.curTab], this.permissionData)
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
        pre[current.content_type.app_label] = pre[current.content_type.app_label] || [];
        pre[current.content_type.app_label].push(current)
        return pre;
      }, {});
    }
  }
};
</script>

<style lang="scss">
.con-slot-tabs {
  width: 100%;
}
</style>