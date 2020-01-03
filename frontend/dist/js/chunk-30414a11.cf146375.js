(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-30414a11"],{"0f9e":function(s,e,t){"use strict";t.r(e);var a=function(){var s=this,e=s.$createElement,a=s._self._c||e;return a("div",{staticClass:"h-screen flex w-full bg-img vx-row no-gutter items-center justify-center"},[a("div",{staticClass:"vx-col sm:w-1/2 md:w-1/2 lg:w-3/4 xl:w-3/5 sm:m-0 m-4"},[a("vx-card",[a("div",{staticClass:"full-page-bg-color",attrs:{slot:"no-body"},slot:"no-body"},[a("div",{staticClass:"vx-row no-gutter"},[a("div",{staticClass:"vx-col hidden sm:hidden md:hidden lg:block lg:w-1/2 mx-auto self-center"},[a("img",{staticClass:"mx-auto",attrs:{src:t("1880"),alt:"register"}})]),a("div",{staticClass:"vx-col sm:w-full md:w-full lg:w-1/2 mx-auto self-center d-theme-dark-bg"},[a("div",{staticClass:"px-8 pt-8 register-tabs-container"},[a("div",{staticClass:"vx-card__title mb-4"},[a("h4",{staticClass:"mb-4"},[s._v("Create Account")]),a("p",[s._v("Fill the below form to create a new account.")])]),JSON.parse(this.$base64.decode(this.$route.query.query)).email?[a("register-email")]:[a("register-username")]],2)])])])])],1)])},r=[],o=function(){var s=this,e=s.$createElement,t=s._self._c||e;return t("div",{staticClass:"clearfix"},[t("validation-observer",{ref:"observer",scopedSlots:s._u([{key:"default",fn:function(e){e.validate,e.dirty;return[t("validation-provider",{attrs:{name:"email",rules:"email|required"},scopedSlots:s._u([{key:"default",fn:function(e){var a=e.errors;return[t("vs-input",{staticClass:"w-full mt-6",attrs:{"data-vv-validate-on":"blur",name:"email",type:"email","label-placeholder":"Email",placeholder:"Email"},model:{value:s.email,callback:function(e){s.email=e},expression:"email"}}),t("span",[s._v(s._s(a[0]))])]}}],null,!0)}),t("validation-provider",{attrs:{name:"password1",rules:"required|max:16|min:8"},scopedSlots:s._u([{key:"default",fn:function(e){var a=e.errors;return[t("vs-input",{ref:"password",staticClass:"w-full mt-6",attrs:{type:"password","data-vv-validate-on":"blur",name:"password","label-placeholder":"Password",placeholder:"Password"},model:{value:s.password1,callback:function(e){s.password1=e},expression:"password1"}}),t("span",[s._v(s._s(a[0]))])]}}],null,!0)}),t("validation-provider",{attrs:{name:"password2",rules:"required|max:16|min:8"},scopedSlots:s._u([{key:"default",fn:function(e){var a=e.errors;return[t("vs-input",{staticClass:"w-full mt-6",attrs:{type:"password","data-vv-validate-on":"blur","data-vv-as":"password",name:"confirm_password","label-placeholder":"Confirm Password",placeholder:"Confirm Password"},model:{value:s.password2,callback:function(e){s.password2=e},expression:"password2"}}),t("span",[s._v(s._s(a[0]))])]}}],null,!0)})]}}])}),t("vs-checkbox",{staticClass:"mt-6",model:{value:s.isTermsConditionAccepted,callback:function(e){s.isTermsConditionAccepted=e},expression:"isTermsConditionAccepted"}},[s._v("I accept the terms & conditions.")]),t("vs-button",{staticClass:"mt-6",attrs:{type:"border",to:{name:"login"}}},[s._v("Login")]),t("vs-button",{staticClass:"float-right mt-6",attrs:{disabled:!s.validateForm},on:{click:s.register}},[s._v("Register")])],1)},i=[],n=(t("d3b7"),{data:function(){return{email:"",password1:"",password2:"",isTermsConditionAccepted:!0}},computed:{validateForm:function(){return""!=this.email&&""!=this.password1&&""!=this.password2&&!0===this.isTermsConditionAccepted}},methods:{checkLogin:function(){return!0},register:function(){var s=this;this.$vs.loading(),this.$refs.observer.reset();var e={email:this.email,password1:this.password1,password2:this.password2,notify:this.$vs.notify};this.$store.dispatch("register",e).catch((function(e){s.$vs.notify({title:"Error",text:e.message,iconPack:"feather",icon:"icon-alert-circle",color:"danger"}),e.response&&s.$refs.observer.setErrors(e.response.data.result)})).finally((function(){s.$vs.loading.close()}))}}}),l=n,d=t("2877"),c=Object(d["a"])(l,o,i,!1,null,null,null),u=c.exports,p=function(){var s=this,e=s.$createElement,t=s._self._c||e;return t("div",{staticClass:"clearfix"},[t("validation-observer",{ref:"observer",scopedSlots:s._u([{key:"default",fn:function(e){e.validate,e.dirty;return[t("validation-provider",{attrs:{name:"username",rules:"required|max:16|min:5"},scopedSlots:s._u([{key:"default",fn:function(e){var a=e.errors;return[t("vs-input",{staticClass:"w-full",attrs:{"data-vv-validate-on":"blur","icon-no-border":"",icon:"icon icon-user","icon-pack":"feather",label:"Username"},model:{value:s.username,callback:function(e){s.username=e},expression:"username"}}),t("span",[s._v(s._s(a[0]))])]}}],null,!0)}),t("validation-provider",{attrs:{name:"password1",rules:"required|max:16|min:8"},scopedSlots:s._u([{key:"default",fn:function(e){var a=e.errors;return[t("vs-input",{ref:"password",staticClass:"w-full mt-6",attrs:{type:"password","data-vv-validate-on":"blur",name:"password","label-placeholder":"Password",placeholder:"Password"},model:{value:s.password1,callback:function(e){s.password1=e},expression:"password1"}}),t("span",[s._v(s._s(a[0]))])]}}],null,!0)}),t("validation-provider",{attrs:{name:"password2",rules:"required|max:16|min:8"},scopedSlots:s._u([{key:"default",fn:function(e){var a=e.errors;return[t("vs-input",{staticClass:"w-full mt-6",attrs:{type:"password","data-vv-validate-on":"blur","data-vv-as":"password",name:"confirm_password","label-placeholder":"Confirm Password",placeholder:"Confirm Password"},model:{value:s.password2,callback:function(e){s.password2=e},expression:"password2"}}),t("span",[s._v(s._s(a[0]))])]}}],null,!0)})]}}])}),t("vs-checkbox",{staticClass:"mt-6",model:{value:s.isTermsConditionAccepted,callback:function(e){s.isTermsConditionAccepted=e},expression:"isTermsConditionAccepted"}},[s._v("I accept the terms & conditions.")]),t("vs-button",{staticClass:"mt-6",attrs:{type:"border",to:{name:"login"}}},[s._v("Login")]),t("vs-button",{staticClass:"float-right mt-6",attrs:{disabled:!s.validateForm},on:{click:s.register}},[s._v("Register")])],1)},v=[],m={data:function(){return{username:"",password1:"",password2:"",isTermsConditionAccepted:!0}},computed:{validateForm:function(){return""!=this.username&&""!=this.password1&&""!=this.password2&&!0===this.isTermsConditionAccepted}},methods:{checkLogin:function(){return!0},register:function(){var s=this;this.$vs.loading(),this.$refs.observer.reset();var e={username:this.username,password1:this.password1,password2:this.password2,notify:this.$vs.notify};this.$store.dispatch("register",e).catch((function(e){s.$vs.notify({title:"Error",text:e.message,iconPack:"feather",icon:"icon-alert-circle",color:"danger"}),e.response&&s.$refs.observer.setErrors(e.response.data.result)})).finally((function(){s.$vs.loading.close()}))}}},f=m,w=Object(d["a"])(f,p,v,!1,null,null,null),h=w.exports,b={components:{RegisterEmail:u,RegisterUsername:h}},g=b,C=(t("add3"),Object(d["a"])(g,a,r,!1,null,null,null));e["default"]=C.exports},"166e":function(s,e,t){},1880:function(s,e,t){s.exports=t.p+"img/register.cfd9ef09.jpg"},add3:function(s,e,t){"use strict";var a=t("166e"),r=t.n(a);r.a}}]);
//# sourceMappingURL=chunk-30414a11.cf146375.js.map