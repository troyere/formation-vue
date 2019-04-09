console.log(Vue.version);

Vue.directive('focus', {
    inserted: function (el) {
        el.focus()
    }
})

Vue.component('truncatedText', {
    props: ['text', 'maxLength'],
    data() {
        return {
            myText: this.text,
            showAll: false,
        }
    },
    filters: {
        truncated: (value, maxLength) => {
            const ending = '...'
            if (value.length > maxLength) {
                return value.substring(0, maxLength - ending.length) + ending
            } else {
                return value
            }
        }
    },
    methods: {
        toggle: function () {
            this.showAll = !this.showAll
        }
    },
    template: `
        <span>
            <span v-if="!showAll" @click="toggle()">{{text|truncated(maxLength)}}</span>
            <span v-if="showAll" @click="toggle()">{{text}}</span>
        </span>
    `
})

Vue.component('card', {
    template: `
        <div class="card card-result">
            <div class="card-header">
                <p class="card-header-title">
                    {{title}}
                </p>
                <a class="card-header-icon" @click="toggleIsFavorited()">
                    <span class="icon" :class="{'is-favorite': internalIsFavorited}">
                        <i class="fa fa-star"></i>
                    </span>
                </a>
            </div>
            <div class="card-content">
                <div class="media">
                    <div class="media-left">
                        <figure class="image is-128x200">
                            <img :src="image" alt="Image"/>
                        </figure>
                    </div>
                    <div class="media-content">
                        <p>
                            <small>{{textIsFavorited}}</small>
                        </p>
                        <p class="">
                            {{createdAt}} - {{seasonNumber}} seasons
                        </p>
                        <p class="tags">
                            <span class="tag" v-for="genre in genres">{{genre}}</span>
                        </p>
                        <p class="tags">
                            <span class="tag" :class="{'is-warning': isEnded(), 'is-primary': !isEnded()}">
                                {{status}}
                            </span>
                        </p>
                        <div class="content">
                            <truncated-text :text="description" :max-length="35"></truncated-text>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    props: [
        'title',
        'description',
        'status',
        'image',
        'createdAt',
        'seasonNumber',
        'genres',
        'isFavorited',
    ],
    data() {
        return {
            internalIsFavorited: this.isFavorited
        }
    },
    computed: {
        textIsFavorited () {
            return this.internalIsFavorited ? `${this.title} is favorited !` : `${this.title} is not favorited !`
        },
    },
    methods: {
        toggleIsFavorited () {
            this.internalIsFavorited = !this.internalIsFavorited
        },
        isEnded () {
            return 'Ended' === this.status
        }
    }
})

var app = new Vue({
  el: '#app',

  data() {
    return {
      title: 'TV shows store - Ho yeah !',
      cards: mockData.shows,
    }
  },

  methods: {
    async searchCards (searchValue) {
        const response = await API.search(searchValue)
        this.cards = response
    }
  },

  // beforeCreate: function () {
  //   console.log('beforeCreate', this.message, this.$el)
  // },
  // create: function () {
  //   console.log('create', this.message, this.$el)
  // },
  // beforeMount: function () {
  //   console.log('beforeMount', this.message, this.$el)
  // },
  // mounted: function () {
  //   console.log('mounted', this.message, this.$el)
  // },
  // beforeUpdate: function () {
  //   console.log('beforeUpdate', this.message, this.$el)
  // },
  // updated: function () {
  //   console.log('updated', this.message, this.$el)
  // },
  // beforeDestroy: function () {
  //   console.log('beforeDestroy', this.message, this.$el)
  // },
  // destroyed: function () {
  //   console.log('destroyed', this.message, this.$el)
  // }
})


