const TruncatedText = Vue.component('truncatedText', {
    props: ['text', 'maxLength'],
    data() {
        return {
            showAll: false,
            ending: '...',
        }
    },
    computed: {
        truncated() {
            if (this.maxLength && this.text.length > this.maxLength) {
                return this.text.substring(0, this.maxLength - this.ending.length) + this.ending
            } else {
                return this.text
            }
        },
        enabled() {
            return this.maxLength && -1 !== this.maxLength
        }
    },
    methods: {
        toggle: function () {
            this.showAll = !this.showAll
        }
    },
    template: `
        <span>
            <template v-if="enabled">
                <span v-if="!showAll" @click="toggle()">{{truncated}}</span>
                <span v-if="showAll" @click="toggle()">{{text}}</span>
            </template>
            <template v-else>
                {{text}}
            </template>
        </span>
    `
})