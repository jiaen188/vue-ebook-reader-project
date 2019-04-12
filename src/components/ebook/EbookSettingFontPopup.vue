<template>
<transition name="popup-slide-up">
  <div class="ebook-popup-list" v-show="fontFamilyVisible">
    <div class="ebook-popup-title">
      <div class="ebook-popup-title-icon" @click="hide">
        <span class="icon-down2"></span>
      </div>
      <span class="ebook-popup-title-text">选择字体</span>
    </div>
    <div class="ebook-popup-list-wrapper">
      <div class="ebook-popup-item" @click="setFontFamily(item.font)" v-for="(item, index) in fontFamilyList" :key="index">
        <div class="ebook-popup-item-text" :class="{'selected': isSelect(item)}">{{ item.font }}</div>
        <div class="ebook-popup-item-check" v-if="isSelect(item)">
          <span class="icon-check"></span>
        </div>
      </div>
    </div>
  </div>
</transition>
</template>

<script>
import { ebookMixin } from '../../utils/mixin'
import { FONT_FAMILY } from '../../utils/book'
import { saveFontFamily } from '../../utils/localStorage'

export default {
  mixins: [ebookMixin],
  data() {
    return {
      fontFamilyList: FONT_FAMILY
    }
  },
  methods: {
    setFontFamily(font) {
      this.setDefaultFontFamily(font)
      saveFontFamily(this.fileName, font)
      // 目前仅支持 cabin 和 default
      if (font === 'Default') {
        this.currentBook.rendition.themes.font('Times New Roman')
      } else {
        this.currentBook.rendition.themes.font(font)
      }
    },
    hide() {
      this.setFontFamilyVisible(false)
    },
    isSelect(item) {
      return this.defaultFontFamily === item.font
    }
  }
}
</script>

<style lang="scss" scoped>
 @import '../../assets/styles/global';

.ebook-popup {
  &-list {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 300;
    width: 100%;
    background: #fff;
    box-shadow: 0 px2rem(-4) px2rem(6) rgba(0, 0, 0, .1);
  }
  &-title {
    position: relative;
    padding: px2rem(15);
    box-sizing: border-box;
    border-bottom: px2rem(1) solid #b8b9bb;
    text-align: center;
    @include center;
    &-icon {
      position: absolute;
      left: px2rem(15);
      top: 0;
      height: 100%;
      font-size: px2rem(16);
      font-weight: bold;
      @include center;
    }
    &-text {
      font-size: px2rem(14);
      font-weight: bold;
    }
  }
  &-list-wrapper {}
  &-item {
    display: flex;
    padding: px2rem(15);
    &-text {
      flex: 1;
      font-size: px2rem(14);
      text-align: left;
      &.selected {
        color: #346cb9;
        font-weight: bold;
      }
    }
    &-check {
      flex: 1;
      text-align: right;
      font-size: px2rem(14);
      font-weight: bold;
      color: #346cb9;
    }
  }
}
</style>
