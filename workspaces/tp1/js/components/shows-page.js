const ShowsPage = Vue.component('showsPage', {
    template: `
        <section class="hero is-primary">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title">Shows</h1>
                    <div class="field">
                        <label class="label">Search</label>
                        <div class="control">
                            <input
                                class="input"
                                type="text"
                                placeholder="Game of thrones, Breaking bad, ..."
                                @keyup.enter="search()"
                                v-model="searchInputValue"
                                v-focus
                            />
                        </div>
                    </div>

                    <p v-if="isLoading">
                        <i>Chargement en cours...</i>
                    </p>

                    <template v-else>

                        <template v-if="shows.length > 0">
                            <template v-for="show in shows">
                                <show-card
                                    :key="show.id"
                                    :show="show"
                                    :short-description="true"
                                    :details-link-enabled="true"
                                    :favorited-link-enabled="!favoritesOnly">
                                </show-card>
                            </template>
                        </template>

                        <p v-else>
                            Aucune show trouvée.
                        </p>

                    </template>

                </div>
            </div>
        </section>
    `,
    props: [
        'favoritesOnly'
    ],
    data() {
        return {
            searchInputValue: null,
            searchTitle: null,
            shows: [],
            isLoading: false
        }
    },
    watch: {
        favoritesOnly() {
            this.findShows()
        }
    },
    mounted() {
        this.findShows()
    },
    methods: {
        async findShows () {
            this.isLoading = true
            try {
                const response = await http.get('shows')

                const shows = response.data
                    .filter((show) => {
                        return this.favoritesOnly ? true === show.isFavorites : true
                    })
                    .filter((show) => {
                        return this.searchTitle ? show.title.match(this.searchTitle) : true
                    })

                this.shows = shows
            } catch (e) {
                this.shows = []
            } finally {
                this.isLoading = false
            }
        },
        search () {
            this.searchTitle = this.searchInputValue

            this.findShows()
        }
    },
})
