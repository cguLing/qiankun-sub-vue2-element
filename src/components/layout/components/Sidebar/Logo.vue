<template>
  <div class="sidebar-logo-container" :class="{'collapse':collapse}">
    <transition name="sidebarLogoFade">
      <router-link v-if="collapse" key="collapse" class="sidebar-logo-link" to="/">
        <!-- <img v-if="sysInfo.logo" :src="sysInfo.logo" class="sidebar-logo"> -->
        <div class="sidebar-logo">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"
            :fill="variables.logColor" class="bi bi-strava" viewBox="0 0 16 16">
            <path d="M6.731 0 2 9.125h2.788L6.73 5.497l1.93 3.628h2.766L6.731 0zm4.694 9.125-1.372 2.756L8.66 9.125H6.547L10.053 16l3.484-6.875h-2.112z"/>
          </svg>
        </div>
      </router-link>
      <router-link v-else key="expand" class="sidebar-logo-link" to="/">
        <div class="sidebar-logo">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"
            :fill="variables.logColor" class="bi bi-strava" viewBox="0 0 16 16">
            <path d="M6.731 0 2 9.125h2.788L6.73 5.497l1.93 3.628h2.766L6.731 0zm4.694 9.125-1.372 2.756L8.66 9.125H6.547L10.053 16l3.484-6.875h-2.112z"/>
          </svg>
        </div>
        <h1 class="sidebar-title">{{ $sysMainFrameInfo.APP_NAME }} </h1>
      </router-link>
    </transition>
  </div>
</template>

<script>
import variables from '@/styles/index.less'
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
      variables,
      sysInfo: {
        name: '子系统模板',
        logo: require('@/assets/logo.svg')
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
