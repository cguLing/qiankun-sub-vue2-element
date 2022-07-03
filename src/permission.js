
import router from "./router";
// import router,{ resetRouter } from "./router";
import store from './store'
// if (!window.__POWERED_BY_QIANKUN__) {
//   router.beforeEach(async (to, from, next) => {
//     if(to.fullPath == '/404'){
//       if(to.redirectedFrom&&to.redirectedFrom.split('/')[1]=='conf'){
//           let str = to.redirectedFrom.split('/')[2]
//           var form = document.createElement('form')
//           form.setAttribute('action', '/download/'+str)
//           form.setAttribute('method', 'get')
//           form.setAttribute('target', '_blank')
//           form.setAttribute('style', 'display:none')
//           document.body.appendChild(form);
//           form.submit();
//           next({path: from.path, replace: true })
//       } else {
//           next()
//       }
//     } else {
//       if(!sessionStorage.getItem('right')){
//         try {
//           const user = await store.dispatch('changeUserInfo')
//           const role = await store.dispatch('checkUserRight')
//           await resetRouter().then(res => {
//             next({ ...to, replace: true })
//           })
//         } catch (error) {
//           // await store.dispatch('user/resetToken')
//           next(`/login?redirect=${to.path}`)
//         }
//       } else {
//         if(to.matched.length==0) next({path: '/404'})
//         else next()
//       }
//     }
//   })
// } else {
  router.beforeEach((to, from, next) => {
    if(!store.state.user.username){ //TODO: 刷新的时候会操作，改成sessionStore (退出登录)
      store.dispatch('getKeycloakInfo')
      next()
    } else {
      next()
    }
  })
// }