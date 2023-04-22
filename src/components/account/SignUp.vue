<template>
  <DefaultPage :show-navbar="false">
    <template v-slot:content>
      <div id="signup-root">
        <div id="login-title">소마팅 회원가입</div>
        <v-container class="pa-0 mt-4">
          <v-text-field v-model="email" label="아이디" variant="outlined" type="email"></v-text-field>
        </v-container>

        <v-container class="pa-0">
          <v-text-field v-model="password" label="패스워드" variant="outlined" type="password"></v-text-field>
        </v-container>

        <v-container class="pa-0">
          <v-text-field v-model="passwordCheck" label="패스워드 확인" variant="outlined" type="password"></v-text-field>
        </v-container>

        <v-container class="pa-0">
          <v-text-field v-model="username" label="닉네임" variant="outlined"></v-text-field>
        </v-container>

        <v-container class="pa-0">
          <div>스택 선택( 복수 가능)</div>
          <v-chip-group multiple v-model="selectedStack">
            <v-chip
                filter
                v-for="s in stack"
                :key="s.key"
                :style="chipBackground(s.color)"
            >{{ s.name }}</v-chip>
          </v-chip-group>
        </v-container>

        <v-container class="pa-0">
          <v-btn variant="outlined" style="width: 100%" @click="onClickSignUp" color="accent_pink">
            회원가입
          </v-btn>
        </v-container>
      </div>
    </template>
  </DefaultPage>
</template>

<script>
import DefaultPage from "@/components/DefaultPage";
import { ref } from "firebase/database";
import {database} from "@/plugins/firebase";
import {getStackData} from "@/js/realtime-database";

const dbRef = ref(database);

export default {
  name: "SignUpComponent",
  components: {DefaultPage},
  data() {
    return {
      passwordCheck: '',
      password: '',
      email: '',
      username: '',
      selectedStack: [],
      stack: {}
    }
  },
  beforeMount() {
    getStackData(this, dbRef)
  },
  methods: {
    chipBackground (color) {
      return {
        'background': color
      }
    },
    onClickSignUp() {
      console.log(this.selectedStack)
    }
  }
}
</script>

<style lang="scss">
@import "../../css/account/signup-page.scss";
</style>