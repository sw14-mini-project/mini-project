<template>
  <DefaultPage selected-label="chat">
    <template v-slot:content>
      <div id="chat-root">
        <div id="chat-top">
          <div id="chat-top-title">채팅</div>
        </div>

        <div id="chat-new-talk">
          <div>
            <div class="chat-new-title">새 대화</div>
            <div id="chat-new-summary">서로 좋아요를 표현한 사람이 표시됩니다.</div>
          </div>
          <div id="chat-new-people">
            <div
                class="chat-new-profile"
                v-for="i in 10"
                :key="i"
            >
              <div class="chat-new-profile-picture"></div>
              <div class="chat-new-profile-name">{{ '이름' + i }}</div>
            </div>
          </div>
        </div>

        <div id="chat-room-root">
          <div class="chat-new-title">메세지</div>
          <div id="chat-room-list-root">
            <div
                v-for="i in 20"
                :key="i"
                class="chat-room-list-item"
            >
              <v-list-item
                  class="pa-0"
                  :subtitle="i"
              >
                <template v-slot:prepend>
                  <v-avatar color="white" size="32">
                    <v-icon color="accent_pink" size="20">mdi-clipboard-text</v-icon>
                  </v-avatar>
                </template>
                <template v-slot:title>
                  <div class="chat-item-title">{{ '이름' + i }}</div>
                </template>
                <template v-slot:subtitle>
                  <div class="chat-item-subtitle">{{ '메세지' + i }}</div>
                </template>
              </v-list-item>
              <v-divider color="white" class="mb-2 mt-2"></v-divider>
            </div>
          </div>
        </div>
      </div>
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
  },
  mounted() {
    const container = document.getElementById("chat-new-people");
    container.addEventListener("wheel", function (e) {
      console.log(e)
      if (e.deltaY > 0) {
        container.scrollLeft += 100;
        e.preventDefault();
      }
      else {
        container.scrollLeft -= 100;
        e.preventDefault();
      }
    });
  }
}
</script>

<style lang="scss">
@import "../css/component/chat-page.scss";
</style>