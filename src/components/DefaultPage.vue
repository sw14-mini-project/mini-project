<template>
  <div id="default-root">
    <div id="default-content" :class="showNavbar ? '' : 'navbar-not-exist'">
      <slot name="content"></slot>
    </div>
    <BottomNavigationBar v-if="showNavbar" :selected-label="selectedLabel"></BottomNavigationBar>
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
    },
    showNavbar: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="scss">
@import "../css/component/default-page.scss";
</style>