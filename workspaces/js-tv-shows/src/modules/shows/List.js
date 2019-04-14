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
        throw e;
      } finally {
        commit("isLoading", false);
      }
    }
  },
  getters: {
    isLoading: state => {
      return state.isLoading;
    },
    get: state => {
      return state.list;
    },
    one: state => id => {
      const filtered = state.list.filter(show => show.id === id);
      return 1 === filtered.length ? filtered[0] : null;
    }
  }
};
