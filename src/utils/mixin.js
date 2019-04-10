
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
      'fontFamilyVisible'
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
      'setFontFamilyVisible'
    ])
  }
}