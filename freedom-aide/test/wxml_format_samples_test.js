const assert = require('assert');
const formatCore = require('../wxml_plus/format_core');

function formatWithMask(sample, config) {
  // use the central formatCore which includes mask/unmask and normalization
  const out = formatCore.formatWxmlText(sample, config || { indent_size: 2, unformatted: ['text'], inline: ['text'] });
  return out;
}

const samples = [
  { name: 'simple-mustache', input: `<view>{{user.name}}</view>`, checks: [s => s.includes('{{ user.name }}')] },
  { name: 'ternary-mustache', input: `<view>{{ condition ? 'A' : 'B' }}</view>`, checks: [s => s.includes("{{ condition ? 'A' : 'B' }}")] },
  { name: 'template-spread', input: `<template is="t" data="{{...obj}}"></template>`, checks: [s => s.includes('{{...obj}}')] },
  { name: 'style-base64', input: `<view style="background-image: url('data:image/png;base64,AAAA;BBB'); color:red;">Hello</view>`, checks: [s => s.includes("data:image/png;base64,AAAA;BBB")] },
  { name: 'calc-and-translate', input: `<view style="transform: translate(10px, calc(100% - 10px));">X</view>`, checks: [s => s.includes('calc(100% - 10px)')] },
  { name: 'multiline-mustache', input: `<view>{{ a +\n b }}</view>`, checks: [s => s.includes('{{ a + b }}')] },
  { name: 'wx-if-attr', input: `<custom-comp wx:if="{{show}}" bindtap="handleTap"></custom-comp>`, checks: [s => s.includes('wx:if="{{ show }}"')] },
  { name: 'wx-for', input: `<view wx:for="{{list}}">{{item.name}}</view>`, checks: [s => s.includes('wx:for="{{ list }}"') && s.includes('{{ item.name }}')] },
  { name: 'mustache-normalize-attr', input: `<view custom-class="{{navBarClass}}"></view>`, checks: [s => s.includes('custom-class="{{ navBarClass }}"')] },
  { name: 'mustache-normalize-text-ternary', input: `<view>{{toogleGoods ? '收起' : '展开更多'}}</view>`, checks: [s => s.includes("{{ toogleGoods ? '收起' : '展开更多' }}")] },
  // Extended edge cases
  { name: 'empty-boolean-attrs', input: `<button round="" block="" primary>Click</button>`, checks: [s => s.includes('<button round block primary') || s.includes('<button primary')] },
  { name: 'attr-with-greater-than', input: `<view title=">value>">Hi</view>`, checks: [s => s.includes('title=&quot;>value&gt;&quot;') || s.includes('title=">value>"')] },
  { name: 'unordered-multi-line-attrs', input: `<comp
    id="x"
    data-a="1" class="c"
    custom
    style="color:red;"
  ></comp>`, checks: [s => s.includes('class=') && s.includes('data-a=') && s.includes('style=') && s.includes('custom')] },
  { name: 'start-tag-comment-like', input: `<view attr="1"><!--comment-->other="2">X</view>`, checks: [s => s.includes('attr="1"') && s.includes('other="2"')] }
];

let failures = [];
for (const sample of samples) {
  try {
    const out = formatWithMask(sample.input);
    for (const check of sample.checks) {
      assert.ok(check(out), `${sample.name} failed check on output:\n${out}`);
    }
    console.log(`${sample.name}: PASS`);
  }
  catch (e) {
    failures.push({ sample: sample.name, error: e.message });
    console.error(`${sample.name}: FAIL\n`, e && e.stack ? e.stack : e);
  }
}

if (failures.length > 0) {
  console.error('Some format tests failed:', failures);
  process.exit(1);
}
console.log('All wxml format samples tests passed.');
