<template>
  <DefaultPage :show-navbar="false">
    <template v-slot:content>
      <div id="login-root">
        <div id="login-title">소마팅 로그인</div>
        <v-container class="pa-0 mt-4">
          <v-text-field v-model="email" label="아이디" variant="outlined" type="email"></v-text-field>
        </v-container>
        <v-container class="pa-0">
          <v-text-field v-model="password" label="패스워드" variant="outlined" type="password"></v-text-field>
        </v-container>
        <v-container class="pa-0">
          <v-btn variant="outlined" style="width: 100%" color="accent_pink" @click="onLoginClicked">
            로그인
          </v-btn>
        </v-container>
        <v-container class="pa-0">
          <v-btn variant="outlined" style="width: 100%">
            회원가입
          </v-btn>
        </v-container>


      </div>

      <v-snackbar
          v-model="snackbarShow"
      >
        {{ snackbarMsg }}
        <template v-slot:actions>
          <v-btn
              color="pink"
              variant="text"
              @click="snackbarShow = false"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </template>
  </DefaultPage>
</template>

<script>
import {auth} from "@/plugins/firebase";
import {gotoPage} from "@/js/route";
import DefaultPage from "@/components/DefaultPage";
import {emailRegexCheck} from "@/js/accont-check";
import { signInWithEmailAndPassword } from "firebase/auth";

export default {
  name: "LoginComponent",
  components: {DefaultPage},
  data() {
    return {
      email: "",
      password: "",
      snackbarShow: false,
      snackbarMsg: "",
    }
  },
  setup() {
    if (auth.currentUser !== null) {
      // gotoPage("chat")
      auth.signOut()
    }
  },
  methods: {
    onLoginClicked() {
      if (emailRegexCheck(this, this.email)) {
        signInWithEmailAndPassword(auth, this.email, this.password)
            .then((userCredential) => {
              console.log(userCredential)
              gotoPage("chat")
            })
            .catch((error) => {
              const errorMessage = error.message;
              this.snackbarShow = false
              this.snackbarMsg = errorMessage
              this.snackbarShow = true
            });
      }
    }
  }
}
</script>

<style lang="scss">
@import "../../css/account/login-page.scss";
</style>