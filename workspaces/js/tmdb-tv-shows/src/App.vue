<template>
  <div id="app">
    <layout>
      <router-view></router-view>
    </layout>
  </div>
</template>

<script>
import Layout from "./components/Layout/Layout";

export default {
  components: {
    Layout
  },
  mounted() {
    this.$store.dispatch("shows/list/fetchTopRated");
  }
};
</script>
