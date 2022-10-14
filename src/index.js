import Vue from "vue";

const HelloWorld = {
  render: (h) => h("h1", "Hello, wolrd!"),
};

Vue.component("hello-world", HelloWorld);

new Vue({
  render: (h) => h("hello-world"),
}).$mount("#app");
