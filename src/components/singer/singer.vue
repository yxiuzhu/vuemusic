<template>
  <div class="singer">
    <list-view @select="selectSinger" :data="singers"></list-view>
    <router-view></router-view>
  </div>
</template>

<script type='text/ecmascript-6'>
  import {getSingerList} from 'api/singer' 
  import {ERR_OK} from 'api/config'
  import Singer from 'common/js/singer'
  import ListView from 'base/listview/listview'
  // 对mutations进行一些封装
  import {mapMutations} from 'vuex' 

  const HOT_NAME = '热门'
  const HOT_SINGER_LEN = 10

  export default {
    components: {
      ListView
    },
    data() {
      return {
        singers: []
      }
    },
    created() {
      this._getSingerList()
    },
    methods: {
      selectSinger(singer) {
        // $router的编程式跳转接口
        this.$router.push({
          path: `/singer/${singer.id}`
        })
        // 通过mapMutations这个语法糖使下面的语句变得清爽，
        // 替换了this.$store.commit(xxx)
        // 实现将singer传入组件
        this.setSinger(singer)
      },
      _getSingerList() {
        getSingerList().then((res) => {
          if (res.code === ERR_OK) {
            this.singers = this._normalizeSinger(res.data.list)
            // console.log(this._normalizeSinger(res.data.list))
          }
        })
      },
      // 规范化singers数据
      _normalizeSinger(list) {
        let map = {
          hot: {
            title: HOT_NAME,
            items: []
          }
        }
        // 给map填充数据
        list.forEach((item, index) => {
          if (index < HOT_SINGER_LEN) {
            map.hot.items.push(new Singer({
              id: item.Fsinger_mid,
              name: item.Fsinger_name
            }))
          }
          const key = item.Findex
          if (!map[key]) {
            map[key] = {
              title: key,
              items: []
            }
          }
          map[key].items.push(new Singer({
            id: item.Fsinger_mid,
            name: item.Fsinger_name
          }))
        })
        // console.log(map)
        // 为了得到有序的列表，需要处理 map
        let hot = []
        let ret = []
        for (let key in map) {
          let val = map[key]
          // 将map分成两块
          if (val.title.match(/[a-zA-Z]/)) {
            ret.push(val)
          } else if (val.title === HOT_NAME) {
            hot.push(val)
          }
        }
        // 将字母进行升序排序
        ret.sort((a, b) => {
          return a.title.charCodeAt(0) - b.title.charCodeAt(0)
        })
        return hot.concat(ret)
      },
      ...mapMutations({
        setSinger: 'SET_SINGER'
      })
    }
  }
</script>

<style scoped lang='stylus' rel='stylesheet/stylus'>
  .singer
    // 为了固定父元素的高度
    position: fixed
    top: 88px
    bottom: 0
    width: 100%
    // CSS3新特性：视口高度-88px 减号前后必须有空格
    // height: calc(100vh - 88px)
</style>