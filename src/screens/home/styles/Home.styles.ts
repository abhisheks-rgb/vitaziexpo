import { StyleSheet } from 'react-native';

import { Spacing } from '../../../theme/spacing';
import { Theme } from '../../../theme/theme';

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
      paddingBottom: 100,
    },
    sectionTitle: {
      marginBottom: Spacing.sm,
      fontSize: 16,
    },
  });
