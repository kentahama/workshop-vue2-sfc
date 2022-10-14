import Vue from "vue";
import HelloWorld from "./HelloWorld.vue";

Vue.component("hello-world", HelloWorld);

new Vue({
  render: (h) => h("hello-world"),
}).$mount("#app");
