const ShowPage = Vue.component('showPage', {
    template: `
        <section class="hero is-primary">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title">
                        Show details
                        <span v-if="!isLoading && show">for "{{show.title}}"</span>
                    </h1>

                    <p v-if="isLoading">
                        <i>Chargement en cours...</i>
                    </p>

                    <template v-else>

                        <template v-if="show">
                            <show-card
                                :show="show"
                                :favorited-link-enabled="true">
                            </show-card>
                        </template>

                        <p v-else>
                            Le show {{id}} n'existe pas.
                        </p>

                    </template>
                </div>
            </div>
        </section>
    `,
    props: [
        'id'
    ],
    data() {
        return {
            show: null,
            isLoading: false
        }
    },
    watch: {
        id() {
            this.findShow()
        }
    },
    mounted() {
        this.findShow()
    },
    methods: {
        async findShow () {
            this.isLoading = true
            try {
                const response = await http.get(`shows/${this.id}`)

                this.show = response.data
            } catch (e) {
                this.show = null
            } finally {
                this.isLoading = false
            }
        },
    }
})
