import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { BlurView } from 'expo-blur';
import { Platform, TouchableOpacity, View } from 'react-native';

import AppImage from '../../../components/AppImage';
import { AppImages } from '../../../constants';
import { useScrollStore } from '../../../hooks/useScrollStore';
import { useTranslation } from '../../../hooks/useTranslation';
import {
  bottomTabBarStyles,
  CONTAINER_H,
  FAB_OVERHANG,
  FAB_TOTAL,
  SCREEN_CENTER_X,
} from '../styles/BottomTabBar.styles';

import TabButton from './TabButton';

export type TabKey = 'Home' | 'Visits' | 'AIAssistant' | 'Education' | 'More';

interface TabItem {
  key: Exclude<TabKey, 'AIAssistant'>;
  label: string;
  icon: string;
}

export default function BottomTabBar({ state, navigation }: BottomTabBarProps) {
  const activeTab = state.routes[state.index].name as TabKey;
  const { t } = useTranslation();
  const isScrolled = useScrollStore((state) => state.isScrolled);

  const handlePress = (key: TabKey) => {
    navigation.navigate(key);
  };

  const leftTabs: TabItem[] = [
    {
      key: 'Home',
      label: t('tabs.home'),
      icon: 'home',
    },
    {
      key: 'Visits',
      label: t('visits'),
      icon: 'file-text',
    },
  ];

  const rightTabs: TabItem[] = [
    {
      key: 'Education',
      label: t('tabs.education'),
      icon: 'play-circle',
    },
    {
      key: 'More',
      label: t('tabs.more'),
      icon: 'more-horizontal',
    },
  ];

  return (
    <View style={[bottomTabBarStyles.wrapper, { height: CONTAINER_H }]}>
      {/* full-width frosted bar */}
      <View style={bottomTabBarStyles.pill}>
        {Platform.OS === 'ios' ? (
          <BlurView
            intensity={80}
            tint="systemUltraThinMaterialLight"
            style={[
              bottomTabBarStyles.blurLayer,
              !isScrolled && {
                backgroundColor: '#fff',
              },
            ]}
          />
        ) : (
          <View
            style={[bottomTabBarStyles.blurLayer, { backgroundColor: 'rgba(255,255,255,0.92)' }]}
          />
        )}
        <View style={bottomTabBarStyles.pillTint} />
      </View>

      {/* tab icons — absolutely overlaid on blur, never clipped by pill */}
      <View style={bottomTabBarStyles.tabRow}>
        <View style={bottomTabBarStyles.side}>
          {leftTabs.map((tab) => (
            <TabButton
              key={tab.key}
              label={tab.label}
              icon={tab.icon}
              active={activeTab === tab.key}
              onPress={() => handlePress(tab.key)}
            />
          ))}
        </View>

        <View style={{ width: FAB_TOTAL + 8 }} />

        <View style={bottomTabBarStyles.side}>
          {rightTabs.map((tab) => (
            <TabButton
              key={tab.key}
              label={tab.label}
              icon={tab.icon}
              active={activeTab === tab.key}
              onPress={() => handlePress(tab.key)}
            />
          ))}
        </View>
      </View>

      {/* FAB — centered horizontally, sits straddling the pill top edge */}
      <TouchableOpacity
        style={[
          bottomTabBarStyles.fabRing,
          {
            left: SCREEN_CENTER_X - FAB_TOTAL / 2,
            // pill bottom edge is at: CONTAINER_H - 8 - BAR_H = FAB_OVERHANG - 8
            // FAB center should be at pill top edge
            bottom: FAB_OVERHANG - FAB_TOTAL / 2,
          },
        ]}
        onPress={() => handlePress('AIAssistant')}
        activeOpacity={0.85}
      >
        <AppImage
          source={AppImages.aiBottom}
          containerStyle={bottomTabBarStyles.fabImage}
          contentFit="contain"
          showLoader={false}
        />
      </TouchableOpacity>
    </View>
  );
}
