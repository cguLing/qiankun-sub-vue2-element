<template>
  <div :class="classObj" class="app-wrapper">
    <!-- <div
      v-if="device === 'mobile' && sidebar.opened"
      class="drawer-bg"
      @click="handleClickOutside"
    /> -->
    <zhimaHeader ref="header" v-if="!judgeQiankun">
    </zhimaHeader>
    <el-container :style="judgeQiankun?'height:100%':'height:calc(100% - 40px)'">
      <sidebar />
      <el-container>
        <el-header style="padding:0;height:auto">
          <navbar />
          <tags-view v-if="needTagsView" />
        </el-header>
        <el-main style="">
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
    judgeQiankun(){
      return window.__POWERED_BY_QIANKUN__
    },
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
<style lang="less" scoped>
@import "~@/styles/mixin.less";
@import "~@/styles/index.less";

::v-deep .zhima-header-bar{
  background-color: @menu_header_bg;
  // .sidebar-logo-link .sidebar-title{
  //   font-family: FZShuti;
  //   font-size: 25px;
  //   font-weight: 500;
  //   // line-height: 22px;
  //   letter-spacing: 0px;
  //   text-align: left;
  //   line-height:35px;
  //   // text-shadow:#e2e2e2 1px 1px 0px, #989aa4 1px 2px 0;
  // }
}
.app-wrapper {
  .clearfix();
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
  width: calc(~"100% - "@sideBarWidth);
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(~"100% - 54px");
}

.mobile .fixed-header {
  width: 100%;
}
</style>
