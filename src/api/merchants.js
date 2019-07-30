import { fetchPost, fetchGet } from './request'
import qs from 'qs'

/**
 * 获取标签列表
 * @function serviceTagList
 * @type 'post'
 * @param pageNum Number
 * @param pageSize Number
 */
export function merchantList(params) {
  return fetchPost('/merchant/apply/list', params)
}

/**
 * 审核
 * @function serviceTagList
 * @type 'post'
 * @param pageNum Number
 * @param pageSize Number
 */
export function merchantAudit(params) {
  return fetchPost('/merchant/apply/audit', params)
}

/**
 * 详情
 * @function serviceTagList
 * @type 'post'
 * @param pageNum Number
 * @param pageSize Number
 */
export function merchantDetail(params) {
  return fetchGet('/merchant/apply/detail', params)
}

/**
 * 机构类型
 * @function serviceTagList
 * @type 'post'
 * @param pageNum Number
 * @param pageSize Number
 */
export function merchantTypes(params) {
  return fetchGet('/merchant/apply/company_types', params)
}