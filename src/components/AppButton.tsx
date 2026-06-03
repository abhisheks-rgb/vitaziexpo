/**
 * AppButton — factory widget with variants.
 *
 * Variants:
 *   filled        → solid accent background, dark text  (default)
 *   outline       → transparent bg, accent border + text
 *   ghost         → no border, no bg, just text
 *   rounded       → filled + full pill radius
 *   roundedOutline→ outline + full pill radius
 *
 * Extra props:
 *   leftIcon / rightIcon  → any ReactNode (icon, image, SVG)
 *   size: 'sm' | 'md' | 'lg'
 *   fullWidth
 */
import React from 'react';
import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import AppText from './AppText';
import { useTheme } from '../theme';
import { Colors } from '../theme/colors';
import { Radius } from '../theme/radius';
import { Spacing } from '../theme/spacing';

export type ButtonVariant =
  | 'filled'
  | 'outline'
  | 'ghost'
  | 'rounded'
  | 'roundedOutline';

export type ButtonSize = 'sm' | 'md' | 'lg';

interface Props {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const PADDING_V: Record<ButtonSize, number> = {
  sm: Spacing.xs,
  md: Spacing.sm,
  lg: Spacing.md,
};
const PADDING_H: Record<ButtonSize, number> = {
  sm: Spacing.md,
  md: Spacing.lg,
  lg: Spacing.xl,
};
const FONT_VARIANT = {
  sm: 'caption',
  md: 'button',
  lg: 'button',
} as const;

export default function AppButton({
  title,
  onPress,
  variant = 'filled',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  style,
}: Props) {
  const theme = useTheme();

  const isFilled   = variant === 'filled'  || variant === 'rounded';
  const isOutline  = variant === 'outline' || variant === 'roundedOutline';
  const isPill     = variant === 'rounded' || variant === 'roundedOutline';

  const bgColor    = isFilled ? Colors.accent : 'transparent';
  const textColor  = isFilled ? Colors.navyDark : Colors.accent;
  const radius     = isPill ? Radius.full : Radius.xl;

  return (
    <TouchableOpacity
      disabled={disabled || loading}
      onPress={onPress}
      activeOpacity={0.8}
      style={[
        styles.base,
        {
          backgroundColor: disabled ? '#9CA3AF' : bgColor,
          borderRadius: radius,
          borderWidth: isOutline ? 1 : 0,
          borderColor: isOutline ? Colors.accent : undefined,
          paddingVertical: PADDING_V[size],
          paddingHorizontal: PADDING_H[size],
          alignSelf: fullWidth ? 'stretch' : 'auto',
          opacity: disabled ? 0.6 : 1,
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={textColor} size="small" />
      ) : (
        <View style={styles.inner}>
          {leftIcon && <View style={styles.iconLeft}>{leftIcon}</View>}
          <AppText variant={FONT_VARIANT[size]} color={textColor}>
            {title}
          </AppText>
          {rightIcon && <View style={styles.iconRight}>{rightIcon}</View>}
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconLeft: {
    marginRight: Spacing.xs,
  },
  iconRight: {
    marginLeft: Spacing.xs,
  },
});