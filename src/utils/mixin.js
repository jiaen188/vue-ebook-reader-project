
import { mapState, mapActions } from 'vuex'

export const ebookMixin = {
  computed: {
    ...mapState('book', [
      'fileName',
      'menuVisible',
      'settingVisible',
      'defaultFontSize'
    ])
  },
  methods: {
    ...mapActions('book', [
      'setFileName',
      'setMenuVisible',
      'setSettingVisible',
      'setDefaultFontsize'
    ])
  }
}
