<template>
  <div class="ebook-reader">
    <div id="read"></div>
    <div class="ebook-reader-mask" @click="onMaskClick" @touchmove="move" @touchend="moveEnd"></div>
  </div>
</template>

<script>
import { ebookMixin } from '../../utils/mixin'
import Epub from 'epubjs'
import { getFontFamily, saveFontFamily, getFontSize, saveFontSize, saveTheme, getTheme, getLocation } from '../../utils/localStorage'
import { flatten } from '../../utils/book'
global.ePub = Epub

export default {
  mixins: [ebookMixin],
  methods: {
    move(e) {
      let offsetY = 0
      if (this.firstOffsetY) {
        offsetY = e.changedTouches[0].clientY - this.firstOffsetY
        this.setOffsetY(offsetY)
      } else {
        this.firstOffsetY = e.changedTouches[0].clientY
      }
      e.preventDefault()
      e.stopPropagation()
    },
    moveEnd(e) {
      this.setOffsetY(0)
      this.firstOffsetY = null
    },
    onMaskClick(e) {
      const offsetX = e.offsetX
      const width = window.innerWidth
      if (offsetX > 0 && offsetX < width * 0.3) {
        this.prevPage()
      } else if (offsetX > 0 && offsetX > width * 0.7) {
        this.nextPage()
      } else {
        this.toggleTitleAndMenu()
      }
    },
    prevPage() {
      if (this.rendition) {
        this.rendition.prev().then(() => {
          this.refreshLocation()
        })
        this.hideTitleAndMenu()
      }
    },
    nextPage() {
      if (this.rendition) {
        this.rendition.next().then(() => {
          this.refreshLocation()
        })
        this.hideTitleAndMenu()
      }
    },
    toggleTitleAndMenu() {
      if (this.menuVisible) {
        this.setSettingVisible(-1)
        this.setFontFamilyVisible(false)
      }
      this.setMenuVisible(!this.menuVisible)
    },
    initFontSize() {
      let fontSize = getFontSize(this.fileName)
      if (!fontSize) {
        saveFontSize(this.fileName, this.defaultFontSize)
      } else {
        this.rendition.themes.fontSize(fontSize)
        // 原来的设置 字号方法无用，改
        const contents = this.rendition.getContents()
        contents.forEach((content) => {
          content.content.style.fontSize = `${fontSize}px`
        })
        this.setDefaultFontsize(fontSize)
      }
    },
    initFontFamily() {
      let font = getFontFamily(this.fileName)
      if (!font) {
        saveFontFamily(this.fileName, this.defaultFontFamily)
      } else {
        this.rendition.themes.font(font)
        this.setDefaultFontFamily(font)
      }
    },
    initTheme() {
      let defaultTheme = getTheme(this.fileName)
      if (!defaultTheme) {
        defaultTheme = this.themeList[0].name
        saveTheme(this.fileName, defaultTheme)
      }
      this.setDefaultTheme(defaultTheme)
      this.themeList.forEach(theme => {
        this.rendition.themes.register(theme.name, theme.style)
      })
      this.rendition.themes.select(defaultTheme)
    },
    initRendition() {
      this.rendition = this.book.renderTo('read', {
        width: innerWidth,
        height: innerHeight,
        methods: 'default'
      })
      const location = getLocation(this.fileName)
      this.display(location, () => {
        this.initTheme()
        this.initFontSize()
        this.initFontFamily()
        this.initGlobalStyle()
      })
      this.rendition.hooks.content.register(contents => {
        // 目前仅支持 cabin
        // todo 需要用启动nigx本地服务， 加载的绝对地址css
        Promise.all([
          contents.addStylesheet('../../assets/fonts/dayOne.css'),
          contents.addStylesheet('../../assets/fonts/cabin.css'),
          contents.addStylesheet('../../assets/fonts/montserrat.css'),
          contents.addStylesheet('../../assets/fonts/tangerine.css')
        ]).then(() => {})
      })
    },
    // initGesture() {
    //   this.rendition.on('touchstart', event => {
    //     this.touchStartX = event.changedTouches[0].clientX
    //     this.touchStartTime = event.timeStamp
    //   })
    //   this.rendition.on('touchend', event => {
    //     const offsetX = event.changedTouches[0].clientX - this.touchStartX
    //     const time = event.timeStamp - this.touchStartTime
    //     console.log('offset, time', offsetX, time)
    //     if (time < 500 && offsetX > 40) {
    //       this.prevPage()
    //     } else if (time < 500 && offsetX < -40) {
    //       this.nextPage()
    //     } else {
    //       this.toggleTitleAndMenu()
    //     }
    //     event.preventDefault()
    //     event.stopPropagation()
    //   })
    // },
    parseBook() {
      this.book.loaded.cover.then(cover => {
        this.book.archive.createUrl(cover).then(url => {
          this.setCover(url)
        })
      })
      this.book.loaded.metadata.then(metadata => {
        this.setMetadata(metadata)
      })
      this.book.loaded.navigation.then(nav => {
        const navItem = flatten(nav.toc)
        console.log('navitem', navItem)
        function find(item, level = 0) {
          return !item.parent ? level : find(navItem.filter(parentItem => parentItem.id === item.parent)[0], ++level)
        }
        navItem.forEach(item => {
          item.level = find(item)
        })
        console.log('navitem', navItem)
        this.setNavigation(navItem)
      })
    },
    initEpub() {
      // todo 需要用启动nigx本地服务
      const url = 'http://192.168.31.243:8081/epub/' + this.fileName + '.epub'
      this.book = new Epub('/2018_Book_AgileProcessesInSoftwareEngine.epub' || url)
      console.log('this.book', this.book)
      this.setCurrentBook(this.book)
      this.initRendition()
      // this.initGesture()
      this.parseBook()
      // 分页功能
      this.book.ready.then(() => {
        return this.book.locations.generate(750 * (window.innerWidth / 375) * (getFontSize(this.fileName) / 16))
      }).then(locations => {
        this.setBookAvailable(true)
        this.refreshLocation()
      })
    }
  },
  async mounted() {
    const fileName = this.$route.params.fileName.split('|').join('/')
    await this.setFileName(fileName)
    this.initEpub()
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/styles/global';

.ebook-reader {
  width: 100%;
  height: 100%;
  overflow: hidden;
  &-mask {
    position: absolute;
    top: 0;
    left: 0;
    background: transparent;
    z-index: 150;
    width: 100%;
    height: 100%;
  }
}
</style>
