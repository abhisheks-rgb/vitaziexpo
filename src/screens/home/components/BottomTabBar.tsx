import { Feather } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import React from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';

import AppImage from '../../../components/AppImage';
import AppText from '../../../components/AppText';
import { AppImages } from '../../../constants';
import { useTranslation } from '../../../hooks/useTranslation';
import { Colors } from '../../../theme/colors';

export type TabKey = 'home' | 'visits' | 'fab' | 'education' | 'more';

interface TabItem {
  key: Exclude<TabKey, 'fab'>;
  label: string;
  icon: string;
}

const { width: SCREEN_W } = Dimensions.get('window');

const BAR_H = 90;
const FAB_SIZE = 64;
const FAB_RING = 6;
const FAB_TOTAL = FAB_SIZE + FAB_RING * 2;
const FAB_OVERHANG = FAB_TOTAL / 2 - BAR_H / 2 + 8; // how much FAB sticks above bar
const CONTAINER_H = BAR_H + FAB_OVERHANG;
const H_MARGIN = 0; // gap from screen edges
const PILL_RADIUS = BAR_H / 2; // full pill — radius = half height
const CX = SCREEN_W / 2;

interface Props {
  active: TabKey;
  onPress: (key: TabKey) => void;
}

export default function BottomTabBar({ active, onPress }: Props) {
  const { t } = useTranslation();

  const LEFT_TABS: TabItem[] = [
    { key: 'home', label: t('tabs.home'), icon: 'home' },
    { key: 'visits', label: t('visits'), icon: 'file-text' },
  ];
  const RIGHT_TABS: TabItem[] = [
    { key: 'education', label: t('tabs.education'), icon: 'play-circle' },
    { key: 'more', label: t('tabs.more'), icon: 'more-horizontal' },
  ];

  return (
    <View style={[styles.wrapper, { height: CONTAINER_H }]}>
      {/* ── Pill glass bar ── */}
      <View style={styles.pill}>
        {/* Blur layer */}
        <BlurView
          intensity={60}
          tint="light"
          style={[StyleSheet.absoluteFill, { borderRadius: PILL_RADIUS, overflow: 'hidden' }]}
        />
        {/* White tint over blur — uniform across full bar */}
        <View style={styles.pillTint} />

        {/* Tab rows */}
        <View style={styles.tabRow}>
          <View style={styles.side}>
            {LEFT_TABS.map((tab) => (
              <TabButton
                key={tab.key}
                tab={tab}
                active={active === tab.key}
                onPress={() => onPress(tab.key)}
              />
            ))}
          </View>
          {/* FAB spacer */}
          <View style={{ width: FAB_TOTAL + 8 }} />
          <View style={styles.side}>
            {RIGHT_TABS.map((tab) => (
              <TabButton
                key={tab.key}
                tab={tab}
                active={active === tab.key}
                onPress={() => onPress(tab.key)}
              />
            ))}
          </View>
        </View>
      </View>

      {/* ── FAB — floats above pill, centred ── */}
      <TouchableOpacity
        style={[styles.fabRing, { left: CX - FAB_TOTAL / 2, top: 0 }]}
        onPress={() => onPress('fab')}
        activeOpacity={0.85}
      >
        <AppImage
          source={AppImages.aiBottom}
          containerStyle={styles.fabImage}
          contentFit="contain"
          showLoader={false}
        />
      </TouchableOpacity>
    </View>
  );
}

function TabButton({
  tab,
  active,
  onPress,
}: {
  tab: TabItem;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity style={styles.tab} onPress={onPress} activeOpacity={0.7}>
      <Feather name={tab.icon as any} size={22} color={active ? Colors.navyDark : Colors.muted} />
      <AppText
        variant="caption"
        color={active ? Colors.navyDark : Colors.muted}
        style={styles.tabLabel}
      >
        {tab.label}
      </AppText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: SCREEN_W,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  // The pill — sits at bottom of wrapper
  pill: {
    width: SCREEN_W - H_MARGIN * 2,
    height: BAR_H,
    borderRadius: PILL_RADIUS,
    overflow: 'hidden',
    // Border
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.55)',
    // Shadow so pill lifts off content
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
  },

  // Semi-transparent white tint — same density everywhere
  pillTint: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(255,255,255,0.45)',
  },

  tabRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },

  side: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  tab: {
    flex: 1,
    alignItems: 'center',
    gap: 3,
    paddingVertical: 8,
  },

  tabLabel: {
    fontSize: 10,
  },

  // White ring around FAB
  fabRing: {
    position: 'absolute',
    width: FAB_TOTAL,
    height: FAB_TOTAL,
    borderRadius: FAB_TOTAL / 2,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 12,
  },

  fabImage: {
    width: FAB_SIZE,
    height: FAB_SIZE,
    borderRadius: FAB_SIZE / 2,
  },
});
