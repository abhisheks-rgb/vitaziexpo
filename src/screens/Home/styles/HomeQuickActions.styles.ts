import { StyleSheet } from 'react-native';

import type { Theme } from '../../../theme';
import { createCommonStyles } from '../../../theme/styles';

export const createQuickActionsStyles = (theme: Theme) => {
  const common = createCommonStyles(theme);

  return StyleSheet.create({
    // ── Row of actions ────────────────────────────────────────────────────────
    quickActions: {
      ...common.rowSpaceBetween,
      marginBottom: theme.spacing.md,
    },

    // ── Single action (circle card + label) ───────────────────────────────────
    quickAction: {
      alignItems: 'center',
      gap: theme.spacing.xs,
    },

    // ── Circular card ─────────────────────────────────────────────────────────
    quickActionCard: {
      width: 64,
      height: 64,
      borderRadius: 32,
      borderWidth: 1.5,
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.background,
    },
    quickActionInner: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },

    // ── Icon & label ──────────────────────────────────────────────────────────
    quickActionIcon: {
      width: 26,
      height: 26,
    },
    quickActionLabel: {
      ...theme.typography.caption,
      fontSize: 11,
      color: theme.colors.textSecondary,
    },
  });
};
