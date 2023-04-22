<template>
  <DefaultPage>
    <template v-slot:content>
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