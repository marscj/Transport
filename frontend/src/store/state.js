import navbarSearchAndPinList from "@/layouts/components/navbar/navbarSearchAndPinList"
import themeConfig from "@/../themeConfig.js"
import colors from "@/../themeConfig.js"

const state = {
  bodyOverlay: false,
  isVerticalNavMenuActive: true,
  mainLayoutType: themeConfig.mainLayoutType || "vertical",
  navbarSearchAndPinList: navbarSearchAndPinList,
  reduceButton: themeConfig.sidebarCollapsed,
  verticalNavMenuWidth: "default",
  verticalNavMenuItemsMin: false,
  scrollY: 0,
  starredPages: navbarSearchAndPinList.data.filter((page) => page.highlightAction),
  theme: themeConfig.theme || "light",
  themePrimaryColor: colors.primary,
  windowWidth: null,
}

export default state
