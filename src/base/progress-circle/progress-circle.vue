<template>
  <div class="progress-circle">
    <!-- width和height的值是可变的，实际图上显示的大小， -->
    <!-- viewBox是对应圆圈的所开辟的空间大小 -->
    <svg :width="radius" :height="radius" viewBox="0 0 100 100" version="1.1"
         xmlns="http://www.w3.org/2000/svg">
      <!-- r为半径，cx和cy代表坐标点 -->
      <circle class="progress-background" r="50" cx="50" cy="50"
              fill="transparent"/>
      <!-- stroke-dasharray="314"描边及描边的距离 -->
      <!-- stroke-dashoffset="157"表示进度为50%，0表示一个圈，根据百分比计算出来-->
      <circle class="progress-bar" r="50" cx="50" cy="50"
              fill="transparent"
              :stroke-dasharray="dashArray"
              :stroke-dashoffset="dashOffset"/>
    </svg>
    <slot></slot>
  </div>
</template>

<script type='text/ecmascript-6'>
  export default {
    props: {
      radius: {
        type: Number,
        default: 100
      },
      percent: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        dashArray: Math.PI * 100
      }
    },
    computed: {
      dashOffset() {
        return (1 - this.percent) * this.dashArray
      }
    }
  }
</script>

<style scoped lang='stylus' rel='stylesheet/stylus'>
  @import "~common/stylus/variable"

  .progress-circle
    position: relative
    circle
      stroke-width: 8px
      // 以中心为原点旋转
      transform-origin: center
      &.progress-background
        transform: scale(0.9)
        stroke: $color-theme-d
      &.progress-bar
        transform: scale(0.9) rotate(-90deg)
        stroke: $color-theme
</style>
