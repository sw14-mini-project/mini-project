<template>
    <DefaultPage selected-label="setting">
        <template v-slot:content>
          <div class="settings-title">
            설정
          </div>      
            
          <div class="profile-wrapper">
            <div class="profile-container">
            </div>
          </div>
    
          <div class="name" v-if="!loading">
            {{ name }}
          </div>
          <div class="name" v-else>Loading...</div>
          <div class="about" v-if="!loading">
            {{ about }}
          </div>
          <div class="about" v-else></div>
          <div class="likes">
            <span class="heart-icon">❤️</span>
            <span class="like-count">123</span>
          </div>
          <div class="profile-text">
          <span class="icon">
            <i class="material-icons">person_outline</i>
          </span>
            프로필
          </div>
          <button class="setting-button" @click="openDialog('changePassword')">비밀번호 변경</button>
          <button class="setting-button" @click="openDialog('changeNickname')">닉네임 변경</button>
          <button class="setting-button" @click="openDialog('changeAbout')">자기소개 변경</button>
          <button class="setting-button" @click="openDialog('changeLocation')">거주지역</button>
          <button class="setting-button" @click="openDialog('changePhoneNumber')">번호</button>
          <button class="setting-button" @click="openDialog('changePosition')">포지션</button>
          <div v-if="currentDialog" class="dialog">
            <v-dialog v-model="dialogShow" persistent max-width="290" >
              <v-card class="white-background-dialog">
                <v-card-title class="headline">
                  <template v-if="currentDialog === 'changePassword'">비밀번호 변경</template>
                  <template v-else-if="currentDialog === 'changeNickname'">닉네임 변경</template>
                  <template v-else-if="currentDialog === 'changeAbout'">자기소개 변경</template>
                  <template v-else-if="currentDialog === 'changeLocation'">거주지역</template>
                  <template v-else-if="currentDialog === 'changePhoneNumber'">번호</template>
                  <template v-else-if="currentDialog === 'changePosition'">포지션</template>
                  <!-- 나머지 경우에 대해서도 추가하세요. -->
                </v-card-title>
                <v-card-text>
                <v-contatiner v-if="currentDialog === 'changePassword'">비밀번호 변경 이메일을 전송하시겠습니까?</v-contatiner>
                <v-text-field
                  v-if="currentDialog === 'changeNickname'"
                  label="새 닉네임"
                  v-model="nicknameInput"
                ></v-text-field>
                <!-- ... -->
                <v-textarea
                  v-else-if="currentDialog === 'changeAbout'"
                  label="자기소개"
                  v-model="aboutInput"
                ></v-textarea>
                <!-- ... -->
                <v-text-field
                  v-else-if="currentDialog === 'changeLocation'"
                  label="거주지역"
                  v-model="locationInput"
                ></v-text-field>
                <!-- ... -->
                <v-text-field
                  v-else-if="currentDialog === 'changePhoneNumber'"
                  label="번호"
                  v-model="phoneNumberInput"
                ></v-text-field>
                <!-- ... -->
                <v-select
                  v-else-if="currentDialog === 'changePosition'"
                  label="포지션 선택"
                  v-model="positionInput"
                  :items="positionOptions"
                  item-title="name"
                  item-text="name"
                  item-value="key"
                ></v-select>
               
                <!-- 나머지 경우에 대해서도 추가하세요. -->
              </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDialog">취소</v-btn>
                  <v-btn color="blue darken-1" text @click="confirmAction">확인</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </div>


          <div class="profile-text">
            <span class="icon">
              <i class="material-icons">person_outline</i>
            </span>
            일반
          </div>
          <div class="switch-container">
            <div class="setting-block">
              <div class="setting-title">매칭 시 알림받기</div>
                <div class="setting-description">서로 좋아요를 누르면 알림으로 알려줍니다</div>
              </div>
            <div class="wrapper">
            <input type="checkbox" id="switch" v-model="notificationSettings" @change="updateNotificationSettings">
              <label for="switch" class="switch_label">
                <span class="onf_btn"></span>
              </label>
            </div>
          </div>
    
          <button class="setting-button">그 외 다른 설정</button>
          <button class="setting-button" @click="onLogOutClicked">로그아웃</button>
        </template>
    </DefaultPage>
