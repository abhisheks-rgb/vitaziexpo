import { Dimensions, StyleSheet } from 'react-native';

import type { Theme } from '../../../../theme';

const { width: SCREEN_W } = Dimensions.get('window');

const HORIZONTAL_PADDING = 20;
const GRID_GAP = 12;

const GRID_CARD_W = (SCREEN_W - HORIZONTAL_PADDING * 2 - GRID_GAP) / 2;

export const createStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    sectionTitle: {
      fontSize: 18,
      fontWeight: '700',
      color: theme.colors.textPrimary,
      marginBottom: theme.spacing.md,
    },

    // ─────────────────────────────────────
    // Toggle
    // ─────────────────────────────────────

    toggleContainer: {
      flexDirection: 'row',
      alignSelf: 'flex-end',
      backgroundColor: theme.colors.surface,
      borderRadius: theme.radius.md,
      padding: 3,
      marginBottom: theme.spacing.md,
      gap: 2,
    },

    toggleBtn: {
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: theme.radius.sm,
      alignItems: 'center',
      justifyContent: 'center',
    },

    toggleBtnActive: {
      backgroundColor: theme.colors.background,
      shadowColor: '#000',
      shadowOpacity: 0.08,
      shadowRadius: 4,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      elevation: 2,
    },

    toggleIcon: {
      fontSize: 14,
      color: theme.colors.textSecondary,
    },

    toggleIconActive: {
      color: theme.colors.textPrimary,
    },

    // ─────────────────────────────────────
    // Containers
    // ─────────────────────────────────────

    gridContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: GRID_GAP,
    },

    listContainer: {
      gap: GRID_GAP,
    },

    // ─────────────────────────────────────
    // Grid Card
    // ─────────────────────────────────────

    gridCard: {
      width: GRID_CARD_W,
      backgroundColor: theme.colors.surface,
      borderRadius: theme.radius.lg,
      overflow: 'hidden',
    },

    gridThumbnail: {
      width: '100%',
      height: 100,
      backgroundColor: theme.colors.accentLight,
    },

    gridBody: {
      padding: theme.spacing.sm,
    },

    gridTitle: {
      fontSize: 12,
      fontWeight: '700',
      color: theme.colors.textPrimary,
      lineHeight: 16,
      marginBottom: 4,
    },

    gridDesc: {
      fontSize: 11,
      color: theme.colors.textSecondary,
      lineHeight: 15,
      marginBottom: 4,
    },

    gridDate: {
      fontSize: 10,
      color: theme.colors.textSecondary,
    },

    // ─────────────────────────────────────
    // List Card
    // ─────────────────────────────────────

    listCard: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      backgroundColor: theme.colors.surface,
      borderRadius: theme.radius.lg,
      overflow: 'hidden',
    },

    listThumbnail: {
      width: 110,
      height: 90,
      flexShrink: 0,
      backgroundColor: theme.colors.accentLight,
    },

    listBody: {
      flex: 1,
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
    },

    listTitle: {
      fontSize: 13,
      fontWeight: '700',
      color: theme.colors.textPrimary,
      marginBottom: 4,
      lineHeight: 18,
    },

    listDesc: {
      fontSize: 12,
      color: theme.colors.textSecondary,
      lineHeight: 16,
      marginBottom: 4,
    },

    listDate: {
      fontSize: 11,
      color: theme.colors.textSecondary,
    },
  });

  const docStyles = StyleSheet.create({
    wrapper: {
      overflow: 'hidden',
    },

    header: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 10,

      backgroundColor: 'rgba(15,23,42,0.88)',

      flexDirection: 'row',
      alignItems: 'center',

      paddingHorizontal: 8,
      paddingVertical: 6,
      gap: 6,
    },

    headerIcon: {
      width: 16,
      height: 16,
    },

    headerName: {
      flex: 1,
      fontSize: 11,
      fontWeight: '700',
      color: '#FFF',
      letterSpacing: 0.1,
    },

    frostedOverlay: {
      ...StyleSheet.absoluteFill,
      backgroundColor: 'rgba(255,255,255,0.18)',
      marginTop: 30,
    },
  });

  const videoStyles = StyleSheet.create({
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
    styles,
    docStyles,
    videoStyles,
  };
};
