"use strict";
const htmlparser2 = require('htmlparser2');
const cny_beautify = require('cny_js_beautify');

function maskMustache(text) {
  const map = [];
  let idx = 0;
  const masked = text.replace(/{{([\s\S]*?)}}/g, (match, inner) => {
    const token = `__WXML_EXPR_${idx}__`;
    map.push({ token, original: match, inner });
    idx++;
    return token;
  });
  return { text: masked, map };
}

function unmaskMustache(text, map) {
  // legacy replacement: just replace tokens with original
  if (!map || !map.length) return text;
  map.slice().sort((a, b) => b.token.length - a.token.length).forEach(({ token, original }) => {
    text = text.split(token).join(original);
  });
  return text;
}

function splitStyleProperties(style) {
  const props = [];
  let cur = '';
  let inSingle = false;
  let inDouble = false;
  let paren = 0;
  let moustache = 0;
  for (let i = 0; i < style.length; i++) {
    const ch = style[i];
    const next = style[i + 1];
    if (ch === '{' && next === '{') { moustache++; cur += ch; continue; }
    if (ch === '}' && style[i - 1] === '}') { if (moustache > 0) moustache--; cur += ch; continue; }
    if (moustache > 0) { cur += ch; continue; }
    if (ch === '"' && !inSingle) inDouble = !inDouble;
    else if (ch === "'" && !inDouble) inSingle = !inSingle;
    else if (!inSingle && !inDouble) {
      if (ch === '(') paren++;
      else if (ch === ')') paren = Math.max(0, paren - 1);
    }
    if (ch === ';' && !inSingle && !inDouble && paren === 0 && moustache === 0) {
      props.push(cur);
      cur = '';
    }
    else {
      cur += ch;
    }
  }
  if (cur.trim() !== '') props.push(cur);
  return props.map(p => p.trim()).filter(Boolean);
}

function formatCalc(value) {
  value = String(value);
  const m = value.match(/^calc\(([\s\S]*)\)$/);
  if (m) {
    try {
      const calcExpression = m[1].trim();
      return `calc(${calcExpression.replace(/\s*([+\-*/%])\s*/g, ' $1 ')})`;
    }
    catch (e) {
      return value;
    }
  }
  return value;
}

function formatStyle(style) {
  const properties = splitStyleProperties(style);
  const mapped = properties.map(prop => {
    const idx = prop.indexOf(':');
    if (idx < 0) return prop.trim();
    const name = prop.slice(0, idx).trim();
    const value = prop.slice(idx + 1).trim();
    return name && value ? `${name}: ${formatCalc(value)}` : prop.trim();
  });
  return mapped.join('; ');
}

