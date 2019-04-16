<template>
  <div class="page">
    <banner :title="title">
      <search-bar
        v-on:search="onSearch"
        :term="searchTerm"
        :placeholder="searchPlaceholder"
      />
    </banner>
    <section class="section">
      <div class="container">
        <p v-if="isLoading">
          <i>Chargement en cours...</i>
        </p>
        <template v-else>
          <template v-if="shows.length > 0">
            <div class="columns is-mobile is-multiline">
              <template v-for="show in shows">
                <div class="column is-full-mobile is-full-tablet is-half-desktop is-one-third-widescreen is-one-quarter-fullhd" :key="show.id">
                  <card
                    :show="show"
                    :short-description="true"
                    :details-link-enabled="true"
                    :favorited-link-enabled="!favoritesOnly"
                  />
                </div>
              </template>
            </div>
          </template>
          <p v-else>
            Aucune show trouvée.
          </p>
        </template>
      </div>
    </section>
  </div>
</template>

<script>
import Banner from "../../components/Layout/Banner";
import Card from "../../components/Shows/Card";
import SearchBar from "../../components/Layout/SearchBar";

export default {
  name: "showsList",
  props: {
    favoritesOnly: Boolean
  },
  components: {
    Banner,
    SearchBar,
    Card
  },
  data() {
    return {
      title: "Recherche",
      searchPlaceholder: "Game of thrones, Breaking bad, ...",
      searchTerm: ""
    };
  },
  watch: {
    favoritesOnly() {
      this.searchTerm = "";
    }
  },
  mounted() {
    this.$store.dispatch("shows/list/fetch");
  },
  computed: {
    isLoading() {
      return this.$store.getters["shows/list/isLoading"];
    },
    shows() {
      return this.$store.getters["shows/list/get"];
        /*.filter(show => {
          return this.searchTerm ? show.title.match(this.searchTerm) : true;
        })
        .filter(show => {
          return this.favoritesOnly
            ? this.$store.getters["shows/favorites/exists"](show.id)
            : true;
        });*/
    }
  },
  methods: {
    onSearch(inputValue) {
      this.searchTerm = inputValue;
    }
  }
};
</script>
