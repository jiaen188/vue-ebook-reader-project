<template>
  <div class="ebook-slide-contents">
    <div class="slide-contents-search-wrapper">
      <div class="slide-contents-search-input-wrapper">
        <div class="slide-contents-search-icon">
          <span class="icon-search"></span>
        </div>
        <input type="text" v-model="searchText" class="slide-contents-search-input" :placeholder="$t('book.searchHint')" @keyup.enter.exact="search" @click="showSearchPage">
      </div>
      <div class="slide-contents-search-cancel" v-show="searchVisible" @click="hideSearchPage">{{$t('book.cancel')}}</div>
    </div>
    <div class="slide-contents-book-wrapper" v-show="!searchVisible">
      <div class="slide-contents-book-img-wrapper">
        <img :src="cover" class="slide-contents-book-img">
      </div>
      <div class="slide-contents-book-info-wrapper">
        <div class="slide-contents-book-title">{{metadata.title}}</div>
        <div class="slide-contents-book-author">{{metadata.creator}}</div>
      </div>
      <div class="slide-contents-book-progress-wrapper">
        <div class="slide-contents-book-progress">
          <span class="progress">{{progress + '%'}}</span>
          <span class="progeress-text">{{$t('book.haveRead2')}}</span>
        </div>
        <div class="slide-contents-book-time">{{getReadTimeText()}}</div>
      </div>
    </div>
    <scroll class="slide-contents-list" :top="156" :bottom="48" ref="scroll" v-show="!searchVisible">
      <div class="slide-contents-item" v-for="(item, index) in navigation" :key="index" @click="displayNavigation(item.href)">
        <span class="slide-contents-item-label" :class="{'selected': section === index}" :style="contentItemStyle(item)">{{item.label}}</span>
        <span class="slide-contents-item-page"></span>
      </div>
    </scroll>
    <scroll class="slide-search-list" :top="66" :bottom="48" v-show="searchVisible">
      <div class="slide-search-item" v-for="(item, index) in searchList" :key="index" v-html="item.excerpt" @click="displaySearch(item.cfi)"></div>
    </scroll>
  </div>
</template>

<script>
import { ebookMixin } from '../../utils/mixin'
import Scroll from '../common/Scroll'
import { px2rem } from '../../utils/utils'

export default {
  mixins: [ebookMixin],
  data() {
    return {
      searchVisible: false,
      searchList: null,
      searchText: ''
    }
  },
  methods: {
    displaySearch(target) {
      this.display(target, () => {
        this.hideTitleAndMenu()
      })
    },
    search() {
      if (this.searchText && this.searchText.length > 0) {
        this.doSearch(this.searchText).then(list => {
          this.searchList = list.map(item => {
            item.excerpt = item.excerpt.replace(this.searchText, `<span class="content-search-text">${this.searchText}</span>`)
            return item
          })
        })
      }
    },
    doSearch(q) {
      return Promise.all(
        this.currentBook.spine.spineItems.map(
          section => section.load(this.currentBook.load.bind(this.currentBook))
            .then(section.find.bind(section, q))
            .finally(section.unload.bind(section)))
      ).then(results => Promise.resolve([].concat.apply([], results)))
    },
    displayNavigation(target) {
      this.display(target, () => {
        this.hideTitleAndMenu()
      })
    },
    contentItemStyle(item) {
      return {
        marginLeft: `${px2rem(item.level * 15)}rem`
      }
    },
    showSearchPage() {
      this.searchVisible = true
    },
    hideSearchPage() {
      this.searchVisible = false
      this.searchList = null
      this.searchText = ''
    }
  },
  components: {
    Scroll
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/styles/global';

.ebook-slide-contents {
  width: 100%;
  font-size: 0;
  .slide-contents-search {
    &-wrapper {
      display: flex;
      width: 100%;
      height: px2rem(36);
      margin: px2rem(20) 0 px2rem(10) 0;
      padding: 0 px2rem(15);
      box-sizing: border-box;
    }
    &-input-wrapper {
      flex: 1;
      @include center;
    }
    &-icon {
      flex: 0 0 px2rem(28);
      font-size: px2rem(12);
      @include center;
    }
    &-input {
      flex: 1;
      width: 100%;
      height: px2rem(32);
      font-size: px2rem(14);
      background: transparent;
      border: none;
      &:focus {
        outline: none;
      }
    }
    &-cancel {
      flex: 0 0 px2rem(50);
      font-size: px2rem(14);
      @include right;
    }
  }
  .slide-contents-book {
    &-wrapper {
      display: flex;
      width: 100%;
      height: px2rem(90);
      padding: px2rem(10) px2rem(15) px2rem(20) px2rem(15);
      box-sizing: border-box;
    }
    &-img-wrapper {
      flex: 0 0 px2rem(45);
    }
    &-img {
      width: px2rem(45);
      height: px2rem(60);
    }
    &-info-wrapper {
      flex: 1;
      padding: 0 px2rem(10);
      box-sizing: border-box;
    }
    &-title {
      width: px2rem(153.75);
      font-size: px2rem(14);
      @include ellipsis2(3);
    }
    &-author {
      width: px2rem(153.75);
      font-size: px2rem(12);
      margin-top: px2rem(5);
      @include ellipsis;
    }
    &-progress-wrapper {
      flex: 0 0 px2rem(70);
    }
    &-progress {
      .progress {
        font-size: px2rem(14);
      }
      .progeress-text {
        font-size: px2rem(12);
      }
    }
    &-time {
      font-size: px2rem(12);
      margin-top: px2rem(5);
    }
  }
  .slide-contents {
    &-list {
      padding: 0 px2rem(15);
      box-sizing: border-box;
    }
    &-item {
      display: flex;
      padding: px2rem(20) 0;
      box-sizing: border-box;
      &-label {
        flex: 1;
        font-size: px2rem(14);
        line-height: px2rem(16);
        @include ellipsis;
      }
      &-page {

      }
    }
  }
  .slide-search {
    &-list {
      width: 100%;
      padding: 0 px2rem(15);
      box-sizing: border-box;
    }
    &-item {
      font-size: px2rem(14);
      line-height: px2rem(16);
      padding: px2rem(20) 0;
      box-sizing: border-box;
    }
  }
}
</style>
