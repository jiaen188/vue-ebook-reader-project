// import { themeList, addCss, removeAllCss } from './book'
import { themeList } from './book'
import { mapState, mapActions, mapMutations } from 'vuex'
import { saveLocation } from './localStorage'

export const ebookMixin = {
  computed: {
    ...mapState('book', [
      'fileName',
      'menuVisible',
      'settingVisible',
      'defaultFontSize',
      'currentBook',
      'defaultFontFamily',
      'fontFamilyVisible',
      'defaultTheme',
      'bookAvailable',
      'progress',
      'section'
    ]),
    themeList() {
      return themeList(this)
    }
  },
  methods: {
    ...mapActions('book', [
      'setFileName',
      'setMenuVisible',
      'setSettingVisible',
      'setDefaultFontsize',
      'setCurrentBook',
      'setDefaultFontFamily',
      'setFontFamilyVisible',
      'setDefaultTheme',
      'setBookAvailable',
      'setProgress',
      'setSection'
    ]),
    ...mapMutations(['setRootClass']),
    // initGlobalStyle() {
    //   removeAllCss()
    //   switch (this.defaultTheme) {
    //     case 'Default':
    //       addCss('../../assets/styles/themes/theme_default.css')
    //       break
    //     case 'Eye':
    //       addCss('../../assets/styles/themes/theme_eye.css')
    //       break
    //     case 'Gold':
    //       addCss('../../assets/styles/themes/theme_gold.css')
    //       break
    //     case 'Night':
    //       addCss('../../assets/styles/themes/theme_night.css')
    //       break
    //     default:
    //       addCss('../../assets/styles/themes/theme_default.css')
    //       break
    //   }
    // }
    initGlobalStyle() {
      // todo 需要用启动nigx本地服务， 加载的绝对地址css
      switch (this.defaultTheme) {
        case 'Default':
          this.setRootClass('theme-default')
          break
        case 'Eye':
          this.setRootClass('theme-eye')
          break
        case 'Gold':
          this.setRootClass('theme-gold')
          break
        case 'Night':
          this.setRootClass('theme-night')
          break
        default:
          this.setRootClass('theme-default')
          break
      }
    },
    refreshLocation() { // 刷新进度
      const currentLocation = this.currentBook.rendition.currentLocation()
      const startCfi = currentLocation.start.cfi
      const progress = this.currentBook.locations.percentageFromCfi(startCfi)
      this.setProgress(Math.floor(progress * 100))
      this.setSection(currentLocation.start.index)
      saveLocation(this.fileName, startCfi)
    },
    display(target, cb) {
      if (target) {
        this.currentBook.rendition.display(target).then(() => {
          this.refreshLocation()
        })
      } else {
        this.currentBook.rendition.display().then(() => {
          this.refreshLocation()
        })
      }
      if (cb) cb()
    },
    hideTitleAndMenu() {
      this.setMenuVisible(false)
      this.setSettingVisible(-1)
      this.setFontFamilyVisible(false)
    }
  }
}
