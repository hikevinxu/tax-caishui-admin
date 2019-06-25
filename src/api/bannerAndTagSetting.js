import { fetchPost, fetchGet } from './request'
import qs from 'qs'

/**
 * 获取android版本列表
 * @function systemBannerList
 * @type 'post'
 * @param pageNum Number 页码
 * @param pageSize Number 一页多少条
 * @param status 0(待上架) 1(已上架) -1(已下架)
 */
export function systemBannerList(params) {
  return fetchPost('/system/banner/list', params)
}

/**
 * 获取ios版本列表
 * @function systemBannerSave
 * @type 'post'
 * @param pageNum Number 页码
 * @param pageSize Number 一页多少条
 */
export function systemBannerSave(params) {
  return fetchPost('/system/banner/save', params)
}

/**
 * 撤回新版本
 * @function systemBannerPublish
 * @type 'post'
 * @param id String 版本id
 */
export function systemBannerPublish(params) {
  const paramsString = qs.stringify(params)
  return fetchPost('/system/banner/publish', paramsString)
}

/**
 * 撤回新版本
 * @function systemBannerDown
 * @type 'post'
 * @param id String 版本id
 */
export function systemBannerDown(params) {
  const paramsString = qs.stringify(params)
  return fetchPost('/system/banner/down', paramsString)
}

/**
 * 撤回新版本
 * @function systemBannerDelete
 * @type 'post'
 * @param id String 版本id
 */
export function systemBannerDelete(params) {
  const paramsString = qs.stringify(params)
  return fetchPost('/system/banner/delete', paramsString)
}

/**
 * 获取android版本列表
 * @function systemTagList
 * @type 'post'
 * @param pageNum Number 页码
 * @param pageSize Number 一页多少条
 * @param status 0(待上架) 1(已上架) -1(已下架)
 */
export function systemTagList(params) {
  return fetchPost('/system/tag/list', params)
}

/**
 * 获取ios版本列表
 * @function systemTagSave
 * @type 'post'
 * @param pageNum Number 页码
 * @param pageSize Number 一页多少条
 */
export function systemTagSave(params) {
  return fetchPost('/system/tag/save', params)
}

/**
 * 撤回新版本
 * @function systemTagPublish
 * @type 'post'
 * @param id String 版本id
 */
export function systemTagPublish(params) {
  const paramsString = qs.stringify(params)
  return fetchPost('/system/tag/publish', paramsString)
}

/**
 * 撤回新版本
 * @function systemTagDown
 * @type 'post'
 * @param id String 版本id
 */
export function systemTagDown(params) {
  const paramsString = qs.stringify(params)
  return fetchPost('/system/tag/down', paramsString)
}

/**
 * 撤回新版本
 * @function systemTagDelete
 * @type 'post'
 * @param id String 版本id
 */
export function systemTagDelete(params) {
  const paramsString = qs.stringify(params)
  return fetchPost('/system/tag/delete', paramsString)
}

/**
 * 服务类目选择列表
 * @function businessTypeList
 * @type 'get'
 */
export function businessTypeList() {
  return fetchGet('/firm/business_type/list')
}
