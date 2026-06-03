import { StyleSheet } from 'react-native';
import { Theme } from '../../../theme/theme';
import { Colors } from '../../../theme/colors';
import { Spacing } from '../../../theme/spacing';
import { Radius } from '../../../theme/radius';

const ICON_SIZE = 120;

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: theme.colors.gradientStart,
    },

    heroContainer: {
      flex: 1,
    },

    heroInner: {
      flex: 1,
      paddingHorizontal: Spacing.md,
    },

    logoWrap: {
      width: '100%',
      alignItems: 'center',
      marginTop: Spacing.sm,
    },

    logo: {
      height: 32,
      width: 120,
    },

    heroText: {
      marginTop: Spacing.md,
    },

    heroTitle: {
      fontSize: 26,
      lineHeight: 32,
    },

    heroSubtitle: {
      color: Colors.skyBlue,
      marginTop: Spacing.xs,
    },

    overlapZone: {
      height: 0,
      alignItems: 'center',
      zIndex: 10,
      overflow: 'visible',
    },

    scanBtn: {
      marginTop: -(ICON_SIZE / 2),
    },

    scanIcon: {
      width: ICON_SIZE,
      height: ICON_SIZE,
    },

    card: {
      backgroundColor: Colors.white,
      borderTopLeftRadius: Radius.xl,
      borderTopRightRadius: Radius.xl,
      paddingHorizontal: Spacing.md,
      paddingBottom: Spacing.lg,
    },

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
  });