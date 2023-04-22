<template>
  <div id="root-bottom-navbar">
    <NavbarItem label="채팅" icon="mdi-message-text"></NavbarItem>
    <NavbarItem label="검색" icon="mdi-account-search"></NavbarItem>
    <NavbarItem label="설정" icon="mdi-cog"></NavbarItem>
  </div>
</template>

<script>
import NavbarItem from "@/components/navbar/NavbarItem";
export default {
  name: "BottomNavigationBar",
  components: {NavbarItem}
}
</script>

<style lang="scss">
@import "../../css/navbar/bottom-navbar.scss";
</style>