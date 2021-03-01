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
          click: this.click
        })
      },
      enable() {
        this.scroll && this.scroll.enable()
      },
      disable() {
        this.scroll && this.scroll.disable()
      },
      refresh() {
        this.scroll && this.scroll.refresh()
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