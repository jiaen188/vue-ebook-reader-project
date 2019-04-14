
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
      'defaultTheme'
    ])
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
    ])
  }
}
