import { fetchPost } from './request'
import qs from 'qs'

/**
 * 获取分词库列表
 * @function taxWordList
 * @type 'post'
 * @param pageNum Number 页码
 * @param pageSize Number 一页多少条
 * @param status String 标签状态
 * @param title String 标签名称
 */
export function taxWordList(params) {
  return fetchPost('/tax_word/list', params)
}

/**
 * 新增分词
 * @function taxWordSave
 * @type 'post'
 * @param word Number 分词
 */
export function taxWordSave(params) {
  return fetchPost('/tax_word/save', params)
}

/**
 * 分词上下架
 * @function taxWordUp
 * @type 'post'
 * @param id Number 分词id
 * @param up boolean true(上架) false(下架)
 */
export function taxWordUp(params) {
  const paramsString = qs.stringify(params)
  return fetchPost('/tax_word/upOrDown', paramsString)
}
