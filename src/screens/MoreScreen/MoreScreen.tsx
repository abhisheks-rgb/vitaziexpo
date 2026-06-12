import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import AppHeader from '../../components/AppHeader';
import AppText from '../../components/AppText';
import { useTheme } from '../../theme';
import { useAppTheme } from '../../theme/themeProvider';

const MoreScreen = () => {
  const theme = useTheme();
  const { mode, setMode } = useAppTheme();

  const options: ('light' | 'dark' | 'system')[] = ['light', 'dark', 'system'];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <AppHeader title="More" />

      <View style={styles.content}>
        <AppText style={{ marginBottom: 16 }}>Theme</AppText>

        {options.map((option) => (
          <TouchableOpacity
            key={option}
            style={[
              styles.option,
              {
                borderColor: mode === option ? theme.colors.accent : theme.colors.border,
              },
            ]}
            onPress={() => setMode(option)}
          >
            <AppText>{option.toUpperCase()}</AppText>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default MoreScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  option: {
    padding: 12,
    borderWidth: 2,
    borderRadius: 8,
    marginBottom: 12,
  },
});
