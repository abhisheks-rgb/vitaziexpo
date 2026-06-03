// theme/theme.ts

import { useColorScheme } from 'react-native';

import { Colors } from './colors';
import { Spacing } from './spacing';
import { Typography } from './typography';
import { Radius } from './radius';

export interface Theme {
  colors: {
    background: string;
    surface: string;
    text: string;
    textMuted: string;
    border: string;
    accent: string;
    accentLight: string;
    limeAccent: string;
    primary: string;
    gradientStart: string;
    gradientEnd: string;
    gradientTextStart: string;
    gradientTextEnd: string;
  };

  spacing: typeof Spacing;
  typography: typeof Typography;
  radius: typeof Radius;

  isDark: boolean;
}

export const lightTheme: Theme = {
  colors: {
    background: Colors.white,
    surface: '#F5F5F5',

    text: Colors.navyDark,
    textMuted: Colors.muted,

    border: '#E5E7EB',

    accent: Colors.accent,
    accentLight: Colors.accentLight,
    limeAccent: Colors.limeGreen,
    primary: Colors.navyDark,

    gradientStart: Colors.primaryGradientStart,
    gradientEnd: Colors.primaryGradientEnd,
    
    gradientTextStart: Colors.primaryGradientTextStart,
    gradientTextEnd: Colors.primaryTextGradientTextEnd,
  },

  spacing: Spacing,
  typography: Typography,
  radius: Radius,

  isDark: false,
};

export const darkTheme: Theme = {
  colors: {
    background: Colors.black,
    surface: '#1F1F1F',

    text: Colors.white,
    textMuted: '#9CA3AF',

    border: '#2D2D2D',

    accent: Colors.accent,
    accentLight: Colors.accentLight,
    limeAccent: Colors.limeGreen,
    primary: Colors.white,

    gradientStart: Colors.primaryGradientStart,
    gradientEnd: Colors.primaryGradientEnd,

    gradientTextStart: Colors.primaryGradientTextStart,
    gradientTextEnd: Colors.primaryTextGradientTextEnd,
  },

  spacing: Spacing,
  typography: Typography,
  radius: Radius,

  isDark: true,
};

export const useTheme = (): Theme => {
  const scheme = useColorScheme();

  return scheme === 'dark'
    ? darkTheme
    : lightTheme;
};