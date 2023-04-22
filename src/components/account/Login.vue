<template>
  <DefaultPage :show-navbar="false">
    <template v-slot:content>
      <div id="login-root">
        <div id="login-title">로그인</div>
        <v-text-field label="Label" variant="outlined"></v-text-field>
        <v-text-field label="Label" variant="outlined"></v-text-field>
      </div>
    </template>
  </DefaultPage>
</template>

<script>
import {auth} from "@/plugins/firebase";
import {gotoPage} from "@/js/route";
import DefaultPage from "@/components/DefaultPage";

export default {
  name: "LoginComponent",
  components: {DefaultPage},
  setup() {
    if (auth.currentUser !== null) {
      gotoPage("chat")
    }
  }
}
</script>

<style lang="scss">
@import "../../css/account/login-page.scss";
</style>