<template>
  <div class="shows-list">
    <h1 class="title">Shows</h1>
    <div class="field">
      <label class="label">Search</label>
      <div class="control">
        <input
          class="input"
          type="text"
          placeholder="Game of thrones, Breaking bad, ..."
          @keyup.enter="search()"
          v-model="searchInputValue"
          v-auto-focus
        />
      </div>
    </div>
    <p v-if="isLoading">
      <i>Chargement en cours...</i>
    </p>
    <template v-else>
      <template v-if="shows.length > 0">
        <template v-for="show in shows">
          <card
            :key="show.id"
            :show="show"
            :short-description="true"
            :details-link-enabled="true"
            :favorited-link-enabled="!favoritesOnly"
          >
          </card>
        </template>
      </template>
      <p v-else>
        Aucune show trouvée.
      </p>
    </template>
  </div>
</template>

<script>
import Card from "../../components/Shows/Card";
import AutoFocus from "../../directives/AutoFocus.vue";

export default {
  name: "showsList",
  props: {
    favoritesOnly: Boolean
  },
  components: {
    Card
  },
  directives: {
    AutoFocus
  },
  data() {
    return {
      searchInputValue: "",
      searchTitle: ""
    };
  },
  watch: {
    favoritesOnly() {
      this.searchInputValue = "";
      this.searchTitle = "";
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
      return this.$store.getters["shows/list/filtered"](
        this.favoritesOnly,
        this.searchTitle
      );
    }
  },
  methods: {
    search() {
      this.searchTitle = this.searchInputValue;
    }
  }
};
</script>
