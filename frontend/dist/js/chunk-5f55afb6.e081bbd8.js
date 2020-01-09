(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5f55afb6"],{2638:function(t,e,a){"use strict";function r(){return r=Object.assign||function(t){for(var e,a=1;a<arguments.length;a++)for(var r in e=arguments[a],e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t},r.apply(this,arguments)}var n=["attrs","props","domProps"],i=["class","style","directives"],o=["on","nativeOn"],s=function(t){return t.reduce((function(t,e){for(var a in e)if(t[a])if(-1!==n.indexOf(a))t[a]=r({},t[a],e[a]);else if(-1!==i.indexOf(a)){var s=t[a]instanceof Array?t[a]:[t[a]],l=e[a]instanceof Array?e[a]:[e[a]];t[a]=s.concat(l)}else if(-1!==o.indexOf(a))for(var u in e[a])if(t[a][u]){var d=t[a][u]instanceof Array?t[a][u]:[t[a][u]],f=e[a][u]instanceof Array?e[a][u]:[e[a][u]];t[a][u]=d.concat(f)}else t[a][u]=e[a][u];else if("hook"==a)for(var p in e[a])t[a][p]=t[a][p]?c(t[a][p],e[a][p]):e[a][p];else t[a]=e[a];else t[a]=e[a];return t}),{})},c=function(t,e){return function(){t&&t.apply(this,arguments),e&&e.apply(this,arguments)}};t.exports=s},5213:function(t,e,a){"use strict";a.d(e,"e",(function(){return n})),a.d(e,"d",(function(){return i})),a.d(e,"f",(function(){return o})),a.d(e,"a",(function(){return s})),a.d(e,"g",(function(){return c})),a.d(e,"b",(function(){return l})),a.d(e,"c",(function(){return u}));var r=a("b775");function n(t){return r["a"].get("orders/",{params:t})}function i(t){return r["a"].get("orders/"+"".concat(t,"/"))}function o(t,e){return r["a"].put("orders/"+"".concat(t,"/"),e)}function s(t){return r["a"].post("orders/",t)}function c(t,e){return r["a"].put("order_itinerary/"+"".concat(t,"/"),e)}function l(t){return r["a"].post("order_itinerary/",t)}function u(t){return r["a"].delete("order_itinerary/"+"".concat(t,"/"))}},"88a6":function(t,e,a){"use strict";a.d(e,"d",(function(){return n})),a.d(e,"c",(function(){return i})),a.d(e,"e",(function(){return o})),a.d(e,"a",(function(){return s})),a.d(e,"b",(function(){return c}));var r=a("b775");function n(t){return r["a"].get("invoices/",{params:t})}function i(t){return r["a"].get("invoices/"+"".concat(t,"/"))}function o(t,e){return r["a"].put("invoices/"+"".concat(t,"/"),e)}function s(t){return r["a"].post("invoices/",t)}function c(t){return r["a"].delete("invoices/"+"".concat(t,"/"))}},c5d1:function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",[t.formData.invoiceId?a("pre",{staticClass:"py-4"},[t._v("ID: "+t._s(t.formData.invoiceId))]):t._e(),a("vs-card",{staticClass:"py-4"},[a("validation-observer",{ref:"observer",scopedSlots:t._u([{key:"default",fn:function(e){e.validate,e.dirty;return[a("div",{staticClass:"flex flex-wrap"},[a("div",{staticClass:"flex-1 px-4"},[a("validation-provider",{attrs:{name:"customer_id"},scopedSlots:t._u([{key:"default",fn:function(e){var r=e.errors;return[a("a-form-item",{attrs:{label:"Customer"}},[a("a-select",{staticClass:"w-full",attrs:{disabled:t.isEdit,allowClear:""},model:{value:t.formData.customer_id,callback:function(e){t.$set(t.formData,"customer_id",e)},expression:"formData.customer_id"}},t._l(t.customerData,(function(e){return a("a-select-option",{key:e.id,attrs:{value:e.id}},[t._v(t._s(e.username))])})),1)],1),a("span",[t._v(t._s(r[0]))])]}}],null,!0)})],1),a("div",{staticClass:"flex-1 px-4"},[a("validation-provider",{attrs:{name:"start_date"},scopedSlots:t._u([{key:"default",fn:function(e){var r=e.errors;return[a("a-form-item",{attrs:{label:"Date"}},[a("a-range-picker",{attrs:{disabled:t.isEdit},model:{value:t.selectDate,callback:function(e){t.selectDate=e},expression:"selectDate"}})],1),a("span",[t._v(t._s(r[0]))])]}}],null,!0)})],1),a("div",{staticClass:"flex-1 px-4"},[a("validation-provider",{attrs:{name:"status"},scopedSlots:t._u([{key:"default",fn:function(e){var r=e.errors;return[a("a-form-item",{attrs:{label:"Status"}},[a("a-select",{staticClass:"w-full",model:{value:t.formData.status,callback:function(e){t.$set(t.formData,"status",e)},expression:"formData.status"}},[a("a-select-option",{key:"1",attrs:{value:"Unpaid"}},[t._v("Unpaid")]),a("a-select-option",{key:"2",attrs:{value:"Paid"}},[t._v("Paid")])],1)],1),a("span",[t._v(t._s(r[0]))])]}}],null,!0)})],1),a("div",{staticClass:"flex-1 px-4"},[a("validation-provider",{attrs:{name:"remark"},scopedSlots:t._u([{key:"default",fn:function(e){var r=e.errors;return[a("a-form-item",{attrs:{label:"Remark"}},[a("a-textarea",{staticClass:"w-full",model:{value:t.formData.remark,callback:function(e){t.$set(t.formData,"remark",e)},expression:"formData.remark"}})],1),a("span",[t._v(t._s(r[0]))])]}}],null,!0)})],1),a("validation-provider",{attrs:{name:"non_field_errors"},scopedSlots:t._u([{key:"default",fn:function(e){var r=e.errors;return[a("span",[t._v(t._s(r[0]))])]}}],null,!0)})],1)]}}])}),a("s-table",{ref:"table",staticClass:"px-4",attrs:{rowKey:function(t){return t.id},columns:t.columns,data:t.loadData,rowSelection:{selectedRowKeys:t.selectedRowKeys,onChange:t.onSelectChange},showPagination:!1},scopedSlots:t._u([{key:"orderId",fn:function(e,r){return[a("router-link",{attrs:{to:{name:"order_detail",params:{id:r.id}}}},[a("p",{staticClass:"text-gray-700"},[t._v(t._s(e))])])]}},{key:"relatedId",fn:function(e,r){return[a("router-link",{attrs:{to:{name:"order_detail",params:{id:r.id}}}},[a("pre",{staticClass:"text-gray-700"},[t._v(t._s(e))])])]}},{key:"start_date",fn:function(e,r){return[a("router-link",{attrs:{to:{name:"order_detail",params:{id:r.id}}}},[a("pre",{staticClass:"text-gray-700"},[t._v(t._s(e))])])]}},{key:"vehicle",fn:function(e,r){return[e?a("router-link",{attrs:{to:{name:"order_detail",params:{id:r.id}}}},[a("pre",{staticClass:"text-gray-700"},[t._v(t._s(e.license_plate))])]):t._e()]}},{key:"category",fn:function(e,r){return[e?a("router-link",{attrs:{to:{name:"order_detail",params:{id:r.id}}}},[a("pre",{staticClass:"text-gray-700"},[t._v(t._s(e))])]):t._e()]}},{key:"o-itinerary",fn:function(e,r){return[a("router-link",{attrs:{to:{name:"order_detail",params:{id:r.id}}}},t._l(e,(function(e){return a("pre",{key:e.id,staticClass:"whitespace-no-wrap font-normal"},[t._v("          "),a("span",{staticClass:"text-blue-500"},[t._v(t._s(t._f("moment")(e.date,"MM-DD")))]),t._v("\n          "),e.time?a("span",{staticClass:"text-blue-500"},[t._v(","+t._s(e.time.substring(0,5)))]):t._e(),t._v("\n          "),a("span",{staticClass:"text-blue-500"},[t._v(","+t._s(e.itinerary.name))]),t._v("\n        ")])})),0)]}},{key:"price",fn:function(e,r){return[a("router-link",{attrs:{to:{name:"order_detail",params:{id:r.id}}}},t._l(e,(function(e){return a("pre",{key:e.id,staticClass:"whitespace-no-wrap font-normal text-pink-500"},[t._v("          "),a("span",[t._v(t._s(e.price))]),t._v("\n        ")])})),0)]}},{key:"payment",fn:function(e,r){return[a("router-link",{attrs:{to:{name:"order_detail",params:{id:r.id}}}},t._l(e,(function(e){return a("pre",{key:e.id,staticClass:"whitespace-no-wrap font-normal text-pink-500"},[t._v("          "),a("span",[t._v(t._s(e.payment))]),t._v("\n        ")])})),0)]}},{key:"total",fn:function(e,r){return[a("router-link",{attrs:{to:{name:"order_detail",params:{id:r.id}}}},[a("pre",[t._v(" "),a("span",[t._v(t._s(e))])])])]}},{key:"customer",fn:function(e,r){return[e?a("router-link",{attrs:{to:{name:"order_detail",params:{id:r.id}}}},[a("pre",{staticClass:"text-gray-700"},[t._v(t._s(e))])]):t._e()]}},{key:"invoice",fn:function(e){return[e?a("router-link",{attrs:{to:{name:"invoice_detail",params:{id:e.id}}}},[a("pre",{staticClass:"text-gray-700"},[t._v(t._s(e.invoiceId))])]):a("pre",{staticClass:"text-gray-700"},[t._v("unknow")])]}}])}),a("div",{staticClass:"flex flex-wrap"},[t.isEdit?a("div",{staticClass:"p-4"},[a("a-button",{attrs:{type:"primary"},on:{click:function(e){return t.updateInvoiceData()}}},[t._v("Update")])],1):a("div",{staticClass:"p-4"},[a("a-button",{attrs:{type:"primary"},on:{click:function(e){return t.createInvoiceData()}}},[t._v("Create")])],1),t.isEdit?a("div",{staticClass:"p-4"},[a("a-button",{attrs:{type:"primary"},on:{click:function(e){return t.openPreview()}}},[t._v("Preview")])],1):t._e()])],1)],1)])},n=[],i=(a("ac1f"),a("5319"),a("5213")),o=a("f8da"),s=a("88a6"),c=a("e1f9"),l=a("c32d"),u=a.n(l),d={props:{isEdit:Boolean,default:function(){return!1}},components:{STable:c["a"]},data:function(){var t=this;return{formData:{status:"Unpaid"},localQueryParam:{status:"Confirm"},selectedRowKeys:[],customerData:[],selectDate:[],columns:[{title:"ORDERID",dataIndex:"orderId",scopedSlots:{customRender:"orderId"},align:"center",width:80,sorter:!0},{title:"RELATEDID",dataIndex:"relatedId",scopedSlots:{customRender:"relatedId"},align:"center",width:80,sorter:!0},{title:"STARTDATE",dataIndex:"start_date",scopedSlots:{customRender:"start_date"},align:"center",width:110,sorter:!0},{title:"VEHICLE",dataIndex:"vehicle",scopedSlots:{customRender:"vehicle"},align:"center",width:110,sorter:!0},{title:"CATEGORY",dataIndex:"category",scopedSlots:{customRender:"category"},align:"center",width:200,sorter:!0},{title:"ITINERARY",children:[{title:"ORDER",dataIndex:"order_itinerary",scopedSlots:{customRender:"o-itinerary"}},{title:"PRICE",children:[{title:"PRICE(AED)",dataIndex:"order_itinerary",scopedSlots:{customRender:"price"},align:"center",width:100},{title:"PAYMENT(AED)",dataIndex:"order_itinerary",scopedSlots:{customRender:"payment"},align:"center",width:100},{title:"TOTAL(AED)",dataIndex:"total",scopedSlots:{customRender:"total"},align:"center",width:100}]}]},{title:"CUSTOMER",dataIndex:"customer.username",scopedSlots:{customRender:"customer"},align:"center",width:100,sorter:!0},{title:"Invoice",dataIndex:"invoice",scopedSlots:{customRender:"invoice"},align:"center",width:80,sorter:!0}],loadData:function(e){return Object(i["e"])(Object.assign(e,t.localQueryParam)).then((function(t){return t.result}))}}},mounted:function(){this.isEdit&&this.getInvoiceData(),this.getCustomerData()},watch:{selectDate:function(t){var e=t[0]?u()(t[0]).format("YYYY-MM-DD"):null,a=t[1]?u()(t[1]).format("YYYY-MM-DD"):null;this.formData.start_date=e,this.formData.end_date=a,this.localQueryParam=Object.assign(this.localQueryParam,{start_0:this.formData.start_date,start_1:this.formData.end_date}),this.$refs.table.refresh()},"formData.customer":function(t){this.localQueryParam.customer=t.username,this.$refs.table.refresh()},"formData.status":function(t){this.localQueryParam.status=t,this.$refs.table.refresh()}},methods:{getCustomerData:function(){var t=this;Object(o["f"])({role:"Customer"}).then((function(e){t.customerData=e.result}))},onSelectChange:function(t){this.selectedRowKeys=t},getInvoiceData:function(){var t=this;Object(s["c"])(this.$route.params.id).then((function(e){t.formData=e.result,t.selectedRowKeys=t.formData.order,t.selectDate[0]=u()(t.formData.start_date),t.selectDate[1]=u()(t.formData.end_date),t.formData.customer_id=t.formData.customer.id,t.localQueryParam=Object.assign(t.localQueryParam,{start_0:t.formData.start_date,start_1:t.formData.end_date})}))},createInvoiceData:function(){var t=this;Object(s["a"])({status:this.formData.status,start_date:this.formData.start_date,end_date:this.formData.end_date,remark:this.formData.remark,customer_id:this.formData.customer_id,order:this.selectedRowKeys}).then((function(e){t.$router.replace({name:"invoice_detail",params:{id:e.result.id}})})).catch((function(e){t.$vs.notify({title:"Error",text:e.message,iconPack:"feather",icon:"icon-alert-circle",color:"danger"}),e.response&&t.$refs.observer.setErrors(e.response.data.result)}))},updateInvoiceData:function(){var t=this;Object(s["e"])(this.$route.params.id,{status:this.formData.status,start_date:this.formData.start_date,end_date:this.formData.end_date,remark:this.formData.remark,customer_id:this.formData.customer_id,order:this.selectedRowKeys}).then((function(e){t.formData=e.result})).catch((function(e){t.$vs.notify({title:"Error",text:e.message,iconPack:"feather",icon:"icon-alert-circle",color:"danger"}),e.response&&t.$refs.observer.setErrors(e.response.data.result)}))},openPreview:function(){this.$router.push({name:"invoice_preview",params:{id:this.formData.id}})}}},f=d,p=a("2877"),h=Object(p["a"])(f,r,n,!1,null,null,null);e["default"]=h.exports},e1f9:function(t,e,a){"use strict";a("a4d3"),a("99af"),a("4de4"),a("caad"),a("d81d"),a("b0c0"),a("a9e3"),a("e439"),a("dbb4"),a("b64b"),a("e25e"),a("2532"),a("159b");var r=a("2638"),n=a.n(r),i=a("53ca"),o=a("ade3"),s=a("4e72");function c(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,r)}return a}function l(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?c(Object(a),!0).forEach((function(e){Object(o["a"])(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):c(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}e["a"]={data:function(){return{needTotalList:[],selectedRows:[],selectedRowKeys:[],localLoading:!1,localDataSource:[],localPagination:Object.assign({},this.pagination)}},props:Object.assign({},s["Table"].props,{bordered:{type:Boolean,default:!0},rowKey:{type:[String,Function],default:"key"},data:{type:Function,required:!0},pageNum:{type:Number,default:1},pageSize:{type:Number,default:10},showSizeChanger:{type:Boolean,default:!0},size:{type:String,default:"default"},alert:{type:[Object,Boolean],default:null},rowSelection:{type:Object,default:null},showAlertInfo:{type:Boolean,default:!1},showPagination:{type:String|Boolean,default:"auto"},pageURI:{type:Boolean,default:!1}}),watch:{"localPagination.current":function(t){this.pageURI&&this.$router.push(l({},this.$route,{name:this.$route.name,query:Object.assign({},this.$route.query,{pageNo:t})}))},pageNum:function(t){Object.assign(this.localPagination,{current:t})},pageSize:function(t){Object.assign(this.localPagination,{pageSize:t})},showSizeChanger:function(t){Object.assign(this.localPagination,{showSizeChanger:t})}},created:function(){var t=this.$route.query.pageNo,e=this.pageURI&&t&&parseInt(t)||this.pageNum;this.localPagination=["auto",!0].includes(this.showPagination)&&Object.assign({},this.localPagination,{current:e,pageSize:this.pageSize,showSizeChanger:this.showSizeChanger})||!1,this.needTotalList=this.initTotalList(this.columns),this.loadData()},methods:{refresh:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];t&&(this.localPagination=Object.assign({},{current:1,pageSize:this.pageSize})),this.loadData()},loadData:function(t,e,a){var r=this;this.localLoading=!0,t&&(this.localPagination=Object.assign({},t));var n=Object.assign({page:t&&t.current||this.showPagination&&this.localPagination.current||this.pageNum,page_size:t&&t.pageSize||this.showPagination&&this.localPagination.pageSize||this.pageSize},a&&a.field&&a.order&&{ordering:"ascend"===a.order?""+a.field:"-"+a.field}||{ordering:"-id"},l({},e)),o=this.data(this.showPagination?n:{ordering:"id"});"object"!==Object(i["a"])(o)&&"function"!==typeof o||"function"!==typeof o.then||o.then((function(e){if(r.localPagination=r.showPagination&&Object.assign({},r.localPagination,{current:r.localPagination.current,total:e.count,showSizeChanger:r.showSizeChanger,pageSize:t&&t.pageSize||r.localPagination.pageSize})||!1,r.showPagination&&0===e.results.length&&r.localPagination.current>1)return r.localPagination.current--,void r.loadData();try{["auto",!0].includes(r.showPagination)&&e.totalCount<=e.pageNo*r.localPagination.pageSize&&(r.localPagination.hideOnSinglePage=!0)}catch(a){r.localPagination=!1}r.localDataSource=r.showPagination?e.results:e,r.localLoading=!1})).catch((function(t){r.localLoading=!1,r.$vs.notify({title:"Error",text:t.message,iconPack:"feather",icon:"icon-alert-circle",color:"danger"})}))},initTotalList:function(t){var e=[];return t&&t instanceof Array&&t.forEach((function(t){t.needTotal&&e.push(l({},t,{total:0}))})),e},updateSelect:function(t,e){var a=this;this.selectedRows=e,this.selectedRowKeys=t;var r=this.needTotalList;this.needTotalList=r.map((function(t){return l({},t,{total:e.reduce((function(e,r){var n=e+parseInt(a.$_.get(r,t.dataIndex));return isNaN(n)?0:n}),0)})}))},clearSelected:function(){this.rowSelection&&(this.rowSelection.onChange([],[]),this.updateSelect([],[]))},renderClear:function(t){var e=this,a=this.$createElement;return this.selectedRowKeys.length<=0?null:a("a",{style:"margin-left: 24px",on:{click:function(){t(),e.clearSelected()}}},["清空"])},renderAlert:function(){var t=this.$createElement,e=this.needTotalList.map((function(e){return t("span",{style:"margin-right: 12px"},[e.title,"总计 ",t("a",{style:"font-weight: 600"},[e.customRender?e.customRender(e.total):e.total])])})),a="boolean"===typeof this.alert.clear&&this.alert.clear?this.renderClear(this.clearSelected):null!==this.alert&&"function"===typeof this.alert.clear?this.renderClear(this.alert.clear):null;return t("a-alert",{attrs:{showIcon:!0},style:"margin-bottom: 16px"},[t("template",{slot:"message"},[t("span",{style:"margin-right: 12px"},["已选择: ",t("a",{style:"font-weight: 600"},[this.selectedRows.length])]),e,a])])}},render:function(){var t=this,e=arguments[0],a={},r=Object.keys(this.$data),o="object"===Object(i["a"])(this.alert)&&null!==this.alert&&this.alert.show&&"undefined"!==typeof this.rowSelection.selectedRowKeys||this.alert;Object.keys(s["Table"].props).forEach((function(e){var n="local".concat(e.substring(0,1).toUpperCase()).concat(e.substring(1));if(r.includes(n))return a[e]=t[n],a[e];if("rowSelection"===e){if(o&&t.rowSelection)return a[e]=l({},t.rowSelection,{selectedRows:t.selectedRows,selectedRowKeys:t.selectedRowKeys,onChange:function(a,r){t.updateSelect(a,r),"undefined"!==typeof t[e].onChange&&t[e].onChange(a,r)}}),a[e];if(!t.rowSelection)return a[e]=null,a[e]}return t[e]&&(a[e]=t[e]),a[e]}));var c=e("a-table",n()([{},{props:a,scopedSlots:l({},this.$scopedSlots)},{on:{change:this.loadData}}]),[Object.keys(this.$slots).map((function(a){return e("template",{slot:a},[t.$slots[a]])}))]);return e("div",{class:"table-wrapper"},[o?this.renderAlert():null,c])}}},f8da:function(t,e,a){"use strict";a.d(e,"f",(function(){return n})),a.d(e,"i",(function(){return i})),a.d(e,"c",(function(){return o})),a.d(e,"a",(function(){return s})),a.d(e,"d",(function(){return c})),a.d(e,"h",(function(){return l})),a.d(e,"b",(function(){return u})),a.d(e,"e",(function(){return d})),a.d(e,"g",(function(){return f}));var r=a("b775");function n(t){return r["a"].get("users/",{params:t})}function i(t,e){return r["a"].put("users/"+"".concat(t,"/"),e)}function o(t){return r["a"].post("users/",t)}function s(t,e){return r["a"].post("users/"+"".concat(t,"/admin_change_password/"),e)}function c(){return r["a"].get("groups/")}function l(t,e){return r["a"].put("groups/"+"".concat(t,"/"),e)}function u(t){return r["a"].post("groups/",t)}function d(t){return r["a"].get("permissions/",{params:t})}function f(t,e){return r["a"].put("groups/"+"".concat(t,"/"),e)}}}]);
//# sourceMappingURL=chunk-5f55afb6.e081bbd8.js.map