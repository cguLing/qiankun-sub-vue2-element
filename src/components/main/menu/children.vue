<template>
    <div :class="'menu-level-'+level">
        <template v-for="item in menuList" >
            <template>
                <Menu-item v-if="!item.children" v-show="!item.meta.hideInMenu" :name="item.name" :key="item.name" 
                    :style="(level!=0&&collapsed)?'border-style:none none ridge none;padding:4px 5px':''"
                    @click.native="selectToRouterMain(item.path, item.name, item.meta.target)">
                    <span :style="level==0?'margin-left:-3px':(collapsed?'':'margin-left:-11px')">
                        <Icon v-if="level==0" :type="item.icon.includes('icon-')?'':item.icon" :custom="item.icon.includes('icon-')?('font_family icon-defaultLogo '+item.icon||''):''" size="18"/>
                        <span style="margin-left:-2px">{{item.meta['title']?item.meta.title:item.name}}</span>
                    </span>
                </Menu-item>
                <Submenu v-else-if="item.children && !collapsed" v-show="!item.meta.hideInMenu" :name="item.name" :key="item.name" @click.native="selectToRouterMain(item.path, item.name, item.meta.target)">
                    <template slot="title">
                        <span :style="level==0?'margin-left:-3px':(collapsed?'margin-top:5px':'margin-left:-11px')">
                            <Icon v-if="level==0" :type="item.icon.includes('icon-')?'':item.icon" :custom="item.icon.includes('icon-')?('font_family icon-defaultLogo '+item.icon||''):''" size="18"/>
                            <span style="margin-left:-2px">{{item.meta['title']?item.meta.title:item.name}}</span>
                        </span>
                    </template>
                    <MenuChild :menuList="item.children" :level="level+1"></MenuChild>
                </Submenu>
                <Menu-item v-else v-show="!item.meta.hideInMenu" :name="item.name" :key="item.name">
                    <span :style="level==0?'margin-left:-3px':'margin-left:-11px'" class="rt-pop">
                        <Poptip trigger="hover" :transfer="true" placement="right">
                            <Icon
                                v-if="level==0"
                                :type="item.icon.includes('icon-')?'':item.icon"
                                :custom="item.icon.includes('icon-')?('font_family icon-defaultLogo '+item.icon||''):''"
                                size="18"/>
                            <div class="pop-content" slot="content">
                                <MenuChild :menuList="item.children" :collapsed="collapsed" :level="level+1"></MenuChild>
                            </div>
                        </Poptip>
                    </span>
                </Menu-item>
            </template>
        </template>
    </div>
</template>

<script>
export default {
  components: {
  },
  name: 'MenuChild',
  inject: ['selectToRouterMain'],
  props: ['menuList', 'level', 'collapsed'],
  created () {
  }
}
</script>
<style lang="less">
.pop-content{
    margin-left:0px;
}
/* .rt-pop {
  display: inline-block;
} */
// .rt-pop >>> .ivu-poptip-popper {
//   left:-100px !important;
// }
.ivu-poptip-popper {
    // padding: 0 10px 0 0px !important;
  left: 37px !important;
}
</style>
