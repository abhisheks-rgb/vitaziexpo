import { StyleSheet } from 'react-native';

import { Spacing } from '../../../theme/spacing';
import { Theme } from '../../../theme/theme';
import { CONTAINER_H } from './BottomTabBar.styles';

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
      paddingBottom: CONTAINER_H + 16,
    },
    sectionTitle: {
      marginBottom: Spacing.sm,
      fontSize: 16,
    },
  });
