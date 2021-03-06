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
          <validation-provider name="name" rules="required|max:64|min:5" v-slot="{ errors }">
            <a-form-item label="Name">
              <a-input
                data-vv-validate-on="blur"
                v-model="form.name"
              />
            </a-form-item>

            <span>{{ errors[0] }}</span>
          </validation-provider>

          <validation-provider name="phone" rules="required|max:128|min:10" v-slot="{ errors }">
            <a-form-item label="phone">
              <a-input
                data-vv-validate-on="blur"
                v-model="form.phone"
              />
            </a-form-item>

            <span>{{ errors[0] }}</span>
          </validation-provider>

           <vs-checkbox v-model="form.is_active" class="mt-5 w-full">Active</vs-checkbox>

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
  updateDriver,
  createDriver
} from "@/http/requests/driver/index.js";

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
        name: "",
        phone: "",
        is_active: true,
      },
      settings: {
        maxScrollbarLength: 60,
        wheelSpeed: 0.6
      }
    };
  },
  methods: {
    submit() {
      if (this.isEdit) {
        createDriver(this.form)
          .then(() => {
            this.isSidebarActiveLocal = false;
          })
          .catch(error => {
            if (error.response) {
              this.$refs.observer.setErrors(error.response.data.result);
            }
          });
      } else {
        updateDriver(this.form.id, this.form)
          .then(() => {
            this.isSidebarActiveLocal = false;
          })
          .catch(error => {
            if (error.response) {
              this.$refs.observer.setErrors(error.response.data.result);
            }
          });
      }
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
