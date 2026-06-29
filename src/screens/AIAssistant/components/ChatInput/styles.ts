import { StyleSheet } from 'react-native';

import type { Theme } from '../../../../theme';
import { createCommonStyles } from '../../../../theme/styles';

export const createStyles = (theme: Theme) => {
  const common = createCommonStyles(theme);

  return StyleSheet.create({
    // ── Outer wrapper ─────────────────────────────────────────────────────────
    wrapper: {
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
      backgroundColor: theme.colors.background,
      borderRadius: theme.radius.xxl,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: -4 },
      shadowOpacity: 0.15,
      shadowRadius: 12,
      elevation: 8,
    },

    // ── Imported report chip ──────────────────────────────────────────────────
    importedReportChip: {
      ...common.row,
      backgroundColor: theme.colors.accentSubtle,
      borderRadius: theme.radius.md,
      paddingHorizontal: theme.spacing.sm,
      paddingVertical: theme.spacing.xs,
      marginBottom: theme.spacing.xs,
      gap: theme.spacing.sm,
    },
    importedReportIcon: {
      ...theme.typography.caption,
      fontSize: 14,
    },
    importedReportText: {
      ...theme.typography.button,
      flex: 1,
      fontSize: 13,
      color: theme.colors.textPrimary,
    },
    importedReportClose: {
      ...theme.typography.body,
      fontSize: 16,
      color: theme.colors.textSecondary,
      paddingLeft: theme.spacing.xs,
    },

    // ── Input row ─────────────────────────────────────────────────────────────
    inputRow: {
      ...common.row,
      borderRadius: 28,
      paddingHorizontal: theme.spacing.xs,
      paddingVertical: theme.spacing.xs,
      gap: 5,
    },

    // ── Attach button ─────────────────────────────────────────────────────────
    attachBtn: {
      width: 32,
      height: 32,
      alignItems: 'center',
      justifyContent: 'center',
    },

    // ── Text input ────────────────────────────────────────────────────────────
    input: {
      ...theme.typography.body,
      flex: 1,
      color: theme.colors.textPrimary,
      maxHeight: 100,
      paddingVertical: theme.spacing.xs,
      borderWidth: 1.5,
      borderColor: theme.colors.border,
      paddingHorizontal: 14,
      borderRadius: 20,
    },

    // ── Upload icon button ────────────────────────────────────────────────────
    uploadIcon: {
      color: theme.colors.textPrimary,
      borderColor: theme.colors.border,
      borderWidth: 1.5,
      borderRadius: theme.radius.full,
      padding: 6,
    },

    // ── Send button ───────────────────────────────────────────────────────────
    sendBtn: {
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: theme.colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: theme.colors.accent,
      borderWidth: 2,
    },
    sendBtnDisabled: {
      backgroundColor: theme.colors.textDisabled,
      borderColor: theme.colors.border,
    },
    sendIcon: {
      width: 18,
      height: 18,
    },
  });
};
