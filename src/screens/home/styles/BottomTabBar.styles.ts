// BottomTabBar.styles.ts
import { Dimensions, StyleSheet } from 'react-native';

const { width: SCREEN_W } = Dimensions.get('window');

export const BAR_H = 70;
export const FAB_SIZE = 84;
export const FAB_RING = 6;
export const FAB_TOTAL = FAB_SIZE + FAB_RING * 2;
export const FAB_OVERHANG = FAB_TOTAL / 2 + 4; // how far FAB pokes above pill top
export const CONTAINER_H = BAR_H + FAB_OVERHANG;

const PILL_RADIUS = BAR_H / 2; // fully rounded sides

export const SCREEN_CENTER_X = SCREEN_W / 2;

export const bottomTabBarStyles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: CONTAINER_H,
    backgroundColor: 'transparent',

    shadowColor: '#000',

    shadowOffset: {
      width: 0,

      height: -6,
    },

    shadowOpacity: 0.12,

    shadowRadius: 12,

    elevation: 12,
  },

  pill: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: BAR_H + 10,

    borderTopLeftRadius: 38,
    borderTopRightRadius: 38,

    overflow: 'hidden',
  },

  blurLayer: {
    ...StyleSheet.absoluteFill,
  },

  pillTint: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(255,255,255,0.18)',
  },

  tabRow: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,

    height: BAR_H + 10,

    flexDirection: 'row',
    alignItems: 'center',

    paddingHorizontal: 20,
    paddingBottom: 8,
  },

  side: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '100%',
  },

  fabRing: {
    position: 'absolute',
    width: FAB_TOTAL,
    height: FAB_TOTAL,
    borderRadius: FAB_TOTAL / 2,
    backgroundColor: 'rgba(255,255,255,0.95)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 6,
    borderColor: 'rgba(255,255,255,0.92)', // lime green ring
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 8,
    elevation: 8,
  },

  fabImage: {
    width: FAB_SIZE,
    height: FAB_SIZE,
    borderRadius: FAB_SIZE / 2,
  },
  tab: {
    alignItems: 'center',
    gap: 4,
  },
});
