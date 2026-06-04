// styles/HomeAppointment.styles.ts
import { StyleSheet } from 'react-native';

import { Radius } from '../../../theme/radius';
import { Spacing } from '../../../theme/spacing';
import { Theme } from '../../../theme/theme';

export const createAppointmentStyles = (theme: Theme) =>
  StyleSheet.create({
    apptCard: {
      gap: Spacing.sm,
    },
    doctorRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: Spacing.sm,
    },
    doctorAvatar: {
      width: 44,
      height: 44,
      borderRadius: Radius.full,
    },
    doctorName: {
      fontWeight: '700',
      fontSize: 14,
    },
    divider: {
      height: 1,
      backgroundColor: theme.colors.border,
      marginVertical: Spacing.xs,
    },
    apptRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: Spacing.sm,
    },
    apptIconWrap: {
      width: 32,
      height: 32,
      borderRadius: Radius.md,
      backgroundColor: theme.colors.surface,
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    },
    apptIcon: {
      fontSize: 14,
    },
    apptRowText: {
      flex: 1,
      gap: 1,
    },
    apptRowLabel: {
      fontSize: 11,
    },
  });
