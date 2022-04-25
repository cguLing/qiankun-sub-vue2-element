
import axios from '@/libs/api.request'

export function getDnsSupportType(username) {
  return axios.request({
    url: '/api/dns/type',
    dataType: "json",
    method: 'get',
    headers: {
      'token': 'f82f149d292a5534d69ec8034a03055a',
      'user': username
    }
  })
}
export function getDnsKVPhrase(username) {
  return axios.request({
    url: '/api/dns/kv',
    dataType: "json",
    method: 'get',
    headers: {
      'token': 'f82f149d292a5534d69ec8034a03055a',
      'user': username
    }
  })
}
export function getDnsSupportView(username) {
  return axios.request({
    url: '/api/dns/view',
    dataType: "json",
    method: 'get',
    headers: {
      'token': 'f82f149d292a5534d69ec8034a03055a',
      'user': username
    }
  })
}