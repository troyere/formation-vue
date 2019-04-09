console.log(Vue.version);

const vm = new Vue({
  el: '#app',
  data() {
    return {
      title: 'TV shows store'
    }
  },
  beforeCreate() {
    console.log('beforeCreate', this.title, this.$el)
  },
  created() {
    console.log('created', this.title, this.$el)
  },
  beforeMount() {
    console.log('beforeMount', this.title, this.$el)
  },
  mounted() {
    console.log('mounted', this.title, this.$el)
  },
  beforeUpdate() {
    console.log('beforeUpdate', this.title, this.$el)
  },
  updated() {
    console.log('updated', this.title, this.$el)
  },
  beforeDestroy() {
    console.log('beforeDestroy', this.title, this.$el)
  },
  destroyed() {
    console.log('destroyed', this.title, this.$el)
  }
});

window.vm = vm;

console.log(vm);
