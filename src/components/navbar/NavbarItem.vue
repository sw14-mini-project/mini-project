<template>
  <div class="navbtn-root">
    <v-icon :icon="icon" class="navbtn-icon"></v-icon>
    <div class="navbtn-label">{{ label }}</div>
  </div>
</template>

<script>
export default {
  name: "NavbarItem",
  props: {
    label: {
      type: String,
      default: "라벨"
    },
    icon: {
      type: String,
      default: "mdi-vuetify"
    }
  }
}
</script>

<style lang="scss">
@import "../../css/navbar/navbar-item.scss";
</style>