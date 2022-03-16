<template>
    <Menu width="180" ref="systemMenu" accordion :active-name="activeName" :open-names="openNames">
        <div class="product-current">
            <div class="item">
                <Icon :custom="'font_family icon-defaultLogo'"
                      size="18"/>
            </div>
            <div class="item">
                <slot name="appInfo">-</slot>
            </div>
        </div>
        <MenuChild :menuList="menuLists" :level="0" :collapsed="collapsed"></MenuChild>
    </Menu>
</template>

<script>
import MenuChild from './children'

export default {
  components: { MenuChild },
  props:{
    collapsed:{
      type: Boolean,
      required: true
    }
  },
  provide () {
    return {
      selectToRouterMain: this.selectToRouterMain
    }
  },
  data () {
    return {
      activeName: '',
      openNames: [],
      menuLists: [],
      menuNames: []
    }
  },
  computed: {
    menuList () {
      return this.$store.getters.menuList
    },
  },
  created(){
    this.sysGetMenus()
  },
  watch: {
    '$route' () {
      this.expandSideMenu()
    },
    collapsed:{
      handler(val){
        if(val){
          this.openNames = []
        } else {
          let tmp = this.$route.path.split('/')
          if(tmp.length>2){//TODO: 要求path与name 强相关 可能出现问题
            for (let i = 1; i < tmp.length-1; i++) {
              const item = tmp[i]
              this.openNames.push(item)
            }
          }else {
            this.openNames.push('')
          }
          this.openNames.push(this.$route.name)
        }
        this.$nextTick(()=> {
          this.$refs.systemMenu.updateOpened()
          this.$refs.systemMenu.updateActiveName()
        });
      },
      deep:true,
      immediate: true,
    }
  },
  methods: {
    sysGetMenus () {
      let result = this.getMenuName(this.menuList,0)
      this.menuNames = result.Name
      this.menuLists = result.Menu
      this.expandSideMenu()
    },
    getMenuName (menus, level, result = {Name: [], Menu: []}) {
      menus.forEach(value => {
        if (value.meta['layout']){
          if (value.children) {
            result.Menu=result.Menu.concat(value.children)
            this.getMenuName(value.children, 1, result)
          }
        } else {
          if(level==0){
            result.Menu=result.Menu.concat(value)
          }else{
            if(value.name!='/') result.Name.push(value.name)
          }
          if (value.children) {
            this.getMenuName(value.children, 1, result)
          }
        }

      })
      return result
    },
    selectToRouterMain (path, name, target) {
      if(target === 'link'){
        window.open(path, '_blank')
      }else if (target === '_blank' || target === '_top') {
        let { href } = this.$router.resolve({
          name: name
        })
        if (target === '_top') href = '/full' + href
        window.open(href, '_blank')
      } else {
        this.$router.push({ name: name })
      }
    },
    expandSideMenu (route = this.$route) {
      // 根据路由地址判定需要展开与选中的菜单项
      this.openNames = route.matched.map(x => x.name).filter(x => x !== '/')
      const names = [...this.openNames].reverse()
      for (let i = 0; i < names.length; i++) {
        if (this.menuNames.includes(names[i])) {
          this.activeName = names[i]
          break
        } else {
          this.activeName = ''
          //设定首页展开IDC的子级菜单
          // if(this.openNames.includes('home')){
          //   this.openNames.push('idc')
          // }
        }
      }
      this.$nextTick(() => {
        const _systemMenu = this.$refs.systemMenu
        _systemMenu.updateOpened()
        _systemMenu.updateActiveName()
      })
    }
  }
}
</script>
