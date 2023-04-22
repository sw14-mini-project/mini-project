<template>
  <div id="default-root">
    <div id="default-content">
      <slot name="content"></slot>
    </div>
    <BottomNavigationBar></BottomNavigationBar>
  </div>
</template>

<script>
import BottomNavigationBar from "@/components/navbar/BottomNavigationBar.vue";

export default {
  name: "DefaultPage",
  components: {BottomNavigationBar}
}
</script>

<style lang="scss">
@import "../css/component/default-page.scss";
</style>