// File: Education/components/MaterialCard/styles.ts

import { Dimensions, StyleSheet } from 'react-native';

import type { Theme } from '../../../../theme';

const { width: SCREEN_W } = Dimensions.get('window');
export const GRID_CARD_W = (SCREEN_W - 40 - 12) / 2;

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    // ── Grid card ─────────────────────────────────────────────────────────
    gridCard: {
      width: GRID_CARD_W,
      backgroundColor: theme.colors.background,
      borderRadius: 16,
      overflow: 'hidden',
      shadowColor: '#000',
      shadowOpacity: 0.05,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 2 },
      elevation: 2,
    },
    gridThumbnail: {
      width: '100%',
      height: 110,
      backgroundColor: theme.colors.surface,
    },
    gridBody: {
      padding: 10,
    },
    gridTitle: {
      fontSize: 13,
      fontWeight: '700',
      color: theme.colors.text,
      lineHeight: 18,
      marginBottom: 4,
    },
    gridDesc: {
      fontSize: 12,
      color: theme.colors.textMuted,
      lineHeight: 16,
      marginBottom: 4,
    },
    gridMeta: {
      fontSize: 11,
      color: theme.colors.textMuted,
    },

    // ── List card ─────────────────────────────────────────────────────────
    listCard: {
      backgroundColor: theme.colors.background,
      borderRadius: 16,
      marginHorizontal: 16,
      marginBottom: 10,
      flexDirection: 'row',
      alignItems: 'center',
      padding: 12,
      shadowColor: '#000',
      shadowOpacity: 0.05,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 2 },
      elevation: 2,
    },
    listIconWrap: {
      width: 40,
      height: 40,
      borderRadius: 10,
      backgroundColor: theme.colors.surface,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 12,
      flexShrink: 0,
    },
    listThumbnail: {
      width: 64,
      height: 64,
      borderRadius: 10,
      overflow: 'hidden',
      marginRight: 12,
      flexShrink: 0,
      backgroundColor: theme.colors.surface,
    },
    listInfo: {
      flex: 1,
    },
    listTitle: {
      fontSize: 14,
      fontWeight: '700',
      color: theme.colors.text,
      lineHeight: 19,
      marginBottom: 3,
    },
    listDesc: {
      fontSize: 12,
      color: theme.colors.textMuted,
      lineHeight: 16,
      marginBottom: 3,
    },
    listMeta: {
      fontSize: 11,
      color: theme.colors.textMuted,
    },
    listChevron: {
      width: 28,
      height: 28,
      borderRadius: 14,
      borderWidth: 1.5,
      borderColor: theme.colors.border,
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: 8,
    },
    listChevronText: {
      fontSize: 14,
      color: theme.colors.text,
      marginLeft: 2,
    },

    // ── Shared thumbnail overlays ─────────────────────────────────────────
    durationPill: {
      position: 'absolute',
      bottom: 6,
      left: 6,
      backgroundColor: 'rgba(0,0,0,0.65)',
      borderRadius: 6,
      paddingHorizontal: 6,
      paddingVertical: 3,
    },
    durationText: {
      fontSize: 10,
      color: '#fff',
      fontWeight: '700',
    },
    docHeader: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 10,
      backgroundColor: 'rgba(15,23,42,0.88)',
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 7,
      paddingVertical: 5,
      gap: 5,
    },
    docHeaderIcon: {
      fontSize: 11,
    },
    docHeaderName: {
      flex: 1,
      fontSize: 10,
      fontWeight: '700',
      color: '#fff',
    },
    scrim: {
      ...StyleSheet.absoluteFill,
      backgroundColor: 'rgba(0,0,0,0.18)',
    },
    listDocIcon: {
      fontSize: 20,
    },
    listVideoIcon: {
      fontSize: 20,
    },
  });
