<template>
  <Layout style="height: 100%;" class="layout-body">
    <div class="sider-bar left">
      <Sider
        class="sider-menu-bar"
        ref="siderProductBar"
        v-model="collapsed"
        collapsible
        :collapsed-width="45"
        :width="180"
      >
        <div class="menu-bar" style="height: calc(100% - 100px);">
          <MenuBar ref="sysMenu">
            <template slot="appInfo">{{$sysMainFrameInfo.APP_NAME}}</template>
          </MenuBar>
        </div>
      </Sider>
    </div>
    <Layout>
      <Content class="content-con">
        <Layout class="layout-con">
          <div v-if="$sysMainFrameInfo.TAB_ON">
            <Breadcrumb style="margin:10px">
              <BreadcrumbItem to="/">
                <Icon type="ios-home-outline"></Icon> Home
              </BreadcrumbItem>
              <BreadcrumbItem :to="'/'+clickedTab" v-show="clickedTab!='home'">{{clickedTab.toUpperCase()}}</BreadcrumbItem>
            </Breadcrumb>
            <Tabs type="card" closable v-model="clickedTab" @on-tab-remove="handleTabRemove" @on-click="handleTabClick" style="margin-bottom:-16px">
                <TabPane v-for="item in cacheList" :closable="!(item.name=='home')" :key="item.name+'-'+random" :label="item.title" :name="item.name"/>
            </Tabs>
          </div>
          <Content class="content-wrapper">
              <router-view/>
          </Content>
        </Layout>
      </Content>
    </Layout>
  </Layout>
</template>
<script>
import MenuBar from './menu/index.vue'
import { mapMutations, mapGetters } from 'vuex'
// import { getNewTagList, routeEqual } from '@/libs/util'
import routes from '@/router'
import './main.less'
export default {
  name: 'Main',
  components: {
    MenuBar
  },
  data () {
    return {
      collapsed: false,
      random: 0,
      clickedTab: 'home'
    }
  },
  computed: {
    ...mapGetters([
      'errorCount'
    ]),
    tagNavList () {
      return this.$store.state.app.tagNavList
    },
    cacheList () {
      const list = [...this.tagNavList.length ? this.tagNavList.filter(
        item => !(item.meta && item.meta.notCache)).map (
          item => {return {name: item.name, title:item.meta.title}}) : []]
      return list
    },
    // local () {
    //   return this.$store.state.app.local
    // },
  },
  methods: {
    ...mapMutations([
      'setBreadCrumb',
      'setTagNavList',
      'addTag',
      // 'setLocal',
      'setHomeRoute',
      // 'closeTag'
    ]),
    handleCollapsedChange (state) {
      this.collapsed = state
    },
    handleTabClick (name) {
      this.$router.push({ name: name })
    },
    handleTabRemove (name) {
      let list = this.tagNavList.filter(item => item.name!==name)
      this.setTagNavList(list)
      let nextName = this.tagNavList[this.tagNavList.length-1].name
      this.$router.push({ name: nextName })
    }
  },
  watch: {
    '$route' (newRoute) {
      const { name, query, params, meta } = newRoute
      this.clickedTab=name
      this.addTag({
        route: { name, query, params, meta },
        type: 'push'
      })
    }
  },
  mounted () {
    /**
     * @description 初始化设置面包屑导航和标签导航
     */
    this.setHomeRoute(routes)
    if(this.$route.name!=='home'){
      this.addTag({
        route: { name:'home', query:undefined, params:undefined, meta:{title: '首页'}},
        type: 'push'
      })
    }
    const { name, query, params, meta } = this.$route
    this.addTag({
      route: { name, query, params, meta },
      type: 'push'
    })
    this.clickedTab=name
  }
}
</script>
