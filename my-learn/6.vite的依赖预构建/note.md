# vite的预加载

```js
// 非绝对路径/非相对路径的引用
import _ from "lodash"
```

在处理过程中如果看到了有非绝对路径或者非相对路径的引用，他则会尝试开启路径补全

```js
import _ from "/node_modules/.vite/deps/lodash"

// vite编译过后的lodash引用代码(路径补全)
import __vite__cjsImport0_lodash from "/node_modules/.vite/deps/lodash.js?v=c4ff4f64";
```

找寻依赖的过程是自当前目录依次向上查找的过程，直到搜寻到根目录或者搜寻到对应依赖为止
- 会先看当前目录下的node_modules有没有对应的依赖，如果没有的话，就会找当前目录的父级目录，一直搜寻到根目录为止

生产 和 开发
开发: yarn dev ---> 开发(每次依赖预构建所重新构建的相对路径都是正确的)

生产: vite会全权交给一个rollup的库完成生产环境的打包

缓存 ---> 

实际上vite在考虑另外一个问题的时候，就顺便把这个问题解决了

commonjs 规范的导出 module.exports

有的包是以 commonjs 的规范导出的 比如axios，那么 esmodule 是不认识这种导出规范的，为了解决这个问题，vite使用了一种解决方案，就是 依赖预构建

**依赖预构建**: 首先vite会找到对应的依赖，然后调用esbuild(对js语法进行处理的一个库)，将其他规范的代码转换成esmodule规范，然后放到当前目录下的node_modules/.vite/deps，同时对esmodule规范的各个模块进行统一集成，这一整个过程就叫做vite的依赖预构建

```js
// a.js
export default function a() { }
```

```js
// index.js
export { default as a } from "./a.js"

// import a form './a.js' // 先导入
// export const a = a // 再导出
```

vite重写以后
```js
// 直接不要导出语句，直接将a函数拿过来
function a() {}
```

他解决了3个问题：
1. 不同的第三方包会有不同的导出格式(这个是vite没法约束别人的事情)
2. 对路径的处理可以直接使用.vite/deps进行依赖查找，方便路径重写
3. 网络多包传输的性能问题(也是原生esmodule规范不敢支持node_modules的原因之一)，有了依赖预构建以后，无论有多少额外的export 和 import，都会尽可能的将他们进行集成，最后只生成一个或者几个模块

vite.config.js webpack.config.js