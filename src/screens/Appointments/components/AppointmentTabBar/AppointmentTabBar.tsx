// File: Appointments/components/AppointmentTabBar/AppointmentTabBar.tsx

import { Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../../../theme';
import type { AppointmentTab } from '../../types/appointments.types';
import { createStyles } from './styles';

interface Props {
  activeTab: AppointmentTab;
  onTabChange: (tab: AppointmentTab) => void;
}

const TABS: AppointmentTab[] = ['Upcoming', 'Past'];

export default function AppointmentTabBar({ activeTab, onTabChange }: Props) {
  const theme = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      {TABS.map((tab) => (
        <TouchableOpacity
          key={tab}
          style={[styles.tab, activeTab === tab && styles.tabActive]}
          onPress={() => onTabChange(tab)}
          activeOpacity={0.8}
        >
          <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>{tab}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
