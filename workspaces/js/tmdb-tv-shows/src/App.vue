<template>
  <div id="app">
    <div class="container">
      <nav-bar />
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import NavBar from "./components/Layout/NavBar";

export default {
  components: {
    NavBar
  }
};
</script>
