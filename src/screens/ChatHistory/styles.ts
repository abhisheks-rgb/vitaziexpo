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
      color: theme.colors.textPrimary,
      marginBottom: 2,
    },
    date: {
      fontSize: 12,
      color: theme.colors.textSecondary,
    },
    lastMessage: {
      fontSize: 12,
      color: theme.colors.textSecondary,
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
      color: theme.colors.textSecondary,
    },

    emptyListContainer: {
      flex: 1, // 👈 FULL HEIGHT
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 24,
    },

    emptyContainer: {
      alignItems: 'center',
      maxWidth: 420,
    },

    emptyImage: {
      width: 180,
      height: 180,
      marginBottom: 16,
    },

    emptyTitle: {
      fontSize: 16,
      fontWeight: '600',
      marginBottom: 8,
      textAlign: 'center',
    },

    emptySubtitle: {
      fontSize: 13,
      textAlign: 'center',
      lineHeight: 18,
    },
  });
