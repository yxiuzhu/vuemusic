<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>

<script type='text/ecmascript-6'>
  import BScroll from 'better-scroll'
  export default {
    props: {
      // 快速滑动或缓慢滑动都能监听到
      probeType: {
        type: Number,
        default: 1
      },
      // 是否要手动点击事件
      click: {
        type: Boolean,
        default: true
      },
      // 数据更新，需要refresh
      data: {
        type: Array,
        default: null
      },
      // 是否要监听滚动事件
      listenScroll: {
        type: Boolean,
        default: false
      },
      // 是否上拉刷新
      pullup: {
        type: Boolean,
        default: false
      },
      // 滚动之前，派发一个事件
      beforeScroll: {
        type: Boolean,
        default: false
      }
    },
    mounted() {
      setTimeout(() => {
        this._initScroll()
      }, 20)
    },
    methods: {
      _initScroll() {
        // 先确定这个dom存在
        if (!this.$refs.wrapper) {
          return
        }
        this.scroll = new BScroll(this.$refs.wrapper, {
          probeType: this.probeType,
          click: this.click,
          tap: true
        })

        // 监听scroll事件拿到scroll的位置
        if (this.listenScroll) {
          // 保存vue实例的this
          let me = this
          this.scroll.on('scroll', (pos) => {
            // better-scroll的this指向为scroll，
            // 需要调用vue的emit方法，所以要先保存vue实例的指向
            me.$emit('scroll', pos)
          })
        }

        // 负责检测scroll派发上拉到底的事件
        // scrollEnd：监听滚动结束的时候会派发一个滚动结束的事件
        if (this.pullup) {
          this.scroll.on('scrollEnd', () => {
            if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
              this.$emit('scrollToEnd')
            }
          })
        }

        // 在滚动列表之前派发一个事件，
        // 防止移动端的键盘在滚动列表时，出现不会收起的问题
        if (this.beforeScroll) {
          this.scroll.on('beforeScrollStart', () => {
            this.$emit('beforeScroll')
          })
        }
      },
      enable() {
        this.scroll && this.scroll.enable()
      },
      disable() {
        this.scroll && this.scroll.disable()
      },
      refresh() {
        this.scroll && this.scroll.refresh()
      },
      scrollTo() {
        this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
      },
      scrollToElement() {
        this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
      }
    },
    watch: {
      data() {
        setTimeout(() => {
          this.refresh()
        }, 20)
      }
    }
  }
</script>

<style scoped lang='stylus' rel='stylesheet/stylus'>

</style>
