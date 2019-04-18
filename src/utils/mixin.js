// import { themeList, addCss, removeAllCss } from './book'
import { themeList } from './book'
import { mapState, mapActions, mapMutations } from 'vuex'

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
      'defaultTheme'
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
      'setDefaultTheme'
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
    }
  }
}
