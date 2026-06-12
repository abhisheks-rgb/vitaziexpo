import { StyleSheet } from 'react-native';

import { createCommonStyles } from '../../../theme/styles';
import type { Theme } from '../../../theme/theme';

export const createAppointmentStyles = (theme: Theme) => {
  const common = createCommonStyles(theme);

  return StyleSheet.create({
    // ── Card layout ───────────────────────────────────────────────────────────
    apptCard: {
      gap: theme.spacing.sm,
    },

    // ── Doctor row (avatar + name) ────────────────────────────────────────────
    doctorRow: {
      ...common.row,
      gap: theme.spacing.sm,
    },
    doctorAvatar: {
      width: 44,
      height: 44,
      borderRadius: theme.radius.full,
    },
    doctorName: {
      ...theme.typography.button,
      fontSize: 14,
      color: theme.colors.textPrimary,
    },

    // ── Divider ───────────────────────────────────────────────────────────────
    divider: {
      height: 1,
      backgroundColor: theme.colors.border,
      marginVertical: theme.spacing.xs,
    },

    // ── Appointment detail row (icon + text) ──────────────────────────────────
    apptRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: theme.spacing.sm,
    },
    apptIconWrap: {
      width: 32,
      height: 32,
      borderRadius: theme.radius.md,
      backgroundColor: theme.colors.surface,
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    },
    apptIcon: {
      ...theme.typography.caption,
      color: theme.colors.textSecondary,
    },
    apptRowText: {
      flex: 1,
      gap: 1,
    },
    apptRowLabel: {
      ...theme.typography.caption,
      fontSize: 11,
      color: theme.colors.textSecondary,
    },
  });
};
