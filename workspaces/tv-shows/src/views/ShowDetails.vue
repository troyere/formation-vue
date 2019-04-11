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
        <show-card :show="show" :favorited-link-enabled="true"> </show-card>
      </template>
      <p v-else>Le show {{ id }} n'existe pas.</p>
    </template>
  </div>
</template>

<script>
import ShowRepository from "../repository/ShowRepository";
import ShowCard from "../components/ShowCard";

export default {
  name: "showDetails",
  props: {
    id: Number
  },
  components: {
    ShowCard
  },
  data() {
    return {
      show: null,
      isLoading: false
    };
  },
  watch: {
    id() {
      this.findShow();
    }
  },
  mounted() {
    this.findShow();
  },
  methods: {
    async findShow() {
      this.isLoading = true;
      try {
        const response = await ShowRepository.findOne(this.id);
        this.show = response.data;
      } catch (e) {
        this.show = null;
      } finally {
        this.isLoading = false;
      }
    }
  }
};
</script>
