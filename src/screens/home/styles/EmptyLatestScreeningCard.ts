import { StyleSheet } from 'react-native';

import type { Theme } from '../../../theme';
import { createCommonStyles } from '../../../theme/styles';

export const createEmptyScreeningStyles = (theme: Theme) => {
  const common = createCommonStyles(theme);

  return StyleSheet.create({
    // ── Empty state image ─────────────────────────────────────────────────────
    emptyScheduleImage: {
      width: 150,
      height: 150,
    },

    // ── Card ──────────────────────────────────────────────────────────────────
    emptyScreeningCard: {
      ...common.card,
      marginBottom: theme.spacing.md,
      padding: theme.spacing.md,
      overflow: 'hidden',
    },
    emptyScreeningBodyView: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },

    // ── Welcome row ───────────────────────────────────────────────────────────
    welcomeRow: {
      ...common.row,
      marginBottom: 10,
      justifyContent: 'center',
    },
    aiIcon: {
      aspectRatio: 3,
      height: 22,
      marginLeft: 6,
    },
    welcomeText: {
      ...theme.typography.subtitle,
      color: theme.colors.textPrimary,
    },
    subtitleWelcomeText: {
      ...theme.typography.caption,
      color: theme.colors.textSecondary,
      marginBottom: 10,
    },
    clinicNotificationText: {
      ...theme.typography.caption,
      color: theme.colors.textSecondary,
      marginBottom: 16,
    },

    // ── Learn how it works button ─────────────────────────────────────────────
    learnHowItWorksButton: {
      ...common.row,
      backgroundColor: theme.colors.primary,
      paddingLeft: 16,
      paddingRight: 8,
      paddingVertical: 8,
      borderRadius: theme.radius.full,
      alignSelf: 'flex-start',
    },
    learnHowItWorksText: {
      ...theme.typography.button,
      color: theme.colors.textInverse,
    },

    // ── Arrow elements (inside button) ────────────────────────────────────────
    arrowCircle: {
      ...common.row,
      backgroundColor: 'rgba(255,255,255,0.25)',
      height: 20,
      width: 20,
      borderRadius: 40,
      padding: 4,
      justifyContent: 'center',
      alignItems: 'center',
    },
    arrowText: {
      ...theme.typography.subtitle,
      color: theme.colors.textInverse,
    },
  });
};
