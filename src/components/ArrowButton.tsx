import { Feather } from '@expo/vector-icons';
import { StyleSheet, TouchableOpacity, View, type ViewProps } from 'react-native';
import { Spacing, useTheme } from '../theme';

interface Props extends ViewProps {
  backgroundColor?: string;
  iconColor?: string;
  icon?: 'chevron-right' | 'chevron-left';
  size?: ButtonSize;
  onPress?: () => void;
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
  iconColor,
  size = 'md',
  backgroundColor,
  style,
  onPress,
}: Props) {
  const theme = useTheme();

  const content = (
    <View
      style={[
        styles.arrow,
        {
          width: BUTTON_SIZE[size],
          height: BUTTON_SIZE[size],
          backgroundColor: backgroundColor ?? theme.colors.surface,
        },
        !onPress && style, // apply style here when not wrapped in TouchableOpacity
      ]}
    >
      <Feather name={icon} size={ICON_SIZE[size]} color={iconColor ?? theme.colors.textPrimary} />
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={style}>
        {content}
      </TouchableOpacity>
    );
  }

  return content;
}

const styles = StyleSheet.create({
  arrow: {
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
