import { SafeAreaView, StyleSheet, View } from 'react-native';

import AppHeader from '../../components/AppHeader';
import AppText from '../../components/AppText';
import { useTheme } from '../../theme';

const MoreScreen = () => {
  const theme = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <AppHeader title="More" />

      <View style={styles.content}>
        <AppText>Coming Soon</AppText>
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
