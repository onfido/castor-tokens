import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import {
  convert,
  Prop,
  registerFormat,
  registerTransform,
  registerValueTransform,
} from 'theo';

const themeName = process.env.THEME_NAME;
if (!themeName) throw new Error('No theme name provided');

const colorScheme = process.env.COLOR_SCHEME;
if (!colorScheme) throw new Error('No color scheme provided');

const srcPath = join(__dirname, `src/themes/${themeName}.json`);
const formatPath = join(__dirname, 'packages/npm/src/theme.scss.hbs');
const destPath = join(__dirname, `packages/npm/src/theme-${themeName}.scss`);

registerValueTransform(
  'ods/color/var',
  (prop: Prop) => prop.get('type') === 'color',
  (prop: Prop) => `var(${cssVar(prop)}), ${opacity(prop)}`
);

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

function cssVar(prop: Prop) {
  const [, alias] = `${prop.get('originalValue')}`.match(/^{!(.+)}$/) ?? [];
  return `--ods-${alias}`;
}

function opacity(prop: Prop) {
  return prop.getIn(['meta', 'opacity']) || 1;
}
