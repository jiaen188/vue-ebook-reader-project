const book = {
  namespaced: true,
  state: {
    fileName: '',
    menuVisible: false,
    settingVisible: -1, // -1 不显示，0: 字号，1:主题，2:进度，3:目录
    defaultFontSize: 16,
    currentBook: null,
    defaultFontFamily: 'Default',
    fontFamilyVisible: false,
    defaultTheme: 'Default',
    bookAvailable: false,
    progress: 0,
    section: 0,
    cover: null,
    metadata: null,
    navigation: null,
    offsetY: 0,
    isBookmark: null
  },
  mutations: {
    'SET_FILENAME': (state, payload) => {
      state.fileName = payload
    },
    'SET_MENUVISIBLE': (state, payload) => {
      state.menuVisible = payload
    },
    'SET_SETTINGVISIBLE': (state, payload) => {
      state.settingVisible = payload
    },
    'SET_DEFAULTFONTSIZE': (state, payload) => {
      state.defaultFontSize = payload
    },
    'SET_CURRENT_BOOK': (state, payload) => {
      state.currentBook = payload
    },
    'SET_DEFAULT_FONT_FAMILY': (state, font) => {
      state.defaultFontFamily = font
    },
    'SET_FONT_FAMILY_VISIBLE': (state, payload) => {
      state.fontFamilyVisible = payload
    },
    'SET_DEFAULT_THEME': (state, theme) => {
      state.defaultTheme = theme
    },
    'SET_BOOK_AVAILABLE': (state, bookAvailable) => {
      state.bookAvailable = bookAvailable
    },
    'SET_PROGRESS': (state, progress) => {
      state.progress = progress
    },
    'SET_SECTION': (state, section) => {
      state.section = section
    },
    'SET_COVER': (state, cover) => {
      state.cover = cover
    },
    'SET_METADATA': (state, metadata) => {
      state.metadata = metadata
    },
    'SET_NAVIGATION': (state, navigation) => {
      state.navigation = navigation
    },
    'SET_OFFSETY': (state, offsetY) => {
      state.offsetY = offsetY
    },
    'SET_IS_BOOKMARK': (state, isBookmark) => {
      state.isBookmark = isBookmark
    }
  },
  actions: {
    setFileName({ commit }, params) {
      return commit('SET_FILENAME', params)
    },
    setMenuVisible({ commit }, params) {
      return commit('SET_MENUVISIBLE', params)
    },
    setSettingVisible({ commit }, params) {
      return commit('SET_SETTINGVISIBLE', params)
    },
    setDefaultFontsize({ commit }, params) {
      return commit('SET_DEFAULTFONTSIZE', params)
    },
    setCurrentBook: ({ commit }, book) => {
      return commit('SET_CURRENT_BOOK', book)
    },
    setDefaultFontFamily: ({ commit }, font) => {
      return commit('SET_DEFAULT_FONT_FAMILY', font)
    },
    setFontFamilyVisible: ({ commit }, visible) => {
      return commit('SET_FONT_FAMILY_VISIBLE', visible)
    },
    setDefaultTheme: ({ commit }, theme) => {
      return commit('SET_DEFAULT_THEME', theme)
    },
    setBookAvailable: ({ commit }, bookAvailable) => {
      return commit('SET_BOOK_AVAILABLE', bookAvailable)
    },
    setProgress: ({ commit }, progress) => {
      return commit('SET_PROGRESS', progress)
    },
    setSection: ({ commit }, section) => {
      return commit('SET_SECTION', section)
    },
    setCover: ({ commit }, cover) => {
      return commit('SET_COVER', cover)
    },
    setMetadata: ({ commit }, metadata) => {
      return commit('SET_METADATA', metadata)
    },
    setNavigation: ({ commit }, navigation) => {
      return commit('SET_NAVIGATION', navigation)
    },
    setOffsetY({ commit }, offsetY) {
      return commit('SET_OFFSETY', offsetY)
    },
    setIsBookmark({ commit }, isBookmark) {
      return commit('SET_IS_BOOKMARK', isBookmark)
    }
  }
}

export default book
