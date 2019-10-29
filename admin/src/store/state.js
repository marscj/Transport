import navbarSearchAndPinList from "@/layouts/components/navbar/navbarSearchAndPinList"
import themeConfig from "@/../themeConfig.js"
import colors from "@/../themeConfig.js"

// const userDefaults = {
//   uid: 0, // From Auth
//   displayName: "John Doe", // From Auth
//   about: "Dessert chocolate cake lemon drops jujubes. Biscuit cupcake ice cream bear claw brownie brownie marshmallow.",
//   photoURL: require("@/assets/images/portrait/small/avatar-s-11.png"), // From Auth
//   status: "online",
//   userRole: "admin"
// }

// const userInfoLocalStorage = JSON.parse(localStorage.getItem("userInfo")) || {}

// const getUserInfo = () => {
//   let userInfo = {}

//   // Include properties from localStorage
//   Object.keys(userInfoLocalStorage).forEach((key) => {
//     if (userInfo[key] == undefined && userInfoLocalStorage[key] != null) userInfo[key] = userInfoLocalStorage[key]
//   })

//   return userInfo
// }

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
