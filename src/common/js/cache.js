// 操作storage相关的逻辑
// 使用这个库进行storage存取
import storage from 'good-storage'

const SEARCH_KEY = '__search__'
const SEARCH_MAX_LENGTH = 15

const PLAY_KEY = '__play__'
const PLAY_MAX_LENGTH = 200

// 插入历史记录数组的方法：超过15条以后就删除最早的记录
function insertArray(arr, val, compare, maxlen) {
  const index = arr.findIndex(compare)
  // 历史中的这条记录是第一条
  if (index === 0) {
    return
  }
  // 历史中有这条记录，则删除这条记录
  if (index > 0) {
    arr.splice(index, 1)
  }
  // 在数组头增加此记录
  arr.unshift(val)
  // 删除大于maxlen的记录
  if (maxlen && arr.length > maxlen) {
    arr.pop()
  }
}

// 删除搜索历史
function deleteFromArray(arr, compare) {
  const index = arr.findIndex(compare)
  if (index > -1) {
    arr.splice(index, 1)
  }
}

// 将数据插入历史记录
export function saveSearch(query) {
  let searches = storage.get(SEARCH_KEY, [])
  insertArray(searches, query, (item) => {
    return item === query
  }, SEARCH_MAX_LENGTH)
  storage.set(SEARCH_KEY, searches)
  return searches
}

// 从本地缓存中读取search列表
export function loadSearch() {
  return storage.get(SEARCH_KEY, [])
}

// 删除历史搜索记录
export function deleteSearch(query) {
  let searches = storage.get(SEARCH_KEY, [])
  deleteFromArray(searches, (item) => {
    return item === query
  })
  // 保存删除后的数组
  storage.set(SEARCH_KEY, searches)
  return searches
}

// 删除所有历史搜索数据
export function clearSearch() {
  storage.remove(SEARCH_KEY)
  return []
}

// 保存播放歌曲
export function savePlay(song) {
  let songs = storage.get(PLAY_KEY, [])
  insertArray(songs, song, (item) => {
    return item.id === song.id
  }, PLAY_MAX_LENGTH)
  storage.set(PLAY_KEY, songs)
  return songs
}

// 播放历史列表的初始值为空
export function loadPlay() {
  return storage.get(PLAY_KEY, [])
}
