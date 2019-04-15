<template>
  <div class="show-details">
    <h1 class="title">
      Show details
      <span v-if="!isLoading && show">for "{{ show.title }}"</span>
    </h1>
    <p v-if="isLoading">
      <i>Chargement en cours...</i>
    </p>
    <template v-else>
      <template v-if="show">
        <card :show="show" :favorited-link-enabled="true"></card>
      </template>
      <p v-else>Le show {{ id }} n'existe pas.</p>
    </template>
  </div>
</template>

<script>
import Card from "../../components/Shows/Card";

export default {
  name: "showDetails",
  props: ["id"],
  components: {
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
