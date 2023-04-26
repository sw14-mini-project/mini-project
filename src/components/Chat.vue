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
            <div id="chat-new-summary">30일 이내에 서로 좋아요를 표현한 사람이 표시됩니다.</div>
          </div>
          <div id="chat-new-people">
            <div
                class="chat-new-profile"
                v-for="i in likePeople"
                :key="i.uid"
                @click="makeChat(i.uid)"
            >
              <div class="chat-new-profile-picture"></div>
              <div class="chat-new-profile-name">{{ i.username }}</div>
            </div>
          </div>
        </div>

        <div id="chat-room-root">
          <div class="chat-new-title">메세지</div>
          <div id="chat-room-list-root">
            <div
                v-for="i in chatRoom"
                :key="i.partnerUid"
                class="chat-room-list-item"
                @click="clickChat(i.chatId)"
            >
              <v-list-item
                  class="pa-0"
              >
                <template v-slot:prepend>
                  <v-avatar color="white" size="32">
                    <v-icon color="accent_pink" size="20">mdi-face-man</v-icon>
                  </v-avatar>
                </template>
                <template v-slot:title>
                  <div class="chat-item-title">{{ i.partnerName }}</div>
                </template>
                <template v-slot:subtitle>
                  <div class="chat-item-subtitle">{{ i.lastChat }}</div>
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
import { database, auth } from "@/plugins/firebase";
import {gotoPage, gotoPageParam} from "@/js/route";
import {ref, onValue, get, child, push} from "firebase/database";

const setLikeEventListener = (context, uid) => {
  onValue(ref(database, `like/`), async (snapshot) => {
    context.likePeople = []
    if (snapshot.exists()) {
      const data = snapshot.val();
      const myLike = data[uid]
      for (let key in myLike) {
        const likePersonTime = new Date(myLike[key])
        try {
          const likePersonTime2 = new Date(data[key][uid])
          // console.log(likePersonTime, likePersonTime2)
          const diff = Math.abs(likePersonTime - likePersonTime2)
          const diffDays = diff / (1000 * 60 * 60 * 24)
          if (diffDays <= 30) {
            get(child(ref(database), `users/${key}/`)).then((snapshot) => {
              if (snapshot.exists()) {
                const userInform = snapshot.toJSON()
                console.log(userInform)
                if (userInform !== null) {
                  userInform.uid = key
                  context.likePeople.push(userInform)
                }
              } else {
                console.log("No data available");
              }
            }).catch((error) => {
              console.error(error);
            });
          }
        } catch (e) {
          console.log(`${key} not exist`)
        }
      }
    }
  });
}

const setChat = (context, uid) => {
  onValue(ref(database, `chats/`), async (snapshot) => {
    context.chatRoom = []
    if (snapshot.exists()) {
      const data = snapshot.toJSON();
      console.log(data)
      for (let d in data) {
        const findIdx = Object.values(data[d].people).indexOf(uid)
        if (findIdx !== -1) {
          let lastChat = ''
          try {
            let keys = Object.keys(data[d].msgs);
            keys.sort(function(a, b) { return data[d].msgs[a].time - data[d].msgs[b].time });

            lastChat = data[d].msgs[keys[keys.length - 1]].text

          } catch (e) {
            lastChat = ''
          }

          const partnerUid = data[d].people[1 - findIdx]
          get(child(ref(database), `users/${partnerUid}/`)).then((snapshot) => {
            if (snapshot.exists()) {
              snapshot = snapshot.toJSON()
              context.chatRoom.push({
                partnerName: snapshot.username,
                partnerUid: partnerUid,
                lastChat: lastChat,
                chatId: d
              })
            } else {
              console.log("No data available");
            }
          }).catch((error) => {
            console.error(error);
          });

        }
      }
      console.log(context.chatRoom)
    }
  });
}

export default {
  name: "ChatComponent",
  components: {DefaultPage},
  data() {
    return {
      likePeople: [],
      chatRoom: []
    }
  },
  beforeMount() {
    auth.onAuthStateChanged((user) => {
      if (user === null) {
        gotoPage("login")
      } else {
        setLikeEventListener(this, user.uid)
        setChat(this, user.uid)
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
  },
  methods: {
    makeChat(partnerUid) {
      console.log(auth.currentUser.uid, partnerUid)
      push(ref(database, 'chats/'), {
        people: {
          0: auth.currentUser.uid,
          1: partnerUid
        },
        madeTime: Date.now()
      }).then(() => {

      });
    },
    clickChat(chatId) {
      gotoPageParam('chatroom', {chatId: chatId})
    }
  }
}
</script>

<style lang="scss">
@import "../css/component/chat-page.scss";
</style>