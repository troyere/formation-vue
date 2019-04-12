export default {
  install(Vue, options) {
    // Filtre de test : dump dans la console
    Vue.filter("dump", function(str) {
      console.log(str);
      return str;
    });
    // Mixins de test : log des events
    Vue.mixin({
      beforeCreate() {
        if (options.dumpEvents) console.log("beforeCreate", this.$el);
      },
      created() {
        if (options.dumpEvents) console.log("created", this.$el);
      },
      beforeMount() {
        if (options.dumpEvents) console.log("beforeMount", this.$el);
      },
      mounted() {
        if (options.dumpEvents) console.log("mounted", this.$el);
      },
      beforeUpdate() {
        if (options.dumpEvents) console.log("beforeUpdate", this.$el);
      },
      updated() {
        if (options.dumpEvents) console.log("updated", this.$el);
      },
      beforeDestroy() {
        if (options.dumpEvents) console.log("beforeDestroy", this.$el);
      },
      destroyed() {
        if (options.dumpEvents) console.log("destroyed", this.$el);
      }
    });
  }
};
