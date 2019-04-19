<template>
  <figure class="image">
    <template v-if="available">
      <img :src="src" alt="Image" />
    </template>
    <template v-else>
      <div class="no-image-holder">
        <span class="fa fa-image fa-5x"></span>
      </div>
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
    src() {
      return this.url("w185_and_h278_bestv2");
    }
  },
  methods: {
    url(size) {
      return `http://image.tmdb.org/t/p/${size}${this.path}`;
    }
  }
};
</script>

<style scoped>
.no-image-holder {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #dbdbdb;
  color: #b5b5b5;
  padding: 3rem 0;
}
</style>
