import {playMode} from 'common/js/config'

const state = {
  singer: {},
  // 播放器内核数据
  playing: false,
  // 全屏播放
  fullScreen: false,
  // 播放列表
  playlist: [],
  // 顺序播放列表
  sequenceList: [],
  // 播放模式:默认顺序播放
  mode: playMode.sequence,
  // 当前播放的索引
  currentIndex: -1,
  // 播放歌单对象
  disc: {},
  // 排行榜歌单详情数据
  topList: {}
}

export default state
