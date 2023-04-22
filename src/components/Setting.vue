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

        <div class="name">
         홍길동
  </div>
  <div class="about">
    안녕하세요! 저는 홍길동입니다.
  </div>
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
  <button class="setting-button">비밀번호 변경</button>
  <button class="setting-button">닉네임 변경</button>
  <button class="setting-button">자기소개 변경</button>
  <button class="setting-button">거주지역</button>
  <button class="setting-button">번호</button>
  <button class="setting-button">포지션</button>

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
  <input type="checkbox" id="switch">
  <label for="switch" class="switch_label">
    <span class="onf_btn"></span>
  </label>
</div>
  </div>

  <button class="setting-button">그 외 다른 설정</button>
    </template>
  </DefaultPage>
</template>

<script>
import DefaultPage from "@/components/DefaultPage";
export default {
  name: "SettingComponent",
  components: {DefaultPage}
}
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
  position: relative; /* 추가 */
  top: 3px; /* 추가 */
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
   flex-direction: column; /* 변경 */
  justify-content: center; /* 변경 */
  align-items: flex-start; /* 변경 */
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
  margin-bottom: 0px; /* 추가 */

}

.switch-container {
  display: flex; /* 추가 */
  justify-content: space-between; /* 추가 */
  align-items: center; /* 추가 */
  padding-right: 5px; /* 추가 */

  border-bottom: 0.25px solid #ffffff; /* 추가 */

}

.switch {
  position: relative;
  display: inline-block;
  width: 36px;
  height: 20px;
  border-radius: 10px;
  background-color: #E93B84; /* 변경 */
  cursor:pointer;
  transition: background-color 0.3s;
}

.wrapper { position: relative; }
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
</style>