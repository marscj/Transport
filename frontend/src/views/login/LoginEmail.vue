<template>
  <div>
    <validation-observer ref="observer" v-slot="{ validate, dirty }">
      <validation-provider name="email" rules="email|required" v-slot="{ errors }">
        <vs-input
          data-vv-validate-on="blur"
          icon-no-border
          icon="icon icon-user"
          icon-pack="feather"
          label="Email"
          v-model="email"
          class="w-full"
        />
        <span>{{ errors[0] }}</span>
      </validation-provider>

      <validation-provider name="password" rules="required|max:16|min:8" v-slot="{ errors }">
        <vs-input
          data-vv-validate-on="blur"
          type="password"
          icon-no-border
          icon="icon icon-lock"
          icon-pack="feather"
          label="Password"
          v-model="password"
          class="w-full mt-6"
        />
        <span>{{ errors[0] }}</span>
      </validation-provider>

      <validation-provider name="non_field_errors" v-slot="{ errors }">
        <span>{{ errors[0] }}</span>
      </validation-provider>
    </validation-observer>

    <!-- <div class="flex flex-wrap justify-between my-5">
      <vs-checkbox v-model="checkbox_remember_me" class="mb-3">Remember Me</vs-checkbox>
      <router-link :to="{name: 'forgot-password'}">Forgot Password?</router-link>
    </div> -->
    <div class="flex flex-wrap justify-between py-5">
      <vs-button type="border" @click="registerUser">Register</vs-button>
      <vs-button :disabled="!validateForm" @click="login">Login</vs-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
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
      return true;
    },
    login() {
      this.$vs.loading();
      this.$refs.observer.reset();

      const payload = {
        checkbox_remember_me: this.checkbox_remember_me,
        email: this.email,
        password: this.password
      };

      this.$store
        .dispatch("login", payload).then(() => {
          this.$router.push({ name: 'order'})
        })
        .catch(error => {
          this.$vs.notify({
            title: "Error",
            text: error.message,
            iconPack: "feather",
            icon: "icon-alert-circle",
            color: "danger"
          });
          if (error.response) {
            this.$refs.observer.setErrors(error.response.data.result);
          }
        })
        .finally(() => {
          this.$vs.loading.close();
        });
    },
    registerUser() {
      // this.$router.push({ name: "register", query: {email: true}}).catch(() => {});
      this.$router.push({
        name: "register",
        query: {
          query: this.$base64.encode(
            JSON.stringify({
              email: true,
            })
          )
        }
      });
    }
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