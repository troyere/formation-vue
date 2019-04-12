import axios from "axios/index";

const client = axios.create({
  baseURL: "http://localhost:4000/rest"
});

export default {
  namespaced: true,
  state: {
    isLoading: false,
    lastError: null,
    list: []
  },
  mutations: {
    isLoading(state, isLoading) {
      state.isLoading = isLoading;
    },
    setLastError(state, lastError) {
      state.lastError = lastError;
    },
    setList(state, list) {
      state.list = list;
    }
  },
  actions: {
    async fetch({ commit }) {
      commit("isLoading", true);
      try {
        const response = await client.get("shows");
        commit("setList", response.data);
      } catch (e) {
        commit("setLastError", e);
      } finally {
        commit("isLoading", false);
      }
    }
  },
  getters: {
    isLoading: state => {
      return state.isLoading;
    },
    filtered: state => (favoritesOnly, title) => {
      return state.list
        .filter(show => {
          return favoritesOnly ? true === show.isFavorites : true;
        })
        .filter(show => {
          return title ? show.title.match(title) : true;
        });
    }
  }
};
