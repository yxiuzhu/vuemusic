<template>
  <scroll class="suggest"
          :data="result"
          :pullup="pullup"
          @scrollToEnd="searchMore"
          ref="suggest"
  >
    <ul class="suggest-list">
      <li @click="selectItem(item)" class="suggest-item" v-for="(item, index) in result" :key="index">
        <div class="icon">
          <i :class="getIconCls(item)"></i>
        </div>
        <div class="name">
          <p class="text" v-html="getDisplayName(item)"></p>
        </div>
      </li>
      <loading v-show="hasMore" title=""></loading>
    </ul>
  </scroll>
</template>

<script type='text/ecmascript-6'>
  import {search} from 'api/search'
  import {ERR_OK} from 'api/config'
  // 根据接口请求的数据取出需要的数据
  import {createRecommendSong} from 'common/js/song'
  import {getSongUrl} from 'api/singer'
  import Scroll from 'base/scroll/scroll'
  import Loading from 'base/loading/loading'
  import Singer from 'common/js/singer'
  // 从vuex获取跳转歌手界面的数据
  import {mapMutations} from 'vuex'

  const TYPE_SINGER = 'singer'
  const perpage = 20

  export default {
    components: {
      Scroll,
      Loading
    },
    props: {
      query: {
        type: String,
        default: ''
      },
      showSinger: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        page: 1,
        result: [],
        // 需要上拉加载
        pullup: true,
        // 判断是否全部加载完
        hasMore: true
      }
    },
    methods: {
      // 请求服务端，抓取数据
      search() {
        // 保证滚动到底部后，能重置到顶部
        this.page = 1
        this.hasMore = true
        this.$refs.suggest.scrollTo(0, 0)
        search(this.query, this.page, this.showSinger, perpage).then((res) => {
          if (res.code === ERR_OK) {
            // console.log(res.data)
            this.result = this._genResult(res.data)
            console.log(this.result)
            this._checkMore(res.data)
          }
        })
      },
      // 上拉加载更多
      searchMore() {
        if (!this.hasMore) {
          return
        }
        this.page++
        search(this.query, this.page, this.showSinger, perpage).then((res) => {
          if (res.code === ERR_OK) {
            this.result = this.result.concat(this._genResult(res.data))
            this._checkMore(res.data)
          }
        })
      },
      // 判断列表的图标
      getIconCls(item) {
        if (item.type === TYPE_SINGER) {
          return 'icon-mine'
        } else {
          return 'icon-music'
        }
      },
      getDisplayName(item) {
        if (item.type === TYPE_SINGER) {
          // 根据接口获取数据的不同来改变歌手名字的获取方式
          return item.zhida_singer.singerName
        } else {
          return `${item.name}-${item.singer}`
        }
      },
      // 根据不同type，实现不同的跳转
      selectItem(item) {
        if (item.type === TYPE_SINGER) {
          const singer = new Singer({
            // mid的格式：002azErJ0UcDN6
            id: item.zhida_singer.singerMID,
            name: item.zhida_singer.singerName,
          })
          console.log(singer)
          this.$router.push({
            path: `/search/${singer.id}`
          })
          // 使用vuex传入歌手数据
          this.setSinger(singer)
        }
      },
      // 检查数据当中是否还有更多数据可以加载
      _checkMore(data) {
        const song = data.song
        if (!song.list.length || (song.curnum + song.curpage * perpage) >= song.totalnum) {
          this.hasMore = false
        }
      },
      _genResult(data) {
        let ret = []
        // 判断搜索是否是歌手
        if (data.zhida && data.zhida.zhida_singer) {
          ret.push({...data.zhida, ...{type: TYPE_SINGER}})
        }
        if (data.song) {
          ret = ret.concat(this._normalizeSongs(data.song.list))
        }
        return ret
      },
      _normalizeSongs(list) {
        let ret = []
        list.forEach((item, index) => {
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
      },
      ...mapMutations({
        setSinger: 'SET_SINGER'
      })
    },
    watch: {
      query() {
        this.search()
      }
    }
  }
</script>

<style scoped lang='stylus' rel='stylesheet/stylus'>
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .suggest
    height: 100%
    overflow: hidden
    .suggest-list
      padding: 0 30px
      .suggest-item
        display: flex
        align-items: center
        padding-bottom: 20px
      .icon
        flex: 0 0 30px
        width: 30px
        [class^="icon-"]
          font-size: 14px
          color: $color-text-d
      .name
        flex: 1
        font-size: $font-size-medium
        color: $color-text-d
        overflow: hidden
        .text
          no-wrap()
    .no-result-wrapper
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
