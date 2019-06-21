import { fetchGet } from './request'

export function getToken() {
  return fetchGet('/qiniu/upload/token')
}