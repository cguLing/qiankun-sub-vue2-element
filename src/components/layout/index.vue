<template>
  <div :class="classObj" class="app-wrapper">
    <!-- <div
      v-if="device === 'mobile' && sidebar.opened"
      class="drawer-bg"
      @click="handleClickOutside"
    /> -->
    <el-container style="height:100%">
      <sidebar />
      <el-container>
        <el-header style="padding:0;height:auto">
          <navbar />
          <tags-view v-if="needTagsView" />
        </el-header>
        <el-main style="background:#fff">
          <app-main />
        </el-main>
        <el-footer style="padding:0;height:auto">
          <app-footer />
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { Navbar, Sidebar, TagsView, AppMain, AppFooter } from "./components";
import ResizeMixin from "./mixin/ResizeHandler";

export default {
  name: "Layout",
  components: {
    Navbar,
    Sidebar,
    AppMain,
    TagsView,
    AppFooter
  },
  mixins: [ResizeMixin],
  computed: {
    username () {
      return this.$store.state.user.username
    },
    sidebar() {
      return this.$store.state.app.sidebar;
    },
    needTagsView() {
      return true;
    },
    fixedHeader() {
      return false;
    },
    fixedFooter() {
      return true;
    },
    device() {
      return this.$store.state.app.device;
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === "mobile",
      };
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch("closeSideBar", { withoutAnimation: false });
    },
  },
};
</script>
<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
@import "~@/styles/variables.scss";

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}
</style>
