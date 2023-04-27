<template>
  <v-slide-y-reverse-transition>
    <div class="bottom-sheet" v-show="show">
      <div class="bottom-sheet-content" @click.stop>
        <div class="form-group">
          <label for="nickname">닉네임:</label>
          <input type="text" id="nickname" :value="data.title" disabled>
        </div>
        <div class="form-group">
          <label for="description">자기소개:</label>
          <input type="text" id="description" :value="data.text" disabled>
        </div>
        <div class="form-group">
          <label for="location">위치:</label>
          <input type="text" id="location" :value="data.location" disabled>
        </div>
        <div class="form-group">
          <label for="phone-number">전화번호:</label>
          <input type="tel" id="phone-number" :value="data.phoneNumber" disabled>
        </div>
        <div class="form-group">
          <label for="position">포지션:</label>
          <input type="text" id="position" :value="data.stack" disabled>
        </div>
      </div>
      <v-btn @click="$emit('close')">닫기</v-btn>
    </div>
  </v-slide-y-reverse-transition>
</template>

<script>
export default {

  props: {
    show: {
      type: Boolean,
      required: true
    },
    data: Object
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

  width: 100%;
  transform: translateY(24px);
  max-height: 80%;

  background: #FFFFFF;
  border-radius: 20px 20px 0 0;
  color: #000000;

  position: absolute;
  bottom: 0;
  z-index: 100;
}

</style>
