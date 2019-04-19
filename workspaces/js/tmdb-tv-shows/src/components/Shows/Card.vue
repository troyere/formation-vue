<template>
  <div class="card" style="height: 100%;">
    <div class="is-flex-tablet" style="height: 100%;">
      <div class="ratio-16-9" style="flex: 0 0 auto;">
        <poster :path="show.poster_path" />
      </div>
      <div style="display: flex; flex-direction: column; flex: 1 1 auto;height: 100%;">
        <div class="card-title">
          <p class="title is-6">
            {{ show.name }}
          </p>
          <p class="subtitle is-6">
            {{ show.first_air_date | niceDate }}
          </p>
        </div>
        <div class="card-content">
          <description :short="true">
            {{ show.overview }}
          </description>
        </div>
        <div class="card-footer" style="margin-top: auto;">
          <a class="card-footer-item" @click="toggleIsFavorites()">
            <span class="icon" :class="{ 'is-favorite': isFavorites }">
              <i class="fa fa-star"></i>
            </span>
          </a>
          <router-link
            class="card-footer-item"
            v-if="detailsLinkEnabled"
            :to="{ name: 'show', params: { id: show.id } }"
          >
            <span class="icon">
              <i class="fa fa-arrow-right"></i>
            </span>
          </router-link>
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
    "singleLine",
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
    },
    posterSizes() {
      if (this.singleLine) {
        return "is-full-mobile is-two-fifths-tablet is-one-fifth-desktop is-one-fifth-widescreen is-one-fifth-fullhd";
      } else {
        return "is-full-mobile is-two-fifths-tablet is-two-fifths-desktop is-half-widescreen is-half-fullhd";
      }
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

<style scoped>
.is-favorite {
  color: #ffdd57;
}

.card-title {
  padding: 1.5rem;
  padding-bottom: 0;
}

.card-title + .card-content {
  padding: 1.5rem;
  padding-top: 1rem;
}

.ratio-16-9 {
  width: 185px;
  position: relative;
  /*background-color: #eee;*/
  /*background-image: url(https://placeimg.com/1000/1000/nature);*/
  /*background-size: cover;*/
  padding-top: 100.5027%;
  background: grey;
}

/*.ratio-16-9:before {*/
/*  content: "";*/
/*  display: block;*/
/*  height: 0;*/
/*  padding-top: 100.5027%;*/
/*}*/
</style>
