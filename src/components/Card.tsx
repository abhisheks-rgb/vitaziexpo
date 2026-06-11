/**
 * Card — white rounded surface with optional shadow.
 * Drop it anywhere a white rounded container is needed.
 */
import React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { StyleSheet, View } from 'react-native';

import { useTheme } from '../theme';
import { Radius } from '../theme/radius';
import { Spacing } from '../theme/spacing';

interface Props {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  /** Remove default padding */
  noPadding?: boolean;
  /** Elevate with shadow */
  elevated?: boolean;
}

export default function Card({ children, style, noPadding, elevated }: Props) {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: theme.colors.surface },
        elevated && styles.elevated,
        noPadding && styles.noPadding,
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: Radius.lg,
    padding: Spacing.md,
  },
  noPadding: {
    padding: 0,
  },
  elevated: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
});
