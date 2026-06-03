/**
 * BottomTabBar — custom tab bar matching the Figma design.
 * Center FAB (+ icon) uses the accent limeGreen circle.
 */
import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import AppText from '../../../components/AppText';
import { Colors } from '../../../theme/colors';
import { Radius } from '../../../theme/radius';
import { Spacing } from '../../../theme/spacing';

export type TabKey = 'home' | 'visits' | 'fab' | 'education' | 'more';

interface TabItem {
  key: TabKey;
  label: string;
  icon: string; // emoji placeholder — swap for vector icons
}

const TABS: TabItem[] = [
  { key: 'home',      label: 'Home',      icon: '⌂'  },
  { key: 'visits',    label: 'Visits',    icon: '👁'  },
  { key: 'fab',       label: '',          icon: '+'   },
  { key: 'education', label: 'Education', icon: '▶'  },
  { key: 'more',      label: 'More',      icon: '···' },
];

interface Props {
  active: TabKey;
  onPress: (key: TabKey) => void;
}

export default function BottomTabBar({ active, onPress }: Props) {
  return (
    <View style={styles.bar}>
      {TABS.map(tab => {
        const isFab    = tab.key === 'fab';
        const isActive = tab.key === active;

        if (isFab) {
          return (
            <TouchableOpacity
              key={tab.key}
              style={styles.fab}
              onPress={() => onPress(tab.key)}
              activeOpacity={0.85}
            >
              <AppText style={styles.fabIcon} color={Colors.navyDark}>+</AppText>
            </TouchableOpacity>
          );
        }

        return (
          <TouchableOpacity
            key={tab.key}
            style={styles.tab}
            onPress={() => onPress(tab.key)}
            activeOpacity={0.7}
          >
            <AppText
              style={styles.tabIcon}
              color={isActive ? Colors.navyDark : Colors.muted}
            >
              {tab.icon}
            </AppText>
            <AppText
              variant="caption"
              color={isActive ? Colors.navyDark : Colors.muted}
              style={styles.tabLabel}
            >
              {tab.label}
            </AppText>
            {isActive && <View style={styles.activeDot} />}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingBottom: Spacing.md,
    paddingTop: Spacing.sm,
    alignItems: 'flex-end',
    paddingHorizontal: Spacing.sm,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    gap: 2,
  },
  tabIcon: {
    fontSize: 18,
  },
  tabLabel: {
    fontSize: 10,
  },
  activeDot: {
    width: 4,
    height: 4,
    borderRadius: Radius.full,
    backgroundColor: Colors.navyDark,
    marginTop: 2,
  },
  fab: {
    width: 52,
    height: 52,
    borderRadius: Radius.full,
    backgroundColor: Colors.limeGreen,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
    shadowColor: Colors.limeGreen,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  fabIcon: {
    fontSize: 26,
    lineHeight: 30,
    fontWeight: '300',
  },
});