import axios from '@/libs/api.request'
import qs from 'qs'

  export function getSub(username,query) {
    return axios.request({
      url: '/api/sub/show',
      dataType: "json",
      method: 'get',
      params: query,
      headers: {
        'token': 'f82f149d292a5534d69ec8034a03055a',
        'user': username
      }
    })
  }
  export function getSubLogs(username,query) {
    return axios.request({
      url: '/api/sub/logs',
      dataType: "json",
      method: 'get',
      params: query,
      headers: {
        'token': 'f82f149d292a5534d69ec8034a03055a',
        'user': username
      }
    })
  }
  export function createSub(username,data) {
    return axios.request({
      url: '/api/sub/add',
      method: 'post',
      dataType: "json",
      data: qs.stringify(data),
      headers: {
        // 'Content-Type': "application/x-www-form-urlencoded",
        'token': 'f82f149d292a5534d69ec8034a03055a',
        'user': username
      }
    })
  } 
  export function copySub(username,data) {
    return axios.request({
      url: '/api/sub/copy',
      method: 'post',
      dataType: "json",
      data: qs.stringify(data),
      headers: {
        'token': 'f82f149d292a5534d69ec8034a03055a',
        'user': username
      }
    })
  } 
  export function updateSub(username,data) {
    return axios.request({
      url: '/api/sub/edit',
      method: 'post',
      dataType: "json",
      data: qs.stringify(data),
      headers: {
        'token': 'f82f149d292a5534d69ec8034a03055a',
        'user': username
      }
    })
  }
  export function deleteSub(username,data) {
    return axios.request({
      url: '/api/sub/delete',
      method: 'post',
      dataType: "json",
      data: qs.stringify(data),
      headers: {
        'token': 'f82f149d292a5534d69ec8034a03055a',
        'user': username
      }
    })
  } 