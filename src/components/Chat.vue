<template>
  <DefaultPage selected-label="chat">
    <template v-slot:content>
      <div style="color: white">chat</div>
    </template>
  </DefaultPage>
</template>

<script>
import DefaultPage from "@/components/DefaultPage";
import {auth} from "@/plugins/firebase";
import {gotoPage} from "@/js/route";
export default {
  name: "ChatComponent",
  components: {DefaultPage},
  setup() {
    auth.onAuthStateChanged((user) => {
      if (user === null) {
        gotoPage("login")
      }
    })
  }
}
</script>

<style scoped>

</style>