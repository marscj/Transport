<template>
  <div class="parentx">
    <vs-sidebar
      class="v-nav-menu items-no-padding"
      v-model="isVerticalNavMenuActive"
      ref="verticalNavMenu"
      default-index="-1"
      :click-not-close="clickNotClose"
      :reduce-not-rebound="reduceNotRebound"
      :parent="parent"
      :hiddenBackground="clickNotClose"
      :reduce="reduce"
      v-hammer:swipe.left="onSwipeLeft"
    >
      <div @mouseenter="mouseEnter" @mouseleave="mouseLeave">
        <!-- Header -->
        <div class="header-sidebar flex items-end justify-between" slot="header">
          <!-- Logo -->
          <router-link tag="div" class="vx-logo cursor-pointer flex items-center" to="/admin">
            <img :src="logo" alt="logo" class="w-10 mr-4" v-if="logo" />
            <span class="vx-logo-text" v-show="isMouseEnter || !reduce" v-if="title">{{ title }}</span>
          </router-link>
          <!-- /Logo -->

          <!-- Menu Buttons -->
          <div>
            <!-- Close Button -->
            <template v-if="showCloseButton">
              <feather-icon
                icon="XIcon"
                class="m-0 cursor-pointer"
                @click="$store.commit('TOGGLE_IS_VERTICAL_NAV_MENU_ACTIVE', false)"
              />
            </template>

            <!-- Toggle Buttons -->
            <template v-else-if="!showCloseButton && !verticalNavMenuItemsMin">
              <feather-icon
                id="btnVNavMenuMinToggler"
                class="mr-0 cursor-pointer"
                :icon="reduce ? 'CircleIcon' : 'DiscIcon'"
                svg-classes="stroke-current"
                @click="toggleReduce(!reduce)"
              />
            </template>
          </div>
          <!-- /Menu Toggle Buttons -->
        </div>
        <!-- /Header -->

        <!-- Header Shadow -->
        <div class="shadow-bottom" v-show="showShadowBottom" />
        <!-- Menu Items -->
        <VuePerfectScrollbar
          ref="verticalNavMenuPs"
          class="scroll-area-v-nav-menu pt-2"
          :settings="settings"
          @ps-scroll-y="psSectionScroll"
        >
          <template v-for="(item, index) in menuItemsUpdated">
            <!-- Group Header -->
            <span
              v-if="item.meta.header && !verticalNavMenuItemsMin"
              class="navigation-header truncate"
              :key="`header-${index}`"
            >{{ $t(item.meta.i18n) || item.meta.header }}</span>

            <!-- /Group Header -->
            <template v-else-if="!item.meta.header">
              <!-- Nav-Item -->
              <v-nav-menu-item
                v-if="!item.meta.submenu"
                :key="`item-${index}`"
                :index="index"
                :to="item.meta.slug !== 'external' ? item.meta.url : null"
                :href="item.meta.slug === 'external' ? item.meta.url : null"
                :icon="item.meta.icon"
                :target="item.meta.target"
                :isDisabled="item.meta.isDisabled"
                :slug="item.meta.slug"
              >
                <span
                  v-show="!verticalNavMenuItemsMin"
                  class="truncate"
                >{{ $t(item.meta.i18n) || item.meta.name }}</span>
                <vs-chip
                  class="ml-auto"
                  :color="item.meta.tagColor"
                  v-if="item.meta.tag && (isMouseEnter || !reduce)"
                >{{ item.meta.tag }}</vs-chip>
              </v-nav-menu-item>

              <!-- Nav-Group -->
              <template v-else>
                <v-nav-menu-group
                  :key="`group-${index}`"
                  :openHover="openGroupHover"
                  :group="item"
                  :groupIndex="index"
                  :open="isGroupActive(item)"
                />
              </template>
              <!-- /Nav-Group -->
            </template>
          </template>
        </VuePerfectScrollbar>
        <!-- /Menu Items -->
      </div>
    </vs-sidebar>

    <!-- Swipe Gesture -->
    <div
      v-if="!isVerticalNavMenuActive"
      class="v-nav-menu-swipe-area"
      v-hammer:swipe.right="onSwipeAreaSwipeRight"
    />
    <!-- /Swipe Gesture -->
  </div>