function serializeDom(nodes, originalText, userConfig) {
  let out = '';
  nodes.forEach(node => {
    if (node.type === 'text') {
      out += node.data;
    }
    else if (node.type === 'comment') {
      out += `<!--${node.data}-->`;
    }
    else if (node.type === 'tag' || node.type === 'script' || node.type === 'style') {
      const name = node.name;
      // Try to preserve original attribute order and self-closing form when possible
      let rawStartTag = null;
      try {
        if (typeof node.startIndex === 'number' && originalText) {
          const start = node.startIndex;
          const gtPos = originalText.indexOf('>', start);
          if (gtPos > start) rawStartTag = originalText.slice(start, gtPos + 1);
        }
      }
      catch (e) {
        rawStartTag = null;
      }

      // Minimal-change strategy: if we have the original start tag text, replace only the style value inside it
      let attrsStr = '';
      let selfClosing = false;
      if (rawStartTag) {
        selfClosing = /<[^>]+\/\s*>$/.test(rawStartTag);
        // replace style attribute value inside rawStartTag while preserving all other spacing and quoting
        const styleAttrRe = /\bstyle\b\s*=\s*(?:"([\s\S]*?)"|'([\s\S]*?)'|([^\s"'>]+))/i;
        let newStartTag = rawStartTag;
        if (styleAttrRe.test(rawStartTag)) {
          const m = rawStartTag.match(styleAttrRe);
          const origVal = m[1] !== undefined ? m[1] : (m[2] !== undefined ? m[2] : m[3]);
          const quote = m[1] !== undefined ? '"' : (m[2] !== undefined ? "'" : '"');
          let formattedVal;
          try { formattedVal = formatStyle(origVal); }
          catch (e) { formattedVal = origVal; }
          // replace only the value portion, preserving surrounding quotes and whitespace
          newStartTag = rawStartTag.replace(styleAttrRe, function(full, d1, d2, d3) {
            const q = d1 !== undefined ? '"' : (d2 !== undefined ? "'" : '"');
            return `style=${q}${String(formattedVal).replace(new RegExp(q, 'g'), q === '"' ? '&quot;' : '\\' + q)}${q}`;
          });
        }
        else {
          // style attribute not present: insert before closing '>' or '/>' with a single space
          const insertBefore = /\s*\/?>\s*$/.exec(rawStartTag);
          if (insertBefore) {
            const insertPos = insertBefore.index;
            const before = rawStartTag.slice(0, insertPos);
            const after = rawStartTag.slice(insertPos);
            const styleVal = '';
            newStartTag = before + ` style="${styleVal}"` + after;
          }
        }
        // append newStartTag (trim newline safety)
        out += newStartTag;
      } else {
        // Fallback: reconstruct attributes (previous behavior)
        const attrs = node.attribs || {};
        const attrKeys = Object.keys(attrs);
        let attrLines = attrKeys.map(key => {
          let val = attrs[key];
          if (key === 'style') {
            try { val = formatStyle(val); }
            catch (e) { val = val; }
          }
          if (val === '') return key;
          const escaped = String(val).replace(/"/g, '&quot;');
          return `${key}="${escaped}"`;
        });
        // 属性换行控制
        // attrsSingleLine: true => 强制单行；false/null => 默认策略（4个及以上换行）
        const singleLineOpt = userConfig && typeof userConfig.attrsSingleLine === 'boolean' ? userConfig.attrsSingleLine : null;
        let joiner = ' ';
        if (singleLineOpt === true) {
          // 强制一行
          joiner = ' ';
        } else {
          // 默认策略：4个及以上属性换行，否则一行
          joiner = attrLines.length >= 4 ? '\n  ' : ' ';
        }
        attrsStr = attrLines.join(joiner);
        if (!attrsStr) {
          out += `<${name}>`;
        }
        else if (joiner === ' ') {
          out += `<${name} ${attrsStr}>`;
        }
        else {
          out += `<${name}${'\n  ' + attrsStr}>`;
        }
      }

      if (node.children && node.children.length) {
        out += serializeDom(node.children, originalText, userConfig);
        out += `</${name}>`;
      }
      else {
        // if it was self-closing originally, we already closed with '/>' above; otherwise add explicit close
        if (!selfClosing) out += `</${name}>`;
      }
    }
    else if (node.type === 'directive') {
      out += `<${node.data}>`;
    }
  });
  return out;
}

function formatWxmlText(text, userConfig) {
  // mask mustache
  const masked = maskMustache(text);
  // parse DOM
  const dom = htmlparser2.parseDOM(masked.text, { recognizeSelfClosing: true });
  const serialized = serializeDom(dom, masked.text, userConfig);
  const cfg = Object.assign({}, userConfig || {}, {
    indent_size: userConfig && (userConfig.indent_size || userConfig.indentSize) || 2,
    indent_char: userConfig && (userConfig.indent_char || userConfig.indentChar) || ' '
  });
  const beautified = cny_beautify.html(serialized, cfg);
  // 在恢复 mustache 前按用户配置进行规范化（默认：统一加空格，但保留 spread 无空格）
  const restored = (function(beautifiedText) {
    if (!masked.map || !masked.map.length)
      return beautifiedText + '\n';
    const spacing = (userConfig && userConfig.mustacheSpacing) || 'space';
    // 构造替换表：token -> replacement
    const replacements = {};
    masked.map.forEach(item => {
      const inner = item.inner || '';
      const trimmed = inner.replace(/\s+/g, ' ').trim();
      let replacement = item.original;
      if (spacing === 'preserve') {
        replacement = item.original;
      }
      else if (spacing === 'nospace') {
        replacement = `{{${trimmed}}}`;
      }
      else { // 'space' 默认行为
        // 如果是 spread 表达式（以 ... 开头），保留无空格
        if (/^\.\.\./.test(trimmed)) {
          replacement = `{{${trimmed}}}`;
        }
        else {
          replacement = `{{ ${trimmed} }}`;
        }
      }
      replacements[item.token] = replacement;
    });
    // 按 token 长度降序替换，避免部分覆盖
    const keys = Object.keys(replacements).sort((a, b) => b.length - a.length);
    let out = beautifiedText;
    keys.forEach(k => {
      out = out.split(k).join(replacements[k]);
    });
    return out + '\n';
  })(beautified);
  return restored + '\n';
}

module.exports = { formatWxmlText, formatStyle };
