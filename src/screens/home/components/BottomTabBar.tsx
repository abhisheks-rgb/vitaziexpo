import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { BlurView } from 'expo-blur';
import { Platform, TouchableOpacity, View } from 'react-native';

import AppImage from '../../../components/AppImage';
import { AppImages } from '../../../constants';
import { useScrollStore } from '../../../hooks/useScrollStore';
import { useTranslation } from '../../../hooks/useTranslation';
import { useTheme } from '../../../theme';
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
  const theme = useTheme();
  const activeTab = state.routes[state.index].name as TabKey;
  const { t } = useTranslation();
  const isScrolled = useScrollStore((state) => state.isScrolled);

  const handlePress = (key: TabKey) => navigation.navigate(key);

  const leftTabs: TabItem[] = [
    { key: 'Home', label: t('tabs.home'), icon: 'home' },
    { key: 'Visits', label: t('visits'), icon: 'file-text' },
  ];

  const rightTabs: TabItem[] = [
    { key: 'Education', label: t('tabs.education'), icon: 'play-circle' },
    { key: 'More', label: t('tabs.more'), icon: 'more-horizontal' },
  ];

  // ── Theme-aware dynamic values ──────────────────────────────────────────────

  // Pill tint: nearly invisible in dark mode, subtle white in light
  const pillTintColor = theme.isDark ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.18)';

  // Android pill background
  const androidPillBg = theme.isDark ? 'rgba(18,18,18,0.96)' : 'rgba(255,255,255,0.92)';

  // Solid fallback when not scrolled
  const solidBg = theme.isDark
    ? theme.colors.background // #171717
    : theme.colors.background; // #FFFFFF

  // FAB ring: dark mode uses a dark surface ring, light uses white
  const fabRingBg = theme.isDark
    ? theme.colors.surface // #1F1F1F
    : 'rgba(255,255,255,0.95)';

  const fabRingBorder = theme.isDark
    ? theme.colors.surface // blends with dark bg
    : 'rgba(255,255,255,0.92)';

  // BlurView tint
  const blurTint = theme.isDark ? 'dark' : 'systemUltraThinMaterialLight';

  return (
    <View style={[bottomTabBarStyles.wrapper, { height: CONTAINER_H }]}>
      {/* Frosted pill bar */}
      <View style={bottomTabBarStyles.pill}>
        {Platform.OS === 'ios' ? (
          <BlurView
            intensity={theme.isDark ? 60 : 80}
            tint={blurTint}
            style={[bottomTabBarStyles.blurLayer, !isScrolled && { backgroundColor: solidBg }]}
          />
        ) : (
          <View style={[bottomTabBarStyles.blurLayer, { backgroundColor: androidPillBg }]} />
        )}
        {/* Tint overlay — nearly invisible in dark, subtle in light */}
        <View style={[bottomTabBarStyles.pillTint, { backgroundColor: pillTintColor }]} />
      </View>

      {/* Tab icons */}
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

      {/* FAB */}
      <TouchableOpacity
        style={[
          bottomTabBarStyles.fabRing,
          {
            left: SCREEN_CENTER_X - FAB_TOTAL / 2,
            bottom: FAB_OVERHANG - FAB_TOTAL / 2,
            backgroundColor: fabRingBg,
            borderColor: fabRingBorder,
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
