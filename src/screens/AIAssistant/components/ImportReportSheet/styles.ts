// File: AIAssistant/components/ImportReportSheet/styles.ts

import { StyleSheet } from 'react-native';
import type { Theme } from '../../../../theme';

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    overlay: {
      ...StyleSheet.absoluteFill,
      backgroundColor: 'rgba(0,0,0,0.35)',
      justifyContent: 'flex-end',
      zIndex: 100,
    },
    sheet: {
      backgroundColor: theme.colors.background,
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      paddingBottom: 32,
      maxHeight: '70%',
    },
    handle: {
      width: 36,
      height: 4,
      borderRadius: 2,
      backgroundColor: theme.colors.border,
      alignSelf: 'center',
      marginTop: 12,
      marginBottom: 16,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 20,
      marginBottom: 12,
    },
    headerTitle: {
      flex: 1,
      fontSize: 16,
      fontWeight: '700',
      color: theme.colors.text,
    },
    confirmBtn: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: '#1B2B4B',
      alignItems: 'center',
      justifyContent: 'center',
    },
    confirmIcon: { fontSize: 14, color: '#fff' },
    reportRow: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 14,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    reportRowSelected: {
      backgroundColor: '#F0F4FF',
    },
    reportInfo: { flex: 1 },
    reportClinic: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.colors.text,
      marginBottom: 2,
    },
    reportDate: {
      fontSize: 12,
      color: theme.colors.textMuted,
    },
    checkbox: {
      width: 22,
      height: 22,
      borderRadius: 11,
      borderWidth: 2,
      borderColor: theme.colors.border,
      alignItems: 'center',
      justifyContent: 'center',
    },
    checkboxSelected: {
      backgroundColor: '#1B2B4B',
      borderColor: '#1B2B4B',
    },
    checkmark: { fontSize: 11, color: '#fff' },
  });
