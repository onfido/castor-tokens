import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { convert, registerFormat } from 'theo';
import { camelCase, kebabCase } from 'lodash';

const definitionsName = process.env.DEFINITIONS_NAME;
if (!definitionsName) throw new Error('No definitions name provided');

const srcPath = join(__dirname, `src/definitions/${definitionsName}.json`);

const { meta } = JSON.parse(readFileSync(srcPath, 'utf8'));

[
  {
    type: 'scss',
    formatFile: 'sass-variables.scss.hbs',
    destFile: `${kebabCase(definitionsName)}.scss`,
    definitionsName: meta.sassVariableName,
  },
  {
    type: 'ts',
    formatFile: 'types.ts.hbs',
    destFile: `${camelCase(definitionsName)}.ts`,
    definitionsName: meta.typeName,
  },
].forEach(({ type, formatFile, destFile, definitionsName }) => {
  const formatPath = join(__dirname, `packages/npm/src/${formatFile}`);
  const destPath = join(__dirname, `packages/npm/src/definitions/${destFile}`);

  registerFormat(
    type,
    readFileSync(formatPath, 'utf8')
      .replace(/{{DEFINITIONS_NAME}}/g, definitionsName)
      .replace(/{{FILTER_CATEGORY}}/g, meta.filterCategory)
  );

  convert({
    transform: {
      type: 'raw',
      file: srcPath,
    },
    format: {
      // @ts-expect-error - for using custom format types
      type,
    },
  })
    .then((data) => writeFileSync(destPath, data))
    .catch(console.error);
});
