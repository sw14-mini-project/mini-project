<template>
  <div id="root-bottom-navbar">
    <NavbarItem
        label="채팅"
        icon="mdi-message-text"
        :selected="selectedLabel === 'chat'"
        path="chat"></NavbarItem>
    <NavbarItem
        label="검색"
        icon="mdi-account-search"
        :selected="selectedLabel === 'search'"
        path="search"></NavbarItem>
    <NavbarItem
        label="설정"
        icon="mdi-cog"
        :selected="selectedLabel === 'setting'"
        path="setting"></NavbarItem>
  </div>
</template>

<script>
import NavbarItem from "@/components/navbar/NavbarItem";
export default {
  name: "BottomNavigationBar",
  components: {NavbarItem},
  props: {
    selectedLabel: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss">
@import "../../css/navbar/bottom-navbar.scss";
</style>