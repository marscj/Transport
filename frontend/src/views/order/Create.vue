<template>
  <vs-card>
    <form-wizard
      color="rgba(var(--vs-primary), 1)"
      :title="null"
      :subtitle="null"
      finishButtonText="Submit"
      @on-complete="formSubmitted"
    >
      <tab-content title="Base Info" class="mb-5">
        <div class="vx-row">
          <div class="vx-col md:w-1/2 w-full mt-5">
            <button
              class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
            >Button</button>
          </div>
        </div>
      </tab-content>

      <tab-content title="Step 2" class="mb-5"></tab-content>

      <tab-content title="Step 3" class="mb-5"></tab-content>
    </form-wizard>

    <price-view />
  </vs-card>
</template>

<script>
import { FormWizard, TabContent } from "vue-form-wizard";
import "vue-form-wizard/dist/vue-form-wizard.min.css";
import PriceView from "@/views/price/List.vue";

export default {
  components: {
    FormWizard,
    TabContent,
    PriceView
  },
  data() {
    return {};
  },
  methods: {
    formSubmitted() {
      alert("Form submitted!");
    }
  }
};
</script>