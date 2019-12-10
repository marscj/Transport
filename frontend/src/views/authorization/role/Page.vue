<template>
  <h4>This is User Page.</h4>
</template>

<script>
import { getRoles } from "@/http/requests/user/index.js";

export default {
  data() {
    return {
      list: []
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      getRoles().then(res => {
        console.log(res);
      });
    }
  }
};
</script>