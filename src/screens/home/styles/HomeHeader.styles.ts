import { StyleSheet } from 'react-native';

import { Radius } from '../../../theme/radius';
import { Spacing } from '../../../theme/spacing';
import { Theme } from '../../../theme/theme';

export const createHeaderStyles = (theme: Theme) =>
  StyleSheet.create({
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: Spacing.md,
    },
    name: {
      ...theme.typography.title,
      fontSize: 24,
    },
    greeting: {
      fontSize: 13,
    },
    headerRight: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: Spacing.xs,
    },

    headerIcon: {
      width: 36,
      height: 36,
    },
    avatar: {
      width: 36,
      height: 36,
      borderRadius: Radius.full,
      marginLeft: Spacing.xs,
    },
  });
