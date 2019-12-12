<template>
  <div>
    <vs-tabs v-if="ruleData.length" position="left" class style="width:100%;">
      <vs-tab v-for="data in ruleData" :key="data.id" :value="data.id" :label="data.name">
        <vs-row v-for="(permission, index) in permissionData" :key="index">
          <div class="mr-4">
            <span>{{index}} :</span>
          </div>
          <div v-for="data in permission" :key="data.id" class="mr-4">
            <vs-checkbox>{{data.codename}}</vs-checkbox>
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
      ruleData: [],
      permissionData: []
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      return getRoles()
        .then(res => {
          const { result } = res;
          this.ruleData = result;
          return getPermissions();
        })
        .then(res => {
          const { result } = res;
          this.permissionData = result.reduce(function(pre, current) {
            pre[current.content_type.app_label] =
              pre[current.content_type.app_label] || [];
            pre[current.content_type.app_label].push(current);
            return pre;
          }, {});
          console.log(this.permissionData);
        });
    }
  }
};
</script>

<style lang="scss">
// .con-tab {
//   padding-bottom: 14px;
// }

.con-slot-tabs {
  width: 100%;
}
</style>