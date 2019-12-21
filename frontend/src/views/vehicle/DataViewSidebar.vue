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
          <validation-provider
            name="License plate"
            rules="required|max:16|min:5"
            v-slot="{ errors }"
          >
            <vs-input
              data-vv-validate-on="blur"
              label="License plate"
              v-model="form.license_plate"
              class="mt-5 w-full"
            />
            <span>{{ errors[0] }}</span>
          </validation-provider>

          <validation-provider name="seats" rules="required|min_value:0" v-slot="{ errors }">
            <vs-input-number
              data-vv-validate-on="blur"
              label="Seats"
              :step="1"
              v-model="form.seats"
              class="mt-5"
            />
            <span>{{ errors[0] }}</span>
          </validation-provider>

          <p class="mt-5">Category</p>
          <v-select
            v-model="category"
            :options="categoryData"
            label="name"
          ></v-select>

          <p class="mt-5">Driver</p>
          <v-select
            v-model="driver"
            :options="driverData"
            label="username"
          ></v-select>

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
import vSelect from "vue-select";

import { getUser } from "@/http/requests/user/index.js";

import {
  updateVehicle,
  createVehicle,
  getCategory
} from "@/http/requests/vehicle/index.js";

export default {
  components: {
    vSelect,
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
      this.category = Object.assign({}, this.data.category);
      this.driver = Object.assign({}, this.data.driver);
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
        license_plate: "",
        is_active: true,
        seats: 5,
        category_id: undefined,
        driver_id: undefined
      },
      category: undefined,
      driver: undefined,
      driverData: [],
      categoryData: [],
      settings: {
        maxScrollbarLength: 60,
        wheelSpeed: 0.6
      }
    };
  },
  mounted() {
    if (Object.entries(this.driverData).length === 0) {
      this.getUserData();
    }

    if (Object.entries(this.categoryData).length === 0) {
      this.getCategoryData();
    }
  },
  methods: {
    submit() {
      if (this.isEdit) {
        createVehicle(this.form)
          .then(res => {
            this.isSidebarActiveLocal = false;
          })
          .catch(error => {
            if (error.response) {
              this.$refs.observer.setErrors(error.response.data.result);
            }
          });
      } else {
        delete this.form.category;
        delete this.form.driver;
        updateVehicle(
          this.form.id,
          Object.assign(this.form, {
            category_id: this.category ? this.category.id : null,
            driver_id: this.driver ? this.driver.id : null
          })
        )
          .then(res => {
            this.isSidebarActiveLocal = false;
          })
          .catch(error => {
            if (error.response) {
              this.$refs.observer.setErrors(error.response.data.result);
            }
          });
      }
    },
    getUserData() {
      getUser().then(res => {
        this.driverData = res.result;
      });
    },
    getCategoryData() {
      getCategory().then(res => {
        this.categoryData = res.result;
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
