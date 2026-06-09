// File: components/ReportTabs/styles.ts

import { StyleSheet } from 'react-native';

import type { Theme } from '../../../../theme';

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    tabBarInner: {
      flexDirection: 'row',
    },
    tabBarItem: {
      paddingVertical: 10,
      paddingHorizontal: 2,
      marginRight: 22,
      position: 'relative',
    },
    tabBarText: {
      fontSize: 15,
      color: theme.colors.textMuted,
      fontWeight: '500',
    },
    tabBarTextActive: {
      color: theme.colors.text,
      fontWeight: '700',
    },
    tabBarUnderline: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: 2.5,
      borderRadius: 2,
      backgroundColor: theme.colors.text,
    },
    divider: {
      height: 1,
      backgroundColor: theme.colors.border,
      opacity: 0.3,
      marginBottom: 4,
    },
  });
