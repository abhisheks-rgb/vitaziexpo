import { StyleSheet } from 'react-native';
import type { Theme } from '../../../theme';
import { createCommonStyles } from '../../../theme/styles';

export const createDetailStyles = (theme: Theme) => {
  const common = createCommonStyles(theme);

  return StyleSheet.create({
    // ── Screen & Scroll ───────────────────────────────────────────────────────
    screen: common.screen,
    detailScrollContent: {
      ...common.scrollContent,
      paddingBottom: theme.spacing.lg,
    },

    // ── Header text ───────────────────────────────────────────────────────────
    detailTitle: {
      ...theme.typography.title,
      fontSize: 20,
      lineHeight: 28,
      color: theme.colors.textPrimary,
      marginTop: theme.spacing.xs,
      marginBottom: theme.spacing.sm,
    },
    detailBody: {
      ...theme.typography.body,
      color: theme.colors.textSecondary,
      marginBottom: 18,
    },

    // ── Appointment card ──────────────────────────────────────────────────────
    appointmentCard: {
      ...common.card,
      borderRadius: 16,
      padding: theme.spacing.md,
      marginBottom: 14,
    },
    appointmentCardTitle: {
      ...theme.typography.button,
      fontSize: 15,
      color: theme.colors.textPrimary,
      marginBottom: 14,
    },

    // ── Doctor row ────────────────────────────────────────────────────────────
    doctorRow: {
      ...common.row,
      gap: theme.spacing.sm,
      marginBottom: theme.spacing.sm,
    },
    doctorAvatar: {
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: theme.colors.accentSubtle,
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    },
    doctorName: {
      ...theme.typography.button,
      fontSize: 14,
      color: theme.colors.textPrimary,
    },
    doctorSpecialty: {
      ...theme.typography.caption,
      color: theme.colors.textSecondary,
      marginTop: 1,
    },

    // ── Detail rows (date, location, type) ────────────────────────────────────
    detailRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: theme.spacing.sm,
    },
    detailIconContainer: {
      width: 20,
      height: 20,
      marginTop: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    detailIcon: {
      ...theme.typography.body,
      fontSize: 18,
      marginTop: 1,
    },
    detailTextCol: {
      flex: 1,
    },
    detailLabel: {
      ...theme.typography.caption,
      fontFamily: theme.typography.button.fontFamily,
      color: theme.colors.textPrimary,
    },
    detailValue: {
      ...theme.typography.caption,
      color: theme.colors.textSecondary,
      marginTop: 2,
    },

    // ── Reminder chip ─────────────────────────────────────────────────────────
    // Semantic warning colors kept as one-offs
    reminderChip: {
      ...common.row,
      alignItems: 'center',
      backgroundColor: '#FFF8E7',
      borderRadius: theme.radius.md,
      padding: 14,
      gap: theme.spacing.sm,
      borderWidth: 1,
      borderColor: '#FFE0A0',
      marginBottom: theme.spacing.md,
    },
    reminderBell: {
      width: 40,
      height: 40,
      flexShrink: 0,
    },
    reminderText: {
      ...theme.typography.caption,
      fontFamily: theme.typography.button.fontFamily,
      flex: 1,
      color: '#7A5000',
      lineHeight: 19,
    },

    // ── Bottom CTA bar ────────────────────────────────────────────────────────
    bottomBar: {
      ...common.row,
      paddingHorizontal: theme.spacing.md,
      paddingTop: theme.spacing.lg,
      paddingBottom: theme.spacing.lg,
      gap: theme.spacing.sm,
      backgroundColor: theme.colors.surface,
      borderTopLeftRadius: theme.radius.xxl,
      borderTopRightRadius: theme.radius.xxl,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 16,
      shadowOffset: { width: 0, height: -6 },
      elevation: 12,
    },
    rescheduleBtn: {
      flex: 1,
      paddingVertical: 14,
      borderRadius: 30,
      borderWidth: 1.5,
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.surface,
      alignItems: 'center',
    },
    rescheduleText: {
      ...theme.typography.button,
      color: theme.colors.textPrimary,
    },
    confirmBtn: {
      flex: 1,
      paddingVertical: 14,
      borderRadius: 30,
      backgroundColor: theme.colors.primary,
      borderWidth: 2,
      borderColor: theme.colors.accent,
      alignItems: 'center',
    },
    confirmText: {
      ...theme.typography.button,
      color: theme.colors.textInverse,
    },
  });
};
