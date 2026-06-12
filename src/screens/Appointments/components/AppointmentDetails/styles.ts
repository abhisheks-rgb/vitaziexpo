// File: Appointments/components/AppointmentDetails/styles.ts

import { StyleSheet } from 'react-native';

import type { Theme } from '../../../../theme';

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: '#EBF0F7',
    },
    scroll: {
      flex: 1,
    },
    scrollContent: {
      paddingBottom: 40,
    },

    // ── Doctor header card ──────────────────────────────────────────────
    doctorCard: {
      backgroundColor: theme.colors.background,
      marginHorizontal: 16,
      marginTop: 16,
      borderRadius: 18,
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
      shadowColor: '#000',
      shadowOpacity: 0.06,
      shadowRadius: 12,
      shadowOffset: { width: 0, height: 3 },
      elevation: 3,
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
      fontSize: 17,
      fontWeight: '700',
      color: theme.colors.textPrimary,
      marginBottom: 3,
    },
    doctorSpecialty: {
      fontSize: 13,
      color: theme.colors.textSecondary,
      lineHeight: 18,
    },

    // ── Info card ───────────────────────────────────────────────────────
    infoCard: {
      backgroundColor: theme.colors.background,
      marginHorizontal: 16,
      marginTop: 14,
      borderRadius: 18,
      padding: 16,
      shadowColor: '#000',
      shadowOpacity: 0.06,
      shadowRadius: 12,
      shadowOffset: { width: 0, height: 3 },
      elevation: 3,
    },
    infoCardTitle: {
      fontSize: 15,
      fontWeight: '700',
      color: theme.colors.textPrimary,
      marginBottom: 14,
    },
    infoRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginBottom: 14,
      gap: 12,
    },
    infoIconWrap: {
      width: 32,
      height: 32,
      borderRadius: 8,
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
      fontSize: 13,
      fontWeight: '700',
      color: theme.colors.textPrimary,
      marginBottom: 2,
    },
    infoValue: {
      fontSize: 13,
      color: theme.colors.textSecondary,
      lineHeight: 18,
    },
    infoDot: {
      fontSize: 13,
      color: theme.colors.textSecondary,
      marginHorizontal: 4,
    },
    infoValueRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },

    // ── Reminder banner ─────────────────────────────────────────────────
    reminderBanner: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      backgroundColor: '#FEF3C7',
      marginHorizontal: 16,
      marginTop: 14,
      borderRadius: 18,
      padding: 16,
      gap: 12,
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
    reminderIconText: {
      fontSize: 18,
    },
    reminderIcon: {
      width: 39,
      height: 39,
    },
    reminderText: {
      flex: 1,
      fontSize: 13,
      color: '#92400E',
      lineHeight: 20,
      fontWeight: '500',
      paddingTop: 2,
    },

    // ── Prep instructions ───────────────────────────────────────────────
    prepSection: {
      marginHorizontal: 16,
      marginTop: 20,
    },
    prepTitle: {
      fontSize: 17,
      fontWeight: '800',
      color: theme.colors.textPrimary,
      marginBottom: 14,
    },
    prepRow: {
      flexDirection: 'row',
      marginBottom: 12,
      gap: 10,
    },
    prepNumber: {
      fontSize: 14,
      fontWeight: '700',
      color: theme.colors.textPrimary,
      width: 16,
      lineHeight: 22,
    },
    prepText: {
      flex: 1,
      fontSize: 14,
      color: theme.colors.textPrimary,
      lineHeight: 22,
    },
  });
