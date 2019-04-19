import Vue from "vue";
import App from "./App.vue";
import Debug from "./plugins/Debug";
import router from "./router";
import store from "./store";
import "./assets/scss/vendor/vendor.scss";

Vue.config.productionTip = false;

Vue.use(Debug, { dumpEvents: false });

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
