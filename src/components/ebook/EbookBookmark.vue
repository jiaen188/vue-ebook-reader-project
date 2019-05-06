<template>
  <div class="ebook-bookmark" ref="bookmark">
    <div class="ebook-bookmark-text-wrapper">
      <div class="ebook-bookmark-down-wrapper" ref="iconDown">
        <span class="icon-down"></span>
      </div>
      <div class="ebook-bookmark-text">{{text}}</div>
    </div>
    <div class="ebook-bookmark-icon-wrapper">
      <bookmark :color="color" :width="15" :height="35"></bookmark>
    </div>
  </div>
</template>

<script>
import Bookmark from '../common/Bookmark'
import { realPx } from '../../utils/utils'
import { ebookMixin } from '../../utils/mixin'

const BLUE = '#346cbc'
const WHITE = '#fff'

export default {
  mixins: [ebookMixin],
  components: {
    Bookmark
  },
  computed: {
    height() {
      return realPx(35)
    },
    threshold() {
      return realPx(55)
    }
  },
  watch: {
    offsetY(v) {
      if (v >= this.height && v <= this.threshold) {
        // 状态2: 未到达临界状态
        this.$refs.bookmark.style.top = `${-v}px`
        this.text = this.$t('book.pulldownAddMark')
        this.color = WHITE
        const iconDown = this.$refs.iconDown
        if (iconDown.style.transform === 'rotate(180deg)') {
          iconDown.style.transform = 'rotate(0deg)'
        }
      } else if (v > this.threshold) {
        // 状态3: 超过临界状态
        this.$refs.bookmark.style.top = `${-v}px`
        this.text = this.$t('book.releaseAddMark')
        this.color = BLUE
        const iconDown = this.$refs.iconDown
        if (iconDown.style.transform === '' || iconDown.style.transform === 'rotate(0deg)') {
          iconDown.style.transform = 'rotate(180deg)'
        }
      }
    }
  },
  data() {
    return {
      text: this.$t('book.pulldownAddMark'),
      color: WHITE
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/styles/global';

.ebook-bookmark {
  position: absolute;
  top: px2rem(-35);
  left: 0;
  z-index: 200;
  width: 100%;
  height: px2rem(35);
  &-text-wrapper {
    position: absolute;
    right: px2rem(45);
    bottom: 0;
    display: flex;
  }
  &-down-wrapper {
    font-size: px2rem(14);
    color: #fff;
    transition: all .2s linear;
    @include center;
  }
  &-text {
    font-size: px2rem(14);
    color: #fff;
  }
  &-icon-wrapper {
    position: absolute;
    right: 0;
    margin-right: px2rem(15);
  }
}
</style>
