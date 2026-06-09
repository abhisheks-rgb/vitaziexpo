// File: components/TabContent/FindingsTab.tsx

import { Text, View } from 'react-native';

import { useTheme } from '../../../../theme';
import type { Findings } from '../../types/reportDetails.types';

import { createStyles } from './styles';

interface Props {
  data: Findings;
}

export default function FindingsTab({ data }: Props) {
  const theme = useTheme();
  const styles = createStyles(theme);

  return (
    <>
      {data.bullets.map((bullet) => (
        <View key={bullet} style={styles.bulletRow}>
          <Text style={styles.bulletDot}>•</Text>
          <Text style={styles.bulletText}>{bullet}</Text>
        </View>
      ))}
      <Text style={styles.sectionLabel}>Summary</Text>
      <Text style={styles.bodyText}>{data.summary}</Text>
    </>
  );
}
