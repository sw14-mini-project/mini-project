<template>
  <div id="default-root">
    <slot name="content"></slot>
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