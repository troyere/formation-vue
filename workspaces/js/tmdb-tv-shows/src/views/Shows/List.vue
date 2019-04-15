<template>
  <div class="shows-list">
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">Shows</h1>
          <search
            v-on:search="onSearch"
            :term="searchTerm"
            :placeholder="searchPlaceholder"
          >
          </search>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <p v-if="isLoading">
          <i>Chargement en cours...</i>
        </p>
        <template v-else>
          <template v-if="shows.length > 0">
            <div class="columns is-multiline">
              <template v-for="show in shows">
                <div class="column is-half" :key="show.id">
                  <card
                    :show="show"
                    :short-description="true"
                    :details-link-enabled="true"
                    :favorited-link-enabled="!favoritesOnly"
                  >
                  </card>
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
import Card from "../../components/Shows/Card";
import Search from "../../components/Search";

export default {
  name: "showsList",
  props: {
    favoritesOnly: Boolean
  },
  components: {
    Search,
    Card
  },
  data() {
    return {
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
