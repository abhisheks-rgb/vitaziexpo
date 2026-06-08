import { Dimensions, StyleSheet } from 'react-native';

import { Colors, Radius, Theme } from '../../../theme';

const { width } = Dimensions.get('window');
const GRID_GAP = 10;
const GRID_PADDING = 16;
export const VISIT_CARD_W = (width - GRID_PADDING * 2 - GRID_GAP) / 2;
export const VISIT_CARD_H = VISIT_CARD_W * 0.9;

export const createVisitStyles = (theme: Theme) =>
  StyleSheet.create({
    screen: {
      flex: 1,
    },

    // ── Scroll ───────────────────────────────────────────────────────────────────
    scroll: {
      flex: 1,
    },

    scrollContent: {
      paddingHorizontal: theme.spacing.md,
      paddingBottom: 32,
      gap: 10,
    },

    scrollContentGrid: {
      paddingHorizontal: theme.spacing.md,
      paddingBottom: 32,
    },

    // ── Header view toggle (list / grid icons) ────────────────────────────────────
    toggleWrap: {
      flexDirection: 'row',
      gap: 6,
    },

    toggleBtn: {
      width: 38,
      height: 28,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'transparent',
    },

    toggleBtnActive: {
      backgroundColor: theme.colors.limeAccent,
    },

    // ── Visit History row (title + Images toggle) ────────────────────────────────
    visitHistoryRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 14,
    },

    visitHistoryTitle: {
      fontSize: 18,
      fontWeight: '700',
      color: theme.colors.text,
    },

    imagesToggleWrap: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },

    imagesToggleLabel: {
      fontSize: 13,
      color: theme.colors.textMuted,
    },

    // ── Visits clinic header block ────────────────────────────────────────────────
    visitsClinicName: {
      fontSize: 20,
      fontWeight: '700',
      color: theme.colors.text,
      marginBottom: 2,
    },

    visitsClinicAddress: {
      fontSize: 13,
      color: theme.colors.textMuted,
      marginBottom: 16,
    },

    // ── Visit GRID card ───────────────────────────────────────────────────────────
    visitGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: GRID_GAP,
    },

    visitGridCard: {
      width: VISIT_CARD_W,
      backgroundColor: theme.colors.surface,
      borderRadius: 12,
      overflow: 'hidden',
      shadowColor: '#000',
      shadowOpacity: 0.06,
      shadowRadius: 6,
      shadowOffset: { width: 0, height: 2 },
      elevation: 2,
    },

    visitGridImage: {
      width: VISIT_CARD_W,
      height: VISIT_CARD_H,
    },

    // Placeholder: smaller, with padding so the SVG doesn't fill edge-to-edge
    visitGridPlaceholder: {
      width: VISIT_CARD_W,
      height: VISIT_CARD_H * 0.65,
      backgroundColor: theme.colors.accentLight,
      padding: 20,
    },

    visitGridDate: {
      fontSize: 12,
      color: theme.colors.text,
      textAlign: 'center',
      paddingVertical: 8,
      paddingHorizontal: 4,
    },

    // ── Visit LIST card ───────────────────────────────────────────────────────────
    visitListCard: {
      backgroundColor: theme.colors.surface,
      borderRadius: 14,
      overflow: 'hidden',
      shadowColor: '#000',
      shadowOpacity: 0.06,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 2 },
      elevation: 2,
    },

    visitListImage: {
      width: '100%',
      height: 200,
    },

    // Placeholder: compact with generous padding around the SVG icon
    visitListPlaceholder: {
      width: '100%',
      height: 100,
      backgroundColor: theme.colors.accentLight,
      padding: 24,
    },

    visitListFooter: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 14,
      paddingVertical: 12,
    },

    visitListTextWrap: {
      flex: 1,
    },

    visitListClinicName: {
      fontSize: 14,
      fontWeight: '700',
      color: theme.colors.text,
      marginBottom: 2,
    },

    visitListDate: {
      fontSize: 12,
      color: theme.colors.textMuted,
    },

    visitReviewBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: Colors.navyDark,
      paddingLeft: 14,
      paddingRight: 6,
      paddingVertical: 6,
      borderRadius: Radius.full,
    },
    visitReviewArrow: {
      width: 24,
      height: 24,
      borderRadius: 12,
      backgroundColor: Colors.white,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
