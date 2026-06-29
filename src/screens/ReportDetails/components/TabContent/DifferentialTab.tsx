// File: components/TabContent/DifferentialTab.tsx

import { Text, View } from 'react-native';

import { useTheme } from '../../../../theme';
import type { Differential } from '../../types/reportDetails.types';

import { createStyles } from './styles';

interface Props {
  data: Differential[];
}

export default function DifferentialTab({ data }: Props) {
  const theme = useTheme();
  const styles = createStyles(theme);

  return (
    <>
      {data.map((item) => (
        <View key={item.title} style={styles.differentialBlock}>
          <Text style={styles.sectionLabel}>{item.title}</Text>
          <Text style={styles.bodyText}>{item.body}</Text>
        </View>
      ))}
    </>
  );
}
