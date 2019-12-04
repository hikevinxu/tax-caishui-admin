import { fetchGet, fetchPost } from './request'
import qs from 'qs'

/**
 * 询价单类目定价-列表
 * @function intentionPriceServiceList
 * @type 'post'
 * @param pageNum Number
 * @param pageSize Number
 */
export function intentionPriceServiceList(params) {
  return fetchPost('/intention_price/service/list', params)
}

/**
 * 询价单类目定价-添加
 * @function intentionPriceServiceSave
 * @type 'post'
 */
export function intentionPriceServiceSave(params) {
  return fetchPost('/intention_price/service/save', params)
}

/**
 * 询价单类目定价-编辑
 * @function intentionPriceServiceEdit
 * @type 'post'
 */
export function intentionPriceServiceEdit(params) {
  return fetchPost('/intention_price/service/edit', params)
}

/**
 * 询价单类目定价-筛选有效类目
 * @function intentionPriceServiceCheck
 * @type 'get'
 */
export function intentionPriceServiceCheck(params) {
  return fetchGet('/intention_price/service/check', params)
}

/**
 * 询价单类目定价-删除
 * @function intentionPriceServiceDelete
 * @type 'post'
 */
export function intentionPriceServiceDelete(params) {
  let paramsString = qs.stringify(params)
  return fetchPost('/intention_price/service/delete', paramsString)
}

/**
 * 类目配置项定价-列表
 * @function intentionPriceExtendList
 * @type 'post'
 * @param pageNum Number
 * @param pageSize Number
 */
export function intentionPriceExtendList(params) {
  return fetchPost('/intention_price/extend/list', params)
}

/**
 * 类目配置项定价-根据类目查询配置项
 * @function intentionPriceExtendCheck
 * @type 'get'
 */
export function intentionPriceExtendCheck(params) {
  return fetchGet('/intention_price/extend/check', params)
}

/**
 * 类目配置项定价-配置项筛选有效值
 * @function intentionPriceExtendValueCheck
 * @type 'get'
 */
export function intentionPriceExtendValueCheck(params) {
  return fetchGet('/intention_price/extend_value/check', params)
}

/**
 * 类目配置项定价-添加
 * @function intentionPriceExtendSave
 * @type 'post'
 */
export function intentionPriceExtendSave(params) {
  return fetchPost('/intention_price/extend/save', params)
}

/**
 * 类目配置项定价-编辑
 * @function intentionPriceExtendEdit
 * @type 'post'
 */
export function intentionPriceExtendEdit(params) {
  return fetchPost('/intention_price/extend/edit', params)
}

/**
 * 类目配置项定价-删除
 * @function intentionPriceExtendDelete
 * @type 'post'
 */
export function intentionPriceExtendDelete(params) {
  let paramsString = qs.stringify(params)
  return fetchPost('/intention_price/extend/delete', paramsString)
}

/**
 * 城市费率定价-列表
 * @function intentionPriceCityList
 * @type 'post'
 */
export function intentionPriceCityList(params) {
  return fetchPost('/intention_price/city/list', params)
}

/**
 * 城市费率定价-添加
 * @function intentionPriceCitySave
 * @type 'post'
 */
export function intentionPriceCitySave(params) {
  return fetchPost('/intention_price/city/save', params)
}

/**
 * 城市费率定价-筛选有效城市
 * @function intentionPriceCityCheck
 * @type 'get'
 */
export function intentionPriceCityCheck(params) {
  return fetchGet('/intention_price/city/check', params)
}

/**
 * 城市费率定价-编辑
 * @function intentionPriceCityEdit
 * @type 'post'
 */
export function intentionPriceCityEdit(params) {
  return fetchPost('/intention_price/city/edit', params)
}

/**
 * 城市费率定价-删除
 * @function intentionPriceCityDelete
 * @type 'post'
 */
export function intentionPriceCityDelete(params) {
  let paramsString = qs.stringify(params)
  return fetchPost('/intention_price/city/delete', paramsString)
}
