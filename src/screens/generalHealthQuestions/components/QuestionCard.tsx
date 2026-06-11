import { StyleSheet, Text, TextInput, View } from 'react-native';

import type { Theme} from '../../../theme';
import { useTheme } from '../../../theme';

interface Props {
  questionText: string;
  value: string;
  onChange: (text: string) => void;
  error?: string;
}

export function QuestionCard({ questionText, value, onChange, error }: Props) {
  const theme = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.card}>
      <Text style={styles.questionText}>{questionText}</Text>
      <TextInput
        style={[styles.input, !!error && styles.inputError]}
        value={value}
        onChangeText={onChange}
        placeholder="Enter your answer"
        placeholderTextColor={theme.colors.textMuted}
        multiline
        numberOfLines={3}
        textAlignVertical="top"
        accessibilityLabel={questionText}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    card: {
      flex: 1,
      paddingHorizontal: theme.spacing.md,
    },
    questionText: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.colors.text,
      lineHeight: 20,
      marginBottom: theme.spacing.sm + 2,
    },
    input: {
      backgroundColor: theme.colors.surface ?? theme.colors.background,
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: 10,
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm + 2,
      fontSize: 14,
      color: theme.colors.text,
      minHeight: 80,
    },
    inputError: {
      borderColor: '#DC2626',
      borderWidth: 1.5,
    },
    errorText: {
      color: '#DC2626',
      fontSize: 13,
      marginTop: 6,
    },
  });
