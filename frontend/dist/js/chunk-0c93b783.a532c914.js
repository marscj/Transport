(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0c93b783"],{5213:function(t,e,r){"use strict";r.d(e,"e",(function(){return a})),r.d(e,"d",(function(){return s})),r.d(e,"f",(function(){return i})),r.d(e,"a",(function(){return c})),r.d(e,"g",(function(){return o})),r.d(e,"b",(function(){return u})),r.d(e,"c",(function(){return d}));var n=r("b775");function a(t){return n["a"].get("orders/",{params:t})}function s(t){return n["a"].get("orders/"+"".concat(t,"/"))}function i(t,e){return n["a"].put("orders/"+"".concat(t,"/"),e)}function c(t){return n["a"].post("orders/",t)}function o(t,e){return n["a"].put("order_itinerary/"+"".concat(t,"/"),e)}function u(t){return n["a"].post("order_itinerary/",t)}function d(t){return n["a"].delete("order_itinerary/"+"".concat(t,"/"))}},"88a6":function(t,e,r){"use strict";r.d(e,"d",(function(){return a})),r.d(e,"c",(function(){return s})),r.d(e,"e",(function(){return i})),r.d(e,"a",(function(){return c})),r.d(e,"b",(function(){return o}));var n=r("b775");function a(t){return n["a"].get("invoices/",{params:t})}function s(t){return n["a"].get("invoices/"+"".concat(t,"/"))}function i(t,e){return n["a"].put("invoices/"+"".concat(t,"/"),e)}function c(t){return n["a"].post("invoices/",t)}function o(t){return n["a"].delete("invoices/"+"".concat(t,"/"))}},9675:function(t,e,r){t.exports=r.p+"img/title.ed2df956.jpg"},e529:function(t,e,r){"use strict";r.r(e);var n=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("div",{staticClass:"px-10 py-4",attrs:{id:"pdfDom"}},[n("img",{staticClass:"w-2/3 h-full object-cover",attrs:{src:r("9675")}}),n("div",{staticClass:"flex flex-row items-start text-2xl py-10"},[n("div",{staticClass:"flex-1 flex-col items-start"},[n("pre",[t._v("Account: "+t._s(t.formData.customer?t.formData.customer.username:"")+" ")]),n("pre",[t._v("Date: "+t._s(t.formData.start_date)+" - "+t._s(t.formData.end_date))])]),t._m(0)]),n("div",{staticClass:"mt-10"},[n("table",{staticClass:"table-auto w-full"},[t._m(1),n("tbody",[t._l(t.selectedData,(function(e){return[t._l(e.order_itinerary,(function(r){return n("tr",{key:r.id},[n("td",{key:t.index,staticClass:"border px-4 py-3 text-center"},[t._v(t._s(r.date)+" "+t._s(r.time?r.time.substring(0,5):""))]),n("td",{key:t.index,staticClass:"border px-4 py-3 text-center"},[t._v(t._s(r.itinerary.name))]),n("td",{key:t.index,staticClass:"border px-4 py-3 text-center"},[t._v(t._s(e.vehicle?e.vehicle.license_plate:""))]),n("td",{key:t.index,staticClass:"border px-4 py-3 text-center"},[t._v(t._s(e.category))]),n("td",{key:t.index,staticClass:"border px-4 py-3 text-center"},[t._v(t._s(e.relatedId))]),n("td",{key:t.index,staticClass:"border px-4 py-3 text-center"},[t._v(t._s(r.payment))])])})),n("tr",{key:e.id},[n("td",{staticClass:"border"}),n("td",{staticClass:"border"}),n("td",{staticClass:"border"}),n("td",{staticClass:"border"}),n("td",{staticClass:"border"}),n("td",{staticClass:"border px-4 py-3 text-center"},[t._v("total: "+t._s(e.total))])]),n("div",{key:e.id,staticClass:"py-4"})]}))],2)]),n("div",{staticClass:"flex items-end flex-col"},[n("pre",[t._v("Total: "+t._s(t.total))])])])])])},a=[function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"flex flex-col items-end"},[r("pre",[t._v("#402 indigo building.international city Dubai")]),r("pre",[t._v("Tel.: +971-4-368-8740 Fax: +971-4-368-8136")])])},function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("thead",[r("tr",[r("th",{staticClass:"w-40 text-center py-3"},[t._v("Start Date")]),r("th",{staticClass:"w-40 text-center py-3"},[t._v("Itinerary")]),r("th",{staticClass:"w-40 text-center py-3"},[t._v("Vehicle")]),r("th",{staticClass:"w-40 text-center py-3"},[t._v("Category")]),r("th",{staticClass:"w-40 text-center py-3"},[t._v("RelatedId")]),r("th",{staticClass:"w-40 text-center py-3"},[t._v("Payment")])])])}],s=(r("d81d"),r("5213")),i=r("88a6"),c={data:function(){return{formData:{},selectedData:[]}},mounted:function(){this.getData()},computed:{total:function(){return this.$_.sum(this.selectedData.map((function(t){return t.total})))}},methods:{getData:function(){var t=this;Object(i["c"])(this.$route.params.id).then((function(e){return t.formData=e.result,Object(s["e"])({invoice_id:t.$route.params.id})})).then((function(e){t.selectedData=e.result}))}}},o=c,u=r("2877"),d=Object(u["a"])(o,n,a,!1,null,null,null);e["default"]=d.exports}}]);
//# sourceMappingURL=chunk-0c93b783.a532c914.js.map