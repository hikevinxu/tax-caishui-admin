import { fetchGet, fetchPost } from './request'

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
