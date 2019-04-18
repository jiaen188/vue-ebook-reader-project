import { themeList, addCss, removeAllCss } from './book'
import { mapState, mapActions } from 'vuex'

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
      'progress'
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
      'setProgress'
    ]),
    initGlobalStyle() {
      removeAllCss()
      // todo 需要用启动nigx本地服务， 加载的绝对地址css
      switch (this.defaultTheme) {
        case 'Default':
          addCss('../../assets/styles/themes/theme_default.css')
          break
        case 'Eye':
          addCss('../../assets/styles/themes/theme_eye.css')
          break
        case 'Gold':
          addCss('../../assets/styles/themes/theme_gold.css')
          break
        case 'Night':
          addCss('../../assets/styles/themes/theme_night.css')
          break
        default:
          addCss('../../assets/styles/themes/theme_default.css')
          break
      }
    }
  }
}
