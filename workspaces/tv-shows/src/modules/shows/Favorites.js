export default {
  namespaced: true,
  state: {
    list: []
  },
  mutations: {
    addId(state, id) {
      state.list.push(id);
    },
    removeId(state, id) {
      state.list = state.list.filter(function(value) {
        return value !== id;
      });
    }
  },
  actions: {
    add({ commit }, id) {
      commit("addId", id);
    },
    remove({ commit }, id) {
      commit("removeId", id);
    }
  },
  getters: {
    exists: state => id => {
      return state.list.filter(value => value === id).length > 0;
    }
  }
};
