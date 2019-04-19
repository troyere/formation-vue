<template>
  <nav class="navbar">
    <div class="navbar-brand">
      <router-link :to="{ name: 'home' }" class="navbar-item">
        <img src="../../assets/img/logo.jpg" alt="Logo" />
        Accueil
      </router-link>
    </div>
    <div class="navbar-menu">
      <div class="navbar-start">
        <router-link
          :to="{ name: 'shows' }"
          class="navbar-item"
          exact-active-class="is-active"
        >
          Recherche
        </router-link>
        <router-link
          :to="{ name: 'favorites' }"
          class="navbar-item"
          exact-active-class="is-active"
        >
          Favoris
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "navBar"
};
</script>

<style scoped>
.is-active {
  color: #00d1b2 !important;
}
</style>
