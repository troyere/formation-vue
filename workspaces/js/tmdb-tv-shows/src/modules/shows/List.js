import Api from "../../api/TheMovieDB";

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
    async fetchTopRated({ commit }) {
      commit("isLoading", true);
      try {
        const response = await Api.get("/tv/top_rated");
        commit("setList", response.data.results);
      } catch (e) {
        commit("setLastError", e);
        throw e;
      } finally {
        commit("isLoading", false);
      }
    },
    async fetchQuery({ commit }, query) {
      commit("isLoading", true);
      try {
        const response = await Api.get("search/tv", {
          params: {
            query: query
          }
        });
        commit("setList", response.data.results);
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
