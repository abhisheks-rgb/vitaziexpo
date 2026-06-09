// File: components/AfterCare/ViewToggle.tsx

import { Text, TouchableOpacity, View } from 'react-native';

import { useTheme } from '../../../../theme';
import type { ViewMode } from '../../types/reportDetails.types';

import { createStyles } from './styles';

interface Props {
  viewMode: ViewMode;
  onToggle: (mode: ViewMode) => void;
}

export default function ViewToggle({ viewMode, onToggle }: Props) {
  const theme = useTheme();
  const { styles } = createStyles(theme);

  return (
    <View style={styles.toggleContainer}>
      <TouchableOpacity
        style={[styles.toggleBtn, viewMode === 'grid' && styles.toggleBtnActive]}
        onPress={() => onToggle('grid')}
        activeOpacity={0.7}
      >
        <Text style={[styles.toggleIcon, viewMode === 'grid' && styles.toggleIconActive]}>⊞</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.toggleBtn, viewMode === 'list' && styles.toggleBtnActive]}
        onPress={() => onToggle('list')}
        activeOpacity={0.7}
      >
        <Text style={[styles.toggleIcon, viewMode === 'list' && styles.toggleIconActive]}>☰</Text>
      </TouchableOpacity>
    </View>
  );
}
