import { Colors } from './colors';
import { Radius } from './radius';
import { Spacing } from './spacing';
import { typography } from './typography';

// ─────────────────────────────────────────────────────────────
// Theme Interface
// ─────────────────────────────────────────────────────────────

export interface Theme {
  colors: {
    // Backgrounds
    background: string;
    surface: string;
    surfaceSubtle: string;

    // Text
    textPrimary: string;
    textSecondary: string;
    textDisabled: string;
    textInverse: string;

    // Brand
    primary: string;
    buttonPrimary: string;
    accent: string;
    accentSubtle: string;

    // Border
    border: string;
    borderStrong: string;

    // Gradient
    gradientStart: string;
    gradientEnd: string;
    gradientTextStart: string;
    gradientTextEnd: string;

    // Semantic
    success: string;
    warning: string;
    error: string;
  };

  spacing: typeof Spacing;
  typography: typeof typography;
  radius: typeof Radius;
  isDark: boolean;
}

// ─────────────────────────────────────────────────────────────
// Light Theme
// ─────────────────────────────────────────────────────────────

export const lightTheme: Theme = {
  colors: {
    background: Colors.white,
    surface: '#F5F5F5',
    surfaceSubtle: '#EFF6FF',

    textPrimary: Colors.navyDark,
    textSecondary: Colors.muted,
    textDisabled: '#C0CCDA',
    textInverse: Colors.white,

    primary: Colors.navyDark,
    buttonPrimary: Colors.navyDark,
    accent: Colors.limeGreen,
    accentSubtle: Colors.accentLight,

    border: Colors.border,
    borderStrong: Colors.navyDark,

    gradientStart: Colors.primaryGradientStart,
    gradientEnd: Colors.primaryGradientEnd,
    gradientTextStart: Colors.primaryGradientTextStart,
    gradientTextEnd: Colors.primaryTextGradientTextEnd,

    success: Colors.success,
    warning: Colors.warning,
    error: Colors.error,
  },

  spacing: Spacing,
  typography,
  radius: Radius,
  isDark: false,
};

// ─────────────────────────────────────────────────────────────
// Dark Theme
// ─────────────────────────────────────────────────────────────

export const darkTheme: Theme = {
  colors: {
    background: Colors.black,
    surface: '#1F1F1F',
    surfaceSubtle: '#2A2A2A',

    textPrimary: Colors.white,
    textSecondary: '#9CA3AF',
    textDisabled: '#4B5563',
    textInverse: Colors.navyDark,

    primary: Colors.white,
    buttonPrimary: `${Colors.skyBlue}20`,
    accent: '#2A2A2A',
    accentSubtle: '#1A2A1A',

    border: Colors.borderDark,
    borderStrong: Colors.white,

    gradientStart: Colors.primaryGradientStart,
    gradientEnd: Colors.primaryGradientEnd,
    gradientTextStart: Colors.primaryGradientTextStart,
    gradientTextEnd: Colors.primaryTextGradientTextEnd,

    success: Colors.success,
    warning: Colors.warning,
    error: Colors.error,
  },

  spacing: Spacing,
  typography,
  radius: Radius,
  isDark: true,
};
