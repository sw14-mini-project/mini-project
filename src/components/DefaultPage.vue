<template>
  <div id="default-root">
    <div id="default-content">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "DefaultPage"
}
</script>

<style lang="scss">
@import "../css/component/default-page.scss";
</style>