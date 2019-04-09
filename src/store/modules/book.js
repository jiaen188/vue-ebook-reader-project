const book = {
  namespaced: true,
  state: {
    fileName: '',
    menuVisible: false
  },
  mutations: {
    'SET_FILENAME': (state, payload) => {
      state.fileName = payload
    },
    'SET_MENUVISIBLE': (state, payload) => {
      state.menuVisible = payload
    }
  },
  actions: {
    setFileName({ commit }, params) {
      return commit('SET_FILENAME', params)
    },
    setMenuVisible({ commit }, params) {
      return commit('SET_MENUVISIBLE', params)
    }
  }
}

export default book
