import type { ViewStyle } from 'react-native';
import { TouchableOpacity } from 'react-native';

import { Colors } from '../../../theme';
import ArrowButton from '../../ArrowButton';

interface BackButtonProps {
  onPress: () => void;
  style?: ViewStyle;
  testID?: string;
  variant?: 'default' | 'light';
}

export default function BackButton({ onPress, style, testID, variant }: BackButtonProps) {
  return (
    <TouchableOpacity testID={testID} activeOpacity={0.8} onPress={onPress}>
      <ArrowButton size="lg" backgroundColor={Colors.limeGreen} icon="chevron-left" />
    </TouchableOpacity>
  );
}
