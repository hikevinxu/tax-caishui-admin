import { fetchPost, fetchGet } from './request'
import qs from 'qs'

/**
 * App商户广告位配置 - 广告位管理列表
 * @function advertPositionList
 * @type 'GET'
 */
export function advertPositionList(params) {
  return fetchGet('/advert/position/list', params)
}

/**
 * App商户广告位配置 - 启用广告位
 * @function advertPositionEnable
 * @type 'GET'
 */
export function advertPositionEnable(params) {
  return fetchGet('/advert/position/enable', params)
}

/**
 * App商户广告位配置 - 禁用广告位
 * @function advertPositionDisable
 * @type 'GET'
 */
export function advertPositionDisable(params) {
  return fetchGet('/advert/position/disable', params)
}

/**
 * 商业广告管理 - 广告位下的管理列表
 * @function advertPositionInfoList
 * @type 'get'
 * @param pageNum 当前页码
 * @param pageSize 	每页条数
 * @param positionNo 广告位置类型
 * @param status 状态
 */
export function advertPositionInfoList(params) {
  return fetchGet('/advert/position/info/list', params)
}

/**
 * 商业广告管理 - 广告主体上架
 * @function advertPublish
 * @type 'post'
 * @param adId String 广告id
 */
export function advertPublish(params) {
  return fetchGet('/advert/publish', params)
}

/**
 * 商业广告管理 - 广告主体下架
 * @function advertUnpublish
 * @type 'post'
 * @param adId String 广告id
 */
export function advertUnpublish(params) {
  return fetchGet('/advert/unpublish', params)
}

/**
 * 商业广告管理 - 广告主体删除
 * @function advertDelete
 * @type 'post'
 * @param adId String 广告id
 */
export function advertDelete(params) {
  return fetchGet('/advert/delete', params)
}

/**
 * 商业广告管理 - 保存广告信息
 * @function advertDelete
 * @type 'post'
 * @param adId String 广告id
 */
export function advertInfoSave(params) {
  return fetchGet('/advert/info/save', params)
}

/**
 * 商业广告投放列表 - 查询广告下完整的投放记录-复杂查询条件
 * @function advertPositionFullinfoList
 * @type 'post'
 * @param adId String 广告id
 */
export function advertPositionFullinfoList(params) {
  return fetchGet('/advert/position/fullinfo/list', params)
}