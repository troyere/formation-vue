<template>
  <div class="card-result">
    <div class="card">
      <div class="media">
        <div class="media-left is-marginless">
          <poster :path="show.poster_path"></poster>
        </div>
        <div class="media-content is-h278">
          <div class="card-content">
            <div class="columns">
              <div class="column">
                <p class="title is-6">
                  {{ show.name }}
                </p>
                <p class="subtitle is-6">
                  {{ show.first_air_date|nice-date }}
                </p>
              </div>
              <div class="column is-one-fifth has-text-right">
                <a @click="toggleIsFavorites()">
                  <span class="icon" :class="{ 'is-favorite': isFavorites }">
                    <i class="fa fa-star"></i>
                  </span>
                </a>
              </div>
            </div>
            <div class="card-description">
              <description :text="show.overview" :short="shortDescription">
              </description>
              <div v-if="detailsLinkEnabled">
                <router-link 
                  :to="{ name: 'show', params: { id: show.id } }"
                  class="has-text-grey-light"
                >
                  Plus d'informations
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Poster from "./Poster";
import Description from "./Description";
import NiceDate from "../../filters/NiceDate";

export default {
  name: "showCard",
  props: [
    "show",
    "shortDescription",
    "detailsLinkEnabled",
    "favoritedLinkEnabled"
  ],
  components: {
    Poster,
    Description
  },
  filters: {
    NiceDate
  },
  computed: {
    isFavorites() {
      return this.$store.getters["shows/favorites/exists"](this.show.id);
    },
    textIsFavorites() {
      return this.isFavorites
        ? `${this.show.title} is favorited !`
        : `${this.show.title} is not favorited !`;
    }
  },
  methods: {
    toggleIsFavorites() {
      if (this.isFavorites) {
        this.$store.dispatch("shows/favorites/remove", this.show.id);
      } else {
        this.$store.dispatch("shows/favorites/add", this.show.id);
      }
    },
    isEnded() {
      return "Ended" === this.show.status;
    }
  }
};
</script>
