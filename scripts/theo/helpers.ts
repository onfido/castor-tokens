import { Prop } from 'theo';

export function cssVar(prop: Prop): string {
  const [, alias] = `${prop.get('originalValue')}`.match(/^{!(.+)}$/) ?? [];
  return `--ods-${alias}`;
}

export function opacity(prop: Prop): number {
  return prop.getIn(['meta', 'opacity']) || 1;
}
