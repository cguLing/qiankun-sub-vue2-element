// import {
//   login,
//   logout,
//   getUserInfo
// } from '@/api/user'
import { setToken, getToken, removeToken } from '@/libs/auth'
import Vue from 'vue'

export default {
  state: {
    username: '',
    jobNumber: "",
    employeeName: "",
    type: -1,
    // state: -1,
    corpMail: "",
    rdMail: "",
    dept1Name: "",
    dept2Name: "",
    dept3Name: "",

    token: getToken(),

  },
  mutations: {
    setUserName (state, username) {
      state.username = username
    },
    setJobNumber (state, jobNumber) {
      state.jobNumber = jobNumber
    },
    setEmployeeName (state, employeeName) {
      state.employeeName = employeeName
    },
    setType (state, type) {
      state.type = type
    },
    // setState (state, state) {
    //   state.state = state
    // },
    setCorpMail (state, corpMail) {
      state.corpMail = corpMail
    },
    setRdMail (state, rdMail) {
      state.rdMail = rdMail
    },
    setDept1Name (state, dept1Name) {
      state.dept1Name = dept1Name
    },
    setDept2Name (state, dept2Name) {
      state.dept2Name = dept2Name
    },
    setDept3Name (state, dept3Name) {
      state.dept3Name = dept3Name
    },
    setRight (state, right) {
      state.right = right
    },
    setToken (state, token) {
      state.token = token
    },
  },
  getters: {
  },
  actions: {
    changeUserInfo({commit}, user){
      return new Promise((resolve, reject) => {
        if(!user){
          userinfoGet().then((res)=>{
            user = res.data
            commit('setUserName',user.username)
            commit('setJobNumber',user.jobNumber)
            commit('setEmployeeName',user.employeeName)
            commit('setType',user.type)
            commit('setCorpMail',user.corpMail)
            commit('setRdMail',user.rdMail)
            commit('setDept1Name',user.dept1Name)
            commit('setDept2Name',user.dept2Name)
            commit('setDept3Name',user.dept3Name)
            resolve(user)
          }).catch(err => {
            reject('获取用户信息出错')
          })
        } else {
          commit('setUserName',user.username)
          commit('setJobNumber',user.jobNumber)
          commit('setEmployeeName',user.employeeName)
          commit('setType',user.type)
          commit('setCorpMail',user.corpMail)
          commit('setRdMail',user.rdMail)
          commit('setDept1Name',user.dept1Name)
          commit('setDept2Name',user.dept2Name)
          commit('setDept3Name',user.dept3Name)
          resolve(user)
        }
      })
    },
    // 新SSO
    keycloakLogin({ commit }, accessToken) {
      return new Promise((resolve, reject) => {
        commit('setToken', accessToken)
        setToken(accessToken)
        resolve()
      })
    },
    // 新SSO
    // get user info from keycloak
    getKeycloakInfo({ commit }) {
      return new Promise((resolve, reject) => {
        if (!Vue.prototype.$keycloak) {
          reject('keycloak not init')
        }
  
        if (!Vue.prototype.$keycloak.authenticated) {
          reject('Verification failed, please Login again.')
        }
        // const token = Vue.prototype.$keycloak.token
        const rd_name = Vue.prototype.$keycloak.idTokenParsed.preferred_username
        const rd_email = Vue.prototype.$keycloak.idTokenParsed.email
        // const name = Vue.prototype.$keycloak.idTokenParsed.name
        // roles must be a non-empty array
        // if (!roles || roles.length <= 0) {
        //   reject('getKeycloakInfo: roles must be a non-null array!')
        // }
  
        // you can also use the method loadUserProfile() to get user attributes
        // Vue.prototype.$keycloak.loadUserProfile().then(profile => {
        //   let avatar = profile.attributes.avatar[0]
        //   let introduction = profile.attributes.introduction[0]
        // })
  
        const data = {
          // token,
          // name,
          rd_email,
          rd_name
        }
  
        // commit('SET_TOKEN', token)
        commit('setUserName', rd_name)
        commit('setRdMail', rd_email)
        // commit('setName', name)
        resolve(data)
      })
    },
    // 新SSO
    // keycloakLogout
    keycloakLogout({ commit, state }) {
      return new Promise((resolve, reject) => {
        console.log('2222222222222')
        console.log(Vue.prototype.$keycloak.token)
        try {
          Vue.prototype.$keycloak.logoutFn()
          console.log('111111111111')
          commit('setToken', '')
          // commit('SET_ROLES', [])
          removeToken()
          resetRouter()
  
          resolve()
        } catch (error) {
          reject(error)
        }
      })
    },
    // remove token
    resetToken({ commit }) {
      return new Promise(resolve => {
        commit('setToken', '')
        removeToken()
        resolve()
      })
    }
  },
}
