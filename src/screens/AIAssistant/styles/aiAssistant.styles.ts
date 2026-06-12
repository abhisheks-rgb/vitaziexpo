import { StyleSheet } from 'react-native';

import type { Theme } from '../../../theme';
import { createCommonStyles } from '../../../theme/styles';

export const createAIAssistantStyles = (theme: Theme) => {
  const common = createCommonStyles(theme);

  return StyleSheet.create({
    // ── Screen ────────────────────────────────────────────────────────────────
    screen: {
      ...common.screen,
      // Light blue tint background specific to AI Assistant
      backgroundColor: '#EBF0F7',
    },
    flex: {
      flex: 1,
    },

    // ── Chat history button (header right) ────────────────────────────────────
    historyBtn: {
      backgroundColor: theme.colors.background,
      padding: 8,
      borderRadius: theme.radius.full,
    },

    // ── Message list ──────────────────────────────────────────────────────────
    messageList: {
      paddingTop: theme.spacing.xs,
      paddingBottom: theme.spacing.sm,
    },
    emptyListContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: theme.spacing.lg,
    },

    // ── Empty state ───────────────────────────────────────────────────────────
    emptyContainer: {
      alignItems: 'center',
    },
    emptyImage: {
      width: 180,
      height: 180,
      marginBottom: theme.spacing.md,
    },
    emptyTitle: {
      ...theme.typography.button,
      fontSize: 16,
      color: theme.colors.textPrimary,
      marginBottom: theme.spacing.xs,
      textAlign: 'center',
    },
    emptySubtitle: {
      ...theme.typography.caption,
      color: theme.colors.textSecondary,
      textAlign: 'center',
      lineHeight: 18,
    },
  });
};
