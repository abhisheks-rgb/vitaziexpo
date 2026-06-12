import { StyleSheet } from 'react-native';
import { createCommonStyles } from '../../../theme/styles';
import type { Theme } from '../../../theme/theme';
import { CONTAINER_H } from '../../home/styles/BottomTabBar.styles';

export const createHomeStyles = (theme: Theme) => {
  const common = createCommonStyles(theme);

  return StyleSheet.create({
    screen: common.screen,
    scroll: common.scroll,
    scrollContent: {
      ...common.scrollContent,
      paddingBottom: CONTAINER_H + 16,
    },
    sectionTitle: {
      marginBottom: theme.spacing.sm,
      fontSize: 16,
    },
  });
};
