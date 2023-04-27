<template>
  <DefaultPage :show-navbar="false">
    <template v-slot:content>
      <div id="signup-root">
        <div id="login-title">소마팅 회원가입</div>
        <v-container class="pa-0 mt-4">
          <v-text-field v-model="email" label="이메일" variant="outlined" type="email"></v-text-field>
        </v-container>

        <v-container class="pa-0">
          <v-text-field v-model="password" label="패스워드" variant="outlined" type="password"></v-text-field>
        </v-container>

        <v-container class="pa-0">
          <v-text-field v-model="passwordCheck" label="패스워드 확인" variant="outlined" type="password"></v-text-field>
        </v-container>

        <v-container class="pa-0">
          <v-text-field v-model="username" label="이름" variant="outlined"></v-text-field>
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
          <v-btn variant="outlined" style="width: 100%" @click="onClickSignUpProcess" color="accent_pink">
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

      <v-dialog
          v-model="showLoadingDialog"
          width="auto"
      >
        <DialogComponent
            :dialog-type="this.DIALOG_TYPE_PROGRESS_LINEAR_INFINITY"
            title="회원가입 중..."
            subtitle="회원가입 처리중 입니다."
        ></DialogComponent>
      </v-dialog>
    </template>
  </DefaultPage>
</template>

<script>
import DefaultPage from "@/components/DefaultPage";
import { database, auth } from "@/plugins/firebase";

import { ref, set } from "firebase/database";
import {getStackData} from "@/js/realtime-database";

import { createUserWithEmailAndPassword } from "firebase/auth";
import {emailRegexCheck} from "@/js/accont-check";
import {gotoPage} from "@/js/route";
import DialogComponent from "@/components/dialog/Dialog";

const dbRef = ref(database);

const showSnackbar = (context, msg) => {
  context.snackbarShow = false
  context.snackbarMsg = msg
  context.snackbarShow = true
}

export default {
  name: "SignUpComponent",
  components: {DialogComponent, DefaultPage},
  data() {
    return {
      passwordCheck: '',
      password: '',
      email: '',
      username: '',
      selectedStack: [],
      stack: {},
      snackbarShow: false,
      snackbarMsg: "",
      showLoadingDialog: false
    }
  },
  setup() {
    let once = 1
    var unsubscribe = auth.onAuthStateChanged((user) => {
      console.log(once)
      if (user !== null && once === 1) {
        gotoPage("chat")
      }
      unsubscribe()
    })
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
    async onClickSignUpProcess() {
      if (!this.email || !this.password ||
          !this.passwordCheck || !this.username) {
        showSnackbar(this, "모든 빈칸을 채워야 합니다.")
        return
      }
      if (this.selectedStack.length === 0) {
        showSnackbar(this, "스택은 하나 이상 선택해야 합니다.")
        return
      }
      if (!emailRegexCheck(this, this.email)) {
        showSnackbar(this, "이메일 형식이 틀렸습니다.")
        return
      }
      if (this.password !== this.passwordCheck) {
        showSnackbar(this, "비밀번호 확인이 다릅니다.")
        return
      }
      if (this.username > 6) {
        showSnackbar(this, "이름은 6글자 이하여야 합니다.")
        return
      }

      try {
        this.showLoadingDialog = true
        const signUpResult = await createUserWithEmailAndPassword(auth, this.email, this.password)
        const uid = signUpResult.user.uid
        await set(ref(database, 'users/' + uid), {
          username: this.username,
          email: this.email,
          stack: Object.values(this.selectedStack)
        });
        gotoPage("chat")
      } catch (e) {
        let unsubscribe = await auth.onAuthStateChanged(async (user) => {
          if (user !== null) {
            await user.delete()
          }
          const errorMessage = e.message;
          this.snackbarShow = false
          this.snackbarMsg = errorMessage
          this.snackbarShow = true
          unsubscribe()
        })
      } finally {
        this.showLoadingDialog = false
      }
    }
  }
}
</script>

<style lang="scss">
@import "../../css/account/signup-page.scss";
</style>