import HttpRequest from '@/libs/axios'
import config from '@/config'
// const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro
const baseUrl = window.__POWERED_BY_QIANKUN__?(process.env.NODE_ENV === 'production' ?config.baseURL.pro:config.baseURL.dev):null
// const baseUrl = null

const axios = new HttpRequest(baseUrl)
export default axios
