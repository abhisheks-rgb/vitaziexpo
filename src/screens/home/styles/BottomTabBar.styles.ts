import { Dimensions, StyleSheet } from 'react-native';

const { width: SCREEN_W } = Dimensions.get('window');

// ─────────────────────────────────────────────────────────────
// Layout Constants
// These are exported so other screens can offset their
// scrollContent paddingBottom to clear the tab bar.
// ─────────────────────────────────────────────────────────────

export const BAR_H = 70; // Height of the frosted pill bar
export const FAB_SIZE = 84; // Diameter of the circular FAB image
export const FAB_RING = 6; // White ring border around the FAB
export const FAB_TOTAL = FAB_SIZE + FAB_RING * 2; // Total FAB footprint incl. ring
export const FAB_OVERHANG = FAB_TOTAL / 2 + 4; // How far FAB pokes above pill top
export const CONTAINER_H = BAR_H + FAB_OVERHANG; // Total height of the tab bar wrapper
export const SCREEN_CENTER_X = SCREEN_W / 2; // Used to horizontally center the FAB

// ─────────────────────────────────────────────────────────────
// Styles
// ─────────────────────────────────────────────────────────────

export const bottomTabBarStyles = StyleSheet.create({
  // Absolute wrapper — sits above all screen content
  wrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: CONTAINER_H,
    backgroundColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -6 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 12,
  },

  // Frosted pill — clipped so blur stays within rounded top corners
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

  // BlurView fills the pill entirely (iOS)
  blurLayer: {
    ...StyleSheet.absoluteFill,
  },

  // Subtle white tint over blur for legibility
  pillTint: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(255,255,255,0.18)',
  },

  // Tab icon row — sits on top of the blur, never clipped
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

  // Left or right half of the tab row
  side: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '100%',
  },

  // White ring that the FAB image sits inside — straddles the pill top edge
  fabRing: {
    position: 'absolute',
    width: FAB_TOTAL,
    height: FAB_TOTAL,
    borderRadius: FAB_TOTAL / 2,
    backgroundColor: 'rgba(255,255,255,0.95)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: FAB_RING,
    borderColor: 'rgba(255,255,255,0.92)',
    elevation: 8,
  },

  // The circular AI assistant image inside the ring
  fabImage: {
    width: FAB_SIZE,
    height: FAB_SIZE,
    borderRadius: FAB_SIZE / 2,
  },

  // Individual tab button (icon + label)
  tab: {
    alignItems: 'center',
    gap: 4,
  },
});
