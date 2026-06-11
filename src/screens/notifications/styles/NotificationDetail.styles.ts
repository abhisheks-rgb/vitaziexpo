import { StyleSheet } from 'react-native';

import type { Theme } from '../../../theme';

export const createDetailStyles = (theme: Theme) =>
  StyleSheet.create({
    screen: {
      flex: 1,
    },

    detailScrollContent: {
      paddingHorizontal: theme.spacing.md,
      paddingBottom: 24,
    },

    // ── Detail Header Content ──────────────────────────────────
    detailTitle: {
      ...theme.typography.title,
      fontSize: 20,
      lineHeight: 28,
      marginTop: 4,
      marginBottom: 10,
    },

    detailBody: {
      ...theme.typography.body,
      color: theme.colors.textMuted,
      marginBottom: 18,
    },

    // ── Appointment Card ───────────────────────────────────────
    appointmentCard: {
      backgroundColor: theme.colors.surface,
      borderRadius: 16,
      padding: 16,

      shadowColor: '#000',
      shadowOpacity: 0.06,
      shadowRadius: 10,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      elevation: 3,

      marginBottom: 14,
    },

    appointmentCardTitle: {
      fontSize: 15,
      fontWeight: '600',
      color: theme.colors.text,
      marginBottom: 14,
    },

    // ── Doctor Row ─────────────────────────────────────────────
    doctorRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      marginBottom: 12,
    },

    doctorAvatar: {
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: '#EEF2FF',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    },

    doctorAvatarFallback: {
      fontSize: 22,
    },

    doctorName: {
      fontSize: 14,
      fontWeight: '700',
      color: theme.colors.text,
    },

    doctorSpecialty: {
      fontSize: 12,
      color: theme.colors.textMuted,
      marginTop: 1,
    },

    // ── Detail Rows ────────────────────────────────────────────
    detailRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: 12,
    },

    detailIcon: {
      fontSize: 18,
      marginTop: 1,
    },

    detailTextCol: {
      flex: 1,
    },

    detailLabel: {
      fontSize: 13,
      fontWeight: '700',
      color: theme.colors.text,
    },

    detailValue: {
      fontSize: 13,
      color: theme.colors.textMuted,
      marginTop: 2,
    },

    // ── Reminder Chip (optional future use) ───────────────────
    reminderChip: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#FFF8E7',
      borderRadius: 12,
      padding: 14,
      gap: 10,
      borderWidth: 1,
      borderColor: '#FFE0A0',
      marginBottom: 16,
    },

    reminderBell: {
      width: 40,
      height: 40,
      flexShrink: 0,
    },

    reminderText: {
      flex: 1,
      fontSize: 13,
      color: '#7A5000',
      lineHeight: 19,
      fontWeight: '500',
    },

    // ── CTA Buttons ───────────────────────────────────────────
    bottomBar: {
      flexDirection: 'row',
      paddingHorizontal: theme.spacing.md,
      paddingTop: 20,
      paddingBottom: 24,
      gap: 12,
      backgroundColor: theme.colors.surface,
      borderTopLeftRadius: 40,
      borderTopRightRadius: 40,
      borderBottomWidth: 0,
      // ── Elevation ──
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 16,
      shadowOffset: { width: 0, height: -6 }, // negative Y = shadow goes upward
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
      fontSize: 15,
      fontWeight: '600',
      color: theme.colors.text,
    },

    confirmBtn: {
      flex: 1,
      paddingVertical: 14,
      borderRadius: 30,
      backgroundColor: theme.colors.text,
      borderWidth: 2,
      borderColor: theme.colors.limeAccent,
      alignItems: 'center',
    },

    confirmText: {
      fontSize: 15,
      fontWeight: '600',
      color: theme.colors.surface,
    },
    detailIconContainer: {
      width: 20,
      height: 20,
      marginTop: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
