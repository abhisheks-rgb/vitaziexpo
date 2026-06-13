import { StyleSheet } from 'react-native';

import { Colors } from '../../../theme/colors';
import { createCommonStyles } from '../../../theme/styles';
import type { Theme } from '../../../theme/theme';

export const createAppointmentStyles = (theme: Theme) => {
  const common = createCommonStyles(theme);

  return StyleSheet.create({
    // ── Section header ────────────────────────────────────────────────────────
    sectionHeader: {
      ...common.row,
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: theme.spacing.sm,
    },
    sectionTitleRow: {
      ...common.row,
      alignItems: 'center',
      gap: theme.spacing.xs,
    },
    sectionTitle: {
      ...theme.typography.subtitle,
      fontSize: 16,
      color: theme.colors.textPrimary,
    },
    // Lime green badge — same as screening card's accent usage
    countBadge: {
      backgroundColor: theme.colors.accent,
      borderRadius: theme.radius.full,
      minWidth: 20,
      height: 20,
      paddingHorizontal: 6,
      alignItems: 'center',
      justifyContent: 'center',
    },
    countBadgeText: {
      ...theme.typography.caption,
      fontSize: 11,
      color: theme.colors.textPrimary, // navy on lime
      fontWeight: '700',
    },
    viewAllText: {
      ...theme.typography.caption,
      fontSize: 13,
      color: theme.colors.primary,
      fontWeight: '500',
    },

    // ── Card container ────────────────────────────────────────────────────────
    apptCard: {
      padding: 0,
      overflow: 'hidden', // clips doctorHeader to card radius
    },
    loadingCard: {
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 80,
      padding: 16,
    },

    // ── Doctor header ─────────────────────────────────────────────────────────
    // Mirrors screening card's visitReviewBtn color (navy buttonPrimary).
    // skyBlue tint strip at bottom ties it to the follow-up banner language.
    doctorHeader: {
      ...common.row,
      gap: theme.spacing.sm,
      alignItems: 'center',
      backgroundColor: theme.colors.buttonPrimary, // navy #152644
      paddingHorizontal: 16,
      paddingTop: 14,
      paddingBottom: 14,
      marginBottom: theme.spacing.sm,
    },
    doctorAvatar: {
      width: 44,
      height: 44,
      borderRadius: theme.radius.full,
      // Subtle white ring — same treatment as screening card image border
      borderWidth: 2,
      borderColor: `${Colors.skyBlue}60`,
    },
    doctorName: {
      ...theme.typography.button,
      fontSize: 14,
      color: Colors.white, // white
    },
    doctorSpecialty: {
      ...theme.typography.caption,
      fontSize: 13,
      // skyBlue tint — exact same color used in followUp banner
      color: Colors.skyBlue,
    },

    // ── Calendar / Bell icon buttons on navy header ───────────────────────────
    iconButtonRow: {
      ...common.row,
      gap: theme.spacing.xs,
      marginLeft: 'auto',
    },
    iconButton: {
      width: 36,
      height: 36,
      borderRadius: theme.radius.md,
      alignItems: 'center',
      justifyContent: 'center',
    },
    // Semi-transparent white — readable on navy, same as visitReviewBtn inner padding logic
    iconButtonBlue: {
      backgroundColor: `${Colors.skyBlue}30`,
    },
    // Lime tint — ties to countBadge accent color
    iconButtonYellow: {
      backgroundColor: `${Colors.limeGreen}25`,
    },
    iconButtonImg: {
      width: 18,
      height: 18,
    },

    // ── Appointment detail rows ───────────────────────────────────────────────
    apptRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: theme.spacing.sm,
    },
    apptIconWrap: {
      width: 32,
      height: 32,
      borderRadius: theme.radius.md,
      // skyBlue at 12% — mirrors followUp banner background
      backgroundColor: `${Colors.skyBlue}20`,
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    },
    apptIcon: {
      width: 16,
      height: 16,
    },
    apptRowText: {
      flex: 1,
      gap: 1,
    },
    apptRowLabel: {
      ...theme.typography.caption,
      fontSize: 13,
      fontWeight: '600',
      color: theme.colors.textPrimary,
      marginBottom: 2,
    },
    apptRowValue: {
      ...theme.typography.caption,
      fontSize: 13,
      color: theme.colors.textSecondary,
    },
    apptRowValueRow: {
      flexDirection: 'row',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: theme.spacing.xs,
    },
    apptRowDot: {
      ...theme.typography.caption,
      fontSize: 13,
      color: theme.colors.textSecondary,
    },

    // ── Direction / Contact action buttons ────────────────────────────────────
    // Mirrors visitReviewBtn shape (full radius pill) but outlined not filled
    actionRow: {
      ...common.row,
      gap: theme.spacing.sm,
    },
    actionButton: {
      flex: 1,
      height: 42,
      borderRadius: theme.radius.full,
      borderWidth: 1.5,
      borderColor: theme.colors.border,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'transparent',
    },
    actionButtonText: {
      ...theme.typography.button,
      fontSize: 14,
      color: theme.colors.textPrimary,
    },

    // ── View All button ───────────────────────────────────────────────────────
    viewAllButton: {
      height: 44,
      borderRadius: theme.radius.full,
      backgroundColor: theme.colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: theme.spacing.xs,
    },
    viewAllButtonText: {
      ...theme.typography.button,
      fontSize: 14,
      color: theme.colors.textInverse,
    },
  });
};
