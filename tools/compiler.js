const fs = require("node:fs");
const { parse, compileTemplate } = require("@vue/component-compiler-utils");
const vueTemplateCompiler = require("vue-template-compiler");

const filename = "./src/HelloWorld.vue";
const source = fs.readFileSync(filename).toString();

// console.log(source);

const parsed = parse({
  source,
  filename,
  compiler: vueTemplateCompiler,
});

// console.log(parsed);

fs.writeFileSync("out.template.html", parsed.template.content);
fs.writeFileSync("out.script.js", parsed.script.content);

const template = compileTemplate({
  source: parsed.template.content,
  filename,
  compiler: vueTemplateCompiler,
});

// console.log(template.code);

fs.writeFileSync("out.template.render.js", template.code);

fs.writeFileSync(
  "out.js",
  `
// code returned from the main loader for 'source.vue'

// import the <template> block
import render from 'out.template.render.js'
// import the <script> block
import script from 'out.script.js'
export * from 'out.script.js'

script.render = render
export default script`
);
