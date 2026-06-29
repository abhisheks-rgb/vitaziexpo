import { StyleSheet, type TextStyle, type ViewStyle } from 'react-native';

import type { Theme } from '../../theme';

// Radius constants — defined locally since Theme does not expose a `radii` token
const RADIUS_PILL = 100;

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: theme.colors.background,
    } as ViewStyle,

    scroll: {
      flex: 1,
    } as ViewStyle,

    scrollContent: {
      paddingHorizontal: theme.spacing.md,
      paddingBottom: 100,
    } as ViewStyle,

    // ── Header ────────────────────────────────────────────────────────────
    header: {
      paddingHorizontal: theme.spacing.md,
      paddingTop: theme.spacing.md,
      paddingBottom: theme.spacing.sm,
    } as ViewStyle,

    headerTitle: {
      fontSize: 20,
      fontWeight: '700',
      color: theme.colors.textPrimary,
      letterSpacing: -0.3,
    } as TextStyle,

    // ── Progress Bar ──────────────────────────────────────────────────────
    progressContainer: {
      paddingHorizontal: theme.spacing.md,
      paddingBottom: theme.spacing.md,
    } as ViewStyle,

    progressRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: theme.spacing.xs,
    } as ViewStyle,

    progressLabel: {
      fontSize: 12,
      fontWeight: '500',
      color: theme.colors.textSecondary,
    } as TextStyle,

    progressTrack: {
      height: 5,
      backgroundColor: theme.colors.border,
      borderRadius: RADIUS_PILL,
      overflow: 'hidden',
    } as ViewStyle,

    progressFill: {
      height: '100%',
      backgroundColor: theme.colors.primary,
      borderRadius: RADIUS_PILL,
    } as ViewStyle,

    // ── Divider ───────────────────────────────────────────────────────────
    divider: {
      height: 1,
      backgroundColor: theme.colors.border,
      marginHorizontal: theme.spacing.md,
      marginBottom: theme.spacing.md,
    } as ViewStyle,

    // ── Question Card ─────────────────────────────────────────────────────
    questionCard: {
      marginBottom: theme.spacing.md,
    } as ViewStyle,

    questionText: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.colors.textPrimary,
      lineHeight: 20,
      marginBottom: theme.spacing.sm + 2,
    } as TextStyle,

    // ── Radio Option ──────────────────────────────────────────────────────
    optionRow: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: theme.spacing.xs + 2,
    } as ViewStyle,

    radioOuter: {
      width: 20,
      height: 20,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: theme.colors.border,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: theme.spacing.sm + 4,
    } as ViewStyle,

    radioOuterSelected: {
      borderColor: theme.colors.primary,
    } as ViewStyle,

    radioInner: {
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: theme.colors.primary,
    } as ViewStyle,

    optionText: {
      fontSize: 14,
      fontWeight: '400',
      color: theme.colors.textPrimary,
    } as TextStyle,

    // ── Next Button ───────────────────────────────────────────────────────
    nextButtonContainer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      paddingHorizontal: theme.spacing.md,
      paddingBottom: theme.spacing.xl,
      paddingTop: theme.spacing.md,
      backgroundColor: theme.colors.background,
    } as ViewStyle,

    nextButton: {
      backgroundColor: theme.colors.primary,
      borderRadius: RADIUS_PILL,
      paddingVertical: theme.spacing.md,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 2,
      borderColor: theme.colors.primary,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 4,
    } as ViewStyle,

    nextButtonLabel: {
      fontSize: 15,
      fontWeight: '700',
      color: theme.colors.accentLight,
      letterSpacing: 0.2,
    } as TextStyle,

    nextButtonIcon: {
      marginLeft: theme.spacing.xs,
      fontSize: 15,
      fontWeight: '700',
      color: theme.colors.textPrimary,
    } as TextStyle,
  });
