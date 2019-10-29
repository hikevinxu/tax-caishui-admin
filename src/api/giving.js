import { fetchGet, fetchPost } from './request'

//账户详情列表
export function obtainAccountPagen(params) {
  return fetchPost('/bonusItem/obtainAccountPage', params)
}

export function obtainBonusItemPage(params) {
  return fetchPost('/bonusItem/obtainBonusItemPage', params)
}

export function presentBonus(params) {
  return fetchPost('/bonusItem/presentBonus', params)
}