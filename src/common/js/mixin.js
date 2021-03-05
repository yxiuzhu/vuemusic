// 用于解决小播放器导致滚动不到底的情况
import {mapGetters} from 'vuex'

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
