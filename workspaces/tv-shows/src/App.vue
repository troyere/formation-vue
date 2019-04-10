<template>
  <div id="app">
    <div class="container">
      <nav class="navbar">
        <div class="navbar-brand">
          <router-link :to="{name: 'home'}" class="navbar-item">
            <img src="img/logo.jpg" alt="Bulma: a modern CSS framework based on Flexbox"/>
            {{title}}
          </router-link>
        </div>
        <div class="navbar-menu">
          <div class="navbar-start">
            <router-link :to="{name: 'shows'}" class="navbar-item" exact-active-class="is-active">
              Search
            </router-link>
            <router-link :to="{name: 'favorites'}" class="navbar-item" exact-active-class="is-active">
              Favorite
            </router-link>
          </div>
        </div>
      </nav>
    </div>
    <router-view></router-view>
  </div>
</template>

<style lang="scss">

</style>
