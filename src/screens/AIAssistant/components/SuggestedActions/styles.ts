import { StyleSheet } from 'react-native';

import type { Theme } from '../../../../theme';
import { createCommonStyles } from '../../../../theme/styles';

export const createStyles = (theme: Theme) => {
  const common = createCommonStyles(theme);

  return StyleSheet.create({
    // ── Horizontal scroll row ─────────────────────────────────────────────────
    scrollContent: {
      ...common.row,
      paddingHorizontal: theme.spacing.md,
      paddingBottom: theme.spacing.sm,
      gap: theme.spacing.sm,
    },

    // ── Suggestion chip ───────────────────────────────────────────────────────
    chip: {
      paddingHorizontal: theme.spacing.sm,
      paddingVertical: theme.spacing.sm,
      borderRadius: theme.radius.md,
      borderWidth: 1,
      borderColor: theme.colors.border,
      shadowColor: '#000',
      shadowOpacity: 0.04,
      shadowRadius: 4,
      shadowOffset: { width: 0, height: 1 },
      elevation: 1,
      gap: theme.spacing.sm,
    },

    // ── Chip text ─────────────────────────────────────────────────────────────
    chipText: {
      ...theme.typography.caption,
      fontSize: 13,
      color: theme.colors.textPrimary,
    },
    chipSubText: {
      ...theme.typography.caption,
      color: theme.colors.textSecondary,
    },
  });
};
