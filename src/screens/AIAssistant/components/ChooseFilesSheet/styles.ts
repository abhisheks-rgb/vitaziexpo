import { Dimensions, StyleSheet } from 'react-native';

import type { Theme } from '../../../../theme';
import { createCommonStyles } from '../../../../theme/styles';

const { width: SCREEN_W } = Dimensions.get('window');
const PHOTO_SIZE = (SCREEN_W - 40 - 16) / 3;
export { PHOTO_SIZE };

export const createStyles = (theme: Theme) => {
  const common = createCommonStyles(theme);

  return StyleSheet.create({
    // ── Modal overlay ─────────────────────────────────────────────────────────
    overlay: {
      ...StyleSheet.absoluteFill,
      backgroundColor: 'rgba(0,0,0,0.35)',
      justifyContent: 'flex-end',
      zIndex: 100,
    },

    // ── Bottom sheet ──────────────────────────────────────────────────────────
    sheet: {
      backgroundColor: theme.colors.background,
      borderTopLeftRadius: theme.radius.xl,
      borderTopRightRadius: theme.radius.xl,
      paddingBottom: theme.spacing.xl,
    },

    // ── Drag handle ───────────────────────────────────────────────────────────
    handle: {
      width: 36,
      height: 4,
      borderRadius: theme.radius.xs,
      backgroundColor: theme.colors.border,
      alignSelf: 'center',
      marginTop: theme.spacing.sm,
      marginBottom: theme.spacing.md,
    },

    // ── Sheet header (title + confirm button) ─────────────────────────────────
    header: {
      ...common.row,
      paddingHorizontal: theme.spacing.md,
      marginBottom: theme.spacing.xs,
    },
    headerTitle: {
      ...theme.typography.button,
      fontSize: 16,
      flex: 1,
      color: theme.colors.textPrimary,
    },

    // ── Confirm button ────────────────────────────────────────────────────────
    confirmBtn: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: theme.colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
    },
    confirmIcon: {
      ...theme.typography.caption,
      color: theme.colors.textInverse,
    },

    // ── Permission notice ─────────────────────────────────────────────────────
    permissionText: {
      ...theme.typography.caption,
      color: theme.colors.textSecondary,
      paddingHorizontal: theme.spacing.md,
      marginBottom: 14,
      lineHeight: 18,
    },
    permissionLink: {
      ...theme.typography.caption,
      fontFamily: theme.typography.button.fontFamily,
      color: theme.colors.primary,
    },

    // ── Photo grid ────────────────────────────────────────────────────────────
    grid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      paddingHorizontal: theme.spacing.md,
      gap: theme.spacing.sm,
    },
    photoWrap: {
      width: PHOTO_SIZE,
      height: PHOTO_SIZE,
      borderRadius: theme.radius.md,
      overflow: 'hidden',
      backgroundColor: theme.colors.surface,
    },
    photoSelected: {
      borderWidth: 3,
      borderColor: theme.colors.primary,
    },

    // ── Selection badge ───────────────────────────────────────────────────────
    selectedBadge: {
      position: 'absolute',
      top: 5,
      right: 5,
      width: 20,
      height: 20,
      borderRadius: 10,
      backgroundColor: theme.colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 5,
    },
    selectedBadgeText: {
      ...theme.typography.caption,
      fontSize: 10,
      color: theme.colors.textInverse,
    },
  });
};
