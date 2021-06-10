import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { convert, registerFormat } from 'theo';

const srcPath = resolve(__dirname, 'src/tokens.json');
const formatPath = resolve(__dirname, 'packages/npm/src/tokens.scss.hbs');
const destPath = resolve(__dirname, 'packages/npm/src/tokens.scss');

registerFormat('scss', readFileSync(formatPath, 'utf8'));

convert({
  transform: {
    type: 'raw',
    file: srcPath,
  },
  format: {
    type: 'scss',
  },
})
  .then((data) => writeFileSync(destPath, data))
  .catch(console.error);
