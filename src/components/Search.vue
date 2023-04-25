<template>
  <DefaultPage selected-label="search">
    <template v-slot:content>
      <div class="main-card" :style="{ transform: 'translateX(' + cardX + 'px)' }"
       @mousedown="handleMouseDown" @mousemove="handleMouseMove" @mouseup="handleMouseUp"
       @touchstart="handleTouchStart" @touchmove="handleTouchMove" @touchend="handleTouchEnd">
        <div class="card-upper" :style="{ backgroundImage: 'url(' + images[currentIdx % images.length] + ')' }">
          <img class="card-image">
        </div>
        <div class="card-title">
          {{users[currentIdx].title}}
          <div class="card-text">
            {{users[currentIdx].text}}
          </div>
        </div>
      </div>

      <div class="icons">
        <div class="like-icon">

        </div>
        <div class="profile-icon">

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
  name: "SearchComponent",
  components: {DefaultPage},
  setup() {
    auth.onAuthStateChanged((user) => {
      if (user === null) {
        gotoPage("login")
      }
    })
  },
  data() {
    return {
      currentIdx: 0,
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
      users: [ // 사용자 이름/내용 정보
        {"title": "이름1", "text": "내용1"},
        {"title": "이름2", "text": "내용2"},
        {"title": "이름3", "text": "내용3"},
        {"title": "이름4", "text": "내용4"},
      ],
      touchStartX: null,
      touchEndX: null,
      cardX: 0,
      minSwipeDistance: 30
    };
  },
  methods: {
    handleMouseDown(event) {
      this.touchStartX = event.clientX;
      this.touchEndX = null;
    },
    handleMouseMove(event) {
      this.touchEndX = event.clientX;
      if (this.touchStartX !== null) {
        this.cardX = this.touchEndX - this.touchStartX;
      }
    },
    handleMouseUp() {
      this.cardX = 0;
      if (this.touchEndX !== null) {
        if (this.touchEndX < this.touchStartX) {
          this.left();
        } else if (this.touchEndX > this.touchStartX) {
          this.right();
        }
      }
      this.touchStartX = null;
      this.touchEndX = null;
    },
    handleTouchStart(event) {
      this.touchStartX = event.touches[0].clientX;
      this.touchEndX = null;
    },
    handleTouchMove(event) {
      this.touchEndX = event.touches[0].clientX;
      if (this.touchStartX !== null) {
        this.cardX = this.touchEndX - this.touchStartX;
      }
    },
    handleTouchEnd() {
      this.cardX = 0;
      if (this.touchEndX !== null) {
        let distance = Math.abs(this.touchEndX - this.touchStartX);
        if (distance > this.minSwipeDistance) {
          if (this.touchEndX < this.touchStartX) {
            this.left();
          } else if (this.touchEndX > this.touchStartX) {
            this.right();
          }
        }
      }
      this.touchStartX = null;
      this.touchEndX = null;
    },
    right() { // 왼쪽에서 오른쪽으로 움직였을 때 호출
      if (this.currentIdx > 0) {
        this.currentIdx--;
      }
    },
    left() { // 오른쪽에서 왼쪽으로 움직였을 때 호출
      if (this.currentIdx + 1 >= this.users.length) {
        // 새로운 사용자 정보를 로딩하는 코드
        this.users.push({"title": "이름" + (this.users.length + 1), "text": "내용" + (this.users.length + 1)});
      }
      this.currentIdx++;
    }
  }
}
</script>

<style scoped>
.main-card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 10% auto 0px;
  padding: 0px;
  gap: 10px;

  width: 75%;
  height: 65%;

  background: #323232;
  border-radius: 20px;

  flex: none;
  order: 0;
  flex-grow: 0;
}

.card-upper {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px;
  gap: 10px;

  width: 100%;
  height: 80%;

  background: white;
  border-radius: 20px 20px 0px 0px;

  flex: none;
  order: 0;
  flex-grow: 0;
}

.card-image {
  width: 7rem;
  height: 7rem;

  border-radius: 50%;
  background: #C0C0C0;

  flex: none;
  order: 0;
  flex-grow: 0;
}

.card-title {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px 20px 0px;
  
  flex: none;
  order: 1;
  flex-grow: 0;
}

.card-text {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;

  font-size: 0.8rem;
  color: grey;
  flex: none;
  order: 0;
  flex-grow: 0;
}

.icons {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  margin: 2rem auto;
  padding: 0px;
  gap: 10px;

  width: 66px;
  height: 28px;

  flex: none;
  order: 1;
  flex-grow: 0;
}

.like-icon {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px;
  gap: 10px;

  width: 28px;
  height: 28px;

  background: #E93B84;
  border-radius: 14px;

  flex: none;
  order: 0;
  flex-grow: 0;
}

.profile-icon {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px;
  gap: 10px;

  width: 28px;
  height: 28px;

  background: #3B6CE9;
  border-radius: 14px;

  flex: none;
  order: 1;
  flex-grow: 0;
}
</style>