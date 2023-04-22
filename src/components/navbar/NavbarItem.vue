<template>
  <div class="navbtn-root" @click="clicked">
    <v-icon :icon="icon" class="navbtn-icon" :class="selected ? 'selected' : ''"></v-icon>
    <div class="navbtn-label" :class="selected ? 'selected' : ''">{{ label }}</div>
  </div>
</template>

<script>
import {gotoPage} from "@/js/route";

export default {
  name: "NavbarItem",
  props: {
    label: {
      type: String,
      default: "라벨"
    },
    icon: {
      type: String,
      default: "mdi-vuetify"
    },
    selected: {
      type: Boolean,
      default: false
    },
    path: {
      type: String,
      default: 'chat'
    }
  },
  methods: {
    clicked() {
      gotoPage(this.path)
    }
  }
}
</script>

<style lang="scss">
@import "../../css/navbar/navbar-item.scss";
</style>