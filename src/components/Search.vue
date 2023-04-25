<template>
  <DefaultPage selected-label="search">
    <template v-slot:content>
    <!--   여기 안에 구현하시면 됩니다.   -->
      <div style="color: white">search</div>
      <div>
        <!-- bottom sheet 샘플 코드입니다. 상세 페이지에 병합할 때 사용하세요!-->
        <button @click="showBottomSheet=true">Bottom Sheet 열기</button>
        <bottom-sheet :show="showBottomSheet" :user="user" @close="showBottomSheet = false"/>
      </div>
    </template>
  </DefaultPage>
</template>

<script>
import DefaultPage from "@/components/DefaultPage";
import {auth} from "@/plugins/firebase";
import {gotoPage} from "@/js/route";
import BottomSheet from "@/components/BottomSheet.vue";
import {ref} from "vue";
export default {
  name: "SearchComponent",
  components: {BottomSheet, DefaultPage},
  setup() {
    auth.onAuthStateChanged((user) => {
      if (user === null) {
        gotoPage("login")
      }
    });
    const bottomSheetOpen = ref(false);

    return {
      bottomSheetOpen
    };
  },
  data() {
    return {
      showBottomSheet: false,
      // mock 데이터입니다. user 객체가 어떤 정보를 가지는지 알리기 위해 작성하였습니다. 상세페이지와 병합하면 삭제하세요.
      user: {
        nickname: 'test name',
        description: 'help',
        location: 'Seoul',
        phoneNumber: '010-1234-5678',
        position: 'backend',
      },
    };
  },
}
</script>

<style scoped>

</style>