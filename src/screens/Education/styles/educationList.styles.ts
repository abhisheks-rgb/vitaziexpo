import { Dimensions, StyleSheet } from 'react-native';
import type { Theme } from '../../../theme';
import { createCommonStyles } from '../../../theme/styles';

const { width } = Dimensions.get('window');
const GRID_GAP = 10;
const GRID_PADDING = 16;
export const educationGridCardWidth = (width - GRID_PADDING * 2 - GRID_GAP) / 2;

export const createEducationistStyles = (theme: Theme) => {
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
      gridContent: {
    paddingHorizontal: 16,
    paddingBottom: 32,
    gap: 12,
  },
  gridRow: {
    gap: 12,
    justifyContent: 'space-between',
  },

   listContent: {
    paddingBottom: 32,
  },
  });
};
