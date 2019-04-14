<template>
  <div class="field">
    <label class="label">Search</label>
    <div class="control">
        <input
            class="input"
            type="text"
            :placeholder="inputPlacehoder"
            @keyup.enter="emit()"
            v-model="inputValue"
            v-auto-focus
        />
    </div>
  </div>
</template>

<script>
import AutoFocus from "../directives/AutoFocus";

export default {
  name: "search",
  directives: {
    AutoFocus
  },
  props: ["term", "placeholder"],
  watch: {
    term() {
      this.inputValue = this.term;
    },
  },
  data() {
    return {
      inputPlacehoder: this.placeholder,
      inputValue: ""
    };
  },
  methods: {
    emit() {
      this.$emit('search', this.inputValue)
    }
  }
};
</script>
