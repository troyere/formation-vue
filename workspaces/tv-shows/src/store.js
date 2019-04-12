import Vue from "vue";
import Vuex from "vuex";
import Shows from "./modules/shows/Shows";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    shows: Shows
  }
});
