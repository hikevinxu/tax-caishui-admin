import { fetchPost, fetchGet } from './request'
import qs from 'qs'

/**
 * 获取标签列表
 * @function 
 * @type 'post'
 * @param pageNum Number
 * @param pageSize Number
 */
export function qualificateList(params) {
  return fetchGet('/api/serviceAssurance/list', params)
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
export function qualificateSave(params) {
  const paramsString = qs.stringify(params)
  return fetchPost('/api/serviceAssurance/save', paramsString)
}

/**
 * 编辑标签
 * @function 
 * @type 'post'
 * @param word String 词条名称
 */
export function qualificateDetail(params) {
  const paramsString = qs.stringify(params)
  return fetchGet('/api/serviceAssurance/detail', paramsString)
}

/**
 * 删除词条
 * @function 
 * @type 'post'
 * @param id Number 词条ID
 */
export function qualificateDelete(params) {
  const paramsString = qs.stringify(params)
  return fetchPost('/api/serviceAssurance/delete', paramsString)
}
