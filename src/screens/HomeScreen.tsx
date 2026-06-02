import React from 'react';
import { Image, StyleSheet, View, Text } from 'react-native';

import {
  useTheme,
  Typography,
  Spacing,
} from '../theme';
import { AppImages } from '../constants';

export default function HomeScreen() {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.background,
        },
      ]}
    >
      <Image
        source={
          theme.isDark
            ? AppImages.logoDark
            : AppImages.logoLight
        }
        style={styles.logo}
        resizeMode="contain"
      />

      <Text
        style={[
          Typography.body,
          {
            color: theme.colors.textMuted,
          },
        ]}
      >
        Welcome
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.md,
  },

  logo: {
    width: 200,
    height: 65,
  },
});