</template>


<script>
import DefaultPage from "@/components/DefaultPage";
import { auth,database } from "@/plugins/firebase";
import { gotoPage } from "@/js/route";
import { ref, child, get, update } from "firebase/database";


export default {
    name: "SettingComponent",
    components: { DefaultPage },
    data() {
    return {
      name: "",
      loading: true,
      currentDialog: null,
      dialogShow: false,
      password: "",
      about: "",
      phoneNumber: "",
      location: "",
      position: 0,
      nicknameInput: "",
      aboutInput: "",
      phoneNumberInput: "",
      locationInput: "",
      notificationSettings: false,
      notificationSettingsInput: null,
      positionInput: null,
      positionOptions: [{key:0, name: "프론트엔드"}, {key:1, name: "백엔드"}, {key:2, name: "기획"}, {key:3, name: "AI"}, {key:4, name: "디자인"}],
    };
  },
  created() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.fetchUserData();
      } else {
        gotoPage("login");
      }
    });
  },
  setup() {
      auth.onAuthStateChanged((user) => {
          if (user === null) {
              gotoPage("login")
          }
      })
  },
  methods: {
    async onLogOutClicked() {
        await auth.signOut()
        gotoPage('login')
    },
    fetchUserData() {
      const userId = auth.currentUser.uid;
      const dbRef = ref(database);
      
      get(child(dbRef, `users/${userId}`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            const userData = snapshot.val();
            this.name = userData.username || "";
            this.about = userData.about || "";
            this.phoneNumber = userData.phoneNumber || "";
            this.location = userData.location || "";
            this.position = userData.stack || 0;
            this.notificationSettings = userData.notificationSettings || false;
          } else {
            console.log("No data available");
          }
          this.loading = false;
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          this.loading = false;
        });
    },
    confirmAction() {
    const userId = auth.currentUser.uid;
    const dbRef = ref(database);

    if (this.currentDialog === "changeNickname") {
      if (this.nicknameInput) {
        this.name = this.nicknameInput;
        update(child(dbRef, `users/${userId}`), {
          username: this.nicknameInput,
        });
      }
    } 
    else if (this.currentDialog === "changePassword") {
      const user = auth.CurrentUser;
    if (user != null) {
      user.SendEmailVerificationAsync().then(task => {
        if (task.IsCanceled) {
          console.log("SendEmailVerificationAsync was canceled.");
          return;
        }
        if (task.IsFaulted) {
          console.log("SendEmailVerificationAsync encountered an error: " + task.Exception);
          return;
        }

        console.log("Email sent successfully.");
      });
    }
    } 
    else if (this.currentDialog === "changeAbout") {
      if (this.aboutInput) {
        this.about = this.aboutInput;
        update(child(dbRef, `users/${userId}`), {
          about: this.aboutInput,
        });
      }
    } else if (this.currentDialog === "changeLocation") {
      if (this.locationInput) {
        this.location = this.locationInput;
        update(child(dbRef, `users/${userId}`), {
          location: this.locationInput,
        });
      }
    } else if (this.currentDialog === "changePhoneNumber") {
      if (this.phoneNumberInput) {
        this.phoneNumber = this.phoneNumberInput;
        update(child(dbRef, `users/${userId}`), {
          phoneNumber: this.phoneNumberInput,
        });
      }
    }
    else if (this.currentDialog === "changePosition") {
      if (this.positionInput) {
        this.position = this.positionInput;
        console.log("end", this.positionInput);

        update(child(dbRef, `users/${userId}`), {
          stack: this.positionInput,
        });
      }
    }
    
    this.closeDialog();
    },
    openDialog(dialogType) {
      this.currentDialog = dialogType;
      if (this.currentDialog === "changeNickname") {
        this.nicknameInput = this.name;
      } else if (this.currentDialog === "changeAbout") {
        this.aboutInput = this.about;
      } else if (this.currentDialog === "changeLocation") {
        this.locationInput = this.location;
      } else if (this.currentDialog === "changePhoneNumber") {
        this.phoneNumberInput = this.phoneNumber;
      } else if (this.currentDialog === "changePosition") {
        this.positionInput = this.position;
      }
      this.dialogShow = true;
    },
    closeDialog() {
      this.currentDialog = null;
      this.dialogShow = false;
    },
    updateNotificationSettings() {
    const userId = auth.currentUser.uid;
    const dbRef = ref(database);
    console.log("바뀜");
    update(child(dbRef, `users/${userId}`), {
      notificationSettings: this.notificationSettings,
    });
  },
  },
};



