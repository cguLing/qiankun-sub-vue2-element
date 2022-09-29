<template>
  <div class="sidebar-logo-container" :class="{'collapse':collapse}">
    <transition name="sidebarLogoFade">
      <router-link v-if="collapse" key="collapse" class="sidebar-logo-link" to="/">
        <img v-if="sysInfo.logo" :src="sysInfo.logo" class="sidebar-logo">
        <h1 v-else class="sidebar-title">{{ $sysMainFrameInfo.APP_NAME }} </h1>
      </router-link>
      <router-link v-else key="expand" class="sidebar-logo-link" to="/">
        <img v-if="sysInfo.logo" :src="sysInfo.logo" class="sidebar-logo">
        <h1 class="sidebar-title">{{ $sysMainFrameInfo.APP_NAME }} </h1>
      </router-link>
    </transition>
  </div>
</template>

<script>

// import logo from require('../assets/img/960e_1.jpg'),
export default {
  name: 'SidebarLogo',
  mounted() {

  },
  props: {
    collapse: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      sysInfo: {
        name: '子系统模板',
        logo: require('@/assets/logo.svg'),
      }
    }
  }
}
</script>

<style lang="less" scoped>
// .sidebarLogoFade-enter-active {
//   transition: opacity 1.5s;
// }

// .sidebarLogoFade-enter,
// .sidebarLogoFade-leave-to {
//   opacity: 0;
// }
</style>
