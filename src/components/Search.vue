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
import {auth} from "@/plugins/firebase";
import {gotoPage} from "@/js/route";
export default {
  name: "SearchComponent",
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