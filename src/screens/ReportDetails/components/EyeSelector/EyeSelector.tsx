// File: components/EyeSelector/EyeSelector.tsx

import { Text, TouchableOpacity, View } from 'react-native';
import type { EyeTab } from '../../types/reportDetails.types';
import { createStyles } from './styles';

interface Props {
  activeEye: EyeTab;
  onEyeChange: (eye: EyeTab) => void;
}

const EYE_OPTIONS: EyeTab[] = ['Right OD', 'Left OS'];

export default function EyeSelector({ activeEye, onEyeChange }: Props) {
  const styles = createStyles();

  return (
    <View style={styles.container}>
      <View style={styles.pill}>
        {EYE_OPTIONS.map((eye) => (
          <TouchableOpacity
            key={eye}
            style={[styles.option, activeEye === eye && styles.optionActive]}
            onPress={() => onEyeChange(eye)}
            activeOpacity={0.8}
          >
            <Text style={[styles.optionText, activeEye === eye && styles.optionTextActive]}>
              {eye}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
