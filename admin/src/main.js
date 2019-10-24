import Vue from 'vue'
import App from './App.vue'

// Vuesax Component Framework
import Vuesax from 'vuesax'
import 'material-icons/iconfont/material-icons.css' //Material Icons
import 'vuesax/dist/vuesax.css'; // Vuesax
Vue.use(Vuesax)


// // VeeValidate
// import VeeValidate from 'vee-validate';
// Vue.use(VeeValidate);

// Theme Configurations
import '../themeConfig.js'


// Globally Registered Components
import './globalComponents.js'


// Styles: SCSS
import './assets/scss/main.scss'


// Tailwind
import '@/assets/css/main.css'


// Vue Router
import router from './router'


// Vuex Store
import store from './store/'


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

// Vue select css
// Note: In latest version you have to add it separately
import 'vue-select/dist/vue-select.css';


Vue.config.productionTip = false

// import {
//   ValidationProvider,
//   ValidationObserver,
//   extend
// } from 'vee-validate';
// import {
//   required
// } from 'vee-validate/dist/rules';

// extend('required', {
//   ...required, email, 
//   message: 'The {_field_} field is required'
// });

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
