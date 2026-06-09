// File: Education/components/MaterialDetails/styles.ts

import { Dimensions, StyleSheet } from 'react-native';

import type { Theme } from '../../../../theme';

const { width: SCREEN_W } = Dimensions.get('window');
export const HERO_H = 220;
export const SIMILAR_CARD_W = 140;

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    scroll: { flex: 1 },
    scrollContent: { paddingBottom: 40 },

    // ── Hero ──────────────────────────────────────────────────────────────
    heroContainer: {
      width: SCREEN_W,
      height: HERO_H,
      backgroundColor: '#000',
    },
    heroScrim: {
      ...StyleSheet.absoluteFill,
      backgroundColor: 'rgba(0,0,0,0.2)',
    },
    heroDocHeader: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(15,23,42,0.88)',
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 14,
      paddingVertical: 10,
      gap: 8,
    },
    heroDocIcon: { fontSize: 16 },
    heroDocName: {
      flex: 1,
      fontSize: 13,
      fontWeight: '700',
      color: '#fff',
    },

    // ── Content ───────────────────────────────────────────────────────────
    content: {
      paddingHorizontal: 16,
      paddingTop: 18,
    },
    title: {
      fontSize: 18,
      fontWeight: '800',
      color: theme.colors.text,
      lineHeight: 26,
      marginBottom: 10,
    },
    description: {
      fontSize: 14,
      color: theme.colors.textMuted,
      lineHeight: 22,
      marginBottom: 6,
    },
    date: {
      fontSize: 12,
      color: theme.colors.textMuted,
      marginBottom: 24,
    },

    // ── Similar material ──────────────────────────────────────────────────
    similarTitle: {
      fontSize: 17,
      fontWeight: '800',
      color: theme.colors.text,
      marginBottom: 14,
      paddingHorizontal: 16,
    },
    similarList: {
      paddingLeft: 16,
      paddingRight: 8,
      gap: 12,
    },
    similarCard: {
      width: SIMILAR_CARD_W,
      backgroundColor: theme.colors.surface,
      borderRadius: 14,
      overflow: 'hidden',
    },
    similarThumbnail: {
      width: SIMILAR_CARD_W,
      height: 88,
      backgroundColor: theme.colors.border,
    },
    similarDocHeader: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(15,23,42,0.88)',
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 6,
      paddingVertical: 4,
      gap: 4,
    },
    similarDocIcon: { fontSize: 9 },
    similarDocName: {
      flex: 1,
      fontSize: 9,
      fontWeight: '700',
      color: '#fff',
    },
    similarDurationPill: {
      position: 'absolute',
      bottom: 5,
      left: 5,
      backgroundColor: 'rgba(0,0,0,0.65)',
      borderRadius: 4,
      paddingHorizontal: 5,
      paddingVertical: 2,
    },
    similarDurationText: {
      fontSize: 9,
      color: '#fff',
      fontWeight: '700',
    },
    similarBody: { padding: 8 },
    similarCardTitle: {
      fontSize: 12,
      fontWeight: '700',
      color: theme.colors.text,
      lineHeight: 16,
      marginBottom: 3,
    },
    similarCardDesc: {
      fontSize: 11,
      color: theme.colors.textMuted,
      lineHeight: 15,
    },
  });
