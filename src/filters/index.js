/**
 * 跳转类型过滤器
 * @function jumpTypeFilters
 * @param jumpType Number 跳转类型
 */
export function jumpTypeFilters(jumpType) {
  switch (jumpType) {
    case 1:
      return '原生普通页面'
      break;
    case 2:
      return 'h5链接'
      break;
    case 3:
      return '服务搜索页'
      break;
    case 4:
      return '公司详情页'
      break;
    default: 
      return ''
      break;
  }
}

/**
 * 上下架过滤器
 * @function statusFilters
 * @param status Number 上下架状态码
 */
export function statusFilters(status) {
  switch (status) {
    case 0:
      return '待上架'
      break;
    case 1:
      return '已上架'
      break;
    case -1:
      return '已下架'
      break;
    default: 
      return ''
      break;
  }
}
