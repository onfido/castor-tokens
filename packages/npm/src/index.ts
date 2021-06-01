// tslint:disable:ordered-imports

export * from './utils';

// Theo generated files
export * from './definitions/borderRadius';
export * from './definitions/colorPalette';
export * from './definitions/themeColors';

import type { ColorPalette } from './definitions/colorPalette';
import type { ThemeColors } from './definitions/themeColors';
export type Color = ColorPalette | ThemeColors;
