<template>
  <el-row class="back">
    <el-col span="13" style="height:100%">
      <el-row type="flex" justify="end" style="position: relative;top:15%">
        <el-col span="12">
        <div class="parent">
          <div class="ship">
            <img :src="alien_ship" alt="" width="300" >
          </div>
          <div class="conversation">
            <img :src="conversation" alt="" width="330" >
          </div>
        </div>
        </el-col>
      </el-row>
    </el-col>
    <el-col span="11" style="height:100%">
      <div class="bullshit">
        <div class="bullshit__oops">OOPS!</div>
        <div class="bullshit__headline">{{ message }}</div>
        <div class="bullshit__info">{{ info }}</div>
        <el-button type="primary" shape="circle" @click="handleBack">返回首页</el-button>
      </div>
    </el-col>
  </el-row>
</template>

<script>

export default {
  name: 'Page404',
  computed: {
    message() {
      return '抱歉，您找的页面不存在。'
    },
    info() {
      return '若是怀疑页面丢失，可以联系运维进行处理哟~'
    }
  },
  data(){
    return {
      alien_ship: require('@/assets/images/error-page/alien-ship.gif'),
      conversation: require('@/assets/images/error-page/404.png')
    }
  },
  methods:{
    handleBack(){
      this.$router.push('/')
    }
  }
}
</script>
<style lang="less" scoped>
  .back{
    height: 100%;
    background: url('../../../assets/images/error-page/background-404.jpg') no-repeat center fixed;     
    background-size: cover;
  }
  .parent {
    position:relative;
    height: 100%;
    .ship {
      position:absolute;
      top: 180px;
      right:300px;
      // left: 50%;
      // display: inline-block;
    }
    .conversation{
      position:absolute;
      // top: 20%;
      right: 80px;
      // display: inline-block;
    }
  }
  
  .bullshit {
    position: relative;
    float: left;
    width: 300px;
    padding: 30px 0;
    top: 25%;
    overflow: hidden;
    &__oops {
      font-size: 32px;
      font-weight: bold;
      line-height: 40px;
      color: #1482f0;
      opacity: 0;
      margin-bottom: 20px;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-fill-mode: forwards;
    }
    &__headline {
      font-size: 20px;
      line-height: 24px;
      color: #fff;
      font-weight: bold;
      opacity: 0;
      margin-bottom: 10px;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-delay: 0.1s;
      animation-fill-mode: forwards;
    }
    &__info {
      font-size: 13px;
      line-height: 21px;
      color: rgb(168, 168, 168);
      opacity: 0;
      margin-bottom: 30px;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-delay: 0.2s;
      animation-fill-mode: forwards;
    }
    @keyframes slideUp {
      0% {
        transform: translateY(60px);
        opacity: 0;
      }
      100% {
        transform: translateY(0);
        opacity: 1;
      }
    }
  }
</style>