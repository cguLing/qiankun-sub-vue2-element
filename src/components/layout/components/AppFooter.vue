<template>
  <footer class="app-footer">
    <!-- <div class="copyright">
      Copyright ©2021 {{logo}}运维
      All Rights Reserved | {{ copyright.version }} |
      <el-link type="primary" :href="copyright.manual" target="_blank" style="font-size: inherit">
        使用文档
      </el-link>
    </div> -->
  </footer>
</template>

<script>
export default {
  name: 'AppFooter',
  computed: {
    copyright () {
      return {
    version: "v1.0.0",
    manual: "http://confluence.inner.youdao.com/pages/viewpage.action?pageId=58002362",
  }
    },
    logo() {
      return 'xxxx';
    }
  }
}
</script>

<style scoped lang="scss">
  .app-footer {
    height: 50px;
    overflow: hidden;
    position: relative;
    background: rgb(245, 247, 249);//#f3f3f3;
    // box-shadow: 0 1px 4px rgba(0,21,41,.08);
    .copyright {
      width: 100%;
      padding-top: 16px;
      text-align: center;
      color: #666;
    }
  }
</style>
