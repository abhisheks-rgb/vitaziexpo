// File: components/TabContent/AssessmentTab.tsx

import { Text, View } from 'react-native';
import { useTheme } from '../../../../theme';
import type { Assessment } from '../../types/reportDetails.types';
import { createStyles } from './styles';

interface Props {
  data: Assessment;
}

export default function AssessmentTab({ data }: Props) {
  const theme = useTheme();
  const styles = createStyles(theme);

  return (
    <>
      <Text style={styles.sectionLabel}>Oculomics Research Insights</Text>
      <Text style={[styles.bodyText, { marginBottom: 16 }]}>{data.insight}</Text>

      {data.codes.length > 0 && (
        <>
          <Text style={styles.sectionLabel}>ICD-10 Code(s)</Text>
          {data.codes.map((c) => (
            <View key={c.code} style={styles.icdCodeBlock}>
              <Text style={styles.icdCodeLabel}>{c.code}</Text>
              <Text style={styles.bodyText}>{c.label}</Text>
            </View>
          ))}
        </>
      )}
    </>
  );
}
