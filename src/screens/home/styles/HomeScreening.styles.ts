import { StyleSheet } from 'react-native';

import type { Theme } from '../../../theme';
import { Colors } from '../../../theme/colors';
import { createCommonStyles } from '../../../theme/styles';

export const createScreeningStyles = (theme: Theme) => {
  const common = createCommonStyles(theme);

  return StyleSheet.create({
    // ── Cards ─────────────────────────────────────────────────────────────────
    screeningCard: {
      ...common.card,
      marginBottom: theme.spacing.md,
      overflow: 'hidden',
    },
    eyeCareJourneyCard: {
      ...common.card,
      marginBottom: theme.spacing.md,
      padding: theme.spacing.md,
      overflow: 'hidden',
    },

    // ── Image ─────────────────────────────────────────────────────────────────
    // Dark background while retinal image loads
    screeningImage: {
      width: '100%',
      height: 160,
      backgroundColor: '#111',
    },

    // ── Card footer (clinic name + arrow) ─────────────────────────────────────
    screeningFooter: {
      ...common.rowSpaceBetween,
      padding: theme.spacing.md,
    },
    screeningFooterLeft: {
      flex: 1,
      gap: 2,
    },
    screeningClinic: {
      ...theme.typography.button,
      color: theme.colors.textPrimary,
    },

    // ── Small arrow circle (inside footer) ────────────────────────────────────
    arrowCircle: {
      width: 18,
      height: 18,
      borderRadius: theme.radius.full,
      backgroundColor: theme.colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
    },
    arrowText: {
      ...theme.typography.caption,
      fontSize: 14,
      lineHeight: 18,
      color: theme.colors.textInverse,
    },

    // ── Follow-up banner (below card) ─────────────────────────────────────────
    // Uses skyBlue at ~12% opacity — kept from Colors since it's
    // a one-off brand tint not in the theme palette
    followUp: {
      ...common.row,
      gap: theme.spacing.xs,
      backgroundColor: `${Colors.skyBlue}20`,
      marginHorizontal: theme.spacing.md,
      marginBottom: theme.spacing.md,
      paddingHorizontal: theme.spacing.sm,
      paddingVertical: 8,
      borderRadius: theme.radius.md,
    },
    followUpIconCircle: {
      width: 24,
      height: 24,
      borderRadius: theme.radius.sm,
      backgroundColor: theme.colors.background,
      alignItems: 'center',
      justifyContent: 'center',
    },

    // ── Visit review button ───────────────────────────────────────────────────
    visitReviewBtn: {
      ...common.row,
      backgroundColor: theme.colors.buttonPrimary,
      paddingLeft: 14,
      paddingRight: 6,
      paddingVertical: 6,
      borderRadius: theme.radius.full,
    },
  });
};
