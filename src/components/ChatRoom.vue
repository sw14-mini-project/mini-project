<template>
  <DefaultPage selected-label="chat">
    <template v-slot:content>
      <div id="chatroom-root">
        <div id="chatroom-top">
          <div id="chatroom-title">{{ this.partnerName }}과 채팅방</div>
        </div>
        <div id="chatroom-main">
          <ChatBox
              v-for="a in this.cahts"
              :key="a.text"
              :msg="a.text"
              :time="a.time"
              :mode="a.person === this.myUid ? 'my' : 'partner'"
          ></ChatBox>
        </div>
        <div id="chatroom-send">
          <v-container class="pa-0">
            <v-text-field
                v-model="text"
                variant="outlined"
                label="채팅 입력"
                append-inner-icon="mdi-send-circle"
                single-line
                hide-details
                @click:appendInner="clickSend"
            ></v-text-field>
          </v-container>
        </div>
      </div>
    </template>
  </DefaultPage>
</template>

<script>
import DefaultPage from "@/components/DefaultPage";
import {child, get, onValue, push, ref} from "firebase/database";
import {auth, database} from "@/plugins/firebase";
import {gotoPage} from "@/js/route";
import ChatBox from "@/components/chat/ChatBox";
export default {
  name: "ChatRoomComponent",
  components: {ChatBox, DefaultPage},
  props: {
    chatId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      myUid: '',
      partnerUid: '',
      partnerName: '',
      myName: '',
      cahts: [],
      text: ''
    }
  },
  created() {
    if (this.chatId === '') gotoPage('chat')
    auth.onAuthStateChanged((user) => {
      if (user === null) {
        gotoPage("login")
      } else {
        this.myUid = user.uid
        onValue(ref(database, `chats/${this.chatId}`), async (snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.toJSON();
            console.log(data)
            const findIdx = Object.values(data.people).indexOf(user.uid)
            if (findIdx === -1) gotoPage('chat')

            this.partnerUid = data.people[1 - findIdx]

            get(child(ref(database), `users/${this.partnerUid}/`)).then((snapshot) => {
              if (snapshot.exists()) {
                snapshot = snapshot.toJSON()
                this.partnerName = snapshot.username
              } else {
                console.log("No data available");
                gotoPage('chat')
              }
            }).catch((error) => {
              console.error(error);
              gotoPage('chat')
            });

            get(child(ref(database), `users/${this.myUid}/`)).then((snapshot) => {
              if (snapshot.exists()) {
                snapshot = snapshot.toJSON()
                this.myName = snapshot.username
              } else {
                console.log("No data available");
                gotoPage('chat')
              }
            }).catch((error) => {
              console.error(error);
              gotoPage('chat')
            });

            let keys = Object.keys(data.msgs);
            keys.sort(function(a, b) { return data.msgs[a].time - data.msgs[b].time });

            this.cahts = []
            for (let k of keys) {
              this.cahts.push(data.msgs[k])
            }
            console.log(this.cahts)
          } else {
            gotoPage('chat')
          }
        });
      }
    })
  },
  methods: {
    clickSend() {
      if (this.text === '') {
        return
      }
      push(ref(database, `chats/${this.chatId}/msgs`), {
        person: this.myUid,
        text: this.text,
        time: Date.now()
      }).then(() => {
        this.text = ''
      });
    }
  }
}
</script>

<style lang="scss">
@import "../css/component/chat-room-page.scss";
</style>