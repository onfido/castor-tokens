import { Prop, registerValueTransform } from 'theo';

export function registerOdsValueTransform(
  name: 'ods/color/rgba' | 'ods/color/var'
): void {
  switch (name) {
    case 'ods/color/rgba':
      registerValueTransform(
        'ods/color/rgba',
        (prop: Prop) => prop.get('type') === 'color',
        (prop: Prop) => `rgba(${prop.get('value')}, ${opacity(prop)})`
      );
      break;
    case 'ods/color/var':
      registerValueTransform(
        'ods/color/var',
        (prop: Prop) => prop.get('type') === 'color',
        (prop: Prop) => `var(${cssVar(prop)}), ${opacity(prop)}`
      );
      break;
  }
}

export function cssVar(prop: Prop): string {
  const [, alias] = `${prop.get('originalValue')}`.match(/^{!(.+)}$/) ?? [];
  return `--ods-${alias}`;
}

export function opacity(prop: Prop): number {
  return prop.getIn(['meta', 'opacity']) || 1;
}
