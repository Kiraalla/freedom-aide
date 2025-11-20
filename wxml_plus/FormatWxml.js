// @ts-nocheck
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const format_core_1 = require('./format_core');

/**
 * WXML 格式化类
 */
class FormatWxml {
  /**
   * 初始化格式化
   * @returns {Promise} 格式化完成的 Promise
   */
  init() {
    return new Promise((resolve, reject) => {
      this.editor = vscode_1.window.activeTextEditor;
      if (!this.editor) {
        vscode_1.window.showErrorMessage('没有活动的编辑器');
        reject(new Error('没有活动的编辑器'));
        return;
      }

      if (this.editor.document.languageId === 'wxml') {
        try {
          const doc = this.editor.document;
          const text = doc.getText();
          
          // 直接使用统一的格式化
          const formattedText = format_core_1.unifiedFormat(text, 'wxml');
          this.lineNumber = doc.lineCount;

          this.writeToFile(formattedText, resolve, reject);
        } catch (error) {
          vscode_1.window.showErrorMessage(`WXML 格式化失败: ${error.message}`);
          reject(error);
        }
      } else {
        vscode_1.window.showWarningMessage('当前文件不是 WXML 文件');
        reject(new Error('当前文件不是 WXML 文件'));
      }
    });
  }

  /**
   * 使用统一格式化器格式化文本
   * @param {string} text - 要格式化的文本
   * @returns {string} 格式化后的文本
   */
  beauty(text) {
    try {
      const result = format_core_1.unifiedFormat(text, 'wxml');
      return result;
    } catch (error) {
      vscode_1.window.showErrorMessage(`WXML 格式化错误: ${error.message}`);
      return text;
    }
  }

  /**
   * 写入格式化结果到文件
   * @param {string} str - 格式化后的文本
   * @param {Function} resolve - Promise resolve 函数
   * @param {Function} reject - Promise reject 函数
   */
  writeToFile(str, resolve, reject) {
    const start = new vscode_1.Position(0, 0);
    const end = new vscode_1.Position(this.lineNumber + 1, 0);
    const range = new vscode_1.Range(start, end);

    this.editor.edit(editBuilder => {
      editBuilder.replace(range, str);
    }).then(success => {
      if (success) {
        vscode_1.window.showInformationMessage('WXML 格式化完成');
        resolve();
      } else {
        vscode_1.window.showErrorMessage('WXML 格式化失败');
        reject(new Error('WXML 格式化失败'));
      }
    }, error => {
      vscode_1.window.showErrorMessage(`WXML 格式化错误: ${error}`);
      reject(error);
    });
  }
}

exports.default = FormatWxml;