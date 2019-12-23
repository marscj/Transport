<template>
  <div
    class="vs-sidebar-group"
    :class="[
      {'vs-sidebar-group-open'            : openItems        },
      {'vs-sidebar-group-active'          : open             },
      {'disabled-item pointer-events-none': group.meta.isDisabled }
    ]"
    @mouseover="mouseover"
    @mouseout="mouseout"
  >
    <!-- Group Label -->
    <div @click="clickGroup" class="group-header w-full">
      <span class="flex items-center w-full">
        <!-- Group Icon -->
        <feather-icon
          v-if="group.meta.icon  || (this.groupIndex > Math.floor(this.groupIndex))"
          :icon="group.meta.icon  || 'CircleIcon'"
          :svgClasses="{ 'w-3 h-3' : this.groupIndex % 1 != 0 }"
        />

        <!-- Group Name -->
        <span
          v-show="!verticalNavMenuItemsMin"
          class="truncate mr-3 select-none"
        >{{ $t(group.meta.i18n) || group.meta.name }}</span>

        <!-- Group Tag -->
        <vs-chip
          class="ml-auto mr-4"
          :color="group.meta.tagColor"
          v-if="group.meta.tag && !verticalNavMenuItemsMin"
        >{{ group.meta.tag }}</vs-chip>
      </span>

      <!-- Group Collapse Icon -->
      <feather-icon
        v-show="!verticalNavMenuItemsMin"
        :class="[{'rotate90' : openItems}, 'feather-grp-header-arrow']"
        icon="ChevronRightIcon"
        svg-classes="w-4 h-4"
      />

      <!-- Group Tooltip -->
      <span class="vs-sidebar--tooltip">{{ $t(group.meta.i18n) || group.meta.name }}</span>
    </div>
    <!-- /Group Label -->

    <!-- Group Items -->
    <ul ref="items" :style="styleItems" class="vs-sidebar-group-items">
      <li v-for="(groupItem, index) in group.children" :key="index">
        <!-- If item is group -->
        <v-nav-menu-group
          v-if="groupItem.children"
          :group="groupItem"
          :groupIndex="Number(`${groupIndex}.${index}`)"
          :open="isGroupActive(groupItem)"
          :openHover="openHover"
        />

        <!-- Else: Item -->
        <v-nav-menu-item
          v-else
          icon-small
          :index="groupIndex + '.' + index"
          :to="groupItem.meta.slug !== 'external' ? groupItem.meta.url : null"
          :href="groupItem.meta.slug === 'external' ? groupItem.meta.url : null"
          :icon="itemIcon(groupIndex + '.' + index)"
          :slug="groupItem.meta.slug"
          :target="groupItem.meta.target"
        >
          <span class="truncate">{{ $t(groupItem.meta.i18n) || groupItem.meta.name }}</span>
          <vs-chip
            class="ml-auto"
            :color="groupItem.meta.tagColor"
            v-if="groupItem.meta.tag"
          >{{ groupItem.meta.tag }}</vs-chip>
        </v-nav-menu-item>
      </li>
    </ul>
    <!-- /Group Items -->
  </div>
</template>


<script>
import VNavMenuItem from "./VerticalNavMenuItem.vue";

export default {
  name: "v-nav-menu-group",
  props: {
    openHover: { type: Boolean, default: false },
    open: { type: Boolean, default: false },
    group: { type: Object },
    groupIndex: { type: Number }
  },
  components: {
    VNavMenuItem
  },
  data: () => ({
    maxHeight: "0px",
    openItems: false
  }),
  computed: {
    verticalNavMenuItemsMin() {
      return this.$store.state.verticalNavMenuItemsMin;
    },
    styleItems() {
      return { maxHeight: this.maxHeight };
    },
    itemIcon() {
      return index => {
        if (!((index.match(/\./g) || []).length > 1)) return "CircleIcon";
      };
    },
    isGroupActive() {
      return item => {
        const path = this.$route.fullPath;
        let open = false;
        const routeParent = this.$route.meta
          ? this.$route.meta.parent
          : undefined;

        let func = item => {
          if (item.children) {
            item.children.forEach(item => {
              if (
                (path == item.meta.url || routeParent == item.meta.slug) &&
                item.meta.url
              ) {
                open = true;
              } else if (item.children) {
                func(item);
              }
            });
          }
        };

        func(item);
        return open;
      };
    }
  },
  watch: {
    // OPEN & CLOSES DROPDOWN ON ROUTE CHANGE
    $route() {
      if (this.verticalNavMenuItemsMin) return;

      let scrollHeight = this.scrollHeight;

      // Collapse Group
      if (this.openItems && !this.open) {
        this.maxHeight = `${scrollHeight}px`;
        setTimeout(() => {
          this.maxHeight = `${0}px`;
        }, 50);

        // Expand Group
      } else if (this.open) {
        this.maxHeight = `${scrollHeight}px`;
        setTimeout(() => {
          this.maxHeight = "none";
        }, 300);
      }
    },
    maxHeight() {
      this.openItems = this.maxHeight != "0px";
    },
    // OPEN AND CLOSES DROPDOWN MENU ON NavMenu COLLAPSE AND DEFAULT VIEW
    "$store.state.verticalNavMenuItemsMin"(val) {
      let scrollHeight = this.$refs.items.scrollHeight;

      if (!val && this.open) {
        this.maxHeight = `${scrollHeight}px`;
        setTimeout(() => {
          this.maxHeight = "none";
        }, 300);
      } else {
        this.maxHeight = `${scrollHeight}px`;
        setTimeout(() => {
          this.maxHeight = "0px";
        }, 50);
      }
      if (val && this.open) {
        this.maxHeight = `${scrollHeight}px`;
        setTimeout(() => {
          this.maxHeight = "0px";
        }, 250);
      }
    }
  },
  methods: {
    clickGroup() {
      if (!this.openHover) {
        let thisScrollHeight = this.$refs.items.scrollHeight;

        if (this.maxHeight == "0px") {
          this.maxHeight = `${thisScrollHeight}px`;
          setTimeout(() => {
            this.maxHeight = "none";
          }, 300);
        } else {
          this.maxHeight = `${thisScrollHeight}px`;
          setTimeout(() => {
            this.maxHeight = `${0}px`;
          }, 50);
        }

        this.$parent.$children.map(child => {
          if (child.isGroupActive) {
            if (child !== this && !child.open && child.maxHeight != "0px") {
              setTimeout(() => {
                child.maxHeight = `${0}px`;
              }, 50);
            }
          }
        });
      }
    },
    mouseover() {
      if (this.openHover) {
        let scrollHeight = this.$refs.items.scrollHeight;
        this.maxHeight = `${scrollHeight}px`;
      }
    },
    mouseout() {
      if (this.openHover) {
        let scrollHeight = 0;
        this.maxHeight = `${scrollHeight}px`;
      }
    }
  },
  mounted() {
    this.openItems = this.open;
    if (this.open) {
      this.maxHeight = "none";
    }
  }
};
</script>


<style lang="scss">
@import "@/assets/scss/vuexy/components/verticalNavMenuGroup.scss";
</style>
