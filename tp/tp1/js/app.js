
const http = axios.create({
    baseURL: 'http://localhost:4000/rest'
})

const routes = [
    {
        name: 'home',
        path: '/',
        redirect: { name: 'shows' },
    },
    {
        name: 'shows',
        path: '/shows',
        component: ShowsPage
    },
    {
        name: 'favorites',
        path: '/shows/favorites',
        alias: ['/starred', '/mon-top-10'],
        component: ShowsPage,
        props: {
            favoritesOnly: true
        }
    },
    {
        name: 'show',
        path: '/shows/:id',
        component: ShowPage,
        props: true
    }
]

const router = new VueRouter({
    routes
})

Vue.use(VueRouter)

var app = new Vue({

  router,
  el: '#app',

  data() {
    return {
      title: 'TV shows store - Ho yeah !'
    }
  },

  methods: {}

})
