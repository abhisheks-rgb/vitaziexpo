import { Dimensions, StyleSheet } from 'react-native';

const { width: SCREEN_W } = Dimensions.get('window');

export const BAR_H = 90;
export const FAB_SIZE = 75;
export const FAB_RING = 6;
export const FAB_TOTAL = FAB_SIZE + FAB_RING * 2;
export const FAB_OVERHANG = FAB_TOTAL / 2 - BAR_H / 2 + 8;
export const CONTAINER_H = BAR_H + FAB_OVERHANG;

const H_MARGIN = 0;
const PILL_RADIUS = BAR_H / 2;

export const bottomTabBarStyles = StyleSheet.create({
  wrapper: {
    width: SCREEN_W,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  topShadow: {
    position: 'absolute',
    bottom: BAR_H - 2,
    left: 0,
    right: 0,
    height: 0,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 10,
  },

  pill: {
    width: SCREEN_W - H_MARGIN * 2,
    height: BAR_H,
    borderRadius: PILL_RADIUS,
    overflow: 'hidden',

    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.55)',

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
  },

  blurLayer: {
    ...StyleSheet.absoluteFill,
    borderRadius: PILL_RADIUS,
    overflow: 'hidden',
  },

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

  fabRing: {
    position: 'absolute',

    width: FAB_TOTAL,
    height: FAB_TOTAL,
    borderRadius: FAB_TOTAL / 2,

    backgroundColor: 'rgba(255,255,255,0.80)',

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

export const SCREEN_CENTER_X = SCREEN_W / 2;
