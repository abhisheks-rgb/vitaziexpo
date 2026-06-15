import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { useTheme } from '../../../theme';

interface SmartListLoaderProps {
  message?: string;
}

export default function SmartListLoader({ message }: SmartListLoaderProps) {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={theme.colors.primary} />
      {message && (
        <Text
          style={[
            styles.message,
            { color: theme.colors.textSecondary, ...theme.typography.caption },
          ]}
        >
          {message}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    paddingVertical: 48,
  },
  message: {
    fontSize: 13,
    textAlign: 'center',
  },
});
