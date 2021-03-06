/**
 * Created by jiachenpan on 16/11/18.
 */

export function isvalidUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

/* 合法uri*/
export function validateURL(textval) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return urlregex.test(textval)
}

/* 小写字母*/
export function validateLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/* 大写字母*/
export function validateUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/* 大小写字母*/
export function validateAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/**
 * validate email
 * @param email
 * @returns {boolean}
 */
export function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}

/* 正整数 */
export function isInteger (rule, value, callback) {
  if(!value) {
    return callback(new Error('请输入0<x<=100000内的正整数'))
  }
  setTimeout(() => {
    if(!Number(value)) {
      callback(new Error('请输入0<x<=100000内的正整数'))
    } else {
      const re = /^[0-9]*[1-9][0-9]*$/
      const reCheck = re.test(value)
      if(!reCheck) {
        callback(new Error('请输入0<x<=100000内的正整数'))
      }else {
        if (Number(value) > 100000) {
          callback(new Error('请输入0<x<=100000内的正整数'))
        } else {
          callback()
        }
      }
    }
  }, 100)
}

/* 询价单定价 */
export function isPrice (rule, value, callback) {
  if(!value) {
    return callback(new Error('请输入0<x<=3000内的正整数'))
  }
  setTimeout(() => {
    if(!Number(value)) {
      callback(new Error('请输入0<x<=3000内的正整数'))
    } else {
      const re = /^[0-9]*[1-9][0-9]*$/
      const reCheck = re.test(value)
      if(!reCheck) {
        callback(new Error('请输入0<x<=3000内的正整数'))
      }else {
        if (Number(value) > 3000) {
          callback(new Error('请输入0<x<=3000内的正整数'))
        } else {
          callback()
        }
      }
    }
  }, 100)
}

/* 城市费率 */
export function isCityRate (rule, value, callback) {
  if(!value) {
    return callback(new Error('请输入0<x<=1000内的正整数'))
  }
  setTimeout(() => {
    if(!Number(value)) {
      callback(new Error('请输入0<x<=1000内的正整数'))
    } else {
      const re = /^[0-9]*[1-9][0-9]*$/
      const reCheck = re.test(value)
      if(!reCheck) {
        callback(new Error('请输入0<x<=1000内的正整数'))
      }else {
        if (Number(value) > 1000) {
          callback(new Error('请输入0<x<=1000内的正整数'))
        } else {
          callback()
        }
      }
    }
  }, 100)
}
