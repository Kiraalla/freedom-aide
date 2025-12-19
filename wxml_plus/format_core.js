// @ts-nocheck
"use strict";
const prettier = require("prettier");
const vscode = require("vscode");

/**
 * Prettier 配置管理器
 */
class ConfigManager {
  /**
   * 获取指定文件类型的合并后的 Prettier 配置
   * @param {string} fileType - 文件类型 'vue' 或 'wxml'
   * @returns {object} 合并后的配置对象
   */
  static getMergedPrettierConfig(fileType) {
    const config = vscode.workspace.getConfiguration('freedomHelper');
    
    // 获取统一配置
    const unifiedOptions = config.get('prettierOptions', {});
    
    // 获取独立配置
    const specificOptions = config.get(`${fileType}PrettierOptions`, {});
    
    // 合并配置：统一配置 <- 独立配置
    const mergedConfig = {
      ...unifiedOptions,
      ...specificOptions,
      parser: 'vue'
    };
    
    return mergedConfig;
  }

  /**
   * 获取 mustache 空格配置
   * @returns {string} 空格模式：'space' | 'preserve' | 'nospace'
   */
  static getMustacheSpacingConfig() {
    const config = vscode.workspace.getConfiguration('freedomHelper');
    const mustacheSpacing = config.get('mustacheSpacing', 'space');
    return mustacheSpacing;
  }
}

/**
 * 保护注释内容：将注释替换为占位符
 * @param {string} code - 原始代码
 * @returns {object} { code: 处理后的代码, comments: 注释映射表 }
 */
function protectComments(code) {
  const comments = [];
  let index = 0;
  
  // 替换 HTML 注释为占位符
  const protectedCode = code.replace(/<!--[\s\S]*?-->/g, (match) => {
    const placeholder = `<!--__COMMENT_PLACEHOLDER_${index}__-->`;
    comments.push({ placeholder, original: match });
    index++;
    return placeholder;
  });
  
  return { code: protectedCode, comments };
}

/**
 * 恢复注释内容：将占位符替换回原始注释
 * @param {string} code - 处理后的代码
 * @param {Array} comments - 注释映射表
 * @returns {string} 恢复注释后的代码
 */
function restoreComments(code, comments) {
  let restoredCode = code;
  
  comments.forEach(({ placeholder, original }) => {
    restoredCode = restoredCode.replace(placeholder, original);
  });
  
  return restoredCode;
}

/**
 * WXML 预处理：将 WXML 包装在 Vue 模板中
 * @param {string} wxmlCode - 原始 WXML 代码
 * @returns {string} 包装后的 Vue 模板代码
 */
function preprocessWxml(wxmlCode) {
  // 将 WXML 包装在 Vue 模板中，让 Prettier 将其视为 Vue 自定义组件
  const wrappedCode = `<template>\n${wxmlCode}\n</template>`;
  return wrappedCode;
}

/**
 * WXML 后处理：从 Vue 模板中提取格式化后的 WXML（优化版）
 * @param {string} formattedVueCode - 格式化后的 Vue 代码
 * @returns {string} 提取出的 WXML 代码
 */
function postprocessWxml(formattedVueCode) {
  // 提取 template 内容
  const templateMatch = formattedVueCode.match(/<template>([\s\S]*)<\/template>/);
  if (!templateMatch) {
    return formattedVueCode;
  }
  
  const content = templateMatch[1];
  const lines = content.split('\n');
  
  // 找到所有非空行的缩进
  const nonEmptyLines = lines.filter(line => line.trim() !== '');
  if (nonEmptyLines.length === 0) {
    return '';
  }
  
  // 计算统一的缩进（取第一个非空行的缩进）
  const firstNonEmptyLine = nonEmptyLines[0];
  const baseIndent = firstNonEmptyLine.match(/^(\s*)/)[1].length;
  
  // 移除统一的缩进
  const processedLines = lines.map(line => {
    if (line.trim() === '') {
      return '';
    } else if (line.length >= baseIndent) {
      return line.slice(baseIndent);
    } else {
      return line;
    }
  });
  
  return processedLines.join('\n').trim();
}

/**
 * 统一格式化函数
 * @param {string} code - 要格式化的代码
 * @param {string} fileType - 文件类型 'vue'、'wxml'、'wxss'、'scss'、'sass'、'less'、'css'、'html'、'javascript' 或 'typescript'
 * @returns {string} 格式化后的代码
 */
