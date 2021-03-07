<template>
  <transition name="slide">
    <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
  </transition>
</template>

<script type='text/ecmascript-6'>
  // vuex提供取数据的语法糖
  import {mapGetters} from 'vuex'
  import {getSingerDetail, getSongUrl} from 'api/singer'
  import {ERR_OK} from 'api/config'
  import {createSong} from 'common/js/song'
  import MusicList from 'components/music-list/music-list'

  export default {
    components: {
      MusicList
    },
    data() {
      return {
        songs: []
      }
    },
    computed: {
      title() {
        return this.singer.name
      },
      bgImage() {
        return this.singer.avatar
      },
      ...mapGetters([
        'singer'
      ])
    },
    created() {
      // 输出从vuex中获取的singer数据
      // console.log(this.singer)
      this._getDetail()
    },
    methods: {
      _getDetail() {
        // 处理边界情况
        // 如果在歌手详情页刷新，则跳转回歌手列表
        if (!this.singer.id) {
          this.$router.push('/singer')
          return
        }
        // 获取歌手数据
        getSingerDetail(this.singer.id).then((res) => {
          if (res.code === ERR_OK) {
            // 先看是否获取到了数据
            // console.log(res.data.list)
            this.songs = this._normalizeSongs(res.data.list)
            // console.log(res.data.list)
            // console.log(this.songs)
          }
        })
      },
      // 格式化歌单的格式
      _normalizeSongs(list) {
        let ret = []
        list.forEach((item, index) => {
          let {musicData} = item //得到music对象
          if (musicData.songid && musicData.albummid) {
            // createSong将song再封装了一层
            console.log(musicData)
            ret.push(createSong(musicData))
            console.log(ret)
            // 将正确歌曲的url添加进对应的歌曲列表
            this._getSongUrl(musicData.songmid).then(url => {
              // console.log(url)
              ret[index].url = url
            })
          }
        })
        return ret
      },
      // 获取歌曲的正确url
      _getSongUrl(songmid) {
        return getSongUrl(songmid).then(res => {
          return Promise.resolve(res.url)
        })
      }
    }
  }
</script>

<style scoped lang='stylus' rel='stylesheet/stylus'>
  @import "~common/stylus/variable"

  .slide-enter-active,.slide-leave-active
    transition: all .3s
  .slide-enter, .slide-leave-to
    transform: translate3d(100%,0,0)
</style>
