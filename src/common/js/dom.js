// 一些操作dom对象的方法
// 增加class的方法
export function addClass(el, className) {
  if (hasClass(el, className)) {
    return
  }
  let newClass = el.className.split(' ')
  newClass.push(className)
  el.className = newClass.join(' ')
}

// 判断是否有这个class
export function hasClass(el, className) {
  // 正则：以这个className开头或者是空格开头，跟着空格或者结尾
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reg.test(el.className)
}

// val代表有值的时候就set
// 没值的时候就get
export function getData(el, name, val) {
  const prefix = 'data-'
  name = prefix + name
  if (val) {
    return el.setAttribute(name, val)
  } else {
    return el.getAttribute(name)
  }
}

// 为js增加适用性
// 浏览器的能力检测
let elementStyle = document.createElement('div').style
// 获取供应商
let vendor = (() => {
  let transformNames = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    // ie
    ms: 'msTransform',
    standard: 'transform'
  }

  for (let key in transformNames) {
    if (elementStyle[transformNames[key]] !== undefined) {
      return key
    }
  }
})()

export function prefixStyle(style) {
  if (vendor === false) {
    return false
  }

  if (vendor === 'standard') {
    return style
  }
  // 拼接出字符串
  return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}