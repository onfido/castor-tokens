import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { convert, registerFormat, registerTransform } from 'theo';
import { registerOdsValueTransform } from '../helpers';

const themeName = process.env.THEME_NAME;
if (!themeName) throw new Error('No theme name provided');

const colorScheme = process.env.COLOR_SCHEME;
if (!colorScheme) throw new Error('No color scheme provided');

const srcPath = resolve(__dirname, `src/themes/${themeName}.json`);
const formatPath = resolve(__dirname, 'packages/npm/src/theme.scss.hbs');
const destPath = resolve(__dirname, `packages/npm/src/theme-${themeName}.scss`);

registerOdsValueTransform('ods/color/var');
registerTransform('raw', ['ods/color/var']);

registerFormat(
  'scss',
  readFileSync(formatPath, 'utf8')
    .replace(/{{THEME_NAME}}/g, themeName)
    .replace(/{{COLOR_SCHEME}}/g, colorScheme)
);

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
