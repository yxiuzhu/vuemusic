// 工具方法
// 返回min与max之间的随机数
function getRandomInt(min, max) {
  // 返回一个包括min和max之间的整数
  return Math.floor(Math.random() * (max - min + 1) + min)
}
// 返回打乱顺序的数组
export function shuffle(arr) {
  // 防止原来的arr数组被影响
  let _arr = arr.slice()
  for (let i = 0; i < _arr.length; i++) {
    let j = getRandomInt(0, i)
    let t = _arr[i]
    _arr[i] = _arr[j]
    _arr[j] = t
  }
  return _arr
}

// 测试工具函数
// shuffle([1,2,3,4,5])

// 节流函数
export function debounce(func, delay) {
  let timer

  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}
