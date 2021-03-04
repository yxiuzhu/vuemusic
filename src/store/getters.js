// 通过getters取数据到组件中
// 可以充当计算属性被引入到组件中

import state from "./state"

// 将数据放在getters，可以使用mapGetters（vuex语法糖）来获取
export const singer = state => state.singer

export const playing = state => state.playing

export const fullScreen = state => state.fullScreen

export const playlist = state => state.playlist

export const sequenceList = state => state.sequenceList

export const mode = state => state.mode

export const currentIndex = state => state.currentIndex
// 当做计算属性
export const currentSong = (state) => {
  return state.playlist[state.currentIndex] || {}
}
