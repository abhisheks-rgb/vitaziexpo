
  import { Text, View } from 'react-native';

  import { useTheme } from '../theme';
import { createStyles } from './styles';

  const RADIUS_PILL = 100;

  interface Props {
    label: String
  }

  export function DurationChip({ label }: Props) {
    const theme = useTheme();
    const { commomComponentStyles } = createStyles(theme);

    return (
      <View style={commomComponentStyles.durationPill}>
        <Text style={commomComponentStyles.durationText}>{label}</Text>
      </View>
    );
  }





