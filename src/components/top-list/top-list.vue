<template>
  <transition name="slide">
    <music-list :rank="rank" :title="title" :bg-image="bgImage" :songs="songs"></music-list>
  </transition>
</template>

<script type='text/ecmascript-6'>
  import MusicList from 'components/music-list/music-list'
  import {mapGetters} from 'vuex'
  import {getMusicList} from 'api/rank'
  import {ERR_OK} from 'api/config'
  import {createSong} from 'common/js/song'
  import {getSongUrl} from 'api/singer'

  export default {
    computed: {
      title() {
        return this.topList.topTitle
      },
      bgImage() {
        // 使用每首歌的第一张图作为排行榜歌单的背景
        // if (this.songs.length) {
        //   return this.songs[0].image
        // }
        // return ''
        return this.topList.picUrl
      },
      // 使用mapGetters从vuex中获取state中的topList数据
      ...mapGetters([
        'topList'
      ])
    },
    data() {
      return {
        songs: [],
        rank: true
      }
    },
    created() {
      this._getMusicList()
    },
    methods: {
      _getMusicList() {
        if (!this.topList.id) {
          // 解决刷新后，无法请求到页面数据
          // 返回上一层路由
          this.$router.push('/rank')
          return
        }
        getMusicList(this.topList.id).then((res) => {
          if (res.code === ERR_OK) {
            // console.log(res.songlist)
            this.songs = this._normalizeSongs(res.songlist)
            console.log(this.songs)
          }
        })
      },
      _normalizeSongs(list) {
        let ret = []
        list.forEach((item, index) => {
          const musicData = item.data
          if (musicData.songid && musicData.albumid) {
            ret.push(createSong(musicData))
            this._getSongUrl(musicData.songmid).then(url => {
              ret[index].url = url
            })
          }
        })
        return ret
      },
      _getSongUrl(songmid) {
        return getSongUrl(songmid).then(res => {
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
    transition: all 0.3s ease
  .slide-enter, .slide-leava-to
    transform: translate3d(100%, 0, 0)
</style>
