/* eslint-disable */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import '@/icons';
import '@/styles/admin.scss';
import '@/styles/index.less'; // global less
import './public-path'
import Vue from 'vue'
import App from './App'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import config from '@/config'
// import '@/assets/icons/iconfont.css'
import router,{ resetRouter } from "./router";
// import VueRouter from "vue-router";
import '@/components/resource/fonts'
import keycloak from '@dsb-norge/vue-keycloak-js';
import {
  userinfoGet
} from "@/api/other/ids"
import './permission'

import zhimaHeader from 'vue-zhima-components'
Vue.use(zhimaHeader);

import Pagination from '@/components/Pagination'
// 全局组件挂载
Vue.component('Pagination', Pagination)

// 用闭包实现局部对象storage(注意Storage的方法都重写一遍，不然调用其对象原型方法会报错。)
var sessionStorageMock = (function(win) {
  var storage = win.sessionStorage;
  return {
      setItem: function(key, value) {
        var setItemEvent = new Event("setItemEvent");
        var oldValue = storage[key];
        setItemEvent.key = key;
        // 新旧值深度判断，派发监听事件
        if (oldValue !== value) {
            setItemEvent.newValue = value;
            setItemEvent.oldValue = oldValue;
            win.dispatchEvent(setItemEvent);
            storage[key] = value;
            return true;
        }
        return false;
      },
      getItem: function(key) {
        return storage[key];
      },
      removeItem: function(key) {
        storage[key] = null;
        return true;
      },
      clear: function() {
          storage.clear();
          return true;
      },
      key: function (index) {
          return storage.key(index);
      }
  };
}(window));

Object.defineProperty(window, 'sessionStorage', { value: sessionStorageMock, writable: true });

// 加载系统配置
let sysMainframeInfo = {};
Vue.prototype.$sysMainFrameInfo = Object.assign({
  APP_NAME: config.title,
  TAB_ON: true
}, sysMainframeInfo)
/* eslint-disable */

Vue.config.productionTip = false
let instance = null
Vue.use(ElementUI, {size: 'small'})
/**
 * @description 全局注册应用配置
 */
Vue.prototype.$config = config


if (!window.__POWERED_BY_QIANKUN__) {
  sessionStorage.setItem('qiankun',false)
  document.title = config.title
  const sso = process.env.NODE_ENV == 'production'?config.prod_keycloak:config.dev_keycloak
  Vue.use(keycloak , {
    init: {
      //是否定时校验登录状态，如果chrome版本大于86.x，请改为false。否则将导致浏览器重复刷新
      checkLoginIframe: false,
      onLoad: 'login-required'
    },
    config: {
      url: sso.url,
      realm: sso.realm,
      clientId: sso.clientId
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

let originFn = document.body.appendChild.bind(document.body)

function redirectPopup(container) {
 
  // 子应用中需要挂载到子应用的弹窗的className，用作标记
  // const editPopup = 'el-dialog__wrapper story-para-edit-popup'
  const whiteList = [
    'el-notification right',
    'el-select-dropdown el-popper',
    'el-select-dropdown el-popper is-multiple',
    'el-dropdown-menu el-popper el-dropdown-menu--small',
    'el-tooltip__popper is-dark',
    'el-tooltip__popper is-light',
    'el-dialog__wrapper',
    'el-dialog__wrapper cus-dialog-container',
    'el-message-box__wrapper',
    'el-popover el-popper',
    'el-popper el-cascader__dropdown',
    'el-autocomplete-suggestion el-popper',
    'el-message el-message--success',
    'el-message el-message--warning',
    'el-message el-message--error',
    'el-message el-message--info'
  ]

  // 保存原有document.body.appendChild方法
  let originFn = document.body.appendChild.bind(document.body)

  // 重写appendChild方法
  document.body.appendChild = (dom) => {

      // 根据标记，来区分是否用新的挂载方式
      if (whiteList.includes(dom.className)) {
          container.querySelector('#subContainer').appendChild(dom)
      } else {
          originFn(dom)
      }
  }
}

export async function bootstrap () {
  console.log('[vue] vue app bootstraped')
}

export async function mount (props) { 
  props.onGlobalStateChange(async (state, prev) => {
    console.log('globalState 状态变更：')
  // state: 变更后的状态; prev 变更前的状态
    console.log(state, prev);
    await store.dispatch('changeUserInfo',state)
    // await resetRouter()
  });
  // console.log(props.getGlobalState())
  await store.dispatch('changeUserInfo',props.getGlobalState())
  // await resetRouter()
  // store.commit('setToken', props.getGlobalState("a"), true); 

  const { container, routerBase } = props
  redirectPopup(container)
  sessionStorage.setItem('baseurl',routerBase)// TODO:待解决，首次进入找不到,router/index.js
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
  document.body.appendChild = originFn
}
