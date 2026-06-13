import { StyleSheet } from 'react-native';

import type { Theme } from '../../../theme';
import { createCommonStyles } from '../../../theme/styles';

export const createEmptyStyles = (theme: Theme) => {
  const common = createCommonStyles(theme);

  return StyleSheet.create({
    // ── Card ──────────────────────────────────────────────────────────────────
    card: {
      ...common.card,
      marginTop: theme.spacing.md,
      padding: theme.spacing.lg,
      borderRadius: theme.radius.lg,
      flex: 1,
      width: '100%',
    },

    // ── Centered content ──────────────────────────────────────────────────────
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    // ── Illustration ──────────────────────────────────────────────────────────
    image: {
      width: 160,
      height: 160,
      marginBottom: theme.spacing.md,
    },

    // ── Text ──────────────────────────────────────────────────────────────────
    title: {
      ...theme.typography.button,
      fontSize: 16,
      color: theme.colors.textPrimary,
      marginBottom: theme.spacing.xs,
      textAlign: 'center',
    },
    subtitle: {
      ...theme.typography.caption,
      color: theme.colors.textSecondary,
      textAlign: 'center',
      lineHeight: 18,
    },
  });
};
