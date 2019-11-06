import { fetchGet } from './request'

/**
 * 全量索引同步
 * @function indexSyncFullSync
 * @type 'get'
 */
export function indexSyncFullSync(params) {
  return fetchGet('/index_sync/fullSync', params)
}

/**
 * 全量索引同步结果
 * @function indexSyncFullSyncResult
 * @type 'get'
 */
export function indexSyncFullSyncResult(params) {
  return fetchGet('/index_sync/fullSyncResult', params)
}
