<template>
  <transition name="bottom-sheet">
    <div class="bottom-sheet" v-show="show">
      <div class="bottom-sheet-content" @click.stop>
        <div class="form-group">
          <label for="nickname">닉네임:</label>
          <input type="text" id="nickname" :value="user.nickname" disabled>
        </div>
        <div class="form-group">
          <label for="description">자기소개:</label>
          <input type="text" id="description" :value="user.description" disabled>
        </div>
        <div class="form-group">
          <label for="location">위치:</label>
          <input type="text" id="location" :value="user.location" disabled>
        </div>
        <div class="form-group">
          <label for="phone-number">전화번호:</label>
          <input type="tel" id="phone-number" :value="user.phoneNumber" disabled>
        </div>
        <div class="form-group">
          <label for="position">포지션:</label>
          <input type="text" id="position" :value="user.position" disabled>
        </div>
      </div>
      <v-btn @click="$emit('close')">닫기</v-btn>
    </div>
  </transition>
</template>

<script>
export default {

  props: {
    show: {
      type: Boolean,
      required: true
    },
    user: Object
  }
}
</script>

<style>
.bottom-sheet {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  gap: 10px;

  width: 390px;
  height: 624px;

  background: #FFFFFF;
  border-radius: 20px 20px;
  color: #000000;
}

</style>
