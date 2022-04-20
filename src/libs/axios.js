import axios from 'axios'
import store from '@/store'
import { getToken } from '@/libs/auth'
import { MessageBox, Message } from 'element-ui'

class HttpRequest {
  constructor (baseUrl = baseURL) {
    this.baseUrl = baseUrl
    this.queue = {}
  }
  getInsideConfig () {
    const config = {
      baseURL: this.baseUrl,
      headers: {
        //
      }
    }
    return config
  }
  interceptors (instance, url) {
    // 请求拦截
    instance.interceptors.request.use(
      config => {
        if (getToken()) { //新SSO
          config.headers['Authorization'] = `Bearer ${getToken()}` //新SSO
          
          // 添加全局的loading...
          if (!Object.keys(this.queue).length) {
            // Spin.show() // 不建议开启，因为界面不友好
          }
          this.queue[url] = true

        } else {
          Message.error('登陆方式已变化，请重新登陆')
          store.dispatch('keycloakLogout')
        }
      return config
      },
      error => {
        return Promise.reject(error)
    })
    // 响应拦截
    instance.interceptors.response.use(
      response => {
        if(!response.data.code){
          return response
        }
        const code = response.data.code
        if(code === 0){
          return response
        } else if (code === 401) {
          store.dispatch('resetToken')
          if (location.href.indexOf('home') !== -1) {
            location.reload() // 为了重新实例化vue-router对象 避免bug
          } else {
            MessageBox.confirm(
              '登录状态已过期，您可以继续留在该页面，或者重新登录',
              '系统提示',
              {
                confirmButtonText: '重新登录',
                cancelButtonText: '取消',
                type: 'warning'
              }
            ).then(() => {
              location.reload() // 为了重新实例化vue-router对象 避免bug
            })
          }
        } else if (code === 6401) {
          store.dispatch('resetToken')
          MessageBox.confirm(
            '登录状态已过期，您可以继续留在该页面，或者重新登录',
            '系统提示',
            {
              confirmButtonText: '重新登录',
              cancelButtonText: '取消',
              type: 'warning'
            }
          ).then(() => {
            location.reload() // 为了重新实例化vue-router对象 避免bug
          })
          return false
        } else if (code === 400 || code === 403 || code !== 200) {
          Message({
            message: response.data.msg,
            type: 'error',
            duration: 3*1000
          })
          return Promise.reject(response.data.msg)
        } else {
          return response
        }
      },
      error => {
        if (error.response&&error.response.status === 401) {
          Message.error('登陆状态已变化，请重新登陆')
          store.dispatch('keycloakLogout')
          return
        }
        if (error.message&&error.message === 'Network Error') {
          Message({
            message: '服务器连接异常，请检查服务器！',
            type: 'error',
            duration: 3*1000
          })
          return
        }
        Message({
          message: error.message,
          type: 'error',
          duration: 3*1000
        })
        return Promise.reject(error)
    })
  }
  request (options) {
    const instance = axios.create()
    options = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance, options.url)
    return instance(options)
  }
}
export default HttpRequest