// File: components/TabContent/styles.ts

import { StyleSheet } from 'react-native';

import type { Theme } from '../../../../theme';

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    sectionLabel: {
      fontSize: 15,
      fontWeight: '700',
      color: theme.colors.text,
      marginBottom: 6,
      marginTop: 10,
    },
    bodyText: {
      fontSize: 15,
      color: theme.colors.textMuted,
      lineHeight: 22,
    },
    bulletRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginBottom: 10,
    },
    bulletDot: {
      fontSize: 20,
      color: theme.colors.text,
      lineHeight: 24,
      marginRight: 10,
      marginTop: -2,
    },
    bulletText: {
      fontSize: 15,
      color: theme.colors.text,
      flex: 1,
      lineHeight: 22,
    },
    icdCodeLabel: {
      fontSize: 15,
      fontWeight: '700',
      color: theme.colors.text,
      lineHeight: 22,
    },
    icdCodeBlock: {
      marginBottom: 8,
    },
    followUpBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#F2F2F7',
      borderRadius: 12,
      padding: 14,
      gap: 8,
      marginVertical: 10,
    },
    followUpIcon: {
      fontSize: 16,
      color: theme.colors.text,
    },
    followUpText: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.colors.text,
    },
    urgentBox: {
      marginTop: 14,
      backgroundColor: theme.colors.accentLight,
      borderRadius: 12,
      padding: 14,
      borderLeftWidth: 3,
      borderLeftColor: theme.colors.border,
    },
    urgentText: {
      fontSize: 14,
      color: theme.colors.text,
      lineHeight: 20,
    },
    differentialBlock: {
      marginBottom: 16,
    },
  });
