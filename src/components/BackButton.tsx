import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../theme/colors';
import { Radius } from '../theme/radius';

interface Props {
  onPress: () => void;
}

export default function BackButton({ onPress }: Props) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.8}>
      <Ionicons name="chevron-back" size={18} color={Colors.navyDark} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 32,
    height: 32,
    borderRadius: Radius.full,
    backgroundColor: Colors.limeGreen,
    alignItems: 'center',
    justifyContent: 'center',
  },
});