import { fetchGet, fetchPost } from './request'
import qs from 'qs'

/**
 * 账户详情列表
 * @function obtainAccountPagen
 * @type 'Post'
 */
export function obtainAccountPage(params) {
  return fetchPost('/bonusItem/obtainAccountPage', params)
}

/**
 * 赠币记录
 * @function merchantUnbindPerson
 * @type 'Post'
 */
export function obtainBonusItemPage(params) {
  return fetchPost('/bonusItem/obtainBonusItemPage', params)
}

/**
 * 赠送赠币
 * @function merchantUnbindPerson
 * @type 'Post'
 */
export function presentBonus(params) {
  return fetchPost('/bonusItem/presentBonus', params)
}

/**
 * 充值金币
 * @function merchantUnbindPerson
 * @type 'Post'
 */
export function bonusItemRecharge(params) {
  return fetchPost('/bonusItem/recharge', params)
}

/**
 * 操作记录
 * @function bonusItemObtainBonusPage
 * @type 'Post'
 */
export function bonusItemObtainBonusPage(params) {
  return fetchPost('/bonusItem/obtainBonusPage', params)
}

/**
 * 退款清零
 * @function bonusItemClearBonus
 * @type 'Post'
 */
export function bonusItemClearBonus(params) {
  let paramsString = qs.stringify(params)
  return fetchPost('/bonusItem/clear/bonus', paramsString)
}
