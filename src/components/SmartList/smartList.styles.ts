import { Platform, StyleSheet, ViewStyle } from 'react-native';

import type { Theme } from '../../theme';
import { createCommonStyles } from '../../theme/styles';

export const createSmartListStyles = (theme: Theme) => {
  const common = createCommonStyles(theme);

  return StyleSheet.create({
    // ── Outer container ───────────────────────────────────────────────────────
    container: {
      flex: 1,
    },

    // ── Sub-header outer wrapper (sits between AppHeader and list) ────────────
    // Background/padding/elevation/borderRadius are applied here so that
    // subHeaderStyle and subHeaderElevation can override them, and so an
    // optional subHeaderBackground image can sit underneath the content.
    subHeader: {
      backgroundColor: 'transparent',
      overflow: 'hidden',
    },

    // ── Sub-header background image wrapper ────────────────────────────────────
    subHeaderBackground: {
      width: '100%',
    },

    // ── Sub-header content row ─────────────────────────────────────────────────
    subHeaderRow: {
      ...common.rowSpaceBetween,
    },
    subHeaderRight: {
      ...common.row,
      gap: theme.spacing.sm,
    },

    // ── View-mode toggle ──────────────────────────────────────────────────────
    toggleWrap: {
      ...common.toggleWrap,
      backgroundColor: theme.colors.surface,
      borderRadius: theme.radius.md,
      padding: 4,
    },
    toggleBtn: {
      ...common.toggleBtn,
      width: 38,
      height: 28,
      borderRadius: theme.radius.sm,
    },
    toggleBtnActive: common.toggleBtnActive,

    // ── List item separator (list mode only) ──────────────────────────────────
    separator: {
      height: 10,
    },

    // ── Grid item wrapper ─────────────────────────────────────────────────────
    // flex:1 so both columns share width equally; overflow:hidden clips card radius
    gridItemWrapper: {
      flex: 1,
      overflow: 'hidden',
    },

    // ── Load-more footer ──────────────────────────────────────────────────────
    footer: {
      paddingVertical: theme.spacing.lg,
      alignItems: 'center',
    },

    // ── Empty state ───────────────────────────────────────────────────────────
    emptyContent: {
      flexGrow: 1,
    },
  });
};

// ── Sub-header elevation / shadow helper ──────────────────────────────────────
// Returns a ViewStyle that adds a drop shadow on iOS and elevation on Android.
// `level` controls intensity (default: 4). Pass `undefined` for the default.
export const createSubHeaderElevationStyle = (level?: number): ViewStyle => {
  const elevation = level ?? 4;

  return Platform.select<ViewStyle>({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: elevation / 2 },
      shadowOpacity: 0.08 + elevation * 0.01,
      shadowRadius: elevation,
      // zIndex helps the shadow render above sibling content when sticky
      zIndex: 10,
    },
    android: {
      elevation,
      zIndex: 10,
    },
    default: {
      elevation,
    },
  }) as ViewStyle;
};

export type SmartListStyles = ReturnType<typeof createSmartListStyles>;
