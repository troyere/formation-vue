<template>
  <span @click="toggle()">
    {{displayedText}}
  </span>
</template>

<script>
export default {
  name: "truncated",
  props: ["maxLength"],
  data() {
    return {
      text: "",
      ending: "...",
      showAll: false,
    };
  },
  mounted() {
    this.text = this.$slots.default[0].text;
  },
  computed: {
    enabled() {
      return this.maxLength && -1 !== this.maxLength;
    },
    displayedText() {
      if (this.enabled && !this.showAll && this.text.length > this.maxLength) {
        return this.text.substring(0, this.maxLength - this.ending.length) + this.ending;
      } else {
        return this.text;
      }
    }
  },
  methods: {
    toggle: function() {
      if (this.enabled) this.showAll = !this.showAll;
    }
  }
};
</script>
