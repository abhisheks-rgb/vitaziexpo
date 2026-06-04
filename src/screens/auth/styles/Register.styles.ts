import { StyleSheet } from 'react-native';
import { Colors } from '../../../theme/colors';
import { Radius } from '../../../theme/radius';
import { Spacing } from '../../../theme/spacing';
import { Theme } from '../../../theme/theme';

const ICON_SIZE = 120;
const CARD_TOP = 220;

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: 'transparent',
    },

    heroInner: {
      flex: 1,
      paddingHorizontal: Spacing.md,
    },
    heroText: {
      marginTop: Spacing.md,
    },
    heroTitle: {
      fontSize: 28,
      lineHeight: 32,
    },
    heroSubtitle: {
      color: Colors.white,
      marginTop: Spacing.xs,
    },

    // ── Scan button ──────────────────────────────────────────────
    scanAbsolute: {
      position: 'absolute',
      top: CARD_TOP - ICON_SIZE / 2, // 👈 PERFECT alignment
      alignSelf: 'center',
      zIndex: 20,
    },
    scanBtn: {
      borderRadius: ICON_SIZE,
      overflow: 'hidden',
      shadowColor: '#000',
      shadowOpacity: 0.2,
      shadowOffset: { width: 0, height: 6 },
      shadowRadius: 10,
      elevation: 10,
    },
    scanIcon: {
      width: ICON_SIZE,
      height: ICON_SIZE,
    },

    // ── Card internals ────────────────────────────────────────────
    label: {
      color: Colors.navyDark,
      fontWeight: '600',
      marginBottom: Spacing.xs,
    },
    input: {
      borderWidth: 1,
      borderColor: '#D0DAE8',
      borderRadius: Radius.md,
      paddingHorizontal: Spacing.sm,
      paddingVertical: 10,
      color: Colors.navyDark,
      fontSize: 14,
    },
    btnPrimary: {
      marginTop: Spacing.lg,
      borderRadius: Radius.lg,
      overflow: 'hidden',
    },
    btnGradient: {
      paddingVertical: 14,
      alignItems: 'center',
    },
    footerLinks: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: Spacing.md,
    },
    footerIconText: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: Spacing.xs,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
  });
