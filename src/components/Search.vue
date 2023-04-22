<template>
  <DefaultPage selected-label="search">
    <template v-slot:content>
    <!--   여기 안에 구현하시면 됩니다.   -->
      <div style="color: white">search</div>
    </template>
  </DefaultPage>
</template>

<script>
import DefaultPage from "@/components/DefaultPage";
export default {
  name: "SearchComponent",
  components: {DefaultPage}
}
</script>

<style scoped>

</style>