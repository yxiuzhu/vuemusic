Function.prototype.myCall = function (context) {
  if (typeof this !== 'function') {
    throw new TypeError('Error')
  }
  // 不传context的话，默认上下文为window
  context = context || window
  // 设置fn为调用 myCall 的方法
  context.fn = this
  // 获取剩余参数
  const args = [...arguments].slice(1)
  // 调用这个方法，将剩余参数传递进去
  const result = context.fn(...args)
  // 删除这个变量
  delete context.fn
  // 返回 result 结果
  return result
}

this.a = 1;

function foo() {
  console.log(this.a)
}
var obj = {
  a: 2
}

foo.myCall(obj)  //2
