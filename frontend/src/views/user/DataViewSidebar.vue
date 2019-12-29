<template>
  <vs-sidebar
    click-not-close
    position-right
    parent="body"
    default-index="1"
    color="primary"
    class="add-new-data-sidebar items-no-padding"
    spacer
    v-model="isSidebarActiveLocal"
  >
    <div class="mt-6 flex items-center justify-between px-6">
      <h4>{{ isEdit ? "ADD NEW" : "UPDATE" }} ITEM</h4>
      <feather-icon icon="XIcon" @click.stop="isSidebarActiveLocal = false" class="cursor-pointer"></feather-icon>
    </div>
    <vs-divider class="mb-0"></vs-divider>

    <VuePerfectScrollbar class="scroll-area--data-list-add-new" :settings="settings">
      <div class="p-6">
        <validation-observer ref="observer" v-slot="{ validate, dirty }">
          <validation-provider name="username" rules="required|max:16|min:5" v-slot="{ errors }">
            <a-form-item label="USERNAME">
              <a-input
                data-vv-validate-on="blur"
                :disabled="!isEdit"
                v-model="form.username"
                class="w-full"
              />
            </a-form-item>
            <span>{{ errors[0] }}</span>
          </validation-provider>

          <validation-provider name="email" rules="email|required" v-slot="{ errors }">
            <a-form-item label="EMAIL">
              <a-input
                data-vv-validate-on="blur"
                :disabled="!isEdit"
                v-model="form.email"
                class="w-full"
              />
            </a-form-item>
            <span>{{ errors[0] }}</span>
          </validation-provider>

          <validation-provider name="phone" v-slot="{ errors }">
            <a-form-item label="PHONE">
              <a-input
                data-vv-validate-on="blur"
                :disabled="!isEdit"
                v-model="form.phone"
                class="w-full"
              />
            </a-form-item>
            <span>{{ errors[0] }}</span>
          </validation-provider>

          <validation-provider name="company" v-slot="{ errors }">
            <a-form-item label="COMPANY">
              <a-input
                data-vv-validate-on="blur"
                :disabled="!isEdit"
                v-model="form.company"
                class="w-full"
              />
            </a-form-item>
            <span>{{ errors[0] }}</span>
          </validation-provider>

          <validation-provider name="role" v-slot="{ errors }">
            <a-form-item label="ROLE">
              <a-input
                data-vv-validate-on="blur"
                :disabled="!isEdit"
                v-model="form.role"
                class="w-full"
              />
            </a-form-item>
            <span>{{ errors[0] }}</span>
          </validation-provider>

          <a-checkbox v-model="form.is_active" class="mt-5 w-full">Active</a-checkbox>
          
          <a-checkbox v-model="form.is_superuser" class="w-full">Admin</a-checkbox>

          <validation-provider name="groups" rules v-slot="{ errors }">
            <a-form-item label="Group">
              <a-select mode="multiple">
                <!-- <a-select-option key="1" value="1">1</a-select-option> -->
                <!-- <a-select-option key="2" value="2">2</a-select-option> -->
                <!-- <a-select-option v-for="data in groupData" :key="data.id" :value="data">{{data.name}}</a-select-option> -->
              </a-select>
            </a-form-item>
            <span>{{ errors[0] }}</span>
          </validation-provider>

          <validation-provider name="non_field_errors" v-slot="{ errors }">
            <span>{{ errors[0] }}</span>
          </validation-provider>
        </validation-observer>
      </div>
    </VuePerfectScrollbar>

    <div class="flex flex-wrap items-center p-6" slot="footer">
      <vs-button class="mr-6" @click="submit">Submit</vs-button>
      <vs-button type="border" color="danger" @click="isSidebarActiveLocal = false">Cancel</vs-button>
    </div>
  </vs-sidebar>
</template>

<script>
import VuePerfectScrollbar from "vue-perfect-scrollbar";

import {
  updateUser,
  createUser,
  getGroup
} from "@/http/requests/user/index.js";

export default {
  components: {
    VuePerfectScrollbar
  },
  props: {
    isSidebarActive: {
      type: Boolean,
      required: true
    },
    data: {
      type: Object,
      default: () => {}
    }
  },
  watch: {
    isSidebarActive(val) {
      if (!val) return;
      if (Object.entries(this.data).length) {
        this.form = Object.assign({}, this.data);
        this.groups = this.data.groups ? this.data.groups.slice() : [];
      }
    }
  },
  computed: {
    isSidebarActiveLocal: {
      get() {
        return this.isSidebarActive;
      },
      set(val) {
        if (!val) {
          this.$emit("closeSidebar");
        }
      }
    },
    isEdit() {
      return Object.entries(this.data).length === 0;
    }
  },
  data() {
    return {
      form: {
        id: undefined,
        username: "",
        email: "",
        name: "",
        phone: "",
        is_superuser: false,
        is_active: false,
        company: ""
      },
      groups: undefined,
      groupData: [],
      settings: {
        maxScrollbarLength: 60,
        wheelSpeed: 0.6
      }
    };
  },
  mounted() {
    if (Object.entries(this.groupData).length === 0) {
      this.getGroupData();
    }
  },
  methods: {
    submit() {
      if (this.isEdit) {
        delete this.form.groups;
        let formData = Object.assign(this.form, {
          groups_id: this.groups.length ? this.groups.map(f => f.id) : null
        });
        createUser(formData)
          .then(() => {
            this.isSidebarActiveLocal = false;
          })
          .catch(error => {
            if (error.response) {
              this.$refs.observer.setErrors(error.response.data.result);
            }
          });
      } else {
        delete this.form.groups;
        let formData = Object.assign(this.form, {
          groups_id: this.groups ? this.groups.map(f => f.id) : null
        });
        updateUser(this.form.id, formData)
          .then(() => {
            this.isSidebarActiveLocal = false;
          })
          .catch(error => {
            if (error.response) {
              this.$refs.observer.setErrors(error.response.data.result);
            }
          });
      }
    },
    getGroupData() {
      getGroup().then(res => {
        const { result } = res;
        this.groupData = result;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.add-new-data-sidebar {
  ::v-deep .vs-sidebar--background {
    z-index: 52010;
  }

  ::v-deep .vs-sidebar {
    z-index: 52010;
    width: 400px;
    max-width: 90vw;
  }
}

.scroll-area--data-list-add-new {
  height: calc(100% - 4.3rem);
}
</style>
