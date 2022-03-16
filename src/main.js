/* eslint-disable */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import './public-path'
import Vue from 'vue'
import App from './App'
import store from './store'
import iView from 'iview'
import config from '@/config'
import './index.less'
import '@/assets/icons/iconfont.css'
import routes from "./router";
import VueRouter from "vue-router";
import '@/components/resource/fonts'
import keycloak from '@dsb-norge/vue-keycloak-js';
import {
  userinfoGet
} from "@/api/other/ids"


// 加载系统配置
let sysMainframeInfo = {};
Vue.prototype.$sysMainFrameInfo = Object.assign({
  APP_NAME: '子系统模板',
  TAB_ON: true
}, sysMainframeInfo)
/* eslint-disable */

Vue.config.productionTip = false
let instance = null
Vue.use(iView)
/**
 * @description 全局注册应用配置
 */
Vue.prototype.$config = config


if (!window.__POWERED_BY_QIANKUN__) {
  const router = new VueRouter({
    base: window.__POWERED_BY_QIANKUN__ ? routerBase : process.env.BASE_URL,
    mode: 'history',
    routes
  })
  Vue.use(keycloak , {
    init: {
      //是否定时校验登录状态，如果chrome版本大于86.x，请改为false。否则将导致浏览器重复刷新
      checkLoginIframe: false,
      onLoad: 'login-required'
    },
    config: {
      url: config.keycloak.url,
      realm: config.keycloak.realm,
      clientId: config.keycloak.clientId
    },
    onReady: (keycloak) => {
      // 用户信息
      // keycloak.loadUserProfile().success((data) => {
      //   console.log(data);
      // });
      store.dispatch('keycloakLogin',Vue.prototype.$keycloak.token)
      userinfoGet().then((res)=>{
        store.dispatch('changeUserInfo',res.data)
      })
      instance = new Vue({
        el: '#subContainer',
        router,
        keycloak,
        store,
        render: (h) => h(App)
      })
    }
  });
}

export async function bootstrap () {
  console.log('[vue] vue app bootstraped')
}

export async function mount (props) { 
  props.onGlobalStateChange((state, prev) => {
    console.log('globalState 状态变更：')
  // state: 变更后的状态; prev 变更前的状态
    console.log(state, prev);
    store.dispatch('changeUserInfo',state)
  });
  // console.log(props.getGlobalState())
  store.dispatch('changeUserInfo',props.getGlobalState())
  // store.commit('setToken', props.getGlobalState("a"), true); 

  const { container, routerBase } = props
  const router = new VueRouter({
    base: routerBase,
    mode: 'history',
    routes
  })
  instance = new Vue({
    router,
    store,
    render: (h) => h(App)
  }).$mount(container.querySelector('#subContainer'))
  // console.log(props.setGlobalState({'c': 'fgfhffhg'}))
}

export async function unmount () {
  instance.$destroy()
  instance.$el.innerHTML = ''
  instance = null
}
