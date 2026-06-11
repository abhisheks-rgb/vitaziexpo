// File: AIAssistant/components/ChatInput/styles.ts

import { StyleSheet } from 'react-native';

import { Colors, type Theme } from '../../../../theme';

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    wrapper: {
      paddingHorizontal: 16,
      paddingVertical: 10,
      backgroundColor: theme.colors.background,
      borderRadius: 40,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: -4,
      },
      shadowOpacity: 0.15,
      shadowRadius: 12,
      elevation: 8,

      // borderTopWidth: 1,
      // borderTopColor: theme.colors.border,
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
      // backgroundColor: '#F4F6FB',
      borderRadius: 28,
      paddingHorizontal: 4,
      paddingVertical: 8,
      gap: 5,
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
      paddingVertical: 8,
      borderWidth: 1.5,
      borderColor: Colors.gray,
      paddingHorizontal: 14,

      borderRadius: 20,
    },

    uploadIcon: {
      color: theme.colors.text,
      borderColor: Colors.gray,
      borderWidth: 1.5,
      borderRadius: 50,
      padding: 6,
    },
    sendBtn: {
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: theme.colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: theme.colors.limeAccent,
      borderWidth: 2,
    },
    sendBtnDisabled: {
      backgroundColor: '#D1D5DB',
      borderColor: Colors.gray,
    },
    sendIcon: {
      width: 18,
      height: 18,
    },
  });
