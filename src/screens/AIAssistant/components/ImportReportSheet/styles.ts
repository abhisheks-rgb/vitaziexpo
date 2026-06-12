import { StyleSheet } from 'react-native';

import type { Theme } from '../../../../theme';
import { createCommonStyles } from '../../../../theme/styles';

export const createStyles = (theme: Theme) => {
  const common = createCommonStyles(theme);

  return StyleSheet.create({
    // ── Modal overlay ─────────────────────────────────────────────────────────
    overlay: {
      ...StyleSheet.absoluteFill,
      backgroundColor: 'rgba(0,0,0,0.35)',
      justifyContent: 'flex-end',
      zIndex: 100,
    },

    // ── Bottom sheet ──────────────────────────────────────────────────────────
    sheet: {
      backgroundColor: theme.colors.background,
      borderTopLeftRadius: theme.radius.xl,
      borderTopRightRadius: theme.radius.xl,
      paddingBottom: theme.spacing.xl,
      maxHeight: '70%',
    },

    // ── Drag handle ───────────────────────────────────────────────────────────
    handle: {
      width: 36,
      height: 4,
      borderRadius: theme.radius.xs,
      backgroundColor: theme.colors.border,
      alignSelf: 'center',
      marginTop: theme.spacing.sm,
      marginBottom: theme.spacing.md,
    },

    // ── Sheet header (title + confirm button) ─────────────────────────────────
    header: {
      ...common.row,
      paddingHorizontal: theme.spacing.md,
      marginBottom: theme.spacing.sm,
    },
    headerTitle: {
      ...theme.typography.button,
      fontSize: 16,
      flex: 1,
      color: theme.colors.textPrimary,
    },

    // ── Confirm button (checkmark circle) ─────────────────────────────────────
    confirmBtn: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: theme.colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
    },
    confirmIcon: {
      ...theme.typography.caption,
      color: theme.colors.textInverse,
    },

    // ── Report row ────────────────────────────────────────────────────────────
    reportRow: {
      ...common.row,
      paddingHorizontal: theme.spacing.md,
      paddingVertical: 14,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    reportRowSelected: {
      backgroundColor: theme.colors.accentSubtle,
    },
    reportInfo: {
      flex: 1,
    },
    reportClinic: {
      ...theme.typography.button,
      fontSize: 14,
      color: theme.colors.textPrimary,
      marginBottom: 2,
    },
    reportDate: {
      ...theme.typography.caption,
      color: theme.colors.textSecondary,
    },

    // ── Checkbox ──────────────────────────────────────────────────────────────
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
      backgroundColor: theme.colors.primary,
      borderColor: theme.colors.primary,
    },
    checkmark: {
      ...theme.typography.caption,
      color: theme.colors.textInverse,
    },
  });
};
