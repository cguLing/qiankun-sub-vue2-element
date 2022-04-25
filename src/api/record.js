import axios from '@/libs/api.request'
import qs from 'qs'

  export function getRecord(username,query) {
    return axios.request({
      url: '/api/record/show',
      dataType: "json",
      method: 'get',
      params: query,
      headers: {
        'token': 'f82f149d292a5534d69ec8034a03055a',
        'user': username
      }
    })
  }
  export function searchRecord(username,query) {
    return axios.request({
      url: '/api/record/search',
      dataType: "json",
      method: 'get',
      params: query,
      headers: {
        'token': 'f82f149d292a5534d69ec8034a03055a',
        'user': username
      }
    })
  }
  export function getRecordLogs(username,query) {
    return axios.request({
      url: '/api/record/logs',
      dataType: "json",
      method: 'get',
      params: query,
      headers: {
        'token': 'f82f149d292a5534d69ec8034a03055a',
        'user': username
      }
    })
  }
  export function createRecord(username,data) {
    return axios.request({
      url: '/api/record/add',
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
  export function updateRecord(username,data) {
    return axios.request({
      url: '/api/record/edit',
      method: 'post',
      dataType: "json",
      data: qs.stringify(data),
      headers: {
        'token': 'f82f149d292a5534d69ec8034a03055a',
        'user': username
      }
    })
  }
  export function deleteRecord(username,data) {
    return axios.request({
      url: '/api/record/delete',
      method: 'post',
      dataType: "json",
      data: qs.stringify(data),
      headers: {
        'token': 'f82f149d292a5534d69ec8034a03055a',
        'user': username
      }
    })
  } 