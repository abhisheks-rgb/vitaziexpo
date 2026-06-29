import { StyleSheet } from 'react-native';

import type { Theme } from '../../../theme';
import { createCommonStyles } from '../../../theme/styles';

export const createListStyles = (theme: Theme) => {
  const common = createCommonStyles(theme);

  return StyleSheet.create({
    // ── Screen & Scroll ───────────────────────────────────────────────────────
    screen: common.screen,
    scroll: common.scroll,
    scrollContent: common.scrollContent,

    // ── Group label ───────────────────────────────────────────────────────────
    groupLabelWrap: {
      marginTop: theme.spacing.md,
      marginBottom: theme.spacing.xs,
    },
    groupLabel: {
      ...theme.typography.caption,
      color: theme.colors.textSecondary,
      textAlign: 'center',
    },

    // ── Notification card ─────────────────────────────────────────────────────
    card: common.card,
    cardBold: {
      borderWidth: 1.5,
      borderColor: theme.colors.border,
    },
    cardInner: {
      ...common.row,
      padding: theme.spacing.xs,
    },
    bellWrap: {
      width: 42,
      height: 42,
      marginRight: theme.spacing.sm,
      flexShrink: 0,
    },
    cardText: {
      flex: 1,
      minWidth: 0,
    },
    cardMessage: {
      ...theme.typography.caption,
      fontSize: 13.5,
      color: theme.colors.textPrimary,
      lineHeight: 19,
    },
    cardMessageBold: {
      fontFamily: theme.typography.button.fontFamily,
    },
    cardTime: {
      ...theme.typography.caption,
      color: theme.colors.textSecondary,
      marginTop: theme.spacing.xs,
    },
  });
};
