// actions异步修改操作/处理对一系列的mutation做封装
import * as types from './mutation-types'
import {playMode} from 'common/js/config'
import {shuffle} from 'common/js/util'
import {saveSearch, deleteSearch, clearSearch} from 'common/js/cache'

// 查找歌曲在list中的索引
function findIndex(list, song) {
  return list.findIndex((item) => {
    return item.id === song.id
  })
}

// 选择播放
// function({state对象},{payload对象})
export const selectPlay = function ({commit, state}, {list, index}) {
  commit(types.SET_SEQUENCE_LIST, list)
  if (state.mode === playMode.random) {
    // 播放列表改成随机播放列表
    let randomList = shuffle(list)
    commit(types.SET_PLAYLIST, randomList)
    // 修改播放的歌曲index
    index = findIndex(randomList, list[index])
  } else {
    commit(types.SET_PLAYLIST, list)
  }
  commit(types.SET_CURRENT_INDEX, index)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}

// 随机播放
export const randomPlay = function ({commit}, {list}) {
  commit(types.SET_PLAY_MODE, playMode.random)
  commit(types.SET_SEQUENCE_LIST, list)
  let randomList = shuffle(list)
  commit(types.SET_PLAYLIST, randomList)
  commit(types.SET_CURRENT_INDEX, 0)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}

// 搜索列表，点击歌曲，在列表中插入歌曲
export const insertSong = function ({commit, state}, song) {
  let playlist = state.playlist.slice()
  let sequenceList = state.sequenceList.slice()
  let currentIndex = state.currentIndex
  // 记录当前歌曲
  let currentSong = playlist[currentIndex]
  // 查找当前列表中是否有待插入的歌曲，并返回其索引
  let fpIndex = findIndex(playlist, song)
  // 因为是插入歌曲，所以索引+1
  currentIndex++
  // 插入这首歌到当前索引位置
  playlist.splice(currentIndex, 0, song)
  // 如果已经包含这首歌
  if (fpIndex > -1) {
    // 如果当前插入的序号大于列表中的序号
    if (currentIndex > fpIndex) {
      playlist.splice(fpIndex, 1)
    } else {
      playlist.splice(fpIndex + 1, 1)
    }
  }

  // 获取当前歌曲需要插入sequenceList的位置
  let currentSIndex = findIndex(sequenceList, currentSong) + 1
  // 在sequenceList插入歌曲之前，是否包含需要插入的歌曲
  let fsIndex = findIndex(sequenceList, song)
  // 在sequenceList插入歌曲数据
  sequenceList.splice(currentSIndex, 0, song)
  if (fsIndex > -1) {
    if (currentSIndex > fsIndex) {
      // 歌曲插入在已存在的歌曲之后
      sequenceList.splice(fsIndex, 1)
    } else {
      sequenceList.splice(fsIndex + 1, 1)
    }
  }

  commit(types.SET_PLAYLIST, playlist)
  commit(types.SET_SEQUENCE_LIST, sequenceList)
  commit(types.SET_CURRENT_INDEX, currentIndex)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}

// 将搜索结果缓存到localstorage的方法
export const saveSearchHistory = function ({commit}, query) {
  commit(types.SET_SEARCH_HISTORY, saveSearch(query))
}

// 删除搜索历史
export const deleteSearchHistory = function ({commit}, query) {
  // 通过mutations来修改state
  commit(types.SET_SEARCH_HISTORY, deleteSearch(query))
}

// 删除搜索搜索历史
export const clearSearchHistory = function ({commit}) {
  commit(types.SET_SEARCH_HISTORY, clearSearch())
}
