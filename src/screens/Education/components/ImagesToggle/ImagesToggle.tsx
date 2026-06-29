// File: Education/components/ImagesToggle/ImagesToggle.tsx

import { Text, TouchableOpacity, View } from 'react-native';

import { useTheme } from '../../../../theme';

import { createStyles } from './styles';

interface Props {
  value: boolean;
  onToggle: (val: boolean) => void;
}

export default function ImagesToggle({ value, onToggle }: Props) {
  const theme = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.8} onPress={() => onToggle(!value)}>
        <View style={[styles.track, value ? styles.trackOn : styles.trackOff]}>
          <View style={[styles.thumb, value ? styles.thumbOn : styles.thumbOff]} />
        </View>
      </TouchableOpacity>
      <Text style={styles.label}>Images</Text>
    </View>
  );
}
