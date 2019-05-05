<template>
  <div class="ebook-bookmark">
    <div class="ebook-bookmark-text-wrapper">
      <div class="ebook-bookmark-down-wrapper">
        <span class="icon-down"></span>
      </div>
      <div class="ebook-bookmark-text">{{text}}</div>
    </div>
    <div class="ebook-bookmark-icon-wrapper">
      <bookmark color="red" :width="15" :height="35"></bookmark>
    </div>
  </div>
</template>

<script>
import Bookmark from '../common/Bookmark'

const BLUE = '#346cbc'
const WHITE = '#fff'

export default {
  components: {
    Bookmark
  },
  data() {
    return {
      text: this.$t('book.pulldownAddMark')
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
