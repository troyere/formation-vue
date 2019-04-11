import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home";
import ShowsList from "./views/ShowsList";
import ShowDetails from "./views/ShowDetails";

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
      component: ShowsList
    },
    {
      name: "favorites",
      path: "/shows/favorites",
      alias: ["/starred", "/top"],
      component: ShowsList,
      props: {
        favoritesOnly: true
      }
    },
    {
      name: "show",
      path: "/shows/:id",
      component: ShowDetails,
      props: true
    }
  ]
});
