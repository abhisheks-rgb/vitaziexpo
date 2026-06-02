import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../theme';

export default function HomeScreen() {
  const theme = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: theme.bg }]}>
      <Image
        source={theme.isDark ? require('../../assets/logo-dark.png') : require('../../assets/logo-light.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={[styles.label, { color: theme.textMuted }]}>Welcome</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 16 },
  logo: { width: 200, height: 65 },
  label: { fontSize: 16 },
});
