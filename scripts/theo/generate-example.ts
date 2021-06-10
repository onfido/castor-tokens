import { writeFileSync } from 'fs';
import { resolve } from 'path';
import { convert, registerFormat, registerTransform } from 'theo';
import { registerOdsValueTransform } from './helpers';

const fileName = process.env.FILE_NAME;
if (!fileName) throw new Error('No file name provided');

const srcPath = resolve(__dirname, `src/${fileName}.json`);
const formatPath = resolve(__dirname, 'example/html.cjs');
const destPath = resolve(__dirname, `example/${fileName}.html`);

registerOdsValueTransform('ods/color/rgba');
registerTransform('web', ['ods/color/rgba']);

// eslint-disable-next-line @typescript-eslint/no-var-requires
registerFormat('html', require(formatPath));

convert({
  transform: {
    type: 'web',
    file: srcPath,
  },
  format: {
    type: 'html',
  },
})
  .then((data) => writeFileSync(destPath, data))
  .catch(console.error);
