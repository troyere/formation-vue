console.log(Vue.version);

Vue.component('Card', {
  props: ['showId', 'title', 'description', 'status', 'image', 'creationDate', 'nbSeasons', 'genres', 'isFavorites'],
  data() {
    return {
      longDescription: false
    }
  },
  computed: {
    titleFavorite() {
      return `${this.title} is ${this.isFavorites ? '' : 'not'} favorites!`
    }
  },
  methods: {
    toggleFavorites() {
      this.$emit('toggle-favorites')
    },
    toggleDescription() {
      this.longDescription = !this.longDescription
    }
  },
  template: `<div class="card card-result">
        <div class="card-header">
            <router-link class="card-header-title" :to="{name: 'showDetail', params: { showId: showId }}">
                {{titleFavorite}}
            </router-link>
            <a class="card-header-icon" @click="toggleFavorites()">
                <span class="icon" :class="{'is-favorite': isFavorites}">
                    <i class="fa fa-star"></i>
                </span>
            </a>
        </div>
        <div class="card-content">
            <div class="media">
                <div class="media-left">
                    <figure class="image is-128x200">
                        <img :src="image" alt="Image">
                    </figure>
                </div>
                <div class="media-content">
                    <p class="">Created in {{creationDate}} - {{nbSeasons}} seasons</p>
                    <p class="tags"><span class="tag" v-for="genre in genres">{{genre}}</span></p>
                    <p class="tags"><span class="tag is-primary">{{status}}</span></p>
                    <div class="content" @click="toggleDescription()">
                      <span v-if="longDescription">{{description}}</span>
                      <span v-else>{{description | truncate(35)}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>`
});

const Shows = Vue.component('Shows', {
  data() {
    return {
      title: 'TV shows store',
      shows: window.mockData.shows,
      searchTerm: null
    }
  },
  methods: {
    toggleFavorites(show) {
      this.$set(show, 'isFavorites', !show.isFavorites);
      // Redirect to detail if add to favorites
      if (show.isFavorites) {
        this.$router.push({name: 'showDetail', params: {showId: show.id}})
      }
    },
    search() {
      this.shows = window.mockData.shows.filter(it => it.title.toUpperCase().indexOf(this.searchTerm.toUpperCase()) !== -1)
    }
  },
  template: `<div>
    <h1 class="title">{{title}}</h1>
    <div class="field">
        <label class="label">Search</label>
        <div class="control">
            <input v-model="searchTerm" class="input" type="text" placeholder="Game of thrones, Breaking bad, ..." @keypress.enter="search()" v-focus>
        </div>
    </div>
    <Card :title="show.title" :description="show.description"
        :status="show.status" :is-favorites="show.isFavorites" :image="show.images.poster"
        :creation-date="show.creation" :nb-seasons="show.seasons" :genres="show.genres"
        @toggle-favorites="toggleFavorites(show)" v-for="show in shows" :key="show.id" :show-id="show.id"></Card>
    </div>`
});

const Favorites = Vue.component('Favorites', {
  data() {
    return {
      title: 'Favorites TV shows',
      shows: window.mockData.shows
    }
  },
  computed: {
    favoritesShows() {
      return this.shows.filter(it => it.isFavorites)
    }
  },
  methods: {
    toggleFavorites(show) {
      this.$set(show, 'isFavorites', !show.isFavorites)
    }
  },
  template: `<div>
    <h1 class="title">{{title}}</h1>
    <Card :title="show.title" :description="show.description"
        :status="show.status" :is-favorites="show.isFavorites" :image="show.images.poster"
        :creation-date="show.creation" :nb-seasons="show.seasons" :genres="show.genres"
        @toggle-favorites="toggleFavorites(show)" v-for="show in favoritesShows" :key="show.id" :show-id="show.id"></Card>
    </div>`
});

const ShowDetail = Vue.component('ShowDetail', {
  props: ['showId'],
  computed: {
    show() {
      return window.mockData.shows.find(it => it.id === parseInt(this.showId))
    }
  },
  template: `<div>
    <h1 class="title">{{show.title}}</h1>
    <Card :title="show.title" :description="show.description"
        :status="show.status" :is-favorites="show.isFavorites" :image="show.images.poster"
        :creation-date="show.creation" :nb-seasons="show.seasons" :genres="show.genres" :show-id="show.id"></Card>
    </div>`
});

Vue.directive('focus', {
  inserted: function (el) {
    el.focus()
  }
});

Vue.filter('truncate', (value, truncate) => {
  if (truncate > 0) {
    return value.substr(0, truncate) + '...'
  }
  return value
});

const router = new VueRouter({
  routes: [
    {name: 'shows', path: '/shows', component: Shows},
    {name: 'showDetail', path: '/shows/:showId', component: ShowDetail, props: true},
    {name: 'favorites', path: '/favorites', component: Favorites, alias: '/starred'},
    {name: 'home', path: '', redirect: '/shows'}
  ]
});

const vm = new Vue({
  el: '#app',
  router,

});

window.vm = vm;
