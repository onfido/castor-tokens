import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { convert, registerFormat } from 'theo';

const tokensPath = join(__dirname, 'src/tokens');

const srcPath = join(tokensPath, 'tokens.json');
const formatPath = join(__dirname, 'packages/npm/src/tokens.scss.hbs');
const destPath = join(__dirname, 'packages/npm/src/tokens.scss');

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
