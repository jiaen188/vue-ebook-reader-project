const book = {
  state: {
    test: 1
  },
  mutations: {
    'SET_TEST': (state, payload) => {
      state.test = payload
    }
  },
  actions: {
    setTest({ commit }, params) {
      return commit('SET_TEST', params)
    }
  }
}

export default book
