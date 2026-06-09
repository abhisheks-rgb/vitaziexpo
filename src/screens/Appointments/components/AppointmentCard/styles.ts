// File: Appointments/components/AppointmentCard/styles.ts

import { StyleSheet } from 'react-native';

import type { Theme } from '../../../../theme';

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    card: {
      backgroundColor: theme.colors.background,
      borderRadius: 18,
      marginHorizontal: 16,
      marginBottom: 14,
      paddingTop: 16,
      shadowColor: '#000',
      shadowOpacity: 0.06,
      shadowRadius: 12,
      shadowOffset: { width: 0, height: 3 },
      elevation: 3,
      overflow: 'hidden',
    },

    // ── Doctor row ──────────────────────────────────────────────────────
    doctorRow: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      marginBottom: 12,
    },
    avatar: {
      width: 52,
      height: 52,
      borderRadius: 12,
      backgroundColor: theme.colors.surface,
      overflow: 'hidden',
      marginRight: 12,
    },
    doctorInfo: {
      flex: 1,
    },
    doctorName: {
      fontSize: 15,
      fontWeight: '700',
      color: theme.colors.text,
      marginBottom: 2,
    },
    doctorSpecialty: {
      fontSize: 13,
      color: theme.colors.textMuted,
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
      fontSize: 16,
      color: theme.colors.text,
      marginLeft: 2,
    },

    // ── Location row ────────────────────────────────────────────────────
    locationRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      paddingHorizontal: 16,
      marginBottom: 12,
      gap: 8,
    },
    locationIcon: {
      width: 20,
      height: 20,
    },
    locationInfo: {
      flex: 1,
    },
    clinicName: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.colors.text,
      marginBottom: 2,
    },
    clinicAddress: {
      fontSize: 13,
      color: theme.colors.textMuted,
      lineHeight: 18,
    },

    // ── Status banners ──────────────────────────────────────────────────
    reminderBanner: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#FEF3C7',
      paddingHorizontal: 16,
      paddingVertical: 10,
      gap: 8,
    },
    reminderIcon: {
      height: 28,
      width: 28,
    },
    reminderText: {
      fontSize: 13,
      fontWeight: '600',
      color: '#92400E',
    },
    reportBanner: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#E0F7FA',
      paddingHorizontal: 16,
      paddingVertical: 10,
      gap: 8,
    },
    reportIcon: {
      height: 20,
      width: 20,
    },
    reportText: {
      fontSize: 13,
      fontWeight: '600',
      color: '#006064',
    },
  });
