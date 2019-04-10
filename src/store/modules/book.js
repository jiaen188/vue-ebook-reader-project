const book = {
  namespaced: true,
  state: {
    fileName: '',
    menuVisible: false,
    settingVisible: -1, // -1 不显示，0: 字号，1:主题，2:进度，3:目录
    defaultFontSize: 16,
    currentBook: null,
    defaultFontFamily: 'Default',
    fontFamilyVisible: false
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
    }
  }
}

export default book
