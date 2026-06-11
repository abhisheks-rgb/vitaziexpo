// File: AIAssistant/components/ChatHistory/styles.ts

import { StyleSheet } from 'react-native';

import type { Theme } from '../../theme';

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    list: { flex: 1 },
    listContent: { paddingTop: 8, paddingBottom: 32 },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 14,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
      gap: 12,
    },
    iconWrap: {
      width: 38,
      height: 38,
      borderRadius: 10,
      backgroundColor: '#EBF0F7',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    },
    iconText: { fontSize: 16 },
    rowInfo: { flex: 1 },
    clinic: {
      fontSize: 14,
      fontWeight: '700',
      color: theme.colors.text,
      marginBottom: 2,
    },
    date: {
      fontSize: 12,
      color: theme.colors.textMuted,
    },
    lastMessage: {
      fontSize: 12,
      color: theme.colors.textMuted,
      marginTop: 2,
    },
    thumbnail: {
      width: 44,
      height: 44,
      borderRadius: 8,
      overflow: 'hidden',
      backgroundColor: theme.colors.surface,
      flexShrink: 0,
    },
    chevron: {
      fontSize: 18,
      color: theme.colors.textMuted,
    },
  });
