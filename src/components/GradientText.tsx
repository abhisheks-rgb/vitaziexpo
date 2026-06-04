import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Text, TextStyle, StyleProp } from 'react-native';

import { useTheme } from '../theme';

interface Props {
  text: string;
  style?: StyleProp<TextStyle>;
}

export default function GradientText({ text, style }: Props) {
  const theme = useTheme();

  return (
    <MaskedView maskElement={<Text style={style}>{text}</Text>}>
      <LinearGradient colors={[theme.colors.gradientTextStart, theme.colors.gradientTextEnd]}>
        <Text
          style={[
            style,
            {
              opacity: 0,
            },
          ]}
        >
          {text}
        </Text>
      </LinearGradient>
    </MaskedView>
  );
}
