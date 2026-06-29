// File: components/ReportTabs/ReportTabs.tsx

import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { useTheme } from '../../../../theme';
import { CONTENT_TABS } from '../../constants/tabs';
import type { ContentTab } from '../../types/reportDetails.types';

import { createStyles } from './styles';

interface Props {
  activeTab: ContentTab;
  onTabChange: (tab: ContentTab) => void;
}

export default function ReportTabs({ activeTab, onTabChange }: Props) {
  const theme = useTheme();
  const styles = createStyles(theme);

  return (
    <>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabBarInner}
      >
        {CONTENT_TABS.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={styles.tabBarItem}
            onPress={() => onTabChange(tab)}
            activeOpacity={0.7}
          >
            <Text style={[styles.tabBarText, activeTab === tab && styles.tabBarTextActive]}>
              {tab}
            </Text>
            {activeTab === tab && <View style={styles.tabBarUnderline} />}
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.divider} />
    </>
  );
}
