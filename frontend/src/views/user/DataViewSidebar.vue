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
            <vs-input
              data-vv-validate-on="blur"
              label="Username"
              :disabled="!isEdit"
              v-model="form.username"
              class="mt-5 w-full"
            />
            <span>{{ errors[0] }}</span>
          </validation-provider>

          <validation-provider name="email" rules="email|required" v-slot="{ errors }">
            <vs-input
              data-vv-validate-on="blur"
              label="Email"
              :disabled="!isEdit"
              v-model="form.email"
              class="mt-5 w-full"
            />
            <span>{{ errors[0] }}</span>
          </validation-provider>

          <validation-provider name="name" rules v-slot="{ errors }">
            <vs-input
              data-vv-validate-on="blur"
              label="Name"
              v-model="form.name"
              class="mt-5 w-full"
            />
            <span>{{ errors[0] }}</span>
          </validation-provider>

          <validation-provider name="phone" rules v-slot="{ errors }">
            <vs-input
              data-vv-validate-on="blur"
              label="Phone"
              v-model="form.phone"
              class="mt-5 w-full"
            />
            <span>{{ errors[0] }}</span>
          </validation-provider>

          <validation-provider name="company" rules v-slot="{ errors }">
            <vs-input
              data-vv-validate-on="blur"
              label="Company"
              v-model="form.company"
              class="mt-5 w-full"
            />
            <span>{{ errors[0] }}</span>
          </validation-provider>

          <vs-checkbox v-model="form.is_superuser" class="mt-5 w-full">Admin</vs-checkbox>

          <vs-checkbox v-model="form.is_active" class="mt-5 w-full">Active</vs-checkbox>

          <vs-select label="Groups" class="w-full mt-5" v-model="form.group_id">
            <vs-select-item
              :key="index"
              :value="item"
              :text="item.name"
              v-for="(item,index) in groups"
            />
          </vs-select>

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
      this.form = Object.assign({}, this.data);
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
        groups: [],
        group_id: [],
        company: ""
      },
      groups: [],
      settings: {
        maxScrollbarLength: 60,
        wheelSpeed: 0.6
      }
    };
  },
  mounted() {
    if (Object.entries(this.groups).length === 0) {
      this.getGroup();
    }
  },
  methods: {
    submit() {
      if (this.isEdit) {
        createUser(this.form).then(res => {
          this.isSidebarActiveLocal = false;
        });
      } else {
        updateUser(this.form.id, this.form).then(res => {
          this.isSidebarActiveLocal = false;
        });
      }
    },
    getGroup() {
      getGroup().then(res => {
        const { result } = res;
        this.groups = result;
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

    .img-upload {
      margin-top: 2rem;

      .con-img-upload {
        padding: 0;
      }

      .con-input-upload {
        width: 100%;
        margin: 0;
      }
    }
  }
}

.scroll-area--data-list-add-new {
  height: calc(100% - 4.3rem);
}
</style>
