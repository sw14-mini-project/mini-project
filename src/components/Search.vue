<template>
  <DefaultPage selected-label="search">
    <template v-slot:content>
      <div class="main-card">
        <div class="card-upper">
          <img class="card-image">
        </div>
        <div class="card-title">
          이름
          <div class="card-text">
            내용
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