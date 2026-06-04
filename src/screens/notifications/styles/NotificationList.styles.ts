import { StyleSheet } from 'react-native';

import { Theme } from '../../../theme';

export const createListStyles = (theme: Theme) =>
  StyleSheet.create({
    screen: {
      flex: 1,
    },

    scroll: {
      flex: 1,
    },

    scrollContent: {
      paddingHorizontal: theme.spacing.md,
      paddingBottom: 32,
    },

    // ── Group label ─────────────────────────────────────────────
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

    // ── Notification card ──────────────────────────────────────
    card: {
      backgroundColor: theme.colors.surface,
      borderRadius: 14,
      marginBottom: 10,

      shadowColor: '#000',
      shadowOpacity: 0.06,
      shadowRadius: 8,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      elevation: 2,
    },

    cardBold: {
      borderWidth: 1.5,
      borderColor: theme.colors.border,
    },

    cardInner: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 8,
    },

    bellWrap: {
      width: 42,
      height: 42,
      marginRight: 12,
      flexShrink: 0,
    },

    cardText: {
      flex: 1,
      minWidth: 0,
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
  });
