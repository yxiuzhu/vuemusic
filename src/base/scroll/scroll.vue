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
