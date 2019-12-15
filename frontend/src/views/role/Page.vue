<template>
  <div>
    <vs-tabs v-if="roleData.length" position="left" class style="width:100%;" v-model="curTab">
      <vs-tab v-for="data in roleData" :key="data.id" :label="data.name">
        <vs-row v-for="(permission, index) in permissionData" :key="index">
          <div class="mr-4">
            <span>{{index}} :</span>
          </div>
          <div v-for="data in permission" :key="data.id" class="mr-4">
            <vs-checkbox v-model="data.check">{{data.codename}}</vs-checkbox>
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
    curTab(val) {}
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
          console.log(this.roleData[this.curTab])
          this.setRole(this.roleData[this.curTab], result)
          this.permissionData = result.reduce(function(pre, current) {
            pre[current.content_type.app_label] = pre[current.content_type.app_label] || [];
            pre[current.content_type.app_label].push(
              Object.assign(current, { check: true })
            );
            return pre;
          }, {});
        });
    },
    setRole(role, permission) {
      console.log('role=', role, 'permission====', permission)
      this.rolePermissionData = role.permissions.filter(f => permission.includes(f))
      console.log(this.rolePermissionData, '====')
    }
  }
};
</script>

<style lang="scss">
.con-slot-tabs {
  width: 100%;
}
</style>