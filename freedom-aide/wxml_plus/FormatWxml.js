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
    if (!this.editor)
      throw new Error('no active editor');
    if (this.editor.document.languageId === 'wxml') {
      const doc = this.editor.document;
      const text = this.beauty(doc.getText());
      this.lineNumber = doc.lineCount;
      this.writeToFile(text);
    }
  }
  getConfig() {
    let wxmlFormatConf = vscode_1.workspace
      .getConfiguration('freedomAide')
      .get('format', {});
    if (!wxmlFormatConf) {
      return;
    }
    return wxmlFormatConf;
  }
  beauty(text) {
    // 使用正则表达式匹配style属性
    const styleRegex = /style\s*=\s*["']([^"']*)["']/g;
    let match;
    let formattedText = text;

    while ((match = styleRegex.exec(text)) !== null) {
      const originalStyle = match[1];
      const formattedStyle = this.formatStyle(originalStyle);
      formattedText = formattedText.replace(originalStyle, formattedStyle);
    }

    // 确保{{}}内部的内容与其保持一个字符的距离
    const variableRegex = /({{)(.*?)(}})/g;
    formattedText = formattedText.replace(variableRegex, (match, p1, p2, p3) => {
      return `${p1} ${p2.trim()} ${p3}`;
    });


    let str = cny_js_beautify_1.html(formattedText, this.getConfig());
    return `${str}\n`;
  }
  formatStyle(style) {
    const properties = style.split(';').filter(prop => prop.trim() !== '');
    const formattedProperties = properties.map(prop => {
      const [name, value] = prop.split(':').map(part => part.trim());
      const formattedValue = this.formatCalc(value);
      return `${name}: ${formattedValue}`;
    });
    return formattedProperties.join('; ') + ';';
  }
  formatCalc(value) {
    // 确保 value 是字符串
    value = String(value);

    if (value.startsWith('calc(') && value.endsWith(')')) {
      const calcExpression = value.slice(5, -1).trim();
      const formattedCalcExpression = calcExpression.split(/\s*([\+\-\*\/])\s*/).join(' ');
      return `calc(${formattedCalcExpression})`;
    }
    return value;
  }

  writeToFile(str) {
    let start = new vscode_1.Position(0, 0);
    let end = new vscode_1.Position(this.lineNumber + 1, 0);
    let range = new vscode_1.Range(start, end);
    this.editor.edit((editBuilder, error) => {
      error && vscode_1.window.showErrorMessage(error);
      editBuilder.replace(range, str);
    });
  }
}
exports.default = FormatWxml;