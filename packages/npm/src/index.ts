export * from './definitions/borderRadius';
export * from './definitions/colorPalette';
export * from './definitions/themeColors';
export * from './utils';

import type { ColorPalette } from './definitions/colorPalette';
import type { ThemeColors } from './definitions/themeColors';

export type Color = ColorPalette | ThemeColors;
