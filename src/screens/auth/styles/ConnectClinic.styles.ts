import { StyleSheet } from 'react-native';
import { Colors } from '../../../theme/colors';
import { Radius } from '../../../theme/radius';
import { Spacing } from '../../../theme/spacing';
import { Theme } from '../../../theme/theme';

export const ICON_SIZE = 120;

export const getCardTop = (screenHeight: number) =>
  Math.min(Math.max(screenHeight * 0.42, 200), 320);

export const createStyles = (theme: Theme, cardTop: number) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: theme.colors.gradientStart,
    },
    heroInner: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      paddingHorizontal: Spacing.md,
    },
    heroText: { marginTop: Spacing.md },
    heroTitle: { fontSize: 28, lineHeight: 32, fontWeight: '500' },
    heroSubtitle: { color: Colors.white, marginTop: Spacing.xs },

    scanBtn: {
      borderRadius: ICON_SIZE,
      overflow: 'hidden',
      shadowColor: '#000',
      shadowOpacity: 0.2,
      shadowOffset: { width: 0, height: 6 },
      shadowRadius: 10,
      elevation: 10,
    },
    scanIcon: { width: ICON_SIZE, height: ICON_SIZE },

    label: {
      color: Colors.navyDark,
      fontWeight: '600',
      marginBottom: Spacing.xs,
    },
    orgIdBox: {
      borderWidth: 1,
      borderColor: '#D0DAE8',
      borderRadius: Radius.md,
      paddingHorizontal: Spacing.sm,
      paddingVertical: 10,
      backgroundColor: '#F8FAFF',
    },
    orgIdText: { fontWeight: '600' },
    btnPrimary: {
      marginTop: Spacing.lg,
      borderRadius: Radius.lg,
      overflow: 'hidden',
    },
    btnGradient: { paddingVertical: 14, alignItems: 'center' },
    footerLinks: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: Spacing.md,
    },
  });
