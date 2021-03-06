import Vue from 'vue'
import App from './App.vue'

import Antd from 'ant-design-vue';
// import 'ant-design-vue/dist/antd.css';
Vue.use(Antd);

import Vuesax from 'vuesax'
import 'vuesax/dist/vuesax.css'
Vue.use(Vuesax)

import 'material-icons/iconfont/material-icons.css' //Material Icons

// Theme Configurations
import '../themeConfig.js'

// Globally Registered Components
import './globalComponents.js'

// Styles: SCSS
import './assets/scss/main.scss'

// Tailwind
import '@/assets/css/tailwind.css'

// i18n
import i18n from './i18n/i18n'

// Vue Router
import router from './router'

// Vuex Store
import store from './store/'

// Directive
import './utils/action'

import PermissionHelper from '@/utils/permission'
Vue.use(PermissionHelper)

import { VueHammer } from 'vue2-hammer'
Vue.use(VueHammer)

// PrismJS
import 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'

// Feather font icon
require('./assets/css/iconfont.css')

// Note: In latest version you have to add it separately
import 'vue-select/dist/vue-select.css';

import Base64 from './base64.js'
Vue.prototype.$base64 = Base64;

import Storage from 'vue-ls';
Vue.use(Storage, {
  namespace: 'vuejs__', // key prefix
  name: 'ls', // name variable Vue.[ls] or this.[$ls],
  storage: 'local', // storage name session, local, memory
});

import moment from 'moment'
Vue.filter('moment', function (dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
  return moment(dataStr).format(pattern)
})

Vue.config.productionTip = false

import _ from 'lodash';    
Object.defineProperty(Vue.prototype, '$_', { value: _ });

// import VueLodash from 'vue-lodash'
// Vue.use(VueLodash, { name: 'lodash' }) 

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app')
