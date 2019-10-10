import { fetchPost, fetchGet } from './request'
import qs from 'qs'

/**
 * 获取标签列表
 * @function 
 * @type 'post'
 * @param pageNum Number
 * @param pageSize Number
 */
export function extendList(params) {
  return fetchGet('/service_type/extend/list', params)
}

/**
 * 操作记录
 * @function 
 * @type 'post'
 * @param pageNum Number
 * @param pageSize Number
 */
export function operateList(params) {
  return fetchGet('/operate/list', params)
}

/**
 * 获取配置项下拉框
 * @function 
 * @type 'post'
 * @param pageNum Number
 * @param pageSize Number
 */
export function extendRelatedSave(params) {
  return fetchPost('/service_type/extend_related/save', params)
}

/**
 * 获取配置项列表
 * @function 
 * @type 'post'
 * @param pageNum Number
 * @param pageSize Number
 */
export function extendPage(params) {
  return fetchGet('/service_type/extend/page', params)
}

/**
 * 获取表单配置列表
 * @function 
 * @type 'post'
 * @param pageNum Number
 * @param pageSize Number
 */
export function extendTypeList(params) {
  return fetchGet('/service_type/extend_related/list', params)
}

/**
 * 词条下架
 * @function 
 * @type 'post'
 * @param id Number 词条ID
 * @param up Boolean true(下架) false(下架)
 */
export function qualificateDown(params) {
  // const paramsString = qs.stringify(params)
  return fetchGet('/api/serviceAssurance/unpublish', params)
}

/**
 * 词条上架
 * @function 
 * @type 'post'
 * @param id Number 词条ID
 * @param up Boolean true(上架) false(上架)
 */
export function qualificateUp(params) {
  // const paramsString = qs.stringify(params)
  return fetchGet('/api/serviceAssurance/publish', params)
}

/**
 * 添加标签
 * @function 
 * @type 'post'
 * @param word String 词条名称
 */
export function extendSave(params) {
  // const paramsString = qs.stringify(params)
  return fetchPost('/service_type/extend/save', params)
}

/**
 * 添加标签
 * @function 
 * @type 'post'
 * @param word String 词条名称
 */
export function extendEdit(params) {
  // const paramsString = qs.stringify(params)
  return fetchPost('/service_type/extend/modify', params)
}

/**
 * 添加标签
 * @function 
 * @type 'post'
 * @param word String 词条名称
 */
export function extendAttrSave(params) {
  const paramsString = qs.stringify(params)
  return fetchPost('/service_type/extend_attr/save', paramsString)
}

/**
 * 配置项详情
 * @function 
 * @type 'post'
 * @param word String 词条名称
 */
export function extendDetail(params) {
  // const paramsString = qs.stringify(params)
  return fetchGet('/service_type/extend/detail', params)
}

/**
 * 表单配置详情
 * @function 
 * @type 'post'
 * @param word String 词条名称
 */
export function extendRelatedDetail(params) {
  // const paramsString = qs.stringify(params)
  return fetchGet('/service_type/extend_related/detail', params)
}

/**
 * 删除配置项
 * @function 
 * @type 'post'
 * @param id Number 词条ID
 */
export function extendDelete(params) {
  const paramsString = qs.stringify(params)
  return fetchPost('/service_type/extend/delete', paramsString)
}

/**
 * 删除表单配置
 * @function 
 * @type 'post'
 * @param id Number 词条ID
 */
export function extendRelatedDelete(params) {
  const paramsString = qs.stringify(params)
  return fetchPost('/service_type/extend_related/delete', paramsString)
}
