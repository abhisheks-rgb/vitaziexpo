// File: Education/components/EducationHeader/EducationHeader.tsx

import { Text, TouchableOpacity, View } from 'react-native';

import type { ViewMode } from '../../../../application/education/types/education.types';
import { useTheme } from '../../../../theme';

import { createStyles } from './styles';

interface Props {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
}

export default function EducationHeader({ viewMode, onViewModeChange }: Props) {
  const theme = useTheme();
  const styles = createStyles(theme);

  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Education</Text>
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.iconBtn}
          onPress={() => onViewModeChange('list')}
          activeOpacity={0.7}
        >
          <Text style={[styles.iconText, viewMode === 'list' && styles.activeIcon]}>☰</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconBtn}
          onPress={() => onViewModeChange('grid')}
          activeOpacity={0.7}
        >
          <Text style={[styles.iconText, viewMode === 'grid' && styles.activeIcon]}>⊞</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconBtn} activeOpacity={0.7}>
          <Text style={styles.iconText}>🔔</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
