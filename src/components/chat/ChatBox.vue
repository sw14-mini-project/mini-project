<template>
  <div :class="mode === 'my' ? 'mychat-root' : 'partnerchat-root'">
    <div :class="mode === 'my' ? 'mychat-wrapper' : 'partnerchat-wrapper'">
      <div :class="mode === 'my' ? 'mychat-time' : 'partnerchat-time'">{{ getTime(new Date(time)) }}</div>
      <div :class="mode === 'my' ? 'mychat-msg' : 'partnerchat-msg'">
        <div :class="mode === 'my' ? 'mychat-msg-text' : 'partnerchat-msg-text'">{{ msg }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyChat",
  props: {
    time: {
      type: Number,
      default: 0
    },
    msg: {
      type: String,
      default: ''
    },
    mode: {
      type: String,
      default: 'my'
    },
  },
  methods: {
    getTime(time) {
      return `${time.getFullYear().toString().substr(-2)}.${("0" + (time.getMonth() + 1)).slice(-2)}
      .${("0" + time.getDate()).slice(-2)} ${("0" + time.getHours()).slice(-2)}:${("0" + time.getHours()).slice(-2)}:${("0" + time.getSeconds()).slice(-2)}`
    }
  }
}
</script>

<style scoped>
.mychat-root {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
  padding: 0px;
  width: 100%;
}

.mychat-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
  gap: 10px;

  max-width: 90%;
}

.mychat-time {

  font-style: normal;
  font-weight: 500;
  font-size: 8px;
  line-height: 8px;

  display: flex;
  align-items: flex-end;

  color: rgba(255, 248, 248, 0.5);

  flex: none;
  order: 0;
  flex-grow: 0;
}

.mychat-msg {
  display: block;
  padding: 5px 8px 5px 8px;
  gap: 10px;

  background: #FFFFFF;
  border-radius: 5px;

  flex: 1;
  min-width: 0;
}

.mychat-msg-text {
  font-style: normal;
  font-weight: 500;
  font-size: 14px;

  color: #000000;
  word-wrap: break-word;
}

.partnerchat-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-end;
  gap: 10px;

  max-width: 90%;
}

.partnerchat-time {
  font-style: normal;
  font-weight: 500;
  font-size: 8px;
  line-height: 8px;

  display: flex;
  align-items: flex-end;

  color: rgba(255, 248, 248, 0.5);

  flex: none;
  order: 1;
  flex-grow: 0;
}

.partnerchat-msg {
  display: block;
  padding: 5px 8px 5px 8px;
  gap: 10px;

  background: #6948e3;
  border-radius: 5px;

  flex: 1;
  min-width: 0;
}

.partnerchat-msg-text {
  font-style: normal;
  font-weight: 500;
  font-size: 14px;

  color: #ffffff;
  word-wrap: break-word;
}

.partnerchat-root {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 0px;
  width: 100%;
}
</style>