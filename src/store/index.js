import Vue from 'vue'
import Vuex from 'vuex'

import * as actions from './actions'
import * as getters from './getters'
import state from './state'
import mutations from './mutations'
// 插件用来打印修改state的日志信息
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

// 是一个单例模式
export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations,
  // 用来提示是否是通过mutations修改的state数据
  strict: debug,
  // 插件
  plugins: debug ? [createLogger()] : []
})