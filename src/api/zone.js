import axios from '@/libs/api.request'
export function getZone(username,query) {
    return axios.request({
      url: '/api/zone/show',
      dataType: "json",
      method: 'get',
      params: query,
      headers: {
        'token': 'f82f149d292a5534d69ec8034a03055a',
        'user': username
      }
    })
  }