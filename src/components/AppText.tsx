import type { StyleProp, TextProps, TextStyle } from 'react-native';
import { Text } from 'react-native';

import { useTheme } from '../theme';

type Variant = 'titleXL' | 'title' | 'subtitle' | 'body' | 'caption' | 'button';

interface Props extends TextProps {
  variant?: Variant;
  color?: string;
  style?: StyleProp<TextStyle>;
}

export default function AppText({ variant = 'body', color, style, children, ...rest }: Props) {
  const theme = useTheme();

  return (
    <Text
      {...rest}
      style={[
        theme.typography[variant],
        {
          color: color ?? theme.colors.textPrimary,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
}
