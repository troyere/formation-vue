<template>
  <div class="card-result">
    <div class="card">
      <div class="columns is-mobile is-gapless is-multiline">
        <div class="column is-full-mobile">
          <poster :path="show.poster_path" />
        </div>
        <div class="column ">
          <div class="card-content">
            <p class="title is-6">
              {{ show.name }}
            </p>
            <p class="subtitle is-6">
              {{ show.first_air_date | niceDate }}
            </p>
            <!--<a @click="toggleIsFavorites()">
              <span class="icon" :class="{ 'is-favorite': isFavorites }">
                <i class="fa fa-star"></i>
              </span>
            </a>
            <description :text="show.overview" :short="shortDescription" />
            <div v-if="detailsLinkEnabled">
              <router-link
                :to="{ name: 'show', params: { id: show.id } }"
                class="has-text-grey-light"
              >
                Plus d'informations
              </router-link>
            </div>-->
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
