import { Dimensions, StyleSheet } from 'react-native';
import { Theme } from '../../theme';

const { width } = Dimensions.get('window');
const GRID_GAP = 10;
const GRID_PADDING = 16;
export const VISIT_CARD_W = (width - GRID_PADDING * 2 - GRID_GAP) / 2;
export const VISIT_CARD_H = VISIT_CARD_W * 0.9;

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    screen: {
      flex: 1,
    },

    // ── Header ───────────────────────────────────────────────────────────────────
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: theme.spacing.md,
      paddingVertical: 12,
      gap: 12,
    },

    backCircle: {
      width: 34,
      height: 34,
      borderRadius: 17,
      backgroundColor: theme.colors.limeAccent,
      alignItems: 'center',
      justifyContent: 'center',
    },

    backArrow: {
      fontSize: 22,
      color: theme.colors.text,
      lineHeight: 26,
      fontWeight: '600',
    },

    headerTitle: {
      ...theme.typography.title,
      fontSize: 20,
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

    // ── Clinic list card ─────────────────────────────────────────────────────────
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
      width: 30,
      height: 30,
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

    // ── Visits screen header block ────────────────────────────────────────────────
    visitsClinicName: {
      fontSize: 20,
      fontWeight: '700',
      color: theme.colors.text,
      marginBottom: 2,
    },

    visitsClinicAddress: {
      fontSize: 13,
      color: theme.colors.textMuted,
      marginBottom: 16,
    },

    // ── Visit grid ───────────────────────────────────────────────────────────────
    visitsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: GRID_GAP,
    },

    visitCard: {
      width: VISIT_CARD_W,
      backgroundColor: theme.colors.surface,
      borderRadius: 12,
      overflow: 'hidden',
      shadowColor: '#000',
      shadowOpacity: 0.06,
      shadowRadius: 6,
      shadowOffset: { width: 0, height: 2 },
      elevation: 2,
    },

    visitImage: {
      width: VISIT_CARD_W,
      height: VISIT_CARD_H,
    },

    visitDate: {
      fontSize: 12,
      color: theme.colors.text,
      textAlign: 'center',
      paddingVertical: 8,
      paddingHorizontal: 4,
    },
  });
