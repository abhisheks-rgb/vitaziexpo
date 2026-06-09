import { Dimensions, StyleSheet } from 'react-native';

import type { Theme } from '../theme';

const { width: SCREEN_W } = Dimensions.get('window');

const HORIZONTAL_PADDING = 20;
const GRID_GAP = 12;

const GRID_CARD_W = (SCREEN_W - HORIZONTAL_PADDING * 2 - GRID_GAP) / 2;

export const createStyles = (theme: Theme) => {

  const commomComponentStyles = StyleSheet.create({
    scrim: {
      ...StyleSheet.absoluteFill,
      backgroundColor: 'rgba(0,0,0,0.25)',
    },

    playCircle: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      width: 40,
      height: 40,

      marginTop: -20,
      marginLeft: -20,

      borderRadius: 20,

      backgroundColor: 'rgba(255,255,255,0.25)',

      borderWidth: 2,
      borderColor: 'rgba(255,255,255,0.7)',

      alignItems: 'center',
      justifyContent: 'center',
    },

    playTriangle: {
      width: 0,
      height: 0,

      marginLeft: 3,

      borderTopWidth: 7,
      borderBottomWidth: 7,
      borderLeftWidth: 12,

      borderTopColor: 'transparent',
      borderBottomColor: 'transparent',
      borderLeftColor: '#FFF',
    },

    durationPill: {
      position: 'absolute',
      bottom: 8,
      left: 8,

      backgroundColor: 'rgba(0,0,0,0.65)',

      borderRadius: 6,

      paddingHorizontal: 7,
      paddingVertical: 3,
    },

    durationText: {
      fontSize: 11,
      color: '#FFF',
      fontWeight: '700',
      letterSpacing: 0.3,
    },
  });

  return {
    commomComponentStyles,
  };
};