</template>


<script>
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import VNavMenuGroup from "./VerticalNavMenuGroup.vue";
import VNavMenuItem from "./VerticalNavMenuItem.vue";

export default {
  name: "v-nav-menu",
  components: {
    VNavMenuGroup,
    VNavMenuItem,
    VuePerfectScrollbar
  },
  props: {
    logo: { type: String },
    openGroupHover: { type: Boolean, default: false },
    parent: { type: String },
    reduceNotRebound: { type: Boolean, default: true },
    navMenuItems: { type: Array, required: true },
    title: { type: String }
  },
  data: () => ({
    clickNotClose: false, // disable close navMenu on outside click
    isMouseEnter: false,
    reduce: false, // determines if navMenu is reduce - component property
    showCloseButton: false, // show close button in smaller devices
    settings: {
      // perfectScrollbar settings
      maxScrollbarLength: 60,
      wheelSpeed: 1,
      swipeEasing: true
    },
    showShadowBottom: false
  }),
  computed: {
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
    },
    menuItemsUpdated() {
      let clone = this.navMenuItems.slice();
      for (let [index, item] of this.navMenuItems.entries()) {
        if (item.meta.header && item.children.length && (index || 1)) {
          let i = clone.findIndex(ix => ix.meta.header === item.meta.header);
          for (let [subIndex, subItem] of item.children.entries()) {
            clone.splice(i + 1 + subIndex, 0, subItem);
          }
        }
      }
      return clone;
    },
    isVerticalNavMenuActive: {
      get() {
        return this.$store.state.isVerticalNavMenuActive;
      },
      set(val) {
        this.$store.commit("TOGGLE_IS_VERTICAL_NAV_MENU_ACTIVE", val);
      }
    },
    layoutType() {
      return this.$store.state.mainLayoutType;
    },
    reduceButton: {
      get() {
        return this.$store.state.reduceButton;
      },
      set(val) {
        this.$store.commit("TOGGLE_REDUCE_BUTTON", val);
      }
    },
    isVerticalNavMenuReduced() {
      return Boolean(this.reduce && this.reduceButton);
    },
    verticalNavMenuItemsMin() {
      return this.$store.state.verticalNavMenuItemsMin;
    },
    windowWidth() {
      return this.$store.state.windowWidth;
    }
  },
  watch: {
    $route() {
      if (this.isVerticalNavMenuActive && this.showCloseButton)
        this.$store.commit("TOGGLE_IS_VERTICAL_NAV_MENU_ACTIVE", false);
    },
    reduce(val) {
      const verticalNavMenuWidth = val ? "reduced" : "default";
      this.$store.dispatch("updateVerticalNavMenuWidth", verticalNavMenuWidth);

      setTimeout(function() {
        window.dispatchEvent(new Event("resize"));
      }, 100);
    },
    layoutType() {
      this.setVerticalNavMenuWidth();
    },
    reduceButton() {
      this.setVerticalNavMenuWidth();
    },
    windowWidth() {
      this.setVerticalNavMenuWidth();
    }
  },
  methods: {
    // handleWindowResize(event) {
    //   this.windowWidth = event.currentTarget.innerWidth;
    //   this.setVerticalNavMenuWidth()
    // },
    onSwipeLeft() {
      if (this.isVerticalNavMenuActive && this.showCloseButton)
        this.isVerticalNavMenuActive = false;
    },
    onSwipeAreaSwipeRight() {
      if (!this.isVerticalNavMenuActive && this.showCloseButton)
        this.isVerticalNavMenuActive = true;
    },
    psSectionScroll() {
      this.showShadowBottom =
        this.$refs.verticalNavMenuPs.$el.scrollTop > 0 ? true : false;
    },
    mouseEnter() {
      if (this.reduce)
        this.$store.commit("UPDATE_VERTICAL_NAV_MENU_ITEMS_MIN", false);
      this.isMouseEnter = true;
    },
    mouseLeave() {
      if (this.reduce)
        this.$store.commit("UPDATE_VERTICAL_NAV_MENU_ITEMS_MIN", true);
      this.isMouseEnter = false;
    },
    setVerticalNavMenuWidth() {
      if (this.windowWidth > 1200) {
        if (this.layoutType === "vertical") {
          // Set reduce
          this.reduce = this.reduceButton ? true : false;

          // Open NavMenu
          this.$store.commit("TOGGLE_IS_VERTICAL_NAV_MENU_ACTIVE", true);

          // Set Menu Items Only Icon Mode
          const verticalNavMenuItemsMin =
            this.reduceButton && !this.isMouseEnter ? true : false;
          this.$store.commit(
            "UPDATE_VERTICAL_NAV_MENU_ITEMS_MIN",
            verticalNavMenuItemsMin
          );

          // Menu Action buttons
          this.clickNotClose = true;
          this.showCloseButton = false;

          const verticalNavMenuWidth = this.isVerticalNavMenuReduced
            ? "reduced"
            : "default";
          this.$store.dispatch(
            "updateVerticalNavMenuWidth",
            verticalNavMenuWidth
          );

          return;
        }
      }

      // Close NavMenu
      this.$store.commit("TOGGLE_IS_VERTICAL_NAV_MENU_ACTIVE", false);

      // Reduce button
      if (this.reduceButton) this.reduce = false;

      // Menu Action buttons
      this.showCloseButton = true;
      this.clickNotClose = false;

      // Update NavMenu Width
      this.$store.dispatch("updateVerticalNavMenuWidth", "no-nav-menu");

      // Remove Only Icon in Menu
      this.$store.commit("UPDATE_VERTICAL_NAV_MENU_ITEMS_MIN", false);

      // if(this.layoutType === 'vertical' || (this.layoutType === 'horizontal' && this.windowWidth < 1200))
      // if (this.windowWidth < 1200) {

      //   // Close NavMenu
      //   this.$store.commit('TOGGLE_IS_VERTICAL_NAV_MENU_ACTIVE', false)

      //   // Reduce button
      //   if (this.reduceButton) this.reduce = false

      //   // Menu Action buttons
      //   this.showCloseButton = true
      //   this.clickNotClose   = false

      //   // Update NavMenu Width
      //   this.$store.dispatch('updateVerticalNavMenuWidth', 'no-nav-menu')

      //   // Remove Only Icon in Menu
      //   this.$store.commit('UPDATE_VERTICAL_NAV_MENU_ITEMS_MIN', false)

      // } else {

      //   // Set reduce
      //   this.reduce = this.reduceButton ? true : false

      //   // Open NavMenu
      //   this.$store.commit('TOGGLE_IS_VERTICAL_NAV_MENU_ACTIVE', true)

      //   // Set Menu Items Only Icon Mode
      //   const verticalNavMenuItemsMin = (this.reduceButton && !this.isMouseEnter) ? true : false
      //   this.$store.commit('UPDATE_VERTICAL_NAV_MENU_ITEMS_MIN', verticalNavMenuItemsMin)

      //   // Menu Action buttons
      //   this.clickNotClose   = true
      //   this.showCloseButton = false

      //   const verticalNavMenuWidth   = this.isVerticalNavMenuReduced ? "reduced" : "default"
      //   this.$store.dispatch('updateVerticalNavMenuWidth', verticalNavMenuWidth)
      // }
    },
    toggleReduce(val) {
      this.reduceButton = val;
      this.setVerticalNavMenuWidth();
    }
  },
  mounted() {
    this.setVerticalNavMenuWidth();
  }
};
</script>


<style lang="scss">
@import "@/assets/scss/vuexy/components/verticalNavMenu.scss";
</style>
