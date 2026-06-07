import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity, ViewStyle } from 'react-native';

import { Colors } from '../../../theme/colors';

import { styles } from './BackButton.styles';

interface BackButtonProps {
  onPress: () => void;
  style?: ViewStyle;
  testID?: string;
  variant?: 'default' | 'light';
}

export default function BackButton({ onPress, style, testID, variant }: BackButtonProps) {
  return (
    <TouchableOpacity
      testID={testID}
      activeOpacity={0.8}
      onPress={onPress}
      style={[styles.container, style]}
    >
      <Ionicons name="chevron-back" size={18} color={Colors.navyDark} />
    </TouchableOpacity>
  );
}
