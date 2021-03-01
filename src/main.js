// 必须写在开头
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
// 解决的移动端点击300ms的延迟
import fastclick from 'fastclick'
// 图片懒加载
import VueLazyLoad from 'vue-lazyload'

import 'common/stylus/index.styl'

fastclick.attach(document.body)

Vue.use(VueLazyLoad, {
  loading: require('common/image/default.png')
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
