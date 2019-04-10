
import { mapState, mapActions } from 'vuex'

export const ebookMixin = {
  computed: {
    ...mapState('book', [
      'fileName',
      'menuVisible'
    ])
  },
  methods: {
    ...mapActions('book', [
      'setFileName',
      'setMenuVisible'
    ])
  }
}
