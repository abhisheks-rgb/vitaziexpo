// File: AIAssistant/components/SuggestedActions/SuggestedActions.tsx

import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { useTheme } from '../../../../theme';

import { createStyles } from './styles';

interface Action {
  id: string;
  label: string;
}

interface Props {
  actions: Action[];
  onPress: (label: string) => void;
}

export default function SuggestedActions({ actions, onPress }: Props) {
  const theme = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {actions.map((action) => (
          <TouchableOpacity
            key={action.id}
            style={styles.chip}
            onPress={() => onPress(action.label)}
            activeOpacity={0.75}
          >
            <Text style={styles.chipText}>{action.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
