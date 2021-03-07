<template>
  <transition name="slide">
    <music-list :title="title" :bgImage="bgImage" :songs="songs"></music-list>
  </transition>
</template>

<script type='text/ecmascript-6'>
  import MusicList from 'components/music-list/music-list'
  import {mapGetters} from 'vuex'
  // 通过jsonp请求获取数据
  import {getSongList} from 'api/recommend'
  import {ERR_OK} from 'api/config'
  import {createRecommendSong} from 'common/js/song'
  import {getSongUrl} from 'api/singer'

  export default {
    computed: {
      title() {
        return this.disc.dissname
      },
      bgImage() {
        return this.disc.imgurl
      },
      // 通过vuex获取到disc
      ...mapGetters([
        'disc'
      ])
    },
    data() {
      return {
        songs: []
      }
    },
    created() {
      this._getSongList()
    },
    methods: {
      _getSongList() {
        // 如果推荐歌单没有歌曲数据，自动跳转回推荐界面
        if (!this.disc.dissid) {
          this.$router.push('/recommend')
          return
        }
        getSongList(this.disc.dissid).then((res) => {
          if (res.code === ERR_OK) {
            console.log(res.cdlist[0].songlist)
            this.songs = this._normalizeSong(res.cdlist[0].songlist)
            console.log(this.songs)
          } else {
            console.log('推荐歌单数据获取失败')
          }
        })
      },
      _normalizeSong(list) {
        let ret = []
        list.forEach((item, index) => {
          // console.log(item)
          if (item.id && item.album.id) {
            ret.push(createRecommendSong(item))
            this._getSongUrl(item.mid).then(url => {
              ret[index].url = url
            })
          }
        })
        return ret
      },
      _getSongUrl(mid) {
        return getSongUrl(mid).then(res => {
          return Promise.resolve(res.url)
        })
      }
    },
    components: {
      MusicList
    }
  }
</script>
<style scoped lang='stylus' rel='stylesheet/stylus'>
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s
  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
