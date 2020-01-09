(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1d8bf6ec"],{4762:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("vs-card",[a("validation-observer",{ref:"observer",scopedSlots:t._u([{key:"default",fn:function(e){e.validate,e.dirty;return[1==t.step?a("div",{staticClass:"mb-5"},[a("div",{staticClass:"p-10"},[a("div",{staticClass:"flex flex-wrap mt-5 text-base"},[a("div",{staticClass:"w-1/12 py-1"},[a("span",[t._v("*Date:")])]),a("div",{staticClass:"w-11/12"},[a("validation-provider",{attrs:{name:"start_date",rules:"required"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.errors;return[a("a-date-picker",{staticClass:"py-1 mx-2",attrs:{placeholder:"Start Date"},model:{value:t.start_date,callback:function(e){t.start_date=e},expression:"start_date"}}),t._v(" - "),a("span",{staticClass:"text-red-600 text-base"},[t._v(t._s(s[0]))])]}}],null,!0)}),a("validation-provider",{attrs:{name:"end_date",rules:"required"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.errors;return[a("a-date-picker",{staticClass:"py-1 mx-2 ",attrs:{placeholder:"End Date"},model:{value:t.end_date,callback:function(e){t.end_date=e},expression:"end_date"}}),a("span",{staticClass:"text-red-600 text-base"},[t._v(t._s(s[0]))])]}}],null,!0)})],1)]),a("div",{staticClass:"flex flex-wrap mt-5 text-base"},[a("div",{staticClass:"w-1/12 py-1"},[a("span",[t._v("*Category:")])]),a("div",{staticClass:"w-11/12"},[a("validation-provider",{attrs:{name:"category"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.errors;return[t._l(t.categoryData,(function(e){return a("a",{key:e.id,class:t.category&&t.category.id===e.id?"inline-block border border-teal-500 rounded bg-teal-500 text-white py-1 px-3 mx-2":"inline-block border border-white rounded hover:border-gray-200 text-teal-500 hover:bg-gray-200 py-1 px-3 mx-2",on:{click:function(a){return t.onCategory(e)}}},[a("p",{class:t.category&&t.category.id===e.id?"text-white font-bold":"text-teal-500 font-bold"},[t._v(t._s(e.name))])])})),a("span",{staticClass:"text-red-600 text-base"},[t._v(t._s(s[0]))])]}}],null,!0)})],1)]),a("div",{staticClass:"flex flex-wrap mt-5 text-base"},[a("div",{staticClass:"w-1/12 py-1"},[a("span",[t._v("*Seats:")])]),a("div",{staticClass:"w-11/12"},[a("validation-provider",{attrs:{name:"seats"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.errors;return[t._l(t.seatData,(function(e,s){return a("a",{key:s,class:t.seats===e.seats?"inline-block border border-teal-500 rounded bg-teal-500 text-white py-1 px-3 mx-2":"inline-block border border-white rounded hover:border-gray-200 text-teal-500 hover:bg-gray-200 py-1 px-3 mx-2",on:{click:function(a){return t.onSeat(e)}}},[a("p",{class:t.seats===e.seats?"text-white font-bold":"text-teal-500 font-bold"},[t._v(t._s(e.seats)+" (SEAT)")])])})),a("span",{staticClass:"text-red-600 text-base"},[t._v(t._s(s[0]))])]}}],null,!0)})],1)]),a("div",{staticClass:"flex flex-wrap mt-5 text-base"},[a("div",{staticClass:"w-1/12"},[a("span",[t._v("*Passengers:")])]),a("div",{staticClass:"w-11/12"},[a("validation-provider",{attrs:{name:"passenger",rules:"required|min_value:0"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.errors;return[a("a-input-number",{staticClass:"hover:border-teal-500 focus:border-teal-500 mx-2",model:{value:t.passenger,callback:function(e){t.passenger=e},expression:"passenger"}}),a("span",{staticClass:"text-red-600 text-base"},[t._v(t._s(s[0]))])]}}],null,!0)})],1)]),a("div",{staticClass:"flex flex-wrap mt-5 text-base"},[a("div",{staticClass:"w-1/12"},[a("span",[t._v("*Itinerary:")])]),a("div",{staticClass:"w-4/12"},[a("div",{staticClass:"mx-2"},[a("validation-provider",{attrs:{name:"itinerary",rules:"required"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.errors;return[a("a-textarea",{staticClass:"hover:border-teal-500 focus:border-teal-500",attrs:{rows:13},model:{value:t.itinerary,callback:function(e){t.itinerary=e},expression:"itinerary"}}),a("span",{staticClass:"text-red-600 text-base"},[t._v(t._s(s[0]))])]}}],null,!0)})],1),a("p",{staticClass:"mx-4 text-gray-400 text-sm"},[t._v("e.g.")]),a("p",{staticClass:"mx-4 text-gray-400 text-sm"},[t._v("12-12 06:30, DXB TO CITY HOTEL")]),a("p",{staticClass:"mx-4 text-gray-400 text-sm"},[t._v("12-13, SHARJHA CITY TOUR FULL DAY")]),a("p",{staticClass:"mx-4 text-gray-400 text-sm"},[t._v("12-14, DUBAI CITY TOUR HALF DAY")])]),a("div",{staticClass:"w-6/12 pl-10"},[a("div",{staticClass:"flex flex-wrap"},t._l(t.itineraryData,(function(e){return a("div",{key:e.id,staticClass:"mb-4 w-1/2"},[a("button",{staticClass:"text-xs font-hairline bg-transparent hover:bg-teal-500 text-teal-700 font-semibold hover:text-white py-2 px-4 mx-4 border border-teal-500 hover:border-teal-500 rounded",on:{click:function(a){return t.onItinerary(e)}}},[t._v(t._s(e.name))])])})),0)])]),a("div",{staticClass:"flex flex-wrap mt-5 text-base"},[a("div",{staticClass:"w-1/12 "},[a("span",[t._v("RelatedID:")])]),a("div",{staticClass:"w-11/12"},[a("div",{staticClass:"py-1 px-2"},[a("vs-input",{model:{value:t.relatedId,callback:function(e){t.relatedId=e},expression:"relatedId"}})],1)])]),a("a-divider",{staticClass:"mt-10"}),a("div",{staticClass:"flex flex-wrap mt-10"},[a("div",{staticClass:"mr-auto"},[a("validation-provider",{attrs:{name:"non_field_errors"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.errors;return[a("span",{staticClass:"text-red-600 text-base"},[t._v(t._s(s[0]))])]}}],null,!0)}),a("button",{staticClass:"bg-teal-500 hover:bg-teal-700 focus:outline-none text-white font-bold py-3 px-10 rounded",on:{click:function(e){return t.onCheck()}}},[t._v("CheckOut")])],1)])],1)]):t._e()]}}])}),2===t.step?a("div",{staticClass:"mb-5"},[a("div",{staticClass:"text-center p-4"},[a("h1",{staticClass:"text-4xl font-bold"},[t._v("Check out")])]),a("a-form",{staticClass:"p-10",attrs:{"label-col":{span:5},"wrapper-col":{span:12}}},[a("a-form-item",{staticClass:"m-0",attrs:{label:"RelatedID"}},[t._v(t._s(t.relatedId))]),a("a-form-item",{staticClass:"m-0",attrs:{label:"Start Date"}},[t._v(" "+t._s(t._f("moment")(t.start_date,"YYYY-MM-DD"))+" ")]),a("a-form-item",{staticClass:"m-0",attrs:{label:"End Date"}},[t._v(" "+t._s(t._f("moment")(t.end_date,"YYYY-MM-DD")))]),a("a-form-item",{staticClass:"m-0",attrs:{label:"Category"}},[t._v(t._s(t.category?t.category.name:""))]),a("a-form-item",{staticClass:"m-0",attrs:{label:"Seats"}},[t._v(t._s(t.seats))]),a("a-form-item",{staticClass:"m-0",attrs:{label:"Passengers"}},[t._v(t._s(t.passenger))]),a("a-form-item",{staticClass:"m-0",attrs:{label:"Itinerary"}},[a("pre",[t._v(t._s(t.itinerary))])]),a("a-divider",{staticClass:"mt-10"}),a("button",{staticClass:"bg-teal-500 hover:bg-teal-700 focus:outline-none text-white font-bold py-3 px-10 mr-2 rounded",on:{click:function(e){t.step=1}}},[t._v("Back")]),a("button",{staticClass:"bg-teal-500 hover:bg-teal-700 focus:outline-none text-white font-bold py-3 px-10 ml-2 rounded",on:{click:function(e){return t.onCreate()}}},[t._v("Submit")])],1)],1):t._e(),3===t.step?a("div",{staticClass:"mb-5"},[a("div",{staticClass:"text-center p-4"},[a("h1",{staticClass:"text-4xl font-bold"},[t._v("Success")])]),a("a-form",{staticClass:"p-10",attrs:{"label-col":{span:5},"wrapper-col":{span:12}}},[a("a-divider",{staticClass:"mt-64"}),a("button",{staticClass:"bg-teal-500 hover:bg-teal-700 focus:outline-none text-white font-bold py-3 px-10 mr-2 rounded",on:{click:function(e){return t.$router.go(-1)}}},[t._v("Back")]),a("button",{staticClass:"bg-teal-500 hover:bg-teal-700 focus:outline-none text-white font-bold py-3 px-10 ml-2 rounded",on:{click:function(e){return t.onContinue()}}},[t._v("Continue")])],1)],1):t._e(),t.category?a("price-table",{staticClass:"mt-10",attrs:{category:t.category.id,showSidebar:!1,showThead:!1,showID:!1}}):t._e()],1)},r=[],i=(a("b0c0"),a("ef0d")),n=a("c32d"),o=a.n(n),c=a("e64c"),l=a("5213"),d={components:{PriceTable:i["a"]},watch:{category:function(){this.getSeatData()}},data:function(){return{step:1,category:void 0,seats:void 0,start_date:void 0,end_date:void 0,passenger:void 0,itinerary:"",remark:"",relatedId:"",categoryData:[],seatData:[],itineraryData:[]}},mounted:function(){this.getCategoryData(),this.getSeatData(),this.getItineraryData()},methods:{getCategoryData:function(){var t=this;Object(c["h"])().then((function(e){t.categoryData=e.result}))},getSeatData:function(){var t=this;Object(c["l"])({category:this.category?this.category.id:null}).then((function(e){t.seatData=e.result}))},getItineraryData:function(){var t=this;Object(c["i"])().then((function(e){t.itineraryData=e.result}))},onCategory:function(t){this.category=t},onSeat:function(t){this.seats=t.seats},onItinerary:function(t){this.itinerary+=t.name+"\n"},onCheck:function(){this.step=2},onCreate:function(){var t=this,e={start_date:this.start_date?o()(this.start_date).format("YYYY-MM-DD"):null,end_date:this.end_date?o()(this.end_date).format("YYYY-MM-DD"):null,category:this.category?this.category.name:null,seats:this.seats,itinerary:this.itinerary,passenger:this.passenger,relatedId:this.relatedId};Object(l["a"])(e).then((function(){t.step=3})).catch((function(e){t.step=1,e.response&&t.$nextTick((function(){t.$refs.observer.setErrors(e.response.data.result)}))}))},onContinue:function(){this.step=1,this.category=void 0,this.seats=void 0,this.start_date=void 0,this.end_date=void 0,this.passenger=void 0,this.itinerary="",this.remark="",this.relatedId=""}}},u=d,f=a("2877"),v=Object(f["a"])(u,s,r,!1,null,null,null);e["default"]=v.exports},5213:function(t,e,a){"use strict";a.d(e,"e",(function(){return r})),a.d(e,"d",(function(){return i})),a.d(e,"f",(function(){return n})),a.d(e,"a",(function(){return o})),a.d(e,"g",(function(){return c})),a.d(e,"b",(function(){return l})),a.d(e,"c",(function(){return d}));var s=a("b775");function r(t){return s["a"].get("orders/",{params:t})}function i(t){return s["a"].get("orders/"+"".concat(t,"/"))}function n(t,e){return s["a"].put("orders/"+"".concat(t,"/"),e)}function o(t){return s["a"].post("orders/",t)}function c(t,e){return s["a"].put("order_itinerary/"+"".concat(t,"/"),e)}function l(t){return s["a"].post("order_itinerary/",t)}function d(t){return s["a"].delete("order_itinerary/"+"".concat(t,"/"))}},"7b9e":function(t,e,a){"use strict";var s=a("c0a7"),r=a.n(s);r.a},c0a7:function(t,e,a){},ef0d:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"data-list-container",attrs:{id:"data-list-thumb-view"}},[t.showSidebar?a("data-view-sidebar",{attrs:{isSidebarActive:t.addNewDataSidebar,data:t.sidebarData},on:{closeSidebar:t.toggleDataSidebar}}):t._e(),a("s-table",{ref:"table",staticClass:"p-4",attrs:{columns:t.columns,data:t.loadData,showPagination:!1,rowKey:function(t){return t.id}},scopedSlots:t._u([{key:"itinerary",fn:function(e,s){return[e?a("a",{on:{click:function(e){return t.editData(s)}}},[t._v(t._s(e.name))]):t._e()]}},{key:"category",fn:function(e,s){return[e?a("a",{on:{click:function(e){return t.editData(s)}}},[t._v(t._s(e.name))]):t._e()]}},{key:"price",fn:function(e,s){return[e?a("a",{on:{click:function(e){return t.editData(s)}}},[t._v(t._s(e)+" AED")]):t._e()]}}])})],1)},r=[],i=(a("a9e3"),a("e64c")),n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("vs-sidebar",{staticClass:"add-new-data-sidebar items-no-padding",attrs:{"click-not-close":"","position-right":"",parent:"body","default-index":"1",color:"primary",spacer:""},model:{value:t.isSidebarActiveLocal,callback:function(e){t.isSidebarActiveLocal=e},expression:"isSidebarActiveLocal"}},[a("div",{staticClass:"mt-6 flex items-center justify-between px-6"},[a("h4",[t._v(t._s(t.isEdit?"ADD NEW":"UPDATE")+" ITEM")]),a("feather-icon",{staticClass:"cursor-pointer",attrs:{icon:"XIcon"},on:{click:function(e){e.stopPropagation(),t.isSidebarActiveLocal=!1}}})],1),a("vs-divider",{staticClass:"mb-0"}),a("VuePerfectScrollbar",{staticClass:"scroll-area--data-list-add-new",attrs:{settings:t.settings}},[a("div",{staticClass:"p-6"},[a("validation-observer",{ref:"observer",scopedSlots:t._u([{key:"default",fn:function(e){e.validate,e.dirty;return[a("validation-provider",{attrs:{name:"price",rules:"required|min_value:0"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.errors;return[a("a-form-item",{attrs:{label:"Price"}},[a("a-input-number",{staticClass:"w-full",attrs:{step:.5},model:{value:t.form.price,callback:function(e){t.$set(t.form,"price",e)},expression:"form.price"}})],1),a("span",[t._v(t._s(s[0]))])]}}],null,!0)}),a("validation-provider",{attrs:{name:"non_field_errors"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.errors;return[a("span",[t._v(t._s(s[0]))])]}}],null,!0)})]}}])})],1)]),a("div",{staticClass:"flex flex-wrap items-center p-6",attrs:{slot:"footer"},slot:"footer"},[a("vs-button",{staticClass:"mr-6",on:{click:t.submit}},[t._v("Submit")]),a("vs-button",{attrs:{type:"border",color:"danger"},on:{click:function(e){t.isSidebarActiveLocal=!1}}},[t._v("Cancel")])],1)],1)},o=[],c=(a("4fad"),a("9d63")),l=a.n(c),d={components:{VuePerfectScrollbar:l.a},props:{isSidebarActive:{type:Boolean,required:!0},data:{type:Object,default:function(){}}},watch:{isSidebarActive:function(t){t&&(this.form=Object.assign({},this.data))}},computed:{isSidebarActiveLocal:{get:function(){return this.isSidebarActive},set:function(t){t||this.$emit("closeSidebar")}},isEdit:function(){return 0===Object.entries(this.data).length}},data:function(){return{form:{id:void 0,name:""},settings:{maxScrollbarLength:60,wheelSpeed:.6}}},methods:{submit:function(){var t=this;this.isEdit?Object(i["c"])(this.form).then((function(){t.isSidebarActiveLocal=!1})).catch((function(e){e.response&&t.$refs.observer.setErrors(e.response.data.result)})):Object(i["p"])(this.form.id,this.form).then((function(){t.isSidebarActiveLocal=!1})).catch((function(e){e.response&&t.$refs.observer.setErrors(e.response.data.result)}))}}},u=d,f=(a("7b9e"),a("2877")),v=Object(f["a"])(u,n,o,!1,null,"744beac4",null),p=v.exports,b=a("e1f9"),m={name:"PriceTable",components:{DataViewSidebar:p,STable:b["a"]},props:{category:{type:Number,default:void 0},showSidebar:{type:Boolean,default:!0}},watch:{category:function(){this.$refs.table.refresh()}},data:function(){var t=this;return{columns:[{title:"ITINERARY",dataIndex:"itinerary",scopedSlots:{customRender:"itinerary"}},{title:"CATEGORY",dataIndex:"category",scopedSlots:{customRender:"category"}},{title:"PRICE",dataIndex:"price",scopedSlots:{customRender:"price"}}],addNewDataSidebar:!1,sidebarData:{},loadData:function(e){return Object(i["j"])(Object.assign(e,{category:t.category})).then((function(t){return t.result}))}}},methods:{addNewData:function(){this.sidebarData={},this.toggleDataSidebar(!0)},editData:function(t){this.$auth("price.change_price")&&(this.sidebarData=t,this.toggleDataSidebar(!0))},toggleDataSidebar:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];this.addNewDataSidebar=t,t||this.$refs.table.refresh()}}},h=m,_=Object(f["a"])(h,s,r,!1,null,null,null);e["a"]=_.exports}}]);
//# sourceMappingURL=chunk-1d8bf6ec.b2cad58a.js.map