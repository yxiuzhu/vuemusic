<template>
  <div class="progress-bar" ref="progressBar" @click="progressClick">
    <div class="bar-inner">
      <div class="progress" ref="progress"></div>
      <div class="progress-btn-wrapper" ref="progressBtn"
           @touchstart.prevent="progressTouchStart"
           @touchmove.prevent="progressTouchMove"
           @touchend.prevent="progressTouchEnd"
      >
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
  import {prefixStyle} from 'common/js/dom'

  const progressBtnWidth = 16
  const transform = prefixStyle('transform')

  export default {
    props: {
      percent: {
        type: Number,
        default: 0
      }
    },
    created() {
      // touch用于在不同回调函数的时候共享一些数据
      this.touch = {}
    },
    methods: {
      progressTouchStart(e) {
        this.touch.initiated = true
        // x方向上手指的位置
        this.touch.startX = e.touches[0].pageX
        // 按钮进度的初始位置
        this.touch.left = this.$refs.progress.clientWidth
      },
      progressTouchMove(e) {
        // 确保被初始化
        if (!this.touch.initiated) {
          return
        }
        // 计算x方向的偏移量:获取移动后的手指的位置
        const deltaX = e.touches[0].pageX - this.touch.startX
        // 计算偏移量，this.touch.left:之前进度条的移动量
        const offsetWidth = Math.min(this.$refs.progressBar.clientWidth - progressBtnWidth, Math.max(0, this.touch.left + deltaX))
        this._offset(offsetWidth)
      },
      progressTouchEnd() {
        this.touch.initiated = false
        this._triggerPercent()
      },
      progressClick(e) {
        // getBoundingClientRect方法返回元素的大小及其相对于视口的位置。
        const rect = this.$refs.progressBar.getBoundingClientRect()
        const offsetWidth = e.pageX - rect.left
        this._offset(offsetWidth)
        this._triggerPercent()
      },
      // 移动音乐播放进度
      _triggerPercent() {
        const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
        const percent = this.$refs.progress.clientWidth / barWidth
        this.$emit('percentChange', percent)
      },
      // 进度条和按钮的偏移量
      _offset(offsetWidth) {
        this.$refs.progress.style.width = `${offsetWidth}px`
        // 小球的偏移量
        this.$refs.progressBtn.style[transform] = `translate3d(${offsetWidth}px, 0, 0)`
      }
    },
    watch: {
      percent(newPercent) {
        if (newPercent >= 0 && !this.touch.initiated) {
          // 进度条的实际宽度：长度-按钮宽
          const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
          // newPercent为现在的歌曲进度
          // 进度条的偏移量
          const offsetWidth = newPercent * barWidth
          this._offset(offsetWidth)
        }
      }
    }
  }
</script>

<style scoped lang='stylus' rel='stylesheet/stylus'>
  @import "~common/stylus/variable"

  .progress-bar
    height: 30px
    .bar-inner
      position: relative
      top: 13px
      height: 4px
      background: rgba(0, 0, 0, 0.3)
      .progress
        position: absolute
        height: 100%
        background: $color-theme
      .progress-btn-wrapper
        position: absolute
        left: -8px
        top: -13px
        width: 30px
        height: 30px
        .progress-btn
          position: relative
          top: 7px
          left: 7px
          box-sizing: border-box
          width: 16px
          height: 16px
          border: 3px solid $color-text
          border-radius: 50%
          background: $color-theme
</style>
