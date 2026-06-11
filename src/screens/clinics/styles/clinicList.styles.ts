import { Dimensions, StyleSheet } from 'react-native';

import type { Theme } from '../../../theme';

const { width } = Dimensions.get('window');
const GRID_GAP = 10;
const GRID_PADDING = 16;
export const CLINIC_GRID_CARD_W = (width - GRID_PADDING * 2 - GRID_GAP) / 2;

export const createClinicListStyles = (theme: Theme) =>
  StyleSheet.create({
    screen: {
      flex: 1,
    },

    // ── Scroll ───────────────────────────────────────────────────────────────────
    scroll: {
      flex: 1,
    },

    scrollContent: {
      paddingHorizontal: theme.spacing.md,
      paddingBottom: 32,
      gap: 10,
    },

    scrollContentGrid: {
      paddingHorizontal: theme.spacing.md,
      paddingBottom: 32,
    },

    // ── View toggle ──────────────────────────────────────────────────────────────
    toggleWrap: {
      flexDirection: 'row',
      gap: 6,
    },

    toggleBtn: {
      width: 34,
      height: 34,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'transparent',
    },

    toggleBtnActive: {
      backgroundColor: theme.colors.limeAccent,
    },

    // ── Grid layout ──────────────────────────────────────────────────────────────
    clinicGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: GRID_GAP,
      paddingTop: 2,
    },

    // ── Clinic LIST card ─────────────────────────────────────────────────────────
    clinicCard: {
      backgroundColor: theme.colors.surface,
      borderRadius: 14,
      shadowColor: '#000',
      shadowOpacity: 0.05,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 2 },
      elevation: 2,
    },

    clinicCardInner: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 14,
      gap: 12,
    },

    clinicIconWrap: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: theme.colors.accentLight,
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    },

    clinicTextWrap: {
      flex: 1,
    },

    clinicName: {
      fontSize: 14,
      fontWeight: '700',
      color: theme.colors.text,
      marginBottom: 3,
    },

    clinicAddress: {
      fontSize: 12,
      color: theme.colors.textMuted,
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

    // ── Clinic GRID card ─────────────────────────────────────────────────────────
    clinicGridCard: {
      width: CLINIC_GRID_CARD_W,
      backgroundColor: theme.colors.surface,
      borderRadius: 14,
      shadowColor: '#000',
      shadowOpacity: 0.05,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 2 },
      elevation: 2,
      overflow: 'hidden',
    },

    clinicGridIconWrap: {
      width: '100%',
      height: CLINIC_GRID_CARD_W * 0.65,
      backgroundColor: theme.colors.accentLight,
      alignItems: 'center',
      justifyContent: 'center',
    },

    clinicGridTextWrap: {
      padding: 10,
    },

    clinicGridName: {
      fontSize: 13,
      fontWeight: '700',
      color: theme.colors.text,
      marginBottom: 3,
    },

    clinicGridAddress: {
      fontSize: 11,
      color: theme.colors.textMuted,
      lineHeight: 15,
    },
  });
