import { StyleSheet } from 'react-native';

import type { Theme } from '../../theme';

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },

    // ── Row ───────────────────────────────────────────────────────────────────
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 14,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
      gap: 12,
    },

    // ── Avatar ────────────────────────────────────────────────────────────────
    iconWrap: {
      width: 42,
      height: 42,
      borderRadius: 12,
      backgroundColor: '#EBF0F7',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      overflow: 'hidden',
    },
    iconText: { fontSize: 18 },

    // ── Content ───────────────────────────────────────────────────────────────
    rowInfo: { flex: 1, minWidth: 0 },
    clinic: {
      fontSize: 14,
      fontWeight: '700',
      color: theme.colors.textPrimary,
      marginBottom: 3,
    },
    lastMessage: {
      fontSize: 12,
      color: theme.colors.textSecondary,
      flexShrink: 1,
    },
    lastMessageUnread: {
      color: theme.colors.textPrimary,
      fontWeight: '600',
    },

    // ── Right column (time + badge + thumbnail) ───────────────────────────────
    rowRight: {
      alignItems: 'flex-end',
      gap: 4,
      flexShrink: 0,
    },
    date: {
      fontSize: 11,
      color: theme.colors.textSecondary,
    },
    thumbnail: {
      width: 44,
      height: 44,
      borderRadius: 8,
      overflow: 'hidden',
      backgroundColor: theme.colors.surface,
    },

    // ── Unread badge ──────────────────────────────────────────────────────────
    badge: {
      minWidth: 18,
      height: 18,
      borderRadius: 9,
      paddingHorizontal: 4,
      alignItems: 'center',
      justifyContent: 'center',
    },
    badgeText: {
      fontSize: 10,
      fontWeight: '700',
      color: '#fff',
    },

    // ── Empty state ───────────────────────────────────────────────────────────
    emptyContainer: {
      alignItems: 'center',
      maxWidth: 420,
      paddingHorizontal: 24,
    },
    emptyImage: {
      width: 180,
      height: 180,
      marginBottom: 16,
    },
    emptyTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.colors.textPrimary,
      marginBottom: 8,
      textAlign: 'center',
    },
    emptySubtitle: {
      fontSize: 13,
      color: theme.colors.textSecondary,
      textAlign: 'center',
      lineHeight: 18,
    },
  });
