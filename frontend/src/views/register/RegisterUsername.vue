<template>
  <div class="clearfix">
    <validation-observer ref="observer" v-slot="{ validate, dirty }">
      <!-- <div class="vx-row">
        <div class="vx-col sm:w-1/2 w-full mb-2">
          <validation-provider name="first_name" rules="required" v-slot="{ errors }">
            <vs-input class="w-full" label-placeholder="First Name" v-model="first_name" />
            <span>{{ errors[0] }}</span>
          </validation-provider>
        </div>
        <div class="vx-col sm:w-1/2 w-full mb-2">
          <validation-provider name="last_name" rules="required" v-slot="{ errors }">
            <vs-input class="w-full" label-placeholder="Last Name" v-model="last_name" />
            <span>{{ errors[0] }}</span>
          </validation-provider>
        </div>
      </div> -->

      <validation-provider name="username" rules="required|max:16|min:5" v-slot="{ errors }">
        <vs-input
          data-vv-validate-on="blur"
          icon-no-border
          icon="icon icon-user"
          icon-pack="feather"
          label="Username"
          v-model="username"
          class="w-full"
        />
        <span>{{ errors[0] }}</span>
      </validation-provider>
      <validation-provider name="password1" rules="required|max:16|min:8" v-slot="{ errors }">
        <vs-input
          ref="password"
          type="password"
          data-vv-validate-on="blur"
          name="password"
          label-placeholder="Password"
          placeholder="Password"
          v-model="password1"
          class="w-full mt-6"
        />
        <span>{{ errors[0] }}</span>
      </validation-provider>

      <validation-provider name="password2" rules="required|max:16|min:8" v-slot="{ errors }">
        <vs-input
          type="password"
          data-vv-validate-on="blur"
          data-vv-as="password"
          name="confirm_password"
          label-placeholder="Confirm Password"
          placeholder="Confirm Password"
          v-model="password2"
          class="w-full mt-6"
        />
        <span>{{ errors[0] }}</span>
      </validation-provider>
    </validation-observer>

    <vs-checkbox v-model="isTermsConditionAccepted" class="mt-6">I accept the terms & conditions.</vs-checkbox>
    <vs-button type="border" :to="{name: 'login'}" class="mt-6">Login</vs-button>
    <vs-button class="float-right mt-6" @click="register" :disabled="!validateForm">Register</vs-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // first_name: "",
      // last_name: "",
      username: "",
      password1: "",
      password2: "",
      isTermsConditionAccepted: true
    };
  },
  computed: {
    validateForm() {
      return (
        // this.first_name != "" &&
        // this.last_name != "" &&
        this.username != ""  &&
        this.password1 != "" &&
        this.password2 != "" &&
        this.isTermsConditionAccepted === true
      );
    }
  },
  methods: {
    checkLogin() {
      return true;
    },
    register() {
      this.$vs.loading();
      this.$refs.observer.reset()
      
      const payload = {
        // first_name: this.first_name,
        // last_name: this.last_name,
        username: this.username,
        password1: this.password1,
        password2: this.password2,
        notify: this.$vs.notify
      };
      
      this.$store
        .dispatch("register", payload)
        .catch(error => {
          this.$vs.notify({
            title: "Error",
            text: error.message,
            iconPack: "feather",
            icon: "icon-alert-circle",
            color: "danger"
          });
          if(error.response) {
            this.$refs.observer.setErrors(error.response.data.result);
          }
        })
        .finally(() => {
          this.$vs.loading.close();
        });
    }
  }
};
</script>
