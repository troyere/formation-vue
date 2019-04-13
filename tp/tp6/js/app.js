console.log(Vue.version);

Vue.component('Card', {
  props: ['title', 'description', 'status', 'image', 'creationDate', 'nbSeasons', 'genres', 'isFavorites'],
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
            <p class="card-header-title">{{titleFavorite}}</p>
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

const vm = new Vue({
  el: '#app',
  data() {
    return {
      title: 'TV shows store',
      shows: window.mockData.shows,
      searchTerm: null
    }
  },
  methods: {
    toggleFavorites(show) {
      this.$set(show, 'isFavorites', !show.isFavorites)
    },
    search() {
      this.shows = window.mockData.shows.filter(it => it.title.toUpperCase().indexOf(this.searchTerm.toUpperCase()) !== -1)
    }
  }
});

window.vm = vm;
