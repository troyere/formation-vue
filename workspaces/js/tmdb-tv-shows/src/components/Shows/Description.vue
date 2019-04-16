<template>
  <div class="content">
    <template v-if="text">
      {{ text | truncated(maxLength) }}
    </template>
    <template v-else>
      <i>{{ fallback | truncated(maxLength) }}</i>
    </template>
  </div>
</template>

<script>
import Truncated from "../../filters/Truncated";

export default {
  name: "showDescription",
  props: {
    text: {
      type: String,
      required: true
    },
    short: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      fallback: "Nous ne disposons d'aucun résumé traduit en français."
    };
  },
  filters: {
    Truncated
  },
  computed: {
    maxLength() {
      return this.short ? 20 : -1;
    }
  }
};
</script>
