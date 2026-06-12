import { StyleSheet } from 'react-native';
import type { Theme } from '../../../../theme';
import { createCommonStyles } from '../../../../theme/styles';

export const createStyles = (theme: Theme) => {
  const common = createCommonStyles(theme);

  return StyleSheet.create({
    // ── Card ──────────────────────────────────────────────────────────────────
    card: {
      ...common.card,
      backgroundColor: theme.colors.background,
      borderRadius: 18,
      marginHorizontal: theme.spacing.md,
      marginBottom: 14,
      paddingTop: theme.spacing.md,
      shadowOpacity: 0.06,
      shadowRadius: 12,
      shadowOffset: { width: 0, height: 3 },
      elevation: 3,
      overflow: 'hidden',
    },

    // ── Doctor row ────────────────────────────────────────────────────────────
    doctorRow: {
      ...common.row,
      paddingHorizontal: theme.spacing.md,
      marginBottom: theme.spacing.sm,
    },
    avatar: {
      width: 52,
      height: 52,
      borderRadius: theme.radius.md,
      backgroundColor: theme.colors.surface,
      overflow: 'hidden',
      marginRight: theme.spacing.sm,
    },
    doctorInfo: {
      flex: 1,
    },
    doctorName: {
      ...theme.typography.button,
      fontSize: 15,
      color: theme.colors.textPrimary,
      marginBottom: 2,
    },
    doctorSpecialty: {
      ...theme.typography.caption,
      color: theme.colors.textSecondary,
      lineHeight: 18,
    },
    chevronBtn: {
      width: 36,
      height: 36,
      borderRadius: 18,
      borderWidth: 1.5,
      borderColor: theme.colors.border,
      alignItems: 'center',
      justifyContent: 'center',
    },
    chevronText: {
      ...theme.typography.body,
      fontSize: 16,
      color: theme.colors.textPrimary,
      marginLeft: 2,
    },

    // ── Location row ──────────────────────────────────────────────────────────
    locationRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      paddingHorizontal: theme.spacing.md,
      marginBottom: theme.spacing.sm,
      gap: theme.spacing.sm,
    },
    locationIcon: {
      width: 20,
      height: 20,
    },
    locationInfo: {
      flex: 1,
    },
    clinicName: {
      ...theme.typography.button,
      fontSize: 14,
      color: theme.colors.textPrimary,
      marginBottom: 2,
    },
    clinicAddress: {
      ...theme.typography.caption,
      color: theme.colors.textSecondary,
      lineHeight: 18,
    },

    // ── Status banners ────────────────────────────────────────────────────────
    // Warning tones kept as semantic one-offs — not in theme palette
    reminderBanner: {
      ...common.row,
      backgroundColor: '#FEF3C7',
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
      gap: theme.spacing.sm,
    },
    reminderIcon: {
      width: 28,
      height: 28,
    },
    reminderText: {
      ...theme.typography.caption,
      fontFamily: theme.typography.button.fontFamily,
      color: '#92400E',
    },
    reportBanner: {
      ...common.row,
      backgroundColor: '#E0F7FA',
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
      gap: theme.spacing.sm,
    },
    reportIcon: {
      width: 20,
      height: 20,
    },
    reportText: {
      ...theme.typography.caption,
      fontFamily: theme.typography.button.fontFamily,
      color: '#006064',
    },
  });
};
