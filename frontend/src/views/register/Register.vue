<template>
  <div class="h-screen flex w-full bg-img vx-row no-gutter items-center justify-center">
    <div class="vx-col sm:w-1/2 md:w-1/2 lg:w-3/4 xl:w-3/5 sm:m-0 m-4">
      <vx-card>
        <div slot="no-body" class="full-page-bg-color">
          <div class="vx-row no-gutter">
            <div class="vx-col hidden sm:hidden md:hidden lg:block lg:w-1/2 mx-auto self-center">
              <img src="@/assets/images/pages/register.jpg" alt="register" class="mx-auto" />
            </div>
            <div class="vx-col sm:w-full md:w-full lg:w-1/2 mx-auto self-center d-theme-dark-bg">
              <div class="px-8 pt-8 register-tabs-container">
                <div class="vx-card__title mb-4">
                  <h4 class="mb-4">Create Account</h4>
                  <p>Fill the below form to create a new account.</p>
                </div>

                <template v-if="JSON.parse(this.$base64.decode(this.$route.query.query)).email">
                  <register-email />
                </template>
                <template v-else>
                  <register-username />
                </template>
              </div>
            </div>
          </div>
        </div>
      </vx-card>
    </div>
  </div>
</template>

<script>
import RegisterEmail from "./RegisterEmail.vue";
import RegisterUsername from "./RegisterUsername.vue";

export default {
  components: {
    RegisterEmail,
    RegisterUsername
  },
};
</script>

<style lang="scss">
.register-tabs-container {
  min-height: 600px;

  .con-tab {
    padding-bottom: 23px;
  }
}
</style>
