<template>
  <div id="default-root">
    <div id="default-content">
      <slot name="content"></slot>
    </div>
    <BottomNavigationBar :selected-label="selectedLabel"></BottomNavigationBar>
  </div>
</template>

<script>
import BottomNavigationBar from "@/components/navbar/BottomNavigationBar.vue";

export default {
  name: "DefaultPage",
  components: {BottomNavigationBar},
  props: {
    selectedLabel: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss">
@import "../css/component/default-page.scss";
</style>