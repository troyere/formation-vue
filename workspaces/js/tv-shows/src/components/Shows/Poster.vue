<template>
  <figure class="image" :class="classes">
    <template v-if="available">
      <img :src="src" alt="Image" />
    </template>
    <template v-else>
      <span class="fa fa-image fa-5x"></span>
    </template>
  </figure>
</template>

<script>
export default {
  name: "showPoster",
  props: {
    path: {
      type: String,
      default: null
    }
  },
  computed: {
    available() {
      return !!this.path;
    },
    classes() {
      return this.available 
        ? `is-185x278` 
        : `is-185x278 no-image-holder`;
    },
    src() {
      return this.url("w185_and_h278_bestv2");
    },
  },
  methods: {
    url(size) {
      return `https://image.tmdb.org/t/p/${size}${this.path}`;
    }
  }
};
</script>
