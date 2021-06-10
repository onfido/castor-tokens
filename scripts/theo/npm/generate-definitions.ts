import { readFileSync, writeFileSync } from 'fs';
import { camelCase, kebabCase } from 'lodash';
import { resolve } from 'path';
import { convert, Format, registerFormat } from 'theo';

const definitionsName = process.env.DEFINITIONS_NAME;
if (!definitionsName) throw new Error('No definitions name provided');

const srcPath = resolve(__dirname, `src/definitions/${definitionsName}.json`);

const { meta } = JSON.parse(readFileSync(srcPath, 'utf8'));

(
  [
    {
      type: 'scss',
      formatFile: 'sass-variables.scss.hbs',
      destFile: `${kebabCase(definitionsName)}.scss`,
      definitionsName: meta.sassVariableName,
    },
    {
      type: 'ts' as Format,
      formatFile: 'types.ts.hbs',
      destFile: `${camelCase(definitionsName)}.ts`,
      definitionsName: meta.typeName,
    },
  ] as const
).forEach(({ type, formatFile, destFile, definitionsName }) => {
  const formatPath = resolve(__dirname, `packages/npm/src/${formatFile}`);
  const destPath = resolve(
    __dirname,
    `packages/npm/src/definitions/${destFile}`
  );

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
    format: { type },
  })
    .then((data) => writeFileSync(destPath, data))
    .catch(console.error);
});
