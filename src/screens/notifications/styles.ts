import { StyleSheet } from 'react-native';
import { Theme } from '../../theme';

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    screen: {
      flex: 1,
    },

    // ── Header ──────────────────────────────────────────────────────────────────
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: theme.spacing.md,
      paddingVertical: 12,
      gap: 12,
    },

    backCircle: {
      width: 34,
      height: 34,
      borderRadius: 17,
      backgroundColor: theme.colors.limeAccent,
      alignItems: 'center',
      justifyContent: 'center',
    },

    backArrow: {
      fontSize: 22,
      color: theme.colors.text,
      lineHeight: 26,
      fontWeight: '600',
    },

    headerTitle: {
      ...theme.typography.title,
      fontSize: 20,
    },

    // ── Scroll containers ────────────────────────────────────────────────────────
    scroll: {
      flex: 1,
    },

    scrollContent: {
      paddingHorizontal: theme.spacing.md,
      paddingBottom: 32,
    },

    detailScrollContent: {
      paddingHorizontal: theme.spacing.md,
      paddingBottom: 24,
    },

    // ── Group label ──────────────────────────────────────────────────────────────
    groupLabelWrap: {
      marginTop: 16,
      marginBottom: 8,
    },

    groupLabel: {
      fontSize: 13,
      color: theme.colors.textMuted,
      fontWeight: '500',
      textAlign: 'center',
    },

    // ── Notification card ────────────────────────────────────────────────────────
    card: {
      backgroundColor: theme.colors.surface,
      borderRadius: 14,
      marginBottom: 10,
      shadowColor: '#000',
      shadowOpacity: 0.06,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 2 },
      elevation: 2,
    },

    cardBold: {
      borderWidth: 1.5,
      borderColor: theme.colors.accent,
    },

    cardInner: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 14,
      gap: 12,
    },

    bellWrap: {
      width: 42,
      height: 42,
      borderRadius: 21,
      backgroundColor: '#FFF3DC',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    },

    bellEmoji: {
      fontSize: 20,
    },

    cardText: {
      flex: 1,
    },

    cardMessage: {
      fontSize: 13.5,
      color: theme.colors.text,
      lineHeight: 19,
    },

    cardMessageBold: {
      fontWeight: '700',
    },

    cardTime: {
      marginTop: 4,
      fontSize: 12,
      color: theme.colors.textMuted,
    },

    chevronWrap: {
      width: 30,
      height: 30,
      borderRadius: 15,
      backgroundColor: theme.colors.accentLight,
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    },

    chevron: {
      fontSize: 18,
      color: theme.colors.text,
      fontWeight: '500',
    },

    // ── Detail: title & body ─────────────────────────────────────────────────────
    detailTitle: {
      ...theme.typography.title,
      fontSize: 20,
      lineHeight: 28,
      marginBottom: 10,
      marginTop: 4,
    },

    detailBody: {
      ...theme.typography.body,
      color: theme.colors.textMuted,
      marginBottom: 18,
    },

    // ── Appointment card ─────────────────────────────────────────────────────────
    appointmentCard: {
      backgroundColor: theme.colors.surface,
      borderRadius: 16,
      padding: 16,
      shadowColor: '#000',
      shadowOpacity: 0.06,
      shadowRadius: 10,
      shadowOffset: { width: 0, height: 2 },
      elevation: 3,
      marginBottom: 14,
    },

    appointmentCardTitle: {
      fontSize: 15,
      fontWeight: '600',
      color: theme.colors.text,
      marginBottom: 14,
    },

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

    divider: {
      height: 1,
      backgroundColor: theme.colors.border,
      marginVertical: 10,
    },

    // ── Detail row (date / location / type) ──────────────────────────────────────
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

    // ── Reminder chip ────────────────────────────────────────────────────────────
    reminderChip: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#FFF8E7',
      borderRadius: 12,
      padding: 14,
      gap: 10,
      borderWidth: 1,
      borderColor: '#FFE0A0',
    },

    reminderBell: {
      fontSize: 22,
      flexShrink: 0,
    },

    reminderText: {
      flex: 1,
      fontSize: 13,
      color: '#7A5000',
      lineHeight: 19,
      fontWeight: '500',
    },

    // ── CTA buttons ──────────────────────────────────────────────────────────────
    ctaRow: {
      flexDirection: 'row',
      paddingHorizontal: theme.spacing.md,
      paddingBottom: 16,
      paddingTop: 8,
      gap: 12,
    },

    rescheduleBtn: {
      flex: 1,
      paddingVertical: 14,
      borderRadius: 30,
      borderWidth: 1.5,
      borderColor: theme.colors.border,
      alignItems: 'center',
      backgroundColor: theme.colors.surface,
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
      alignItems: 'center',
      borderWidth: 2,
      borderColor: theme.colors.limeAccent,
    },

    confirmText: {
      fontSize: 15,
      fontWeight: '600',
      color: theme.colors.surface,
    },
  });