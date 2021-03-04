// 工具方法
// 返回min与max之间的随机数
function getRandomInt(min, max) {
  // 返回一个包括min和max之间的整数
  return Math.floor(Math.random() * (max - min + 1) + min)
}

// 返回打乱顺序的数组
function shuffle(arr) {
  for (let i = 0; i < arr.length; i++) {
    let j = getRandomInt(0, i)
    let t = arr[i]
    arr[i] = arr[j]
    arr[j] = t
  }
  console.log(arr)
}

shuffle([0,1,2,3,4])
