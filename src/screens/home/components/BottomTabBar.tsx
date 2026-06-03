import React from 'react';
import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';

import AppText from '../../../components/AppText';
import AppImage from '../../../components/AppImage';
import { AppImages } from '../../../constants';
import { Colors } from '../../../theme/colors';
import { Radius } from '../../../theme/radius';
import { Spacing } from '../../../theme/spacing';
import { useTranslation } from '../../../hooks/useTranslation';

export type TabKey = 'home' | 'visits' | 'fab' | 'education' | 'more';

interface TabItem {
  key: Exclude<TabKey, 'fab'>;
  label: string;
  icon: keyof typeof AppImages;
}

const { width: SCREEN_W } = Dimensions.get('window');

// Curve geometry
const BAR_H    = 64;
const NOTCH_W  = 80;
const NOTCH_D  = 32;
const CX       = SCREEN_W / 2;

const barPath = [
  `M0,0`,
  `L${CX - NOTCH_W / 2},0`,
  `C${CX - NOTCH_W / 4},0 ${CX - NOTCH_W / 4},${NOTCH_D} ${CX},${NOTCH_D}`,
  `C${CX + NOTCH_W / 4},${NOTCH_D} ${CX + NOTCH_W / 4},0 ${CX + NOTCH_W / 2},0`,
  `L${SCREEN_W},0`,
  `L${SCREEN_W},${BAR_H}`,
  `L0,${BAR_H}`,
  `Z`,
].join(' ');

interface Props {
  active: TabKey;
  onPress: (key: TabKey) => void;
}

export default function BottomTabBar({ active, onPress }: Props) {
  const { t } = useTranslation();

  // ✅ Dynamic tabs using i18
  const LEFT_TABS: TabItem[] = [
    { key: 'home', label: t('tabs.home'), icon: 'logoDark' },
    { key: 'visits', label: t('visits'), icon: 'onboarding1' },
  ];

  const RIGHT_TABS: TabItem[] = [
    { key: 'education', label: t('tabs.education'), icon: 'onboarding2' },
    { key: 'more', label: t('tabs.more'), icon: 'onboarding3' },
  ];

  return (
    <View style={styles.wrapper}>
      {/* Background */}
      <Svg
        width={SCREEN_W}
        height={BAR_H}
        style={StyleSheet.absoluteFill}
        pointerEvents="none"
      >
        <Path d={barPath} fill={Colors.white} />
      </Svg>

      {/* Border */}
      <View style={styles.borderLeft} pointerEvents="none" />
      <View style={styles.borderRight} pointerEvents="none" />

      {/* Left tabs */}
      <View style={styles.side}>
        {LEFT_TABS.map(tab => (
          <TabButton
            key={tab.key}
            tab={tab}
            active={active === tab.key}
            onPress={() => onPress(tab.key)}
          />
        ))}
      </View>

      {/* FAB */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => onPress('fab')}
        activeOpacity={0.85}
      >
        <AppImage
          source={AppImages.aiBottom}
          containerStyle={styles.fabIcon}
          contentFit="contain"
          showLoader={false}
        />
      </TouchableOpacity>

      {/* Right tabs */}
      <View style={styles.side}>
        {RIGHT_TABS.map(tab => (
          <TabButton
            key={tab.key}
            tab={tab}
            active={active === tab.key}
            onPress={() => onPress(tab.key)}
          />
        ))}
      </View>
    </View>
  );
}

// ─── Tab Button ───────────────────────────────────────────────────────────────
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
      <AppImage
        source={AppImages[tab.icon]}
        containerStyle={[
          styles.tabIcon,
          { opacity: active ? 1 : 0.45 },
        ]}
        contentFit="contain"
        showLoader={false}
      />
      <AppText
        variant="caption"
        color={active ? Colors.navyDark : Colors.muted}
        style={styles.tabLabel}
      >
        {tab.label}
      </AppText>
      {active && <View style={styles.activeDot} />}
    </TouchableOpacity>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  wrapper: {
    width: SCREEN_W,
    height: BAR_H + Spacing.md,
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingTop: 4,
    backgroundColor: 'transparent',
  },

  borderLeft: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: CX - NOTCH_W / 2,
    height: 1,
    backgroundColor: '#E5E7EB',
  },
  borderRight: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: CX - NOTCH_W / 2,
    height: 1,
    backgroundColor: '#E5E7EB',
  },

  side: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: Spacing.xs,
  },

  tab: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 4,
    gap: 2,
  },
  tabIcon: {
    width: 22,
    height: 22,
  },
  tabLabel: {
    fontSize: 10,
    marginTop: 1,
  },
  activeDot: {
    width: 4,
    height: 4,
    borderRadius: Radius.full,
    backgroundColor: Colors.navyDark,
    marginTop: 2,
  },

  fab: {
    width: 56,
    height: 56,
    borderRadius: Radius.full,
    marginTop: -(56 / 2 + 4),
    alignSelf: 'flex-start',
    shadowColor: Colors.navyDark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  fabIcon: {
    width: 56,
    height: 56,
    borderRadius: Radius.full,
  },
});