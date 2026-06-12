import { StyleSheet } from 'react-native';

import type { Theme } from '../../../../theme';
import { createCommonStyles } from '../../../../theme/styles';

export const createStyles = (theme: Theme) => {
  const common = createCommonStyles(theme);

  return StyleSheet.create({
    // ── Pill container ────────────────────────────────────────────────────────
    container: {
      ...common.row,
      backgroundColor: theme.colors.accentSubtle,
      borderRadius: theme.radius.full,
      padding: theme.spacing.xs,
      marginHorizontal: theme.spacing.md,
      marginBottom: theme.spacing.md,
    },

    // ── Tab item ──────────────────────────────────────────────────────────────
    tab: {
      flex: 1,
      paddingVertical: theme.spacing.sm,
      borderRadius: theme.radius.full,
      alignItems: 'center',
      justifyContent: 'center',
    },
    tabActive: {
      backgroundColor: theme.colors.primary,
    },

    // ── Tab text ──────────────────────────────────────────────────────────────
    tabText: {
      ...theme.typography.button,
      color: theme.colors.textPrimary,
    },
    tabTextActive: {
      ...theme.typography.button,
      color: theme.colors.textInverse,
    },
  });
};
