import {
  // getBreadCrumbList,
  setTagNavListInLocalstorage,
  getMenuByRouter,
  getTagNavListFromLocalstorage,
  getHomeRoute,
  // getNextRoute,
  routeHasExist,
  // routeEqual,
  getRouteTitleHandled,
  localSave,
  localRead
} from '@/libs/util'
import config from '@/config'
const { homeName } = config

export default {
  state: {
    sidebar: {
      opened: sessionStorage.getItem("sidebarStatus")
        ? !!+sessionStorage.getItem("sidebarStatus")
        : true,
      withoutAnimation: false
    },
    mod: sessionStorage.getItem("mod") || "运维平台",
    device: "desktop",
    size: sessionStorage.getItem("size") || "medium",

    // breadCrumbList: [],
    tagNavList: [],
    homeRoute: {},
    right: {superAdmin:['chenjh03','taoyl']},
    local: localRead('local')
  },
  getters: {
    menuList: (state, getters, rootState) => getMenuByRouter(rootState.user.access),
  },
  mutations: {
    TOGGLE_SIDEBAR: (state) => {
      state.sidebar.opened = !state.sidebar.opened;
      state.sidebar.withoutAnimation = false;
      if (state.sidebar.opened) {
        sessionStorage.setItem("sidebarStatus", 1)
      } else {
        sessionStorage.setItem("sidebarStatus", 0)
      }
    },
    CLOSE_SIDEBAR: (state, withoutAnimation) => {
      sessionStorage.setItem('sidebarStatus', 0);
      state.sidebar.opened = false;
      state.sidebar.withoutAnimation = withoutAnimation;
    },
    TOGGLE_DEVICE: (state, device) => {
      state.device = device;
    },
    SET_SIZE: (state, size) => {
      state.size = size;
      sessionStorage.setItem("size", size);
    },
    SET_MOD: (state, mod) => {
      state.mod = mod;
      sessionStorage.setItem("mod", mod);
    },
    // setBreadCrumb (state, route) {
    //   state.breadCrumbList = getBreadCrumbList(route, state.homeRoute)
    // },
    setHomeRoute (state, routes) {
      state.homeRoute = getHomeRoute(routes, homeName)
    },
    setTagNavList (state, list) {
      let tagList = []
      if (list) {
        tagList = [...list]
      } else tagList = getTagNavListFromLocalstorage() || []
      // if (tagList[0] && tagList[0].name !== homeName) tagList.shift()
      // let homeTagIndex = tagList.findIndex(item => item.name === homeName)
      // if (homeTagIndex > 0) {
      //   let homeTag = tagList.splice(homeTagIndex, 1)[0]
      //   tagList.unshift(homeTag)
      // }
      state.tagNavList = tagList
      setTagNavListInLocalstorage([...tagList])
    },
    // closeTag (state, route) {
    //   let tag = state.tagNavList.filter(item => routeEqual(item, route))
    //   route = tag[0] ? tag[0] : null
    //   if (!route) return
    //   closePage(state, route)
    // },
    addTag (state, { route, type = 'unshift' }) {
      let router = getRouteTitleHandled(route)
      if (!routeHasExist(state.tagNavList, router)) {
        if (type === 'push') state.tagNavList.push(router)
        else {
          if (router.name === homeName) state.tagNavList.unshift(router)
          else state.tagNavList.splice(1, 0, router)
        }
        setTagNavListInLocalstorage([...state.tagNavList])
      }
    },
    setLocal (state, lang) {
      localSave('local', lang)
      state.local = lang
    },
  },
  actions: {
    toggleSideBar({ commit }) {
      commit("TOGGLE_SIDEBAR");
    },
    closeSideBar({ commit }, { withoutAnimation }) {
      commit("CLOSE_SIDEBAR", withoutAnimation);
    },
    toggleDevice({ commit }, device) {
      commit("TOGGLE_DEVICE", device);
    },
    setSize({ commit }, size) {
      commit("SET_SIZE", size);
    },
    setMod({ commit }, mod) {
      commit("SET_MOD", mod);
    },
  }
}
