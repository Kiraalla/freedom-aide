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
    const userConfig = vscode_1.workspace.getConfiguration('freedomAide');
    return {
      ...userConfig.get('format', {}),
      // 添加缩进配置，默认为2个空格
      indentSize: userConfig.get('indentSize', 2),
      indentChar: userConfig.get('indentChar', ' ')
    };
  }

  beauty(text) {
    const formattedText = this.formatStyles(text);
    const finalText = this.formatVariables(formattedText);
    const userConfig = this.getConfig();
    // 添加自定义配置来处理text标签和缩进
    const config = {
      ...userConfig,
      indent_size: userConfig.indentSize,
      indent_char: userConfig.indentChar,
      unformatted: ['text'], // 保持text标签内容在同一行
      inline: ['text']       // 将text标签视为行内元素
    };
    const beautifiedText = cny_js_beautify_1.html(finalText, config);
    return `${beautifiedText}\n`;
  }

  formatStyles(text) {
    const styleRegex = /style\s*=\s*["']([^"']*)["']/g;
    return text.replace(styleRegex, (match, originalStyle) => {
      const formattedStyle = this.formatStyle(originalStyle);
      return match.replace(originalStyle, formattedStyle);
    });
  }

  formatStyle(style) {
    const properties = style.split(';').filter(prop => prop.trim() !== '');
    // 在属性之间添加分号和空格
    return properties.map(prop => {
      const [name, value] = prop.split(':').map(part => part.trim());
      return name && value ? `${name}: ${this.formatCalc(value)}` : prop;
    }).join('; '); 
  }

  formatCalc(value) {
    value = String(value);
    if (value.startsWith('calc(') && value.endsWith(')')) {
      const calcExpression = value.slice(5, -1).trim();
      return `calc(${calcExpression.split(/\s*([\+\-\*\/])\s*/).join(' ')})`;
    }
    return value;
  }

  formatVariables(text) {
    return text.replace(/({{)(.*?)(}})/g, (match, p1, p2, p3) => `${p1} ${p2.trim()} ${p3}`)
      .replace(/(\?)\s*;/g, '$1');
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
