<template>
  <div class="ebook-reader">
    <div id="read"></div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Epub from 'epubjs'
global.ePub = Epub

export default {
  computed: {
    ...mapState('book', [
      'fileName'
    ])
  },
  methods: {
    ...mapActions('book', [
      'setFileName'
    ]),
    prevPage() {
      if (this.rendition) {
        this.rendition.prev()
      }
    },
    nextPage() {
      if (this.rendition) {
        this.rendition.next()
      }
    },
    toggleTitleAndMenu() {

    },
    initEpub() {
      const url = 'http://192.168.31.243:8081/epub/' + this.fileName + '.epub'
      this.book = new Epub('/2018_Book_AgileProcessesInSoftwareEngine.epub' || url)
      console.log('this.book', this.book)
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
