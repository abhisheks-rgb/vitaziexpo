import { Dimensions, StyleSheet } from 'react-native';
import type { Theme } from '../../../theme';
import { createCommonStyles } from '../../../theme/styles';

const { width } = Dimensions.get('window');
const GRID_GAP = 10;
const GRID_PADDING = 16;
export const CLINIC_GRID_CARD_W = (width - GRID_PADDING * 2 - GRID_GAP) / 2;

export const createClinicListStyles = (theme: Theme) => {
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
    toggleBtn: common.toggleBtn,
    toggleBtnActive: common.toggleBtnActive,

    // ── Grid layout ──────────────────────────────────────────────────────────
    clinicGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: GRID_GAP,
      paddingTop: 2,
    },

    // ── Clinic LIST card ──────────────────────────────────────────────────────
    clinicCard: common.card,
    clinicCardInner: common.cardInner,
    clinicIconWrap: {
      ...common.iconCircle,
      flexShrink: 0,
    },
    clinicTextWrap: {
      flex: 1,
    },
    clinicName: {
      ...common.cardTitle,
      fontSize: 14,
    },
    clinicAddress: {
      ...common.cardSubtitle,
      lineHeight: 17,
    },
    chevronWrap: {
      borderRadius: 15,
      borderWidth: 1,
      borderColor: theme.colors.border,
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    },
    chevron: {
      fontSize: 18,
      color: theme.colors.text,
      fontWeight: '500',
    },

    // ── Clinic GRID card ──────────────────────────────────────────────────────
    clinicGridCard: {
      ...common.card,
      width: CLINIC_GRID_CARD_W,
      overflow: 'hidden',
    },
    clinicGridIconWrap: {
      ...common.imagePlaceholder,
      width: '100%',
      height: CLINIC_GRID_CARD_W * 0.65,
    },
    clinicGridTextWrap: {
      padding: 10,
    },
    clinicGridName: {
      ...common.cardTitle,
      fontSize: 13,
    },
    clinicGridAddress: {
      ...common.cardSubtitle,
      fontSize: 11,
      lineHeight: 15,
    },
  });
};
