import type { Theme } from './themeConfig';
import { useAppTheme } from './themeProvider';

export const useTheme = (): Theme => {
  return useAppTheme().theme;
};

export type { Theme } from './themeConfig';

export { darkTheme, lightTheme } from './themeConfig';
