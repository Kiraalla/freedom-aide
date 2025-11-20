// Simple runner to test WXML formatting logic (mask/unmask + html beautify)
const beautify = require('cny_js_beautify').html;

function maskMustache(text) {
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

function unmaskMustache(text, map) {
  if (!map || !map.length) return text;
  map.slice().sort((a, b) => b.token.length - a.token.length).forEach(({ token, original }) => {
    text = text.split(token).join(original);
  });
  return text;
}

function runSample(sample, config) {
  console.log('--- ORIGINAL ---');
  console.log(sample);
  console.log('--- FORMATTED ---');
  const masked = maskMustache(sample);
  const formatted = beautify(masked.text, config || { indent_size: 2, unformatted: ['text'], inline: ['text'] });
  const restored = unmaskMustache(formatted, masked.map);
  console.log(restored);
  console.log('\n');
}

const samples = [
  `<view>{{user.name}}</view>`,
  `<view>{{ condition ? 'A' : 'B' }}</view>`,
  `<template is="t" data="{{...obj}}"></template>`,
  `<view style="background-image: url('data:image/png;base64,AAAA;BBB'); color:red;">Hello</view>`,
  `<view style="transform: translate(10px, calc(100% - 10px));">X</view>`,
  `<view>{{ a +\n b }}</view>`,
  `<custom-comp wx:if="{{show}}" bindtap="handleTap"></custom-comp>`,
  `<view wx:for="{{list}}">{{item.name}}</view>`
];

samples.forEach(s => runSample(s));

console.log('Samples formatted.');
