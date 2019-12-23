import Vue from 'vue'
import App from './App.vue'

// Vuesax Component Framework
import Vuesax from 'vuesax'
import 'material-icons/iconfont/material-icons.css' //Material Icons
import 'vuesax/dist/vuesax.css'; // Vuesax
Vue.use(Vuesax)

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

// Vuejs - Vue wrapper for hammerjs
import {
  VueHammer
} from 'vue2-hammer'
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

Vue.config.productionTip = false

Vue.prototype.$log = console.log;

import _ from 'lodash';    
Object.defineProperty(Vue.prototype, '$_', { value: _ });

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app')
