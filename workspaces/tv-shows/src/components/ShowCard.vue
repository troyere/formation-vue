<template>
  <div class="card card-result">
    <div class="card-header">
      <p class="card-header-title">
        {{ show.title }}
      </p>
      <a
        v-if="favoritedLinkEnabled"
        class="card-header-icon"
        @click="toggleIsFavorited()"
      >
        <span class="icon" :class="{ 'is-favorite': internalIsFavorites }">
          <i class="fa fa-star"></i>
        </span>
      </a>
      <router-link
        v-if="detailsLinkEnabled"
        :to="{ name: 'show', params: { id: show.id } }"
        class="card-header-icon"
      >
        <span class="icon">
          <i class="fa fa-arrow-right"></i>
        </span>
      </router-link>
    </div>
    <div class="card-content">
      <div class="media">
        <div class="media-left">
          <figure class="image is-128x200">
            <img :src="show.images.poster" alt="Image" />
          </figure>
        </div>
        <div class="media-content">
          <p>
            <small>{{ textIsFavorited }}</small>
          </p>
          <p>{{ show.creation }} - {{ show.seasons }} seasons</p>
          <p class="tags">
            <span class="tag" v-for="genre in show.genres" :key="genre">
              {{ genre }}
            </span>
          </p>
          <p class="tags">
            <span
              class="tag"
              :class="{ 'is-warning': isEnded(), 'is-primary': !isEnded() }"
            >
              {{ show.status }}
            </span>
          </p>
          <div class="content">
            <truncated-text
              :text="show.description"
              :max-length="descriptionMaxLength"
            ></truncated-text>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ShowRepository from "../repository/ShowRepository";
import TruncatedText from "../components/TruncatedText";

export default {
  name: "showCard",
  props: [
    "show",
    "shortDescription",
    "detailsLinkEnabled",
    "favoritedLinkEnabled"
  ],
  components: {
    TruncatedText
  },
  data() {
    return {
      internalIsFavorites: this.show.isFavorites
    };
  },
  computed: {
    descriptionMaxLength() {
      return this.shortDescription ? 100 : -1;
    },
    textIsFavorited() {
      return this.internalIsFavorites
        ? `${this.show.title} is favorited !`
        : `${this.show.title} is not favorited !`;
    }
  },
  methods: {
    async toggleIsFavorited() {
      try {
        await ShowRepository.updateIsFavorites(!this.internalIsFavorites);
        this.internalIsFavorites = !this.internalIsFavorites;
      } catch (e) {
        // Il faut gérer l'erreur !
      }
    },
    isEnded() {
      return "Ended" === this.show.status;
    }
  }
};
</script>
