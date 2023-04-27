<template>
  <DefaultPage selected-label="search">
    <template v-slot:content>
      <div id="search-root">
        <div id="search-top">
          <div id="search-top-title">찾기</div>
        </div>
        <div v-if="users.length > 0" id="search-main-section">
          <Carousel
              v-bind="carset" style="width: 100%;height: 100%;max-height: 500px;"
              @slide-start="slideStart"
          >
            <Slide
                v-for="(person, idx) in this.users"
                :key="person.title"
                style="height: 100%"
            >
              <div
                  class="main-card"
                  :style="{background: 'linear-gradient(rgba(0, 0, 0, 0.60), rgba(0, 0, 0, 0.60)), url(' + images[idx % images.length] + ') no-repeat'}"
              >
                <div class="card-upper">
                  <img class="card-image">
                </div>
                <div class="card-down">
                  <div class="card-down-text-wrapper">
                    <div class="card-down-title">{{person.title}}</div>
                    <div class="card-down-explain">{{person.text}}</div>
                  </div>
                </div>
              </div>
            </Slide>
            <template #addons>
              <Navigation />
<!--              <Pagination />-->
            </template>
          </Carousel>
          <div class="icons">
            <button class="like-icon" @click="likeAction">
              <img :src="heartImg" alt="좋아요" style="width:100%; height: 100%;">
            </button>
            <button class="profile-icon" @click="profileAction">
              <img :src="profileImg" alt="프로필" style="width:100%; height: 100%;">
            </button>
          </div>
        </div>
        <bottom-sheet v-if="users.length > 0" :show="showBottomSheet" :data="users[currentIdx]" @close="showBottomSheet = false"/>
        <div v-else style="order: 1;flex: none;">다른 사람이 없습니다...</div>
      </div>

      <v-snackbar
          v-model="snackbarLike"
      >
        {{ snackbarText }}

        <template v-slot:actions>
          <v-btn
              color="pink"
              variant="text"
              @click="snackbarLike = false"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </template>
  </DefaultPage>
</template>

<script>
import DefaultPage from "@/components/DefaultPage";
import {auth, database} from "@/plugins/firebase";
import {gotoPage} from "@/js/route";
import BottomSheet from "@/components/BottomSheet.vue";
import {getDatabase, ref, onValue, update} from "firebase/database";

import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Navigation, Pagination } from 'vue3-carousel'
import {getStackData} from "@/js/realtime-database";

const dbRef = ref(database);

export default {
  name: "SearchComponent",
  // eslint-disable-next-line vue/no-unused-components
  components: {BottomSheet, DefaultPage, Carousel, Slide, Navigation, Pagination},
  async created() {
    await getStackData(this, dbRef)
    auth.onAuthStateChanged((user) => {
      if (user === null) {
        gotoPage("login")
      } else {
        this.userUid = user.uid

        const usersRef = ref(database, 'users/');
        onValue(usersRef, (snapshot) => {
          this.users = [];
          const data = snapshot.val();
          delete data[auth.currentUser.uid]; // 현재 로그인한 사용자를 제외한 나머지 사용자 정보를 가져온다.

          Object.keys(data).forEach((key) => {
            const stacks = []
            console.log(Object.values(this.stack))
            for (let i in data[key].stack) {
              console.log(data[key].stack[i])
              stacks.push(this.stack[data[key].stack[i]].name)
            }
            console.log(stacks)
            this.users.push({
              "title": data[key].username,
              "text": data[key].about,
              "key": key,
              "location": data[key].location,
              "phoneNumber": data[key].phoneNumber,
              "stack": stacks
            });
          });
        });
      }
    });
  },
  data() {
    return {
      snackbarLike: false,
      snackbarText: '',

      showBottomSheet: false,
      // mock 데이터입니다. user 객체가 어떤 정보를 가지는지 알리기 위해 작성하였습니다. 상세페이지와 병합하면 삭제하세요.
      user: {
        nickname: 'test name',
        description: 'help',
        location: 'Seoul',
        phoneNumber: '010-1234-5678',
        position: 'backend',
      },
      userUid: '',

      stack: [],

      currentIdx: 0,
      heartImg: require("@/assets/heart.png"),
      profileImg: require("@/assets/profile.png"),
      images: [ // 임의의 이미지 적용
        "https://cdn.pixabay.com/photo/2017/08/30/01/05/milky-way-2695569_960_720.jpg",
        "https://cdn.pixabay.com/photo/2016/02/13/12/26/aurora-1197753__340.jpg",
        "https://cdn.pixabay.com/photo/2015/02/24/15/41/wolf-647528__340.jpg",
        "https://cdn.pixabay.com/photo/2017/08/15/08/23/stars-2643089__340.jpg",
        "https://cdn.pixabay.com/photo/2017/08/24/03/41/starry-sky-2675322__340.jpg",
        "https://cdn.pixabay.com/photo/2016/11/29/05/45/astronomy-1867616__340.jpg",
        "https://cdn.pixabay.com/photo/2020/07/27/14/34/forest-5442598__340.jpg",
        "https://cdn.pixabay.com/photo/2020/04/30/20/14/sky-5114501__340.jpg",
        "https://cdn.pixabay.com/photo/2016/11/18/22/58/stars-1837306__340.jpg"
      ],
      users: [],
      touchStartX: null,
      touchEndX: null,
      cardX: 0,
      minSwipeDistance: 30,

      bottomSheetOpen: false,
      carset: {
        wrapAround: true
      }
    };
  },
  methods: {
    likeAction() {
      const db = getDatabase();
      const tempData = {}
      tempData[this.users[this.currentIdx]["key"]] = Date.now()
      update(ref(db, "like/" + auth.currentUser.uid), tempData)
          .then(() => {
            this.snackbarText = `${this.users[this.currentIdx].title}에게 좋아요를 눌렀습니다.`
            this.snackbarLike = true
          });
    },
    profileAction() {
      console.log(this.users[this.currentIdx])
      this.showBottomSheet = true
    },
    slideStart(data) {
      this.showBottomSheet = false
      this.currentIdx = data.slidingToIndex
      console.log(`start slid:`, data)
    },
  }
}
</script>

<style lang="scss">
@import "../css/component/search-page.scss";
</style>