const core = require('../wxml_plus/format_core');

const sample1 = '<view a="1" b="2" c="3"></view>';
const sample2 = '<view a="1" b="2" c="3" d="4"></view>';
const sample3 = '<view a="1" b="2" c="3" d="4" e="5"></view>';

function run(sample, mode) {
  console.log('----', mode, '----');
  const out = core.formatWxmlText(sample, { attrsMode: mode, indent_size: 2, indent_char: ' ' });
  console.log(out);
}

[ 'single', 'auto', 'multi' ].forEach(mode => {
  run(sample1, mode);
  run(sample2, mode);
  run(sample3, mode);
});
