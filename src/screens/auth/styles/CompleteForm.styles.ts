import { StyleSheet } from 'react-native';

import { Colors } from '../../../theme/colors';
import { Radius } from '../../../theme/radius';
import { Spacing } from '../../../theme/spacing';
import type { Theme } from '../../../theme/theme';

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

    logo: {
      height: 32,
      width: 120,
    },

    heroText: {
      marginTop: Spacing.sm,
    },

    heroTitle: {
      fontSize: 28,
      lineHeight: 32,
      fontWeight: '500',
    },

    heroSubtitle: {
      color: Colors.white,
      marginTop: Spacing.xs,
    },

    card: {
      backgroundColor: Colors.white,
      borderTopLeftRadius: Radius.xl,
      borderTopRightRadius: Radius.xl,
      paddingHorizontal: Spacing.md,
      paddingTop: Spacing.md,
      maxHeight: '65%',
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

    inputSuffix: {
      borderWidth: 1,
      borderLeftWidth: 0,
      borderColor: '#D0DAE8',
      borderTopRightRadius: Radius.md,
      borderBottomRightRadius: Radius.md,
      paddingHorizontal: 10,
      paddingVertical: 10,
    },

    consentBox: {
      flexDirection: 'row',
      gap: Spacing.sm,
      backgroundColor: '#F5F8FF',
      borderWidth: 1,
      borderColor: '#D0DAE8',
      borderRadius: Radius.md,
      padding: Spacing.sm,
      marginTop: Spacing.md,
      alignItems: 'flex-start',
    },

    consentText: {
      flex: 1,
      color: '#555',
      lineHeight: 18,
    },

    checkbox: {
      width: 18,
      height: 18,
      borderWidth: 1.5,
      borderColor: Colors.primaryGradientEnd,
      borderRadius: Radius.xs,
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      marginTop: 1,
    },

    checkboxActive: {
      backgroundColor: Colors.primaryGradientEnd,
    },

    checkMark: {
      fontSize: 11,
      lineHeight: 14,
    },

    btnPrimary: {
      marginTop: Spacing.md,
      borderRadius: Radius.lg,
      overflow: 'hidden',
    },

    btnDisabled: {
      opacity: 0.6,
    },

    btnGradient: {
      paddingVertical: 14,
      alignItems: 'center',
    },
  });
