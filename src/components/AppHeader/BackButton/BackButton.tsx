import type { ViewStyle } from 'react-native';
import { TouchableOpacity } from 'react-native';

import { useTheme } from '../../../theme';
import ArrowButton from '../../ArrowButton';

interface BackButtonProps {
  onPress: () => void;
  style?: ViewStyle;
  testID?: string;
  variant?: 'default' | 'light';
}

export default function BackButton({ onPress, testID }: BackButtonProps) {
  const theme = useTheme();

  return (
    <TouchableOpacity testID={testID} activeOpacity={0.8} onPress={onPress}>
      <ArrowButton size="lg" backgroundColor={theme.colors.accent} icon="chevron-left" />
    </TouchableOpacity>
  );
}
