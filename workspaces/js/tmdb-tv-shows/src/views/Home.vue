<template>
  <div class="page">
    <banner :title="title" />
  </div>
</template>

<script>
import Banner from "../components/Layout/Banner";

export default {
  name: "home",
  components: {
    Banner
  },
  data() {
    return {
      title: "Bienvenue !"
    };
  }
};
</script>
