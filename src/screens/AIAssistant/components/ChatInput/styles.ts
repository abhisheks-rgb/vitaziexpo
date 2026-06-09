// File: AIAssistant/components/ChatInput/styles.ts

import { StyleSheet } from 'react-native';
import type { Theme } from '../../../../theme';

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    wrapper: {
      paddingHorizontal: 16,
      paddingVertical: 10,
      backgroundColor: theme.colors.background,
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
    },

    // Imported report chip
    importedReportChip: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#EBF0F7',
      borderRadius: 10,
      paddingHorizontal: 12,
      paddingVertical: 8,
      marginBottom: 8,
      gap: 8,
    },
    importedReportIcon: { fontSize: 14 },
    importedReportText: {
      flex: 1,
      fontSize: 13,
      fontWeight: '600',
      color: '#1B2B4B',
    },
    importedReportClose: {
      fontSize: 16,
      color: '#9CA3AF',
      paddingLeft: 4,
    },

    // Input row
    inputRow: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#F4F6FB',
      borderRadius: 28,
      paddingHorizontal: 14,
      paddingVertical: 8,
      gap: 10,
    },
    attachBtn: {
      width: 32,
      height: 32,
      alignItems: 'center',
      justifyContent: 'center',
    },
    attachIcon: { fontSize: 18, color: '#9CA3AF' },
    input: {
      flex: 1,
      fontSize: 15,
      color: '#1B2B4B',
      maxHeight: 100,
      paddingVertical: 0,
    },
    micBtn: {
      width: 32,
      height: 32,
      alignItems: 'center',
      justifyContent: 'center',
    },
    micIcon: { fontSize: 18, color: '#9CA3AF' },
    sendBtn: {
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: '#1B2B4B',
      alignItems: 'center',
      justifyContent: 'center',
    },
    sendBtnDisabled: {
      backgroundColor: '#D1D5DB',
    },
    sendIcon: { fontSize: 15, color: '#fff' },
  });
