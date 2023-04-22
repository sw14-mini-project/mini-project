<template>
  <DefaultPage selected-label="setting">
    <template v-slot:content>
      <!--   여기 안에 구현하시면 됩니다.   -->
      <div style="color: white">setting</div>
    </template>
  </DefaultPage>
</template>

<script>
import DefaultPage from "@/components/DefaultPage";
export default {
  name: "SettingComponent",
  components: {DefaultPage}
}
</script>

<style scoped>

</style>