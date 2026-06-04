import { BlurView } from 'expo-blur';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import AppImage from '../../../components/AppImage';
import { AppImages } from '../../../constants';
import { useTranslation } from '../../../hooks/useTranslation';

import {
  bottomTabBarStyles,
  CONTAINER_H,
  FAB_TOTAL,
  SCREEN_CENTER_X,
} from '../styles/BottomTabBar.styles';
import TabButton from './TabButton';

export type TabKey = 'home' | 'visits' | 'fab' | 'education' | 'more';

interface TabItem {
  key: Exclude<TabKey, 'fab'>;
  label: string;
  icon: string;
}

interface Props {
  active: TabKey;
  onPress: (key: TabKey) => void;
}

export default function BottomTabBar({ active, onPress }: Props) {
  const { t } = useTranslation();

  const leftTabs: TabItem[] = [
    {
      key: 'home',
      label: t('tabs.home'),
      icon: 'home',
    },
    {
      key: 'visits',
      label: t('visits'),
      icon: 'file-text',
    },
  ];

  const rightTabs: TabItem[] = [
    {
      key: 'education',
      label: t('tabs.education'),
      icon: 'play-circle',
    },
    {
      key: 'more',
      label: t('tabs.more'),
      icon: 'more-horizontal',
    },
  ];

  return (
    <View style={[bottomTabBarStyles.wrapper, { height: CONTAINER_H }]}>
      <View style={bottomTabBarStyles.topShadow}>
        <View style={bottomTabBarStyles.pill}>
          <BlurView intensity={60} tint="light" style={bottomTabBarStyles.blurLayer} />

          <View style={bottomTabBarStyles.pillTint} />

          <View style={bottomTabBarStyles.tabRow}>
            <View style={bottomTabBarStyles.side}>
              {leftTabs.map((tab) => (
                <TabButton
                  key={tab.key}
                  label={tab.label}
                  icon={tab.icon}
                  active={active === tab.key}
                  onPress={() => onPress(tab.key)}
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
                  active={active === tab.key}
                  onPress={() => onPress(tab.key)}
                />
              ))}
            </View>
          </View>
        </View>
      </View>

      <TouchableOpacity
        style={[
          bottomTabBarStyles.fabRing,
          {
            left: SCREEN_CENTER_X - FAB_TOTAL / 2,
            top: 0,
          },
        ]}
        onPress={() => onPress('fab')}
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
