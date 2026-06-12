import { Colors } from './colors';
import { Radius } from './radius';
import { Spacing } from './spacing';
import { useAppTheme } from './themeProvider';
import { typography } from './typography';

// ─────────────────────────────────────────────────────────────
// Theme Interface
// ─────────────────────────────────────────────────────────────

export interface Theme {
  colors: {
    // ── Backgrounds ───────────────────────────────────────────
    // Main screen background
    background: string;
    // Card / elevated surface background
    surface: string;
    // Subtle tinted surface (e.g. input fields, tag backgrounds)
    surfaceSubtle: string;

    // ── Text ──────────────────────────────────────────────────
    // Primary body text
    textPrimary: string;
    // Secondary / placeholder text
    textSecondary: string;
    // Disabled text
    textDisabled: string;
    // Text on dark/colored backgrounds (e.g. buttons)
    textInverse: string;

    // ── Brand ─────────────────────────────────────────────────
    // Primary brand color (navy)
    primary: string;
    // Lime / neon accent (FAB ring, active toggle, CTA)
    accent: string;
    // Light tint of accent for icon backgrounds, placeholders
    accentSubtle: string;

    // ── Border ────────────────────────────────────────────────
    border: string;
    borderStrong: string;

    // ── Gradient ──────────────────────────────────────────────
    gradientStart: string;
    gradientEnd: string;
    gradientTextStart: string;
    gradientTextEnd: string;

    // ── Semantic ──────────────────────────────────────────────
    success: string;
    warning: string;
    error: string;
  };

  spacing: typeof Spacing;
  typography: typeof typography;
  radius: typeof Radius;

  // Convenience flag for conditional logic (icons, status bar, blur tint)
  isDark: boolean;
}

// ─────────────────────────────────────────────────────────────
// Light Theme
// ─────────────────────────────────────────────────────────────

export const lightTheme: Theme = {
  colors: {
    // Backgrounds
    background: Colors.white,
    surface: '#F5F5F5',
    surfaceSubtle: '#EFF6FF',

    // Text
    textPrimary: Colors.navyDark,
    textSecondary: Colors.muted,
    textDisabled: '#C0CCDA',
    textInverse: Colors.white,

    // Brand
    primary: Colors.navyDark,
    accent: Colors.limeGreen,
    accentSubtle: Colors.accentLight,

    // Border
    border: Colors.border,
    borderStrong: Colors.navyDark,

    // Gradient
    gradientStart: Colors.primaryGradientStart,
    gradientEnd: Colors.primaryGradientEnd,
    gradientTextStart: Colors.primaryGradientTextStart,
    gradientTextEnd: Colors.primaryTextGradientTextEnd,

    // Semantic
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
    // Backgrounds
    background: Colors.black,
    surface: '#1F1F1F',
    surfaceSubtle: '#2A2A2A',

    // Text
    textPrimary: Colors.white,
    textSecondary: '#9CA3AF',
    textDisabled: '#4B5563',
    textInverse: Colors.navyDark,

    // Brand
    primary: Colors.white,
    accent: Colors.limeGreen,
    accentSubtle: '#1A2A1A',

    // Border
    border: Colors.borderDark,
    borderStrong: Colors.white,

    // Gradient
    gradientStart: Colors.primaryGradientStart,
    gradientEnd: Colors.primaryGradientEnd,
    gradientTextStart: Colors.primaryGradientTextStart,
    gradientTextEnd: Colors.primaryTextGradientTextEnd,

    // Semantic
    success: Colors.success,
    warning: Colors.warning,
    error: Colors.error,
  },
  spacing: Spacing,
  typography,
  radius: Radius,
  isDark: true,
};

// ─────────────────────────────────────────────────────────────
// Hook
// ─────────────────────────────────────────────────────────────

export const useTheme = (): Theme => useAppTheme().theme;
