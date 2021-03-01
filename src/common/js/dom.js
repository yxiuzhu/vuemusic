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