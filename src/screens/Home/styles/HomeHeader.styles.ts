import { StyleSheet } from 'react-native';

import { createCommonStyles } from '../../../theme/styles';
import type { Theme } from '../../../theme/theme';

export const createHeaderStyles = (theme: Theme) => {
  const common = createCommonStyles(theme);

  return StyleSheet.create({
    // ── Header row (greeting + actions) ──────────────────────────────────────
    header: {
      ...common.rowSpaceBetween,
      marginBottom: theme.spacing.md,
    },

    // ── Left: greeting + name ─────────────────────────────────────────────────
    greeting: {
      ...theme.typography.caption,
      color: theme.colors.textSecondary,
    },
    name: {
      ...theme.typography.title,
      fontSize: 24,
      color: theme.colors.textPrimary,
    },

    // ── Right: icons + avatar ─────────────────────────────────────────────────
    headerRight: {
      ...common.row,
      gap: theme.spacing.xs,
    },
    headerIcon: common.icon36,
    avatar: {
      ...common.icon36,
      borderRadius: theme.radius.full,
      marginLeft: theme.spacing.xs,
    },
  });
};
