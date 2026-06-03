import { StyleSheet } from 'react-native';
import { Theme } from '../../../theme/theme';
import { Colors } from '../../../theme/colors';
import { Spacing } from '../../../theme/spacing';
import { Radius } from '../../../theme/radius';

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
       fontSize: 24,
      lineHeight: 32,   
      fontWeight: '500',
    },

    heroSubtitle: {
      color: Colors.skyBlue,
      marginTop: Spacing.xs,
    },

    card: {
      backgroundColor: Colors.white,
      borderTopLeftRadius: Radius.xl,
      borderTopRightRadius: Radius.xl,
      paddingHorizontal: Spacing.md,
      paddingTop: Spacing.md,
      paddingBottom: Spacing.lg,
    },

    label: {
      color: Colors.navyDark,
      fontWeight: '600',
      marginBottom: Spacing.xs,
    },

    labelGap: {
      marginTop: Spacing.md,
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

    inputRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },

    inputFlex: {
      flex: 1,
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
    },

    eyeBtn: {
      borderWidth: 1,
      borderLeftWidth: 0,
      borderColor: '#D0DAE8',
      borderTopRightRadius: Radius.md,
      borderBottomRightRadius: Radius.md,
      paddingHorizontal: 10,
      paddingVertical: 10,
    },

    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },

    checkRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: Spacing.xs,
      marginTop: Spacing.sm,
    },

    checkbox: {
      width: 18,
      height: 18,
      borderWidth: 1.5,
      borderColor: Colors.primaryGradientEnd,
      borderRadius: Radius.xs,
      alignItems: 'center',
      justifyContent: 'center',
    },

    checkboxActive: {
      backgroundColor: Colors.primaryGradientEnd,
    },

    checkMark: {
      fontSize: 11,
      lineHeight: 14,
    },

    rememberText: {
      color: '#555',
      marginLeft: Spacing.xs,
      marginTop: Spacing.sm,
    },

    forgot: {
      fontWeight: '600',
      marginTop: Spacing.sm,
    },

    btnPrimary: {
      marginTop: Spacing.md,
      borderRadius: Radius.lg,
      overflow: 'hidden',
    },

    btnGradient: {
      paddingVertical: 14,
      alignItems: 'center',
    },

    footerLinks: {
      marginTop: Spacing.md,
      marginBottom: Spacing.sm,
    },
  });