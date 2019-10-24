<template>
  <div>
    <ValidationObserver ref="observer" v-slot="{ validate, dirty }">
      <ValidationProvider name="email" rules="email" v-slot="{ errors }">
        <vs-input
          data-vv-validate-on="blur"
          icon-no-border
          icon="icon icon-user"
          icon-pack="feather"
          label-placeholder="Email"
          v-model="email"
          class="w-full"
        />
        <span>{{ errors[0] }}</span>
      </ValidationProvider>

      <ValidationProvider name="password" rules="required" v-slot="{ errors }">
        <vs-input
          data-vv-validate-on="blur"
          type="password"
          icon-no-border
          icon="icon icon-lock"
          icon-pack="feather"
          label-placeholder="Password"
          v-model="password"
          class="w-full mt-6"
        />
        <span>{{ errors[0] }}</span>
      </ValidationProvider>
    </ValidationObserver>

    <div class="flex flex-wrap justify-between my-5">
      <vs-checkbox v-model="checkbox_remember_me" class="mb-3">Remember Me</vs-checkbox>
      <router-link :to="{name: 'forgot-password'}">Forgot Password?</router-link>
    </div>
    <div class="flex flex-wrap justify-between mb-3">
      <vs-button type="border" @click="registerUser">Register</vs-button>
      <vs-button :disabled="!validateForm" @click="loginJWT">Login</vs-button>
    </div>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";

export default {
  components: {
    ValidationObserver,
    ValidationProvider
  },
  data() {
    return {
      email: "mjx_cj@163.com",
      password: "admin123",
      checkbox_remember_me: false
    };
  },
  computed: {
    validateForm() {
      return this.email.length && this.password.length;
    }
  },
  methods: {
    checkLogin() {
      // If user is already logged in notify
      // if (this.$store.state.auth.isUserLoggedIn()) {

      //   // Close animation if passed as payload
      //   // this.$vs.loading.close()

      //   this.$vs.notify({
      //     title: 'Login Attempt',
      //     text: 'You are already logged in!',
      //     iconPack: 'feather',
      //     icon: 'icon-alert-circle',
      //     color: 'warning'
      //   })

      //   return false
      // }
      return true;
    },
    loginJWT() {
      if (!this.checkLogin()) return;

      // Loading
      this.$vs.loading();

      const payload = {
        checkbox_remember_me: this.checkbox_remember_me,
        userDetails: {
          email: this.email,
          password: this.password
        }
      };

      this.$store
        .dispatch("auth/loginJWT", payload)
        .then(data => {
        })
        .catch(error => {
          this.$vs.notify({
            title: "Error",
            text: error.message,
            iconPack: "feather",
            icon: "icon-alert-circle",
            color: "danger"
          });
          this.$refs.observer.setErrors(error.response.data);
        }).finally(() => {
          this.$vs.loading.close();
        });
    },
    registerUser() {
      // if (!this.checkLogin()) return;
      this.$router.push({name: 'register'}).catch(() => {});
    },
  }
};
</script>

<style >
/* span {
  display: block;
  margin-top: 10px;
} */

input + span {
  margin-top: 3px;
}
  
</style>