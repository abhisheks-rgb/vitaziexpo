// File: components/TabContent/InstructionsTab.tsx

import { Text, View } from 'react-native';

import { useTheme } from '../../../../theme';
import type { Instructions } from '../../types/reportDetails.types';

import { createStyles } from './styles';

interface Props {
  data: Instructions;
}

export default function InstructionsTab({ data }: Props) {
  const theme = useTheme();
  const styles = createStyles(theme);

  return (
    <>
      <Text style={styles.bodyText}>{data.body}</Text>

      {data.urgent ? (
        <View style={styles.urgentBox}>
          <Text style={styles.urgentText}>{data.urgent}</Text>
        </View>
      ) : null}
    </>
  );
}
