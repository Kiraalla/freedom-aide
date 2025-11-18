"use strict";
/*
 * @Author: cnyballk[https://github.com/cnyballk]
 * @Date: 2018-08-31 10:43:17
 * @Last Modified by: cnyballk[https://github.com/cnyballk]
 * @Last Modified time: 2018-09-03 12:52:47
 */
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const cny_js_beautify_1 = require("cny_js_beautify");
const format_core_1 = require('./format_core');

class FormatWxml {
  init() {
    this.editor = vscode_1.window.activeTextEditor;
    if (!this.editor) throw new Error('no active editor');
    if (this.editor.document.languageId === 'wxml') {
      const doc = this.editor.document;
      const text = this.beauty(doc.getText());
      this.lineNumber = doc.lineCount;
      this.writeToFile(text);
    }
  }

  getConfig() {
    // 读取用户在 package.json 中定义的配置项
    const userConfig = vscode_1.workspace.getConfiguration('freedomAide');
    // 主要的格式化选项存放在 freedomAide.wxml-format
    /** @type {*} */
    const formatCfg = userConfig.get('wxml-format', {});
    // 只保留下划线风格，避免类型混乱
    const indent_size = (formatCfg.indent_size || formatCfg.indentSize) || userConfig.get('indentSize', 2);
    const indent_char = (formatCfg.indent_char || formatCfg.indentChar) || userConfig.get('indentChar', ' ');
    return Object.assign({}, formatCfg, {
      indent_size,
      indent_char,
      // 保留原始起始标签策略（默认 true）
      preserveStartTag: userConfig.get('wxml-preserve-start-tag', true),
      // mustache 空格策略: 'space' | 'preserve' | 'nospace'
      mustacheSpacing: userConfig.get('wxml-mustache-spacing', 'space'),
      // 新增：属性单行控制（true => 所有属性尽量保持在一行；false/null => 默认策略）
      attrsSingleLine: userConfig.get('wxml-attrs-single-line', null),
    });
  }

  beauty(text) {
    // 使用独立的 format_core 处理解析与格式化（更稳健）
    const userConfig = this.getConfig();
    // 在 core 中已经处理了 mustache mask/unmask 与 style 格式化
    return format_core_1.formatWxmlText(text, userConfig);
  }

  // 将所有 {{...}} 替换为占位符，并返回映射表
  maskMustache(text) {
    const map = [];
    let idx = 0;
    const masked = text.replace(/{{([\s\S]*?)}}/g, (match, inner) => {
      const token = `__WXML_EXPR_${idx}__`;
      map.push({ token, original: match });
      idx++;
      return token;
    });
    return { text: masked, map };
  }

  // 把占位符替换回原始 mustache
  unmaskMustache(text, map) {
    if (!map || !map.length) return text;
    // 替换时按 token 长度降序，避免部分覆盖
    map.slice().sort((a, b) => b.token.length - a.token.length).forEach(({ token, original }) => {
      text = text.split(token).join(original);
    });
    return text;
  }

  // style 格式化已在 format_core 中实现并导出（如需要可复用）
  formatStyle(style) {
    return format_core_1.formatStyle(style);
  }


  formatCalc(value) {
    value = String(value);
    const m = value.match(/^calc\(([\s\S]*)\)$/);
    if (m) {
      try {
        const calcExpression = m[1].trim();
        // 仅在简单运算符周围添加空格，保留其它内容原样
        return `calc(${calcExpression.replace(/\s*([+\-*/%])\s*/g, ' $1 ')})`;
      }
      catch (e) {
        return value;
      }
    }
    return value;
  }

  formatVariables(text) {
    // 只对 mustache 内部进行空白合并，但不触碰表达式内容（例如不改变运算顺序或插入/删除运算符）
    return text.replace(/{{([\s\S]*?)}}/g, (match, inner) => {
      // 保留扩展语法 {{...obj}}，对内部连续空白进行合并
      const trimmed = inner.replace(/\s+/g, ' ').trim();
      return `{{ ${trimmed} }}`;
    });
  }

  writeToFile(str) {
    const start = new vscode_1.Position(0, 0);
    const end = new vscode_1.Position(this.lineNumber + 1, 0);
    const range = new vscode_1.Range(start, end);
    this.editor.edit(editBuilder => editBuilder.replace(range, str))
      .then(success => {
        if (!success) {
          vscode_1.window.showErrorMessage('Failed to write to file');
        }
      }, error => {
        vscode_1.window.showErrorMessage(error);
      });
  }
}

exports.default = FormatWxml;
