import { useMemo } from 'react';
import { TouchableOpacity, View } from 'react-native';

import AppText from '../../../../components/AppText';
import { useTheme } from '../../../../theme';

import { AppointmentTab } from '../../types.ts/appointment_types';
import { createStyles } from './styles';

interface Props {
  activeTab: AppointmentTab;
  onTabChange: (tab: AppointmentTab) => void;
}

const TABS: AppointmentTab[] = ['Upcoming', 'Past'];

export default function AppointmentTabBar({ activeTab, onTabChange }: Props) {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.container}>
      {TABS.map((tab) => (
        <TouchableOpacity
          key={tab}
          style={[styles.tab, activeTab === tab && styles.tabActive]}
          onPress={() => onTabChange(tab)}
          activeOpacity={0.8}
        >
          <AppText style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
            {tab}
          </AppText>
        </TouchableOpacity>
      ))}
    </View>
  );
}
