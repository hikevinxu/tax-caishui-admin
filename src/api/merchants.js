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

/**
 * 商户上架服务列表
 * @function serviceList
 * @type 'post'
 * @param pageNum Number
 * @param pageSize Number
 */
export function serviceList(params) {
  return fetchPost('/service/list', params)
}

/**
 * 商户上架服务列表
 * @function serviceShelfDown
 * @type 'post'
 * @param id Number
 * @param downShelfCause String
 */
export function serviceShelfDown(params) {
  const paramsString = qs.stringify(params)
  return fetchPost('/service/shelf/down', paramsString)
}

/**
 * 商户上架服务列表
 * @function serviceShelfUp
 * @type 'post'
 * @param id Number
 */
export function serviceShelfUp(params) {
  const paramsString = qs.stringify(params)
  return fetchPost('/service/shelf/up', paramsString)
} 

/**
 * 商户上架服务列表
 * @function serviceDetail
 * @type 'post'
 * @param id Number
 */
export function serviceDetail(params) {
  return fetchGet('/service/detail', params)
}

/**
 * 商户下架记录列表
 * @function serviceDownRecords
 * @type 'post'
 * @param id Number
 */
export function serviceDownRecords(params) {
  return fetchGet('/service/down_records', params)
}

/**
 * 商户扣费列表
 * @function merchantDeductionList
 * @type 'post'
 */
export function merchantDeductionList(params) {
  return fetchPost('/merchant/deduction/list', params)
}

/**
 * 商户服务对应的服务类目列表
 * @function merchantServiceTypeList
 * @type 'post'
 */
export function merchantServiceTypeList(params) {
  return fetchGet('/merchant/serviceType/list', params)
}

/**
 * 商户扣费配置-新增
 * @function merchantDeductionAdd
 * @type 'post'
 */
export function merchantDeductionAdd(params) {
  return fetchPost('/merchant/deduction/add', params)
}

/**
 * 商户扣费配置-详情
 * @function merchantDeductionDetail
 * @type 'post'
 */
export function merchantDeductionDetail(params) {
  return fetchGet('/merchant/deduction/detail', params)
}

/**
 * 商户扣费配置-删除
 * @function merchantDeductionDelete
 * @type 'get'
 */
export function merchantDeductionDelete(params) {
  return fetchGet('/merchant/deduction/delete', params)
}

/**
 * 商户扣费配置-修改
 * @function merchantDeductionUpdate
 * @type 'post'
 */
export function merchantDeductionUpdate(params) {
  return fetchPost('/merchant/deduction/update', params)
}

/**
 * 服务下服务区域树结构
 * @function serviceDistrictTree
 * @type 'get'
 */
export function serviceDistrictTree(params) {
  return fetchGet('/service/districtTree', params)
}

/**
 * 绑定负责人
 * @function merchantBindPerson
 * @type 'Post'
 */
export function merchantBindPerson(params) {
  return fetchPost('/merchant/bind/person', params)
}

/**
 * 解绑负责人
 * @function merchantUnbindPerson
 * @type 'Post'
 */
export function merchantUnbindPerson(params) {
  let paramsString = qs.stringify(params)
  return fetchPost('/merchant/unbind/person', paramsString)
}
