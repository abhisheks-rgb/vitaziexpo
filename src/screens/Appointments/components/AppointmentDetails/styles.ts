import { StyleSheet } from 'react-native';
import type { Theme } from '../../../../theme';
import { createCommonStyles } from '../../../../theme/styles';

export const createStyles = (theme: Theme) => {
  const common = createCommonStyles(theme);

  // Reusable card shape for this screen — slightly stronger shadow than common.card
  const detailCard = {
    ...common.card,
    backgroundColor: theme.colors.background,
    borderRadius: 18,
    marginHorizontal: theme.spacing.md,
    padding: theme.spacing.md,
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  };

  return StyleSheet.create({
    // ── Screen & Scroll ───────────────────────────────────────────────────────
    screen: {
      ...common.screen,
      backgroundColor: '#EBF0F7',
    },
    scroll: common.scroll,
    scrollContent: {
      paddingBottom: theme.spacing.xxl,
    },

    // ── Doctor header card ────────────────────────────────────────────────────
    doctorCard: {
      ...detailCard,
      ...common.row,
      marginTop: theme.spacing.md,
    },
    doctorAvatar: {
      width: 64,
      height: 64,
      borderRadius: 14,
      backgroundColor: theme.colors.surface,
      overflow: 'hidden',
      marginRight: 14,
    },
    doctorName: {
      ...theme.typography.button,
      fontSize: 17,
      color: theme.colors.textPrimary,
      marginBottom: 3,
    },
    doctorSpecialty: {
      ...theme.typography.caption,
      color: theme.colors.textSecondary,
      lineHeight: 18,
    },

    // ── Info card ─────────────────────────────────────────────────────────────
    infoCard: {
      ...detailCard,
      marginTop: 14,
    },
    infoCardTitle: {
      ...theme.typography.button,
      fontSize: 15,
      color: theme.colors.textPrimary,
      marginBottom: 14,
    },
    infoRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginBottom: 14,
      gap: theme.spacing.sm,
    },
    infoIconWrap: {
      width: 32,
      height: 32,
      borderRadius: theme.radius.sm,
      backgroundColor: theme.colors.surface,
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    },
    infoIcon: {
      width: 20,
      height: 20,
    },
    infoTextWrap: {
      flex: 1,
    },
    infoLabel: {
      ...theme.typography.caption,
      fontFamily: theme.typography.button.fontFamily,
      color: theme.colors.textPrimary,
      marginBottom: 2,
    },
    infoValue: {
      ...theme.typography.caption,
      color: theme.colors.textSecondary,
      lineHeight: 18,
    },
    infoValueRow: {
      ...common.row,
    },
    infoDot: {
      ...theme.typography.caption,
      color: theme.colors.textSecondary,
      marginHorizontal: theme.spacing.xs,
    },

    // ── Reminder banner ───────────────────────────────────────────────────────
    // Semantic warning colors kept as one-offs — add to theme if used elsewhere
    reminderBanner: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      backgroundColor: '#FEF3C7',
      marginHorizontal: theme.spacing.md,
      marginTop: 14,
      borderRadius: 18,
      padding: theme.spacing.md,
      gap: theme.spacing.sm,
    },
    reminderIconWrap: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: '#F59E0B',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    },
    reminderIcon: {
      width: 39,
      height: 39,
    },
    reminderText: {
      ...theme.typography.caption,
      fontFamily: theme.typography.button.fontFamily,
      flex: 1,
      color: '#92400E',
      lineHeight: 20,
      paddingTop: 2,
    },

    // ── Prep instructions ─────────────────────────────────────────────────────
    prepSection: {
      marginHorizontal: theme.spacing.md,
      marginTop: theme.spacing.lg,
    },
    prepTitle: {
      ...theme.typography.subtitle,
      color: theme.colors.textPrimary,
      marginBottom: 14,
    },
    prepRow: {
      ...common.row,
      alignItems: 'flex-start',
      marginBottom: theme.spacing.sm,
      gap: theme.spacing.sm,
    },
    prepNumber: {
      ...theme.typography.body,
      fontFamily: theme.typography.button.fontFamily,
      color: theme.colors.textPrimary,
      width: 16,
      lineHeight: 22,
    },
    prepText: {
      ...theme.typography.body,
      flex: 1,
      color: theme.colors.textPrimary,
      lineHeight: 22,
    },
  });
};
