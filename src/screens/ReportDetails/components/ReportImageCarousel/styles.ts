// File: components/ReportImageCarousel/styles.ts

import { Dimensions, StyleSheet } from 'react-native';

const { width: SCREEN_W } = Dimensions.get('window');

export const IMAGE_H = 300;
export const EYE_PILL_H = 48;

export const createStyles = () =>
  StyleSheet.create({
    container: {
      width: SCREEN_W,
      height: IMAGE_H,
      backgroundColor: '#000',
      overflow: 'visible',
    },
    topGradient: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 72,
      paddingTop: 12,
      alignItems: 'center',
    },
    dateLabel: {
      fontSize: 13,
      color: '#fff',
      fontWeight: '500',
      letterSpacing: 0.2,
    },
    arrowBase: {
      position: 'absolute',
      top: IMAGE_H / 2 - 22,
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: 'rgba(0,0,0,0.45)',
      alignItems: 'center',
      justifyContent: 'center',
    },
    arrowLeft: { left: 12 },
    arrowRight: { right: 12 },
    arrowText: {
      fontSize: 30,
      color: '#fff',
      fontWeight: '600',
      lineHeight: 36,
    },
    dotsWrap: {
      position: 'absolute',
      bottom: EYE_PILL_H + 10,
      left: 0,
      right: 0,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 5,
    },
    dot: {
      width: 6,
      height: 6,
      borderRadius: 3,
      backgroundColor: 'rgba(255,255,255,0.35)',
    },
    dotActive: {
      width: 20,
      height: 6,
      borderRadius: 3,
      backgroundColor: '#fff',
    },
  });
