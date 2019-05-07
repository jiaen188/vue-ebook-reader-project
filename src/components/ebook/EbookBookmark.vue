<template>
  <div class="ebook-bookmark" ref="bookmark">
    <div class="ebook-bookmark-text-wrapper">
      <div class="ebook-bookmark-down-wrapper" ref="iconDown">
        <span class="icon-down"></span>
      </div>
      <div class="ebook-bookmark-text">{{text}}</div>
    </div>
    <div class="ebook-bookmark-icon-wrapper" :style="isFixed ? fixedStyle : {}">
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
    },
    fixedStyle() {
      return {
        position: 'fixed',
        top: 0,
        right: `${(window.innerWidth - this.$refs.bookmark.clientWidth) / 2}px`
      }
    }
  },
  watch: {
    offsetY(v) {
      if (!this.bookAvailable || this.menuVisible || this.settingVisible >= 0) {
        return
      }
      if (v >= this.height && v <= this.threshold) {
        this.beforeThreshold(v)
      } else if (v > this.threshold) {
        this.afterThreshold(v)
      } else if (v > 0 && v < this.height) {
        this.beforeHeight()
      } else if (v === 0) {
        this.store()
      }
    }
  },
  data() {
    return {
      text: this.$t('book.pulldownAddMark'),
      color: WHITE,
      isFixed: false
    }
  },
  methods: {
    store() {
      // 状态4 归位
      setTimeout(() => {
        this.$refs.bookmark.style.top = `${-this.height}px`
        this.$refs.iconDown.style.transform = 'rotate(0deg)'
      }, 200)
      if (this.isFixed) {
        this.setIsBookmark(true)
      } else {
        this.setIsBookmark(false)
      }
    },
    beforeHeight() {
      // 状态1 未超过书签的高度
      if (this.isBookmark) {
        this.text = this.$t('book.pulldownDeleteMark')
        this.color = BLUE
        this.isFixed = true
      } else {
        this.text = this.$t('book.pulldownAddMark')
        this.color = WHITE
        this.isFixed = false
      }
    },
    beforeThreshold(v) {
      // 状态2: 未到达临界状态
      this.$refs.bookmark.style.top = `${-v}px`
      this.beforeHeight()
      const iconDown = this.$refs.iconDown
      if (iconDown.style.transform === 'rotate(180deg)') {
        iconDown.style.transform = 'rotate(0deg)'
      }
      this.isFixed = false
    },
    afterThreshold(v) {
      // 状态3: 超过临界状态
      this.$refs.bookmark.style.top = `${-v}px`
      if (this.isBookmark) {
        this.text = this.$t('book.releaseDeleteMark')
        this.color = WHITE
        this.isFixed = false
      } else {
        this.text = this.$t('book.releaseAddMark')
        this.color = BLUE
        this.isFixed = true
      }
      const iconDown = this.$refs.iconDown
      if (iconDown.style.transform === '' || iconDown.style.transform === 'rotate(0deg)') {
        iconDown.style.transform = 'rotate(180deg)'
      }
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
