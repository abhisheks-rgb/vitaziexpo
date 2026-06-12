import { StyleSheet } from 'react-native';
import type { Theme } from './theme';

export const createCommonStyles = (theme: Theme) =>
  StyleSheet.create({
    // ── Screen & Scroll ──────────────────────────────────────────────────────
    screen: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    scroll: {
      flex: 1,
    },
    scrollContent: {
      paddingHorizontal: theme.spacing.md,
      paddingBottom: 32,
    },

    // ── Flex & Layout ─────────────────────────────────────────────────────────
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    rowSpaceBetween: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },

    // ── Card (surface + shadow) ───────────────────────────────────────────────
    // Base card style — extend with width, overflow, borderRadius overrides
    card: {
      backgroundColor: theme.colors.surface,
      borderRadius: 14,
      shadowColor: '#000',
      shadowOpacity: 0.05,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 2 },
      elevation: 2,
    },
    // Inner row used for list card content (icon + text + chevron)
    cardInner: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 14,
      gap: 12,
    },

    // ── Icon & Image ──────────────────────────────────────────────────────────
    // Circular icon container with accentLight background
    iconCircle: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: theme.colors.accentLight,
      alignItems: 'center',
      justifyContent: 'center',
    },
    // Rectangular placeholder used before images load (grid + list cards)
    imagePlaceholder: {
      backgroundColor: theme.colors.accentLight,
      alignItems: 'center',
      justifyContent: 'center',
    },
    // Standard header/action icon size
    icon36: {
      width: 36,
      height: 36,
    },

    // ── View-mode Toggle (list / grid) ────────────────────────────────────────
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

    // ── Section Header ────────────────────────────────────────────────────────
    // Row containing a section title + optional right action
    sectionRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 14,
    },
    // Section title — poppinsSemiBold 18 via typography.subtitle
    sectionHeading: {
      ...theme.typography.subtitle,
      color: theme.colors.text,
    },

    // ── Typography ────────────────────────────────────────────────────────────
    // Body text — poppinsRegular 15
    body: {
      ...theme.typography.body,
      color: theme.colors.text,
    },
    // Small muted text — poppinsRegular 13
    caption: {
      ...theme.typography.caption,
      color: theme.colors.textMuted,
    },

    // ── Card Typography ───────────────────────────────────────────────────────
    // Primary label inside cards — poppinsSemiBold, slightly smaller than button
    cardTitle: {
      ...theme.typography.button,
      fontSize: 14,
      color: theme.colors.text,
      marginBottom: 3,
    },
    // Secondary muted label inside cards — poppinsRegular 12
    cardSubtitle: {
      ...theme.typography.caption,
      color: theme.colors.textMuted,
      lineHeight: 17,
    },
  });
