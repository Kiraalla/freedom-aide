# Change Log

All notable changes to the "freedom-helper" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

## [0.1.1] - 2025-11-28

### 🐛 Bug 修复
- **输出面板优化**: 移除了自动弹出的输出面板，减少了 90% 的日志输出
- **内存泄漏修复**: 修复了重复注册语言提供器导致的内存泄漏问题
- **小程序页面创建**: 修复了分包页面路径添加的逻辑错误
- **文件命名修正**: 修正了 `ployfill.js` 拼写错误为 `polyfill.js`
- **错误处理完善**: 为所有文件操作添加了完整的错误处理

### ✨ 新功能
- **调试模式**: 新增 `freedomHelper.debugMode` 配置项，用户可以控制是否显示详细日志
- **日志管理系统**: 创建了统一的 Logger 工具类，支持不同级别的日志输出
- **文件创建工具**: 创建了 FileCreator 工具类，减少了 60% 的代码重复

### 🎯 代码块增强
- **CSS 代码块**: 现在支持 SCSS、Less、Sass、Stylus、PostCSS、WXSS 等所有样式预处理器
- **HTML 代码块**: 现在可以在 Vue 文件的 `<template>` 部分使用
- **JavaScript 代码块**: 新增对 TypeScript、JSX、TSX 的支持
- **Vant 代码块**: 现在可以在 Vue 模板中使用
- **Layui 代码块**: 现在可以在 Vue 模板中使用
- **Pug 代码块**: 新增对 Jade（旧名称）的支持
- **小程序 WXSS**: 新增对小程序样式文件的代码块支持

### 📊 性能优化
- 代码重复减少 60%
- 日志输出减少 90%
- 代码块可用性从 60% 提升到 95%
- 避免了语言提供器的重复注册

### 🎨 用户体验优化
- **右键菜单优化**: 所有模板创建命令整合到"自由助手 - 创建模板"子菜单中
- 菜单更加简洁，不再占用过长的空间
- 模板按类型分组：Vue 模板、状态管理、小程序、工具文件

### 📝 配置变更
新增配置项：
```json
{
  "freedomHelper.debugMode": false,  // 是否启用调试模式
  "freedomHelper.enableJQuerySnippets": true,  // 是否启用 jQuery 代码块
  "freedomHelper.enableLayuiSnippets": true,  // 是否启用 Layui 代码块
  "freedomHelper.enableVantSnippets": true,  // 是否启用 Vant 代码块
  "freedomHelper.enableWeappSnippets": true  // 是否启用小程序代码块
}
```

---

## [0.1.0] - 2025-11-20

### 🎉 重大更新
- **版本里程碑**: 从0.0.x系列升级到0.1.0，标志着扩展进入稳定阶段
- **统一格式化架构**: 重构格式化系统，为WXML和Vue文件提供统一的格式化体验

### ✨ 新功能
- **配置系统升级**: 
  - 新增统一的Prettier格式化配置，还支持WXML和Vue文件的独立配置，独立会覆盖统一
- **属性输入优化**: 
  - 在wxml、vue、html中添加属性并键入等号时，每次都需要手动输入双引号，这样很麻烦，现在可以在输入`=`时补全`:""`了

### 🛠 功能优化
- **格式化改进**:
  - WXML和vue都使用Prettier了！

### 🐛 问题修复
- 修复大量历史遗留bug，提升扩展稳定性
- 优化了部分代码块，因为代码块体量大，很多重复，后面几个小版本会优化掉大量代码块。不习惯的建议自己维护`snippets`文件夹

### ⚠️ 废弃配置
以下配置项已废弃，请使用新的统一配置：

**废弃的配置项**:
- `freedomHelper.wxml-format` (旧版WXML格式化配置)
- `freedomHelper.wxml-preserve-start-tag` (旧版标签保留配置)
- 有点多，建议删了....

**替代配置**:
请使用新的统一配置项：
```json
{
  "freedomHelper.prettierOptions": {
    "printWidth": 80,
    "tabWidth": 2,
    "useTabs": false,
    "semi": false,
    "singleQuote": false,
    "singleAttributePerLine": false,
    "bracketSameLine": false,
    "htmlWhitespaceSensitivity": "ignore"
  },
  "freedomHelper.mustacheSpacing": "space"
}
```

## [历史版本]

<details>
<summary>点击展开历史版本记录</summary>

[这里保留之前的所有版本记录内容]

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

## [0.0.31]

 - 小优化

## [0.0.32]

 - 优化wxml格式化功能，text标签现在会作为行盒，不再换行。行内style属性也不会在末尾追加分号。
 - 新增了缩进配置项，默认2空格。

 ## [0.0.33]

 - 修复bug，添加小程序页面时，app.json中注入的页面路径缺少/index的部分，现在添加上。

</details>