</script>

<style scoped>
.settings-title {
    font-size: 16px;
    font-weight: bold;
    margin: 5px 0;
    padding-left: 20px;
    color: #FFF;
}

.profile-wrapper {
    text-align: center;
}

.profile-container {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 72px;
    height: 72px;
    border-radius: 50%;
    background-color: #d9d9d9;
    overflow: hidden;
}

.name,
.about,
.likes {
    text-align: center;
    margin-bottom: 2px;
}

.name {
    font-size: 16px;
    font-weight: bold;
    color: #fff;
}

.about {
    font-size: 12px;
    color: #fff;
    margin-bottom: 0px;
}

.likes {
    margin-top: -10px;
}

.heart-icon {
    color: #E93B84;
    margin-right: 5px;
    font-size: 10px;
}

.like-count {
    font-size: 10px;
    color: #fff;
}

.profile-text {
    display: flex;
    align-items: center;
    margin-top: 20px;
    font-size: 12px;
    color: #E93B84;
}

.icon {
    margin-right: 5px;
    color: #E93B84;
}

.icon .material-icons {
    font-size: 16px;
    position: relative;
    /* 추가 */
    top: 3px;
    /* 추가 */
}

.setting-button {
    display: block;
    width: 100%;
    text-align: left;
    padding: 12px 0px;
    background-color: transparent;
    border: none;
    border-bottom: 0.25px solid #ffffff;
    color: #fff;
    font-size: 12px;
    outline: none;
    cursor: pointer;
}

.setting-block {
    display: flex;
    flex-direction: column;
    /* 변경 */
    justify-content: center;
    /* 변경 */
    align-items: flex-start;
    /* 변경 */
    width: 100%;
    padding: 12px 0px;
    background-color: transparent;
    border: none;
    color: #fff;
    font-size: 12px;
    outline: none;
    cursor: pointer;
}

.setting-title {
    font-size: 12px;
    color: #fff;
}

.setting-description {
    font-size: 10px;
    color: #aaa;
    margin-bottom: 0px;
    /* 추가 */
}

.switch-container {
    display: flex;
    /* 추가 */
    justify-content: space-between;
    /* 추가 */
    align-items: center;
    /* 추가 */
    padding-right: 5px;
    /* 추가 */
    border-bottom: 0.25px solid #ffffff;
    /* 추가 */
}

.switch {
    position: relative;
    display: inline-block;
    width: 36px;
    height: 20px;
    border-radius: 10px;
    background-color: #E93B84;
    /* 변경 */
    cursor: pointer;
    transition: background-color 0.3s;
}

.wrapper {
    position: relative;
}

#switch {
    position: absolute;
    /* hidden */
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
}

.switch_label {
    position: relative;
    cursor: pointer;
    display: inline-block;
    width: 35px;
    height: 11px;
    background: #fff;
    border-radius: 20px;
    transition: 0.2s;
}

.switch_label:hover {
    background: #efefef;
}

.onf_btn {
    position: absolute;
    top: -3.5px;
    left: -6px;
    display: inline-block;
    width: 17px;
    height: 17px;
    border-radius: 17px;
    background: #E93B84;
    transition: 0.2s;
}

/* checking style */

#switch:checked+.switch_label {
    background: #E93B84;
}

#switch:checked+.switch_label:hover {
    background: #E93B84;
}

/* move */

#switch:checked+.switch_label .onf_btn {
    left: 26px;
    background: #E93B84;
}

.white-background-dialog{
  background-color: white;
  color: black;
}
</style>