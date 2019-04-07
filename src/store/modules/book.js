const book = {
  namespaced: true,
  state: {
    fileName: ''
  },
  mutations: {
    'SET_FILENAME': (state, payload) => {
      state.fileName = payload
    }
  },
  actions: {
    setFileName({ commit }, params) {
      return commit('SET_FILENAME', params)
    }
  }
}

export default book
