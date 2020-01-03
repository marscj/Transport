(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7a030458"],{a517:function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("vs-card",{staticClass:"data-list-container",attrs:{id:"data-list-thumb-view"}},[a("data-view-sidebar",{attrs:{isSidebarActive:e.addNewDataSidebar,data:e.sidebarData,categoryData:e.categoryData},on:{closeSidebar:e.toggleDataSidebar}}),a("div",[a("div",{staticClass:"flex flex-wrap pt-4"},[a("div",{staticClass:"px-4"},[a("a-form-item",{attrs:{label:"LICENSE PLATE"}},[a("a-input",{staticClass:"hover:border-teal-500 focus:border-teal-500",model:{value:e.localQueryParam.license_plate,callback:function(t){e.$set(e.localQueryParam,"license_plate",t)},expression:"localQueryParam.license_plate"}})],1)],1),a("div",{staticClass:"px-4"},[a("a-form-item",{attrs:{label:"MODEL"}},[a("a-input",{staticClass:"hover:border-teal-500 focus:border-teal-500",model:{value:e.localQueryParam.model,callback:function(t){e.$set(e.localQueryParam,"model",t)},expression:"localQueryParam.model"}})],1)],1),a("div",{staticClass:"px-4"},[a("a-form-item",{attrs:{label:"SEATS"}},[a("a-input-number",{staticClass:"hover:border-teal-500 focus:border-teal-500",model:{value:e.localQueryParam.seats,callback:function(t){e.$set(e.localQueryParam,"seats",t)},expression:"localQueryParam.seats"}})],1)],1),a("div",{staticClass:"px-4"},[a("a-form-item",{attrs:{label:"CATEGORY"}},[a("a-select",{staticClass:"w-64",attrs:{allowClear:""},model:{value:e.localQueryParam.category,callback:function(t){e.$set(e.localQueryParam,"category",t)},expression:"localQueryParam.category"}},e._l(e.categoryData,(function(t){return a("a-select-option",{key:t.id,attrs:{value:t.id}},[e._v(e._s(t.name))])})),1)],1)],1),a("div",{staticClass:"px-4"},[a("a-form-item",{attrs:{label:"DRIVER"}},[a("a-input",{staticClass:"hover:border-teal-500 focus:border-teal-500",model:{value:e.localQueryParam.driver,callback:function(t){e.$set(e.localQueryParam,"driver",t)},expression:"localQueryParam.driver"}})],1)],1),a("div",{staticClass:"px-4"},[a("a-form-item",{attrs:{label:"SUPPLIER"}},[a("a-input",{staticClass:"hover:border-teal-500 focus:border-teal-500",model:{value:e.localQueryParam.supplier,callback:function(t){e.$set(e.localQueryParam,"supplier",t)},expression:"localQueryParam.supplier"}})],1)],1),a("div",{staticClass:"px-4"},[a("a-form-item",{attrs:{label:"ACTIVE"}},[a("vs-checkbox",{model:{value:e.localQueryParam.is_active,callback:function(t){e.$set(e.localQueryParam,"is_active",t)},expression:"localQueryParam.is_active"}})],1)],1),a("div",{staticClass:"px-4"},[a("a-form-item",[a("button",{staticClass:"bg-teal-500 hover:bg-teal-700 focus:outline-none text-white font-bold rounded px-6 my-10",on:{click:function(){return e.$refs.table.refresh()}}},[e._v("Search")])])],1)])]),e.selectModel?e._e():a("div",{directives:[{name:"action",rawName:"v-action:add_vehicle",arg:"add_vehicle"}],staticClass:"px-4"},[a("vs-button",{attrs:{type:"border","icon-pack":"feather",icon:"icon-plus"},on:{click:e.addNewData}},[e._v("Add New")])],1),a("s-table",{ref:"table",staticClass:"p-4",attrs:{columns:e.columns,data:e.loadData,rowKey:function(e){return e.id}},scopedSlots:e._u([{key:"license_plate",fn:function(t,r){return[t?a("a",{on:{click:function(t){return e.editData(r)}}},[e._v(e._s(t))]):e._e()]}},{key:"model",fn:function(t,r){return[t?a("a",{on:{click:function(t){return e.editData(r)}}},[e._v(e._s(t))]):e._e()]}},{key:"seats",fn:function(t,r){return[t?a("a",{on:{click:function(t){return e.editData(r)}}},[e._v(e._s(t))]):e._e()]}},{key:"category",fn:function(t,r){return[t?a("a",{on:{click:function(t){return e.editData(r)}}},[e._v(e._s(t.name))]):e._e()]}},{key:"driver",fn:function(t,r){return[t?a("a",{on:{click:function(t){return e.editData(r)}}},[e._v(e._s(t.username))]):e._e()]}},{key:"supplier",fn:function(t,r){return[t?a("a",{on:{click:function(t){return e.editData(r)}}},[e._v(e._s(t))]):e._e()]}},{key:"active",fn:function(t,r){return[a("a-checkbox",{attrs:{checked:t,disabled:""},on:{click:function(t){return e.editData(r)}}})]}},{key:"action",fn:function(t,r){return[a("feather-icon",{staticClass:"ml-2",attrs:{icon:"TrashIcon",svgClasses:"w-5 h-5 hover:text-danger stroke-current"},on:{click:function(t){return t.stopPropagation(),e.openConfirm(r.id)}}})]}}])})],1)},i=[],s=(a("4de4"),a("e64c")),n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("vs-sidebar",{staticClass:"add-new-data-sidebar items-no-padding",attrs:{"click-not-close":"","position-right":"",parent:"body","default-index":"1",color:"primary",spacer:""},model:{value:e.isSidebarActiveLocal,callback:function(t){e.isSidebarActiveLocal=t},expression:"isSidebarActiveLocal"}},[a("div",{staticClass:"mt-6 flex items-center justify-between px-6"},[a("h4",[e._v(e._s(e.isEdit?"ADD NEW":"UPDATE")+" ITEM")]),a("feather-icon",{staticClass:"cursor-pointer",attrs:{icon:"XIcon"},on:{click:function(t){t.stopPropagation(),e.isSidebarActiveLocal=!1}}})],1),a("vs-divider",{staticClass:"mb-0"}),a("VuePerfectScrollbar",{staticClass:"scroll-area--data-list-add-new",attrs:{settings:e.settings}},[a("div",{staticClass:"p-6"},[a("validation-observer",{ref:"observer",scopedSlots:e._u([{key:"default",fn:function(t){t.validate,t.dirty;return[a("validation-provider",{attrs:{name:"license_plate",rules:"required|max:16|min:5"},scopedSlots:e._u([{key:"default",fn:function(t){var r=t.errors;return[a("a-form-item",{attrs:{label:"License plate"}},[a("a-input",{staticClass:"w-full",model:{value:e.form.license_plate,callback:function(t){e.$set(e.form,"license_plate",t)},expression:"form.license_plate"}})],1),a("span",[e._v(e._s(r[0]))])]}}],null,!0)}),a("validation-provider",{attrs:{name:"model",rules:"required|max:64|min:3"},scopedSlots:e._u([{key:"default",fn:function(t){var r=t.errors;return[a("a-form-item",{attrs:{label:"Model"}},[a("a-input",{staticClass:"w-full",model:{value:e.form.model,callback:function(t){e.$set(e.form,"model",t)},expression:"form.model"}})],1),a("span",[e._v(e._s(r[0]))])]}}],null,!0)}),a("validation-provider",{attrs:{name:"seats",rules:"required|min_value:0"},scopedSlots:e._u([{key:"default",fn:function(t){var r=t.errors;return[a("a-form-item",{attrs:{label:"Seats"}},[a("a-input-number",{staticClass:"w-full",attrs:{step:1},model:{value:e.form.seats,callback:function(t){e.$set(e.form,"seats",t)},expression:"form.seats"}})],1),a("span",[e._v(e._s(r[0]))])]}}],null,!0)}),a("validation-provider",{attrs:{name:"supplier",rules:"required|max:64|min:3"},scopedSlots:e._u([{key:"default",fn:function(t){var r=t.errors;return[a("a-form-item",{attrs:{label:"Supplier"}},[a("a-input",{staticClass:"w-full",model:{value:e.form.supplier,callback:function(t){e.$set(e.form,"supplier",t)},expression:"form.supplier"}})],1),a("span",[e._v(e._s(r[0]))])]}}],null,!0)}),a("a-form-item",{attrs:{label:"Category"}},[a("v-select",{attrs:{options:e.categoryData,label:"name"},model:{value:e.category,callback:function(t){e.category=t},expression:"category"}})],1),a("validation-provider",{attrs:{name:"driver_id"},scopedSlots:e._u([{key:"default",fn:function(t){var r=t.errors;return[a("a-form-item",{attrs:{label:"Driver"}},[a("v-select",{attrs:{options:e.driverData,label:"username"},model:{value:e.driver,callback:function(t){e.driver=t},expression:"driver"}})],1),a("span",[e._v(e._s(r[0]))])]}}],null,!0)}),a("vs-checkbox",{staticClass:"mt-5 w-full",model:{value:e.form.is_active,callback:function(t){e.$set(e.form,"is_active",t)},expression:"form.is_active"}},[e._v("Active")]),a("validation-provider",{attrs:{name:"non_field_errors"},scopedSlots:e._u([{key:"default",fn:function(t){var r=t.errors;return[a("span",[e._v(e._s(r[0]))])]}}],null,!0)})]}}])})],1)]),a("div",{staticClass:"flex flex-wrap items-center p-6",attrs:{slot:"footer"},slot:"footer"},[a("vs-button",{staticClass:"mr-6",on:{click:e.submit}},[e._v("Submit")]),a("vs-button",{attrs:{type:"border",color:"danger"},on:{click:function(t){e.isSidebarActiveLocal=!1}}},[e._v("Cancel")])],1)],1)},o=[],l=(a("4fad"),a("9d63")),c=a.n(l),u=a("4a7a"),d=a.n(u),f=a("f8da"),v={components:{vSelect:d.a,VuePerfectScrollbar:c.a},props:{isSidebarActive:{type:Boolean,required:!0},data:{type:Object,default:function(){}},categoryData:{type:Array,default:function(){return[]}}},watch:{isSidebarActive:function(e){e&&Object.entries(this.data).length&&(this.form=Object.assign({},this.data),this.category=Object.assign({},this.data.category),this.driver=Object.assign({},this.data.driver))}},computed:{isSidebarActiveLocal:{get:function(){return this.isSidebarActive},set:function(e){e||this.$emit("closeSidebar")}},isEdit:function(){return 0===Object.entries(this.data).length}},data:function(){return{form:{id:void 0,license_plate:"",model:"",supplier:"",is_active:!0,seats:5,category_id:void 0,driver_id:void 0},category:void 0,driver:void 0,driverData:[],settings:{maxScrollbarLength:60,wheelSpeed:.6}}},mounted:function(){this.getUserData()},methods:{submit:function(){var e=this;this.isEdit?(delete this.form.category,delete this.form.driver,Object(s["d"])(this.form,Object.assign(this.form,{category_id:this.category?this.category.id:null,driver_id:this.driver?this.driver.id:null})).then((function(){e.isSidebarActiveLocal=!1})).catch((function(t){t.response&&e.$refs.observer.setErrors(t.response.data.result)}))):(delete this.form.category,delete this.form.driver,Object(s["q"])(this.form.id,Object.assign(this.form,{category_id:this.category?this.category.id:null,driver_id:this.driver?this.driver.id:null})).then((function(){e.isSidebarActiveLocal=!1})).catch((function(t){t.response&&e.$refs.observer.setErrors(t.response.data.result)})))},getUserData:function(){var e=this;Object(f["e"])({role:"Driver",vehicle:!0}).then((function(t){e.driverData=t.result}))}}},m=v,p=(a("e15f"),a("2877")),b=Object(p["a"])(m,n,o,!1,null,"6578e52f",null),h=b.exports,y=a("e1f9"),g={components:{DataViewSidebar:h,STable:y["a"]},props:{selectModel:{type:Boolean,default:!1},queryParam:{type:Object,default:function(){return{is_active:!0}}}},data:function(){var e=this;return{localQueryParam:Object.assign({},this.queryParam),columns:[{title:"LICENSE PLATE",dataIndex:"license_plate",scopedSlots:{customRender:"license_plate"},align:"center",sorter:!0},{title:"MODEL",dataIndex:"model",scopedSlots:{customRender:"model"},align:"center",sorter:!0},{title:"SEATS",dataIndex:"seats",scopedSlots:{customRender:"seats"},align:"center",sorter:!0},{title:"CATEGORY",dataIndex:"category",scopedSlots:{customRender:"category"},align:"center",sorter:!0},{title:"DRIVER",dataIndex:"driver",scopedSlots:{customRender:"driver"},align:"center",sorter:!0},{title:"SUPPLIER",dataIndex:"supplier",scopedSlots:{customRender:"supplier"},align:"center",sorter:!0},{title:"ACTIVE",dataIndex:"is_active",scopedSlots:{customRender:"active"},align:"center",sorter:!0},{title:"ACTION",scopedSlots:{customRender:"action"},align:"center"}].filter((function(t){return"ACTION"!=t.title?t:e.$auth("itinerary.delete_itinerary")?t:void 0})),addNewDataSidebar:!1,sidebarData:{},categoryData:[],loadData:function(t){return Object(s["m"])(Object.assign(t,e.localQueryParam)).then((function(e){return e.result}))}}},mounted:function(){this.getCategoryData()},methods:{getCategoryData:function(){var e=this;Object(s["h"])().then((function(t){e.categoryData=t.result}))},addNewData:function(){this.sidebarData={},this.toggleDataSidebar(!0)},editData:function(e){this.selectModel?this.$emit("vehicle",e):this.$auth("vehicle.change_vehicle")&&(this.sidebarData=e,this.toggleDataSidebar(!0))},toggleDataSidebar:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];this.addNewDataSidebar=e,e||this.$refs.table.refresh()},deleteData:function(e){var t=this;Object(s["g"])(e).then((function(){t.result()}))},refresh:function(){this.$refs.table.refresh()},openConfirm:function(e){var t=this;this.$vs.dialog({type:"confirm",color:"danger",title:"Confirm",text:"Are you sure delete?",accept:function(){return t.deleteData(e)}})}}},_=g,S=Object(p["a"])(_,r,i,!1,null,null,null);t["default"]=S.exports},e15f:function(e,t,a){"use strict";var r=a("f527"),i=a.n(r);i.a},f527:function(e,t,a){},f8da:function(e,t,a){"use strict";a.d(t,"e",(function(){return i})),a.d(t,"h",(function(){return s})),a.d(t,"b",(function(){return n})),a.d(t,"c",(function(){return o})),a.d(t,"g",(function(){return l})),a.d(t,"a",(function(){return c})),a.d(t,"d",(function(){return u})),a.d(t,"f",(function(){return d}));var r=a("b775");function i(e){return r["a"].get("users/",{params:e})}function s(e,t){return r["a"].put("users/"+"".concat(e,"/"),t)}function n(e){return r["a"].post("users/",e)}function o(){return r["a"].get("groups/")}function l(e,t){return r["a"].put("groups/"+"".concat(e,"/"),t)}function c(e){return r["a"].post("groups/",e)}function u(e){return r["a"].get("permissions/",{params:e})}function d(e,t){return r["a"].put("groups/"+"".concat(e,"/"),t)}}}]);
//# sourceMappingURL=chunk-7a030458.31536545.js.map