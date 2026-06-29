import { Dimensions, StyleSheet } from 'react-native';

import type { Theme } from '../../../../theme';
import { createCommonStyles } from '../../../../theme/styles';

const { width: SCREEN_W } = Dimensions.get('window');
const MAX_BUBBLE_W = SCREEN_W * 0.72;

export const createStyles = (theme: Theme) => {
  const common = createCommonStyles(theme);

  return StyleSheet.create({
    // ── Message rows ──────────────────────────────────────────────────────────
    rowUser: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      marginBottom: theme.spacing.sm,
      paddingHorizontal: theme.spacing.md,
    },
    rowAssistant: {
      ...common.row,
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      marginBottom: theme.spacing.sm,
      paddingHorizontal: theme.spacing.md,
      gap: theme.spacing.sm,
    },

    // ── AI avatar icon ────────────────────────────────────────────────────────
    robotIconWrap: {
      width: 35,
      height: 35,
      borderRadius: theme.radius.full,
      backgroundColor: theme.colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 2,
      flexShrink: 0,
      borderColor: theme.colors.accent,
      borderWidth: 2,
    },

    // ── Bubbles ───────────────────────────────────────────────────────────────
    bubbleUser: {
      maxWidth: MAX_BUBBLE_W,
      backgroundColor: theme.colors.primary,
      borderRadius: 18,
      borderBottomRightRadius: theme.radius.xs,
      paddingHorizontal: 14,
      paddingVertical: theme.spacing.sm,
    },
    bubbleAssistant: {
      ...common.card,
      maxWidth: MAX_BUBBLE_W,
      borderRadius: 18,
      borderBottomLeftRadius: theme.radius.xs,
      paddingHorizontal: 14,
      paddingVertical: theme.spacing.sm,
    },

    // ── Bubble text ───────────────────────────────────────────────────────────
    textUser: {
      ...theme.typography.body,
      fontSize: 14,
      color: theme.colors.textInverse,
      lineHeight: 20,
    },
    textAssistant: {
      ...theme.typography.body,
      fontSize: 14,
      color: theme.colors.textPrimary,
      lineHeight: 20,
    },

    // ── Date separator ────────────────────────────────────────────────────────
    dateSeparatorWrap: {
      alignItems: 'center',
      marginVertical: 14,
    },
    dateSeparatorText: {
      ...theme.typography.caption,
      color: theme.colors.primary,
    },
  });
};
