import { fetchPost, fetchGet } from './request'
import qs from 'qs'

/**
 * 获取商户入驻列表
 * @function serviceTagList
 * @type 'post'
 * @param pageNum Number
 * @param pageSize Number
 */
export function merchantApplyList(params) {
  return fetchPost('/merchant/apply/list', params)
}

/**
 * 审核
 * @function serviceTagList
 * @type 'post'
 * @param pageNum Number
 * @param pageSize Number
 */
export function merchantApplyAudit(params) {
  return fetchPost('/merchant/apply/audit', params)
}

/**
 * 详情
 * @function serviceTagList
 * @type 'post'
 * @param pageNum Number
 * @param pageSize Number
 */
export function merchantApplyDetail(params) {
  return fetchGet('/merchant/apply/detail', params)
}

/**
 * 机构类型
 * @function serviceTagList
 * @type 'post'
 * @param pageNum Number
 * @param pageSize Number
 */
export function merchantApplyTypes(params) {
  return fetchGet('/merchant/apply/company_types', params)
}

/**
 * 获取商户列表
 * @function serviceTagList
 * @type 'post'
 * @param pageNum Number
 * @param pageSize Number
 */
export function merchantList(params) {
  return fetchPost('/merchant/list', params)
}

/**
 * 上架
 * @function serviceTagList
 * @type 'post'
 * @param pageNum Number
 * @param pageSize Number
 */
export function merchantUp(params) {
  const paramsString = qs.stringify(params)
  return fetchPost('/merchant/shelf/up', paramsString)
}

/**
 * 下架
 * @function serviceTagList
 * @type 'post'
 * @param pageNum Number
 * @param pageSize Number
 */
export function merchantDown(params) {
  const paramsString = qs.stringify(params)
  return fetchPost('/merchant/shelf/down', paramsString)
}

/**
 * 商户详情
 * @function serviceTagList
 * @type 'post'
 * @param pageNum Number
 * @param pageSize Number
 */
export function merchantDetail(params) {
  return fetchGet('/merchant/detail', params)
}