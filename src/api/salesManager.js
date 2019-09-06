import { fetchGet, fetchPost } from './request'
import qs from 'qs'

export function salesInviteAdd(params) {
  let paramsString = qs.stringify(params)
  return fetchPost('/sales_invite/add', paramsString)
}

export function salesInviteDelete(params) {
  let paramsString = qs.stringify(params)
  return fetchPost('/sales_invite/delete', paramsString)
}

export function salesInviteList(params) {
  return fetchGet('/sales_invite/list', params)
}