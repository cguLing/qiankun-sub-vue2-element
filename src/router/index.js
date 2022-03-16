import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '@/components/main'
import store from '@/store'
import routesDefault from './routes'
Vue.use(VueRouter)
/**
 * 后台查询的菜单数据拼装成路由格式的数据
 * @param routes
 */
 function generaRoute(routes, data) {
  data.forEach((item) => {
    const menu = {
      path: item.path,
      component:
        item.component === "Main" ? Main : ()=>import(`@/view${item.component}`), 
      children: [],
      name: item.name,
      redirect: item.redirect,
      meta: {
        title: item.meta.title,
        icon: item.meta.icon,
        layout: item.meta.layout,
        hideInMenu: item.meta.hideInMenu,
        right: item.meta.right
      },
    };
    if (item.children) {
      generaRoute(menu.children, item.children);
    }
    routes.push(menu);
  });
}

let result = []
generaRoute(result,routesDefault)
// 用户权限 => 此为写死的方案
// let user = store.state.user.username
// let right = store.state.app.right
// const routes = result.filter((obj)=>{
//   if(!obj.meta.right) return true
//   for (let i = 0; i < obj.meta.right.length; i++) {
//     const item = obj.meta.right[i];
//     if(right[item].includes(user)) return true
//   }
//   return false
// })
const routes = result
export default routes
