export default {
  namespaced: true,
  state: {
    favorites: []
  },
  mutations: {
    add(state, id) {
      state.favorites.push(id);
    },
    remove(state, id) {
      state.favorites = state.favorites.filter(function(value) {
        return value !== id;
      });
    }
  },
  actions: {
    add({ commit }, id) {
      commit("add", id);
    },
    remove({ commit }, id) {
      commit("remove", id);
    }
  },
  getters: {
    exists: state => id => {
      return state.favorites.filter(value => value === id).length > 0;
    }
  }
};
