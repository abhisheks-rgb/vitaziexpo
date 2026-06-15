import { StyleSheet } from 'react-native';

import type { Theme } from '../../../theme';
import { createCommonStyles } from '../../../theme/styles';

export const createClinicStyles = (theme: Theme) => {
  const common = createCommonStyles(theme);

  return StyleSheet.create({
    // ── Card ──────────────────────────────────────────────────────────────────
    clinicCard: {
      marginBottom: theme.spacing.md,
    },

    // ── Clinic row (icon + info) ──────────────────────────────────────────────
    clinicRow: {
      ...common.row,
      gap: theme.spacing.sm,
    },

    // ── Icon container ────────────────────────────────────────────────────────
    clinicIconWrap: {
      width: 44,
      height: 44,
      borderRadius: theme.radius.md,
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    },

    // ── Text block ────────────────────────────────────────────────────────────
    clinicInfo: {
      flex: 1,
    },
    clinicName: {
      ...theme.typography.button,
      color: theme.colors.textPrimary,
    },
    clinicAddress: {
      ...theme.typography.caption,
      color: theme.colors.textSecondary,
      marginTop: 1,
    },
    visitCount: {
      ...theme.typography.caption,
      color: theme.colors.textSecondary,
    },
  });
};
