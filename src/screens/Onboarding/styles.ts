import { Dimensions, StyleSheet } from 'react-native';

import type { Theme } from '../../theme';

const { width } = Dimensions.get('window');

export const DOT_SIZE = 8;
export const DOT_GAP = 20;
export const STEP = DOT_SIZE + DOT_GAP; // distance between dot centers
export const PILL_WIDTH = 32;

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    screen: {
      flex: 1,
    },

    container: {
      flex: 1,
      paddingBottom: theme.spacing.xl,
    },

    paddedRow: {
      paddingHorizontal: theme.spacing.lg,
    },

    topBar: {
      height: 44,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
    },

    logo: {
      width: 120,
      height: 36,
    },

    skipButton: {
      position: 'absolute',
      right: 0,
    },

    skip: {
      color: theme.colors.textMuted,
    },

    content: {
      flex: 1,
      width: '100%',
    },

    slide: {
      flex: 1,
      alignItems: 'center',
      paddingHorizontal: theme.spacing.lg,
    },

    imageWrap: {
      height: 340,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 12,
    },

    image: {
      width: width * 0.86,
      height: undefined,
      aspectRatio: 1,
    },

    textWrap: {
      width: '100%',
      alignItems: 'center',
      paddingHorizontal: 24,
      marginTop: 10,
    },

    title: {
      ...theme.typography.title,
      textAlign: 'center',
      maxWidth: 320,
    },

    subtitle: {
      ...theme.typography.body,
      textAlign: 'center',
      color: theme.colors.textMuted,
      marginTop: 16,
      maxWidth: 340,
      lineHeight: 28,
    },

    pagination: {
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 32,
      height: 16,
    },

    indicatorRow: {
      flexDirection: 'row',
      alignItems: 'center',
      position: 'relative',
    },

    smallDot: {
      width: DOT_SIZE,
      height: DOT_SIZE,
      borderRadius: DOT_SIZE / 2,
      backgroundColor: theme.colors.accent,
      opacity: 0.35,
      marginHorizontal: DOT_GAP / 2,
    },

    activePill: {
      position: 'absolute',
      width: PILL_WIDTH,
      height: DOT_SIZE,
      borderRadius: 999,
      backgroundColor: theme.colors.accent,
      top: 0,
      left: 0,
    },

    nav: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },

    back: {
      color: theme.colors.accent,
    },

    nextBtn: {
      borderWidth: 1,
      borderColor: theme.colors.accent,
      borderRadius: 30,
      paddingHorizontal: 30,
      paddingVertical: 12,
    },

    nextText: {
      color: theme.colors.accent,
    },
  });