function unifiedFormat(code, fileType) {
  try {
    // WXSS 使用 CSS 格式化
    if (fileType === 'wxss') {
      const prettierOptions = ConfigManager.getMergedPrettierConfig(fileType);
      const finalOptions = {
        ...prettierOptions,
        parser: 'css'
      };
      return prettier.format(code, finalOptions);
    }

    // SCSS 使用 SCSS 格式化
    if (fileType === 'scss') {
      const prettierOptions = ConfigManager.getMergedPrettierConfig(fileType);
      const finalOptions = {
        ...prettierOptions,
        parser: 'scss'
      };
      return prettier.format(code, finalOptions);
    }

    // Sass 使用 SCSS 格式化（Prettier 不支持缩进式 Sass，使用 SCSS 作为替代）
    if (fileType === 'sass') {
      const prettierOptions = ConfigManager.getMergedPrettierConfig(fileType);
      const finalOptions = {
        ...prettierOptions,
        parser: 'scss'
      };
      return prettier.format(code, finalOptions);
    }

    // Less 使用 Less 格式化
    if (fileType === 'less') {
      const prettierOptions = ConfigManager.getMergedPrettierConfig(fileType);
      const finalOptions = {
        ...prettierOptions,
        parser: 'less'
      };
      return prettier.format(code, finalOptions);
    }

    // CSS 使用 CSS 格式化
    if (fileType === 'css') {
      const prettierOptions = ConfigManager.getMergedPrettierConfig(fileType);
      const finalOptions = {
        ...prettierOptions,
        parser: 'css'
      };
      return prettier.format(code, finalOptions);
    }

    // HTML 使用 HTML 格式化
    if (fileType === 'html') {
      const prettierOptions = ConfigManager.getMergedPrettierConfig(fileType);
      const finalOptions = {
        ...prettierOptions,
        parser: 'html'
      };
      return prettier.format(code, finalOptions);
    }

    // JavaScript 使用 Babel 格式化
    if (fileType === 'javascript') {
      const prettierOptions = ConfigManager.getMergedPrettierConfig(fileType);
      const finalOptions = {
        ...prettierOptions,
        parser: 'babel'
      };
      return prettier.format(code, finalOptions);
    }

    // TypeScript 使用 TypeScript 格式化
    if (fileType === 'typescript') {
      const prettierOptions = ConfigManager.getMergedPrettierConfig(fileType);
      const finalOptions = {
        ...prettierOptions,
        parser: 'typescript'
      };
      return prettier.format(code, finalOptions);
    }

    const prettierOptions = ConfigManager.getMergedPrettierConfig(fileType);
    
    let codeToFormat = code;
    let isWxml = false;
    let savedComments = [];
    let needCommentProtection = false;

    // WXML 预处理
    if (fileType === 'wxml') {
      // 保护注释内容
      const { code: protectedCode, comments } = protectComments(code);
      savedComments = comments;
      codeToFormat = preprocessWxml(protectedCode);
      isWxml = true;
      needCommentProtection = true;
    } else if (fileType === 'vue') {
      // Vue 也保护注释内容（预防性修复）
      const { code: protectedCode, comments } = protectComments(code);
      savedComments = comments;
      codeToFormat = protectedCode;
      needCommentProtection = true;
    }

    // 强制覆盖关键配置，确保一致性
    const forcedOptions = {
      singleAttributePerLine: false,
      bracketSameLine: true,
      htmlWhitespaceSensitivity: 'ignore',
      parser: 'vue'
    };

    const finalOptions = {
      ...prettierOptions,
      ...forcedOptions
    };

    let formatted = prettier.format(codeToFormat, finalOptions);

    // WXML 后处理
    if (isWxml) {
      formatted = postprocessWxml(formatted);
    }
    
    // 恢复注释内容（WXML 和 Vue 都需要）
    if (needCommentProtection) {
      formatted = restoreComments(formatted, savedComments);
    }

    // 应用 mustache 空格处理
    const mustacheSpacing = ConfigManager.getMustacheSpacingConfig();
    formatted = formatMustacheSpacing(formatted, mustacheSpacing);

    return formatted;
  } catch (error) {
    throw error;
  }
}

/**
 * 处理 mustache 表达式的空格
 * @param {string} text - 原始文本
 * @param {string} spacing - 空格模式：'space' | 'preserve' | 'nospace'
 * @returns {string} 处理后的文本
 */
function formatMustacheSpacing(text, spacing) {
  if (spacing === 'preserve') {
    return text;
  }

  // 处理双花括号 {{ }}
  let processed = text.replace(/{{\s*([^{}]*?)\s*}}/g, (match, inner) => {
    const trimmed = inner.trim();

    if (spacing === 'nospace') {
      return `{{${trimmed}}}`;
    } else if (spacing === 'space') {
      // 展开运算符 ... 不加空格
      if (trimmed.startsWith('...')) {
        return `{{${trimmed}}}`;
      } else {
        return `{{ ${trimmed} }}`;
      }
    }

    return match;
  });

  // 处理单花括号 { }（用于 Vue 的 v-bind 简写）
  processed = processed.replace(/\{\s*([^{}]*?)\s*\}/g, (match, inner) => {
    const trimmed = inner.trim();

    if (spacing === 'nospace') {
      return `{${trimmed}}`;
    } else if (spacing === 'space') {
      // 展开运算符 ... 不加空格
      if (trimmed.startsWith('...')) {
        return `{${trimmed}}`;
      } else {
        return `{ ${trimmed} }`;
      }
    }

    return match;
  });

  return processed;
}

module.exports = {
  unifiedFormat,
  ConfigManager,
  formatMustacheSpacing
};