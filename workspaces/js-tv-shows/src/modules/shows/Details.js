import axios from "axios/index";

const client = axios.create({
  baseURL: "http://localhost:4000/rest"
});

export default {
  namespaced: true,
  state: {
    isLoading: false,
    lastError: null,
    show: null
  },
  mutations: {
    isLoading(state, isLoading) {
      state.isLoading = isLoading;
    },
    setLastError(state, lastError) {
      state.lastError = lastError;
    },
    setShow(state, show) {
      state.show = show;
    }
  },
  actions: {
    async fetch({ rootGetters, commit }, id) {
      if (0 === rootGetters["shows/list/get"].length) {
        commit("isLoading", true);
        try {
          const response = await client.get(`shows/${id}`);
          commit("setShow", response.data);
        } catch (e) {
          commit("setLastError", e);
        } finally {
          commit("isLoading", false);
        }
      } else {
        commit("setShow", rootGetters["shows/list/one"](id));
      }
    }
  },
  getters: {
    isLoading: state => {
      return state.isLoading;
    },
    get: state => {
      return state.show;
    }
  }
};
