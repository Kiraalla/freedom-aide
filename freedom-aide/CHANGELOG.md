# Change Log

All notable changes to the "creat-weapp-template" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

## [0.0.1]

- 火急火燎地发布第一个版本

## [0.0.2]

- 生成文件的代码缩进有问题，干脆直接改没缩进了！

## [0.0.3]

- 修复index.json里的初始配置

## [0.0.4]

- 增加wxml格式化！

## [0.0.5]

- 增加js/wxml代码块！

## [0.0.6]

- 增加wxml标签高亮、可配置。

## [0.0.7]

- 支持小程序页面创建

## [0.0.8]

- 添加微信API简写、es6语法简写的简写对照
- 添加小程序页面时，可以将路径追加在app.js的pages中了

## [0.0.9]

- 修复一点点排版bug

## [0.0.10]

- 添加了css、JQ、Layui、Vant代码块

## [0.0.11 -0.0.12]

- 修复bug

## [0.0.13]

- 加了点css代码块

## [0.0.14]

- 加了vue代码块，支持vue-peek，可以快速查看组件的属性和方法，突出一个大杂烩

## [0.0.15]

- 修复bug

## [0.0.16]

- 修复bug

## [0.0.17]

 - 添加标签跳转定义

## [0.0.18]

 - 修复bug 优化vue的style模块内代码提示，现在lang=scss|postcss|less|stylus|css可以自动提示

## [0.0.19]

 - 添加部分代码块,优化pug在vue模板中的代码提示

## [0.0.20]

 - 支持创建html、vue2\vue3、pinia\vuex\service模板

## [0.0.21]

 - 优化创建模板，现在不必写后缀.vue了，直接写模板名即可

## [0.0.22]

 - 优化创建模板,现在禁止创建同名文件夹，而创建同名文件会提示覆盖。新增vue的语法提示和代码格式化，现在vue文件的style默认使用postcss，不必写lang了

## [0.0.23]

 - 修个bug，vue-js里像af、afb、cl这样的缩写没支持到，现在支持了

## [0.0.24]

 - 修复大量bug，大量大量大量……

## [0.0.25]

 - 再修一个bug

## [0.0.26]

 - 再修一个bug

## [0.0.27]

 - 再修一个bug...

## [0.0.28]

 - 再修一个bug...(这次是一个小bug，接下来将进入一个稳定的阶段。)

## [0.0.29]

 - 优化一下代码块，vue文件中无法应用js的基础代码块，现在可以了。(对照表没有更新，但代码块可以正常对照使用)
 - vue文件的style内的calc计算属性中的%符号会在格式化时添加空格引起错误，现在修复了。

## [0.0.30]

 - 优化一下代码块，text标签有时候不需要添加类名，且不需要换行，现在通过text可以添加无类名的text标签，通过textc可以添加有类名的text标签，且换行。
 - 修复bug，修复了wxml中的style标签的格式化问题，它错误地将三元表达式的?后面追加了一个分号，且在{{}}后面也会追加分号，现在修复了。
 - 修复bug，在微信小程序中，创建页面时自动追加路径到app.js的pages中，但在分包里创建页面路径还是会追加到主包的pages中，现在修复了。在对应分包的pages上右键创建页面时，会自动选择分包的pages。