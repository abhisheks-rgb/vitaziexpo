// components/DetailRow.tsx
import React from 'react';
import { View } from 'react-native';
import AppImage from '../../../components/AppImage';
import AppText from '../../../components/AppText';
import { useTheme } from '../../../theme';
import { createDetailStyles } from '../styles/NotificationDetail.styles';

interface Props {
  icon: React.ComponentType<{ width?: number; height?: number; color?: string }> | any;
  label: string;
  value: string;
}

export default function DetailRow({ icon: Icon, label, value }: Props) {
  const theme = useTheme();
  const styles = createDetailStyles(theme);
  return (
    <View style={styles.detailRow}>
      <View style={styles.detailIconContainer}>
        <AppImage source={Icon} containerStyle={{ width: 20, height: 20 }} />
      </View>
      <View style={styles.detailTextCol}>
        <AppText style={styles.detailLabel}>{label}</AppText>
        <AppText style={styles.detailValue}>{value}</AppText>
      </View>
    </View>
  );
}
