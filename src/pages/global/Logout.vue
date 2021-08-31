<template>

</template>

<script>
import AppUtils from "src/utils/AppUtils";

export default {
  name: "Logout",
  mounted() {
    AppUtils.clearUser()
    this.$router.replace('/login')
  }
}
</script>

<style scoped>

</style>
