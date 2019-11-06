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
    case 2:
      return '已下架'
      break;
    case 3:
      return '已过期'
      break;
    default: 
      return ''
      break;
  }
}

/**
 * 上下架过滤器
 * @function 
 * @param status Number 上下架状态码
 */
export function shelfFilters(status) {
  switch (status) {
    case true:
      return '已上架'
      break;
    case false:
      return '已下架'
      break;
  }
}

/**
 * 上下架过滤器
 * @function statusFilters
 * @param status Number 上下架状态码
 */
export function validFilters(valid) {
  switch (valid) {
    case true:
      return '是'
      break;
    case false:
      return '否'
      break;
  }
}

/**
 * 
 * @function goTypeFilters
 * @param goType Number 跳转类型
 */
export function goTypeFilters(goType) {
  switch (goType) {
    case 1:
      return 'H5URL'
      break;
    case 2:
      return '原生'
      break;
    case 3:
      return '无跳转'
      break;
  }
}

/**
 * 原生页面过滤器
 * @function pageUrlFilters
 * @param status Number 上下架状态码
 */
export function pageUrlFilters(status) {
  switch (status) {
    case "main/home/queryService/company":
      return '公司详情页'
      break;
    case "main/home/queryService/servicer":
      return '服务详情页'
      break;
    default: 
      return ''
      break;
  }
}

/**
 * 落地页意向收集表单类型
 * @function formTypeFilters
 * @param status Number 上下架状态码
 */
export function formTypeFilters(status) {
  switch (status) {
    case 1:
      return '海外公司注册'
      break;
    case 2:
      return '公司注册'
      break;
    case 3:
      return '印度公司注册'
      break;
    default: 
      return ''
      break;
  }
}

/**
 * 时间戳-日期格式化
 * @function timeFormatter
 * @param status Number 上下架状态码
 */
export function timeFormatter(time) {
  var year=new Date(time).getFullYear()
  var month=new Date(time).getMonth()+1
  var date=new Date(time).getDate()
  var hour=new Date(time).getHours()
  var minute=new Date(time).getMinutes()
  var second=new Date(time).getSeconds()
  return year+"-"+(month < 10 ? '0' + month : month)+"-"+(date < 10 ? '0' + date : date)+" "+(hour < 10 ? '0' + hour : hour)+":"+(minute < 10 ? '0' + minute : minute)+":"+(second < 10 ? '0' + second : second)
}