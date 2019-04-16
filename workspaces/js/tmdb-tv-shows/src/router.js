import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home";
import Search from "./views/Shows/Search";
import Details from "./views/Shows/Details";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      name: "home",
      path: "/",
      component: Home
    },
    {
      name: "shows",
      path: "/shows",
      component: Search
    },
    {
      name: "favorites",
      path: "/shows/favorites",
      alias: ["/starred", "/top"],
      component: Search,
      props: {
        favoritesOnly: true
      }
    },
    {
      name: "show",
      path: "/shows/:id",
      component: Details,
      props: true
    }
  ]
});
