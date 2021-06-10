import { writeFileSync } from 'fs';
import { resolve } from 'path';
import { convert, Format, Prop, registerFormat, registerTransform } from 'theo';
import xml from 'xml';
import { registerOdsValueTransform } from '../helpers';

const valuesName = process.env.VALUES_NAME;
if (!valuesName) throw new Error('No values name provided');

const fileSuffix = process.env.NIGHT_MODE ? '-night' : '';

const srcPath = resolve(
  __dirname,
  `src/values/${valuesName}${fileSuffix}.json`
);
const destPath = resolve(
  __dirname,
  `libraries/android/castor-tokens/src/main/res/values${fileSuffix}/castor-${valuesName}.xml`
);

registerOdsValueTransform('ods/color/rgba');
registerTransform('android', [
  'ods/color/rgba',
  // keep default Theo transforms
  'color/hex8rgba',
  'relative/pixelValue',
  'absolute/dp',
  'percentage/float',
]);

(
  [
    {
      type: 'android-color.xml',
      propTypeFilter: 'color',
      resourceKey: 'color',
    },
    {
      type: 'android-dimen.xml',
      propTypeFilter: 'size',
      resourceKey: 'dimen',
    },
  ] as const
).forEach(({ type, propTypeFilter, resourceKey }) => {
  registerFormat(type, (result) => {
    const obj = {
      resources: result
        .get('props')
        .filter((prop: Prop) => prop.get('type') === propTypeFilter)
        .filter((prop: Prop) => !!prop.get('value'))
        .map((prop: Prop) => {
          const fullName = `${prop.get('category')}_${prop.get('name')}`;
          const attrName = 'ods_' + fullName.replace(/-/g, '_');

          return {
            [resourceKey]: [
              {
                _attr: {
                  name: attrName,
                  category: prop.get('category'),
                },
              },
              prop.get('value'),
            ],
          };
        })
        .toJS(),
    };

    return xml(obj, {
      declaration: true,
      indent: '  ',
    });
  });
});

convert({
  transform: {
    type: 'android',
    file: srcPath,
  },
  format: {
    type: `android-${valuesName}.xml` as Format,
  },
})
  .then((data) => writeFileSync(resolve(destPath), data))
  .catch(console.error);
