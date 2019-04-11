import Vue from "vue";
import App from "./App.vue";
import DebugPlugin from "./plugins/DebugPlugin";
import router from "./router";
import store from "./store";
import "./assets/css/app.css";

Vue.config.productionTip = false;

Vue.use(DebugPlugin, { dumpEvents: true });

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
