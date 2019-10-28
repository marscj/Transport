import Vue from "vue"
import { AclInstaller, AclCreate, AclRule } from "vue-acl"
import router from "@/router"

Vue.use(AclInstaller)

let initialRole = 'public';

export default new AclCreate({
  initial: initialRole,
  notfound: "/not-authorized",
  router,
  acceptLocalRules: true,
  globalRules: {
    admin: new AclRule("admin").or("editor").or("public").generate(),
    editor: new AclRule("editor").or("public").generate(),
    public: new AclRule("public").generate(),
  }
})
