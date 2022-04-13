<template>
  <el-aside :class="{'has-logo':showLogo}" style="padding:0;margin:0;" class="sidebar-container">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />
  </el-aside>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import Hamburger from '@/components/Hamburger'
import variables from '@/styles/variables.scss'

export default {
  components: { SidebarItem, Logo, Hamburger },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    routes() {
      // return this.$router.options.routes
      return this.$store.getters.menuList
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return true
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  methods:{
    toggleSideBar() {
      this.$store.dispatch('toggleSideBar')
    },
  }
}
</script>
<style lang="scss" scoped>
  .hamburger-container {
    background: rgb(245, 247, 249);
    box-shadow: rgb(100 100 100 / 20%) -1px 0px 0px 1px;
    height: 40px;
    line-height: 40px;
    position: relative;
    text-align:center;
    height: 100%;
    // float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

      &:hover {
          background: rgba(0, 0, 0, .055)
      }
  }
</style>