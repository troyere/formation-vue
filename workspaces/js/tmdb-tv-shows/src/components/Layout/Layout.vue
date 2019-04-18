<template>
  <div class="layout">
    <div class="container">
      <nav-bar />
    </div>
    <slot />
  </div>
</template>

<script>
import NavBar from "./NavBar";

export default {
  components: {
    NavBar
  }
};
</script>
