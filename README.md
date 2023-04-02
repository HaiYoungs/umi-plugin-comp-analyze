# umi-plugin-comp-analyze

一个可以分析项目中使用的组件之间依赖关系的 umi 插件，灵感来源是工作中接手一个新项目时，常常为老的代码杂乱的组件引用关系头疼，想要重构但是又担心引发其他依赖的组件出 bug，通过全局搜索组件名查看组件引用关系又效率低下，于是想通过一个插件实现清晰直观的组件依赖关系展示。通过 umi 打包生成的 stats 对象中的模块引用关系构建组件引用关系，通过 antv 渲染组件引用关系图。

## Install

```bash
pnpm i umi-plugin-comp-analyze
```

## Usage

Configure in `.umirc.ts`,

```js
export default {
  plugins: [
    ['umi-plugin-comp-analyze'],
  ],
}
```

Start Analyze Server

```js
umi analyzeComp
or
umi ac
```

Example Image
![avatar](https://github.com/HaiYoungs/umi-plugin-comp-analyze/blob/feat-0.0.1/assets/example.png)

## Options

TODO

## LICENSE

MIT
