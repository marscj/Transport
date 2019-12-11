import Vue from 'vue'
import VxTooltip from './layouts/components/vx-tooltip/VxTooltip.vue'
import VxCard  from './components/vx-card/VxCard.vue'
import VxList  from './components/vx-list/VxList.vue'
import vxTable  from './components/vx-table/vxTable.vue'
import VxBreadcrumb  from './layouts/components/VxBreadcrumb.vue'
import FeatherIcon  from './components/FeatherIcon.vue'
import VxInputGroup  from './components/vx-input-group/VxInputGroup.vue'
import { ValidationProvider, ValidationObserver } from 'vee-validate/dist/vee-validate.full'
Vue.component(VxTooltip.name, VxTooltip)
Vue.component(VxCard.name, VxCard)
Vue.component(VxList.name, VxList)
Vue.component(vxTable.name, vxTable)
Vue.component(VxBreadcrumb.name, VxBreadcrumb)
Vue.component(FeatherIcon.name, FeatherIcon)
Vue.component(VxInputGroup.name, VxInputGroup)
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

// v-select component
import vSelect from 'vue-select'

// Set the components prop default to return our fresh components
vSelect.props.components.default = () => ({
  Deselect: {
    render: createElement => createElement('feather-icon', {
      props: {
        icon: 'XIcon',
        svgClasses: 'w-4 h-4 mt-1'
      }
    }),
  },
  OpenIndicator: {
    render: createElement => createElement('feather-icon', {
      props: {
        icon: 'ChevronDownIcon',
        svgClasses: 'w-5 h-5'
      }
    }),
  },
});

Vue.component(vSelect)
