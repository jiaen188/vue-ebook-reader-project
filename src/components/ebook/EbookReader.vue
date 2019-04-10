<template>
  <div class="ebook-reader">
    <div id="read"></div>
  </div>
</template>

<script>
import { ebookMixin } from '../../utils/mixin'
import Epub from 'epubjs'
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
    initEpub() {
      const url = 'http://192.168.31.243:8081/epub/' + this.fileName + '.epub'
      this.book = new Epub('/2018_Book_AgileProcessesInSoftwareEngine.epub' || url)
      console.log('this.book', this.book)
      this.setCurrentBook(this.book)
      this.rendition = this.book.renderTo('read', {
        width: innerWidth,
        height: innerHeight,
        methods: 'default'
      })
      this.rendition.display()
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
      this.rendition.hooks.content.register(contents => {
        // 目前仅支持 cabin
        Promise.all([
          contents.addStylesheet('../../assets/fonts/dayOne.css'),
          contents.addStylesheet('../../assets/fonts/cabin.css'),
          contents.addStylesheet('../../assets/fonts/montserrat.css'),
          contents.addStylesheet('../../assets/fonts/tangerine.css')
        ]).then(() => {})
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
