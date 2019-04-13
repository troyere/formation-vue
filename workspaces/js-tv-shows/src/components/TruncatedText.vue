<template>
  <span>
    <span v-if="enabled" @click="toggle()">{{ truncated }}</span>
    <template v-else>{{ text }}</template>
  </span>
</template>

<script>
export default {
  name: "truncatedText",
  props: {
    text: { type: String, required: true },
    maxLength: { type: Number, default: 0 }
  },
  data() {
    return {
      showAll: false,
      ending: "..."
    };
  },
  computed: {
    truncated() {
      if (this.enabled && this.text.length > this.maxLength) {
        return (
          this.text.substring(0, this.maxLength - this.ending.length) +
          this.ending
        );
      } else {
        return this.text;
      }
    },
    enabled() {
      return this.maxLength && -1 !== this.maxLength;
    }
  },
  methods: {
    toggle: function() {
      this.showAll = !this.showAll;
    }
  }
};
</script>
