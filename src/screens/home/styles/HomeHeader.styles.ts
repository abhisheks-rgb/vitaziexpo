import { StyleSheet } from 'react-native';
import { Radius } from '../../../theme/radius';
import { Spacing } from '../../../theme/spacing';
import { createCommonStyles } from '../../../theme/styles';
import type { Theme } from '../../../theme/theme';

export const createHeaderStyles = (theme: Theme) => {
  const common = createCommonStyles(theme);

  return StyleSheet.create({
    header: {
      ...common.rowSpaceBetween,
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
      ...common.row,
      gap: Spacing.xs,
    },
    headerIcon: common.icon36,
    avatar: {
      ...common.icon36,
      borderRadius: Radius.full,
      marginLeft: Spacing.xs,
    },
  });
};
