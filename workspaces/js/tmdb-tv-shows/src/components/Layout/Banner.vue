<template>
  <section class="hero is-primary">
    <div class="hero-body">
      <div class="container">
        <h1 class="title">{{ title }}</h1>
        <slot />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "banner",
  props: {
    title: {
      type: String,
      required: true
    }
  }
};
</script>
