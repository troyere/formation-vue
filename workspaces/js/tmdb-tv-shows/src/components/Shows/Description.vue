<template>
  <div class="description">
    <template v-if="text">
      {{ text | truncated(maxLength) }}
    </template>
    <template v-else>
      <i>{{ fallback }}</i>
    </template>
  </div>
</template>

<script>
import Truncated from "../../filters/Truncated";

export default {
  name: "showDescription",
  filters: {
    Truncated
  },
  props: {
    short: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      text: "",
      fallback: "Nous ne disposons d'aucun résumé traduit en français."
    };
  },
  mounted() {
    this.text = this.$slots.default[0].text.trim();
  },
  computed: {
    maxLength() {
      return this.short ? 170 : -1;
    }
  }
};
</script>

<style scoped>
.description {
  font-size: 0.85rem;
}
</style>
