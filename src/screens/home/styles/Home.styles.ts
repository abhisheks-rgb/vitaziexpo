import { StyleSheet } from 'react-native';
import { Theme } from '../../../theme/theme';
import { Spacing } from '../../../theme/spacing';

export const createHomeStyles = (theme: Theme) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    scroll: {
      flex: 1,
    },
    scrollContent: {
      paddingHorizontal: Spacing.md,
      paddingTop: Spacing.sm,
    },
    sectionTitle: {
      marginBottom: Spacing.sm,
      fontSize: 16,
    },
  });