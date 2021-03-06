import { fetchGet, fetchPost } from './request'
import qs from 'qs'

/**
 * 操作员分页查询 
 * @function opUserIndex
 * @type 'Post'
 */
export function opUserIndex(params) {
  return fetchPost('/adminUser/index', params)
}

/**
 * 操作员保存 
 * @function opUserSave
 * @type 'Post'
 */
export function opUserSave(params) {
  return fetchPost('/adminUser/save', params)
}

/**
 * 操作员状态管理 
 * @function opUserStatus
 * @type 'Post'
 */
export function opUserStatus(params) {
  return fetchPost('/adminUser/status', params)
}

/**
 * 获取ldap所有用户信息
 * @function opUserAllLdapUsers
 * @type 'get'
 */
export function opUserAllLdapUsers(params) {
  return fetchGet('/adminUser/allLdapUsers', params)
}

/**
 * 操作员保存 
 * @function roleSaveUserRoles
 * @type 'Post'
 */
export function roleSaveUserRoles(params) {
  return fetchPost('/role/saveUserRoles', params)
}

/**
 * 角色列表
 * @function roleAllRoles
 * @type 'get'
 */
export function roleAllRoles(params) {
  return fetchGet('/role/allRoles', params)
}

/**
 * 角色信息保存 
 * @function roleSave
 * @type 'Post'
 */
export function roleSave(params) {
  return fetchPost('/role/save', params)
}

/**
 * 角色启/停用
 * @function roleUpdateStatus
 * @type 'Post'
 */
export function roleUpdateStatus(params) {
  return fetchPost('/role/updateStatus', params)
}

/**
 * 用户角色获取
 * @function roleObtainRoles
 * @type 'GET'
 */
export function roleObtainRoles(params) {
  return fetchGet('/role/obtainRoles', params)
}

/**
 * 权限分页列表
 * @function permissionAllPermissions
 * @type 'get'
 */
export function permissionAllPermissions(params) {
  return fetchGet('/permission/allPermissions', params)
}

/**
 * 角色权限更获取
 * @function permissionObtainPermissions
 * @type 'get'
 */
export function permissionObtainPermissions(params) {
  return fetchGet('/permission/obtainPermissions', params)
}

/**
 * 角色权限更新
 * @function permissionSaveRolePermissions
 * @type 'post'
 */
export function permissionSaveRolePermissions(params) {
  return fetchPost('/permission/saveRolePermissions', params)
}

/**
 * 查询所有有效的用户列表
 * @function adminUserUserList
 * @type 'get'
 */
export function merchantUserList(params) {
  return fetchGet('/merchant/userList', params)
}