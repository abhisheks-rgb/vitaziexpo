// File: AIAssistant/components/SuggestedActions/styles.ts

import { StyleSheet } from 'react-native';

import { Colors, type Theme } from '../../../../theme';

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    scrollContent: {
      flexDirection: 'row',
      paddingHorizontal: 16,
      paddingBottom: 10,
      gap: 8,
    },
    chip: {
      paddingHorizontal: 12,
      paddingVertical: 12,
      borderRadius: 10,
      // backgroundColor: theme.colors.background,
      borderWidth: 1,
      borderColor: Colors.white,
      shadowColor: '#000',
      shadowOpacity: 0.04,
      shadowRadius: 4,
      shadowOffset: { width: 0, height: 1 },
      elevation: 1,
      gap: 10,
    },
    chipText: {
      fontSize: 13,
      color: theme.colors.text,
      fontWeight: '500',
    },
    chipSubText: {
      fontSize: 12,
      color: theme.colors.textMuted,
    },
  });
