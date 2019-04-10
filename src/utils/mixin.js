
import { mapState } from 'vuex'

export const ebookMixin = {
  computed: {
    ...mapState('book', [
      'fileName',
      'menuVisible'
    ])
  }
}
