// 用于解决小播放器导致滚动不到底的情况
import {mapGetters, mapMutations} from 'vuex'
import {playMode} from 'common/js/config'
import {shuffle} from 'common/js/util'

export const playlistMixin = {
  computed: {
    ...mapGetters([
      'playlist'
    ])
  },
  // 在dom，ready的时候触发
  mounted() {
    this.handlePlaylist(this.playlist)
  },
  // keep-alive的时候触发
  activated() {
    this.handlePlaylist(this.playlist)
  },
  watch: {
    playlist(newVal) {
      this.handlePlaylist(newVal)
    }
  },
  methods: {
    // 要求有mixin的组件需要重新定义这个函数，否则就引用mixin的这个函数直接报错
    handlePlaylist() {
      throw new Error('component must implement handlePlaylist method')
    }
  }
}

// player和playlist组件的mixin
export const playerMixin = {
  computed: {
    iconMode() {
      return this.mode === playMode.sequence ? 'icon-sequence' : this.mode === playMode.loop ? 'icon-loop' : this.mode === playMode.random ? 'icon-random' : ''
    },
    ...mapGetters([
      'sequenceList',
      'currentSong',
      'playlist',
      'mode'
    ])
  },
  methods: {
    // 改变歌曲播放模式
    changeMode() {
      let mode = (this.mode + 1) % 3
      this.setPlayMode(mode)
      // 修改播放列表
      let list = null
      if (mode === playMode.random) {
        list = shuffle(this.sequenceList)
      } else {
        list = this.sequenceList
      }
      // console.log(list)
      this.resetCurrentIndex(list)
      this.setPlayList(list)
    },
    // 保证切换歌曲的时候，当前歌曲不会被影响
    resetCurrentIndex(list) {
      let index = list.findIndex((item) => {
        return item.id === this.currentSong.id
      })
      this.setCurrentIndex(index)
    },
    ...mapMutations({
      setPlayingState: 'SET_PLAYING_STATE',
      setCurrentIndex: 'SET_CURRENT_INDEX',
      setPlayMode: 'SET_PLAY_MODE',
      setPlayList: 'SET_PLAYLIST'
    })
  }
}
