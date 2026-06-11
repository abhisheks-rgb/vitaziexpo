import { Feather } from '@expo/vector-icons';
import type { ViewProps } from 'react-native';
import { StyleSheet, View } from 'react-native';

import { Colors, Spacing } from '../theme';

interface Props extends ViewProps {
  backgroundColor?: string;
  iconColor?: string;
  icon?: 'chevron-right' | 'chevron-left';
  size?: ButtonSize;
}

export type ButtonSize = 'sm' | 'md' | 'lg';

const ICON_SIZE: Record<ButtonSize, number> = {
  sm: Spacing.sm,
  md: Spacing.md,
  lg: Spacing.lg,
};
const BUTTON_SIZE: Record<ButtonSize, number> = {
  sm: Spacing.md,
  md: Spacing.lg,
  lg: Spacing.xl,
};

export default function ArrowButton({
  icon = 'chevron-right',
  iconColor = Colors.navyDark,
  size = 'md',
  backgroundColor = Colors.white,
  style,
}: Props) {
  return (
    <View
      style={[
        style,
        styles.visitReviewArrow,
        { width: BUTTON_SIZE[size], height: BUTTON_SIZE[size], backgroundColor: backgroundColor },
      ]}
    >
      <Feather name={icon} size={ICON_SIZE[size]} color={iconColor} />
    </View>
  );
}

const styles = StyleSheet.create({
  visitReviewArrow: {
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
