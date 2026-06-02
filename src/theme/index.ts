import { useColorScheme } from 'react-native';

export const Colors = {
  // Brand colors from design spec
  skyBlue:   '#8CC3E1',
  navyDark:  '#152644',
  limeGreen: '#C8F000',
  black:     '#171717',
  white:     '#FFFFFF',
} as const;

export interface Theme {
  bg:          string;
  surface:     string;
  text:        string;
  textMuted:   string;
  border:      string;
  accent:      Colors['limeGreen'];
  navy:        string;
  isDark:      boolean;
}

const lightTheme: Theme = {
  bg:        Colors.white,
  surface:   '#F5F5F5',
  text:      Colors.navyDark,
  textMuted: '#6B7280',
  border:    '#E5E7EB',
  accent:    Colors.limeGreen,
  navy:      Colors.navyDark,
  isDark:    false,
};

const darkTheme: Theme = {
  bg:        Colors.black,
  surface:   '#1F1F1F',
  text:      Colors.white,
  textMuted: '#9CA3AF',
  border:    '#2D2D2D',
  accent:    Colors.limeGreen,
  navy:      Colors.white,
  isDark:    true,
};

export function useTheme(): Theme {
  const scheme = useColorScheme();
  return scheme === 'dark' ? darkTheme : lightTheme;
}
