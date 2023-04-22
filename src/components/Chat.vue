<template>
  <DefaultPage>
    <template v-slot:content>
      <div style="color: white">chat</div>
    </template>
  </DefaultPage>
</template>

<script>
import DefaultPage from "@/components/DefaultPage";
export default {
  name: "ChatComponent",
  components: {DefaultPage}
}
</script>

<style scoped>

</style>