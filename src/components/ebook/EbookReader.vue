<template>
  <div class="ebook-reader">
    <div id="read"></div>
  </div>
</template>

<script>
import { ebookMixin } from '../../utils/mixin'
import Epub from 'epubjs'
import { getFontFamily, saveFontFamily, getFontSize, saveFontSize, saveTheme, getTheme } from '../../utils/localStorage'
global.ePub = Epub

export default {
  mixins: [ebookMixin],
  methods: {
    prevPage() {
      if (this.rendition) {
        this.rendition.prev()
        this.hideTitleAndMenu()
      }
    },
    nextPage() {
      if (this.rendition) {
        this.rendition.next()
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
    hideTitleAndMenu() {
      this.setMenuVisible(false)
      this.setSettingVisible(-1)
      this.setFontFamilyVisible(false)
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
      this.rendition.display().then(() => {
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
    initGesture() {
      this.rendition.on('touchstart', event => {
        this.touchStartX = event.changedTouches[0].clientX
        this.touchStartTime = event.timeStamp
      })
      this.rendition.on('touchend', event => {
        const offsetX = event.changedTouches[0].clientX - this.touchStartX
        const time = event.timeStamp - this.touchStartTime
        console.log('offset, time', offsetX, time)
        if (time < 500 && offsetX > 40) {
          this.prevPage()
        } else if (time < 500 && offsetX < -40) {
          this.nextPage()
        } else {
          this.toggleTitleAndMenu()
        }
        event.preventDefault()
        event.stopPropagation()
      })
    },
    initEpub() {
      // todo 需要用启动nigx本地服务
      const url = 'http://192.168.31.243:8081/epub/' + this.fileName + '.epub'
      this.book = new Epub('/2018_Book_AgileProcessesInSoftwareEngine.epub' || url)
      console.log('this.book', this.book)
      this.setCurrentBook(this.book)
      this.initRendition()
      this.initGesture()
      this.book.ready.then(() => {
        return this.book.locations.generate(750 * (window.innerWidth / 375) * (getFontSize(this.fileName) / 16))
      }).then(locations => {
        this.setBookAvailable(true)
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
</style>
