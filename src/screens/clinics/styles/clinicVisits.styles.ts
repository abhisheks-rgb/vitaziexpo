import { Dimensions, StyleSheet } from 'react-native';

import { Colors, Radius, type Theme } from '../../../theme';
import { createCommonStyles } from '../../../theme/styles';

const { width } = Dimensions.get('window');
const GRID_GAP = 10;
const GRID_PADDING = 16;
export const VISIT_CARD_W = (width - GRID_PADDING * 2 - GRID_GAP) / 2;
export const VISIT_CARD_H = VISIT_CARD_W * 0.9;

export const createVisitStyles = (theme: Theme) => {
  const common = createCommonStyles(theme);

  return StyleSheet.create({
    screen: common.screen,
    scroll: common.scroll,

    scrollContent: {
      ...common.scrollContent,
      gap: 10,
    },
    scrollContentGrid: {
      paddingHorizontal: theme.spacing.md,
      paddingBottom: 32,
    },

    // ── View toggle ──────────────────────────────────────────────────────────
    toggleWrap: common.toggleWrap,
    toggleBtn: {
      ...common.toggleBtn,
      width: 38,
      height: 28,
      borderRadius: 8,
    },
    toggleBtnActive: common.toggleBtnActive,

    // ── Visit History header row ──────────────────────────────────────────────
    visitHistoryRow: {
      ...common.sectionRow,
      marginBottom: 14,
    },
    visitHistoryTitle: common.sectionHeading,
    imagesToggleWrap: {
      ...common.row,
      gap: 8,
    },
    imagesToggleLabel: {
      fontSize: 13,
      color: theme.colors.textSecondary,
    },

    // ── Clinic header block ───────────────────────────────────────────────────
    visitsClinicName: {
      fontSize: 20,
      fontWeight: '700',
      color: theme.colors.textPrimary,
      marginBottom: 2,
    },
    visitsClinicAddress: {
      fontSize: 13,
      color: theme.colors.textSecondary,
      marginBottom: 16,
    },

    // ── Grid layout ───────────────────────────────────────────────────────────
    visitGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: GRID_GAP,
    },

    // ── Grid card ─────────────────────────────────────────────────────────────
    visitGridCard: {
      ...common.card,
      width: VISIT_CARD_W,
      borderRadius: 12,
      overflow: 'hidden',
    },
    visitGridImage: {
      width: VISIT_CARD_W,
      height: VISIT_CARD_H,
    },
    visitGridPlaceholder: {
      ...common.imagePlaceholder,
      width: VISIT_CARD_W,
      height: VISIT_CARD_H * 0.65,
      padding: 20,
    },
    visitGridDate: {
      fontSize: 12,
      color: theme.colors.textPrimary,
      textAlign: 'center',
      paddingVertical: 8,
      paddingHorizontal: 4,
    },

    // ── List card ─────────────────────────────────────────────────────────────
    visitListCard: {
      ...common.card,
      overflow: 'hidden',
    },
    visitListImage: {
      width: '100%',
      height: 200,
    },
    visitListPlaceholder: {
      ...common.imagePlaceholder,
      width: '100%',
      height: 100,
      padding: 24,
    },
    visitListFooter: {
      ...common.rowSpaceBetween,
      paddingHorizontal: 14,
      paddingVertical: 12,
    },
    visitListTextWrap: {
      flex: 1,
    },
    visitListClinicName: {
      ...common.cardTitle,
      fontSize: 14,
    },
    visitListDate: {
      ...common.cardSubtitle,
      fontSize: 12,
    },

    // ── Review button ─────────────────────────────────────────────────────────
    visitReviewBtn: {
      ...common.row,
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
};
