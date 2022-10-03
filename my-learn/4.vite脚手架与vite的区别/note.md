# vite脚手架与vite

vite官网搭建vite项目文档教程：https://vitejs.cn/guide/#scaffolding-your-first-vite-project

比如我们敲了```yarn create vite```，他会默认做两件事情

1. 帮我们全局安装一个东西：create-vite (create-vite 是 vite 的脚手架)
2. 直接运行create-vite bin目录下的一个执行配置

类似于vue-cli与webpack的关系

我们会存在一个误区：**认为官网中使用对应yarn create构建项目的过程也是vite的事情**

create-vite 与 vite 的关系：create-vite 内置了 vite
类似于vue-cli与webpack的关系：vue-cli 内置了 webpack

# 预设

create-vite会提供一套预设，在这个预设中，crreate-vite已经现在好了vite，vue，post-css等工具，并且把配置调整到了最佳实践

类似于买房子：
  - 毛坯房：从0开始装修(自己搭建项目：下载vite vue post-css bable等)
  - 精装房：已经装修好了(create-vite提供一套预设模板：vite vue post-css bable等已经下载好了，并且做好了配置的最佳实践)