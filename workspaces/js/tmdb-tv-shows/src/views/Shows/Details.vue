<template>
  <div class="page">
    <banner :title="title" />
    <section class="section">
      <div class="container">
        <p v-if="isLoading">
          <i>Chargement en cours...</i>
        </p>
        <template v-else>
          <template v-if="show">
            <card :show="show" :favorited-link-enabled="true" />
          </template>
          <p v-else>Le show {{ id }} n'existe pas.</p>
        </template>
      </div>
    </section>
  </div>
</template>

<script>
import Banner from "../../components/Layout/Banner";
import Card from "../../components/Shows/Card";

export default {
  name: "showDetails",
  props: ["id"],
  components: {
    Banner,
    Card
  },
  mounted() {
    this.fetch();
  },
  watch: {
    id(newId, oldId) {
      if (newId && newId !== oldId) this.fetch();
    }
  },
  computed: {
    title() {
      const title = "Show details";
      return !this.isLoading && this.show
        ? `${title} for ${this.show.title}`
        : title;
    },
    isLoading() {
      return this.$store.getters["shows/details/isLoading"];
    },
    show() {
      return this.$store.getters["shows/details/get"];
    }
  },
  methods: {
    fetch() {
      this.$store.dispatch("shows/details/fetch", this.id);
    }
  }
};
</script>
