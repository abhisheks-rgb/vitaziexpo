import React from 'react';
import {
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from 'react-native';

import AppText from './AppText';
import { useTheme } from '../theme';

interface Props {
  title: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
}

export default function AppButton({
  title,
  onPress,
  style,
  disabled,
}: Props) {
  const theme = useTheme();

  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[
        {
          borderWidth: 1,
          borderColor:
            theme.colors.accent,

          borderRadius:
            theme.radius.xl,

          paddingHorizontal:
            theme.spacing.lg,

          paddingVertical:
            theme.spacing.sm,

          alignItems: 'center',
          justifyContent: 'center',
        },
        style,
      ]}
    >
      <AppText
        variant="button"
        color={theme.colors.accent}
      >
        {title}
      </AppText>
    </TouchableOpacity>
  );
}