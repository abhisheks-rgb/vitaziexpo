import { StyleSheet } from 'react-native';
import { Theme } from '../../../theme/theme';
import { Spacing } from '../../../theme/spacing';
import { Radius } from '../../../theme/radius';

export const createHeaderStyles = (theme: Theme) =>
  StyleSheet.create({
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: Spacing.md,
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