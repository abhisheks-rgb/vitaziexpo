import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { useTheme } from '../../../../theme';

import BlurWapper from './BlurWapper';
import { createStyles } from './styles';

interface Action {
  id: string;
  label: string;
  subText: string;
}

interface Props {
  actions: Action[];
  onPress: (label: string) => void;
}

export default function SuggestedActions({ actions, onPress }: Props) {
  const theme = useTheme();
  const styles = createStyles(theme);

  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {actions.map((action) => (
          <BlurWapper key={action.id}>
            <TouchableOpacity
              style={styles.chip}
              onPress={() => onPress(action.label)}
              activeOpacity={0.75}
            >
              <Text style={styles.chipText}>{action.label}</Text>
              <Text style={styles.chipSubText}>{action.subText}</Text>
            </TouchableOpacity>
          </BlurWapper>
        ))}
      </ScrollView>
    </View>
  );
}
