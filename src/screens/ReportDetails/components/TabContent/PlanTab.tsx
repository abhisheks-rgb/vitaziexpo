// File: components/TabContent/PlanTab.tsx

import { Text, TouchableOpacity, View } from 'react-native';

import { useTheme } from '../../../../theme';
import type { Plan } from '../../types/reportDetails.types';

import { createStyles } from './styles';

interface Props {
  data: Plan;
}

export default function PlanTab({ data }: Props) {
  const theme = useTheme();
  const styles = createStyles(theme);

  return (
    <>
      <Text style={[styles.bodyText, { marginBottom: 12 }]}>{data.body}</Text>

      {data.followUp ? (
        <TouchableOpacity style={styles.followUpBtn} activeOpacity={0.85}>
          <Text style={styles.followUpIcon}>↗</Text>
          <Text style={styles.followUpText}>{data.followUp}</Text>
        </TouchableOpacity>
      ) : null}

      {data.bullets.map((bullet) => (
        <View key={bullet} style={[styles.bulletRow, { marginTop: 8 }]}>
          <Text style={styles.bulletDot}>•</Text>
          <Text style={styles.bulletText}>{bullet}</Text>
        </View>
      ))}
    </>
  );
}
