# はじめに
- .vue ファイルってなんとなく書いてるけどどうやってブラウザで動いてるんだろう？
- Vue2, Webpack (vue-cli) の話
    - Vue3, Vite とかはどうなってるか知らない
- 簡単のために css とか babel とかは登場しなくしてあります
- 「webpack こわい…」がちょっとでも解消されればいいな

## .vue ファイルって？
正式にはSFC (Single-File Component) という。こんなやつ
```html
<template>
  <div class="example">{{ msg }}</div>
</template>

<script>
export default {
  data() {
    return {
      msg: 'Hello world!'
    }
  }
}
</script>
```

これがみなさんのブラウザで動くまで、をやります。

# Vue Component とは

## Component を使わないで Vue を使う

```js
import Vue from "vue";

new Vue({
  render: (h) => h("div", "Hello, world!"),
}).$mount("#app");
```

- Vue は `render` を使って DOM をいじる

## Component にする

```js
import Vue from "vue";

const HelloWorld = {
  render: (h) => h("div", "Hello, wolrd!"),
};

Vue.component("hello-world", HelloWorld);

new Vue({
  render: (h) => h("hello-world"),
}).$mount("#app");
```

- `render` を持っているオブジェクトが component

## Component っぽくする

```js
import Vue from "vue";

const HelloWorld = {
  data: () => ({ msg: "Hello, world!" }),
  render(h) {
    return h("div", this.msg);
  },
};

Vue.component("hello-world", HelloWorld);

new Vue({
  render: (h) => h("hello-world"),
}).$mount("#app");
```

- component っぽくなってきた

## `render` 手で書くのダルくね？

- `vue-tepmplate-compiler` があります！
```html
<template>
  <div class="example">{{ msg }}</div>
</template>
```
↓ vue-template-compiler
```js
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "example" }, [_vm._v(_vm._s(_vm.msg))])
}
```

# SFC 登場

## コンポーネントを SFC として切り出す

```js
import Vue from "vue";
import HelloWorld from "./HelloWorld.vue";

Vue.component("hello-world", HelloWorld);

new Vue({
  render: (h) => h("hello-world"),
}).$mount("#app");
```

## でも、どうやって？

- webpack には loader という機能がある
    - JavaScript 以外のファイルをごにょごにょして最終的に JS になれば読める
- `vue-loader` を使います！

## webpack.config.js
```js
const VueLoaderPlugin = require("vue-loader/lib/plugin");

module.exports = {
  mode: "development",
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
    ],
  },
  plugins: [new VueLoaderPlugin()],
};
```

- `.module.rules` にごにょごにょを書く
    - `test` に一致する import はさきに loader が通されてから import される
- `VueLoaderPlugin` は template-compiler を使うために必要らしい

## vue-loader
[vue-loader#how-it-works](https://www.npmjs.com/package/vue-loader/v/15.10.0#how-it-works) から引用

> 1. vue-loader parses the SFC source code into an SFC Descriptor using `@vue/component-compiler-utils`. It then generates an import for each language block so the actual returned module code looks like this:

```js
// code returned from the main loader for 'source.vue'

// import the <template> block
import render from 'source.vue?vue&type=template'
// import the <script> block
import script from 'source.vue?vue&type=script'
export * from 'source.vue?vue&type=script'
// import <style> blocks
import 'source.vue?vue&type=style&index=1'

script.render = render
export default script
```
 
 - JavaScript になった！めでたしめでたし。

## sample code

https://github.com/kentahama/workshop-vue2-sfc に置いたので手元で動かしたい方はどうぞ！
