// File: Education/components/EducationHeader/styles.ts

import { StyleSheet } from 'react-native';

import type { Theme } from '../../../../theme';

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 12,
    },
    title: {
      flex: 1,
      fontSize: 22,
      fontWeight: '800',
      color: theme.colors.textPrimary,
    },
    actions: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 16,
    },
    iconBtn: {
      width: 32,
      height: 32,
      alignItems: 'center',
      justifyContent: 'center',
    },
    iconText: {
      fontSize: 18,
      color: theme.colors.textPrimary,
    },
    activeIcon: {
      color: '#1B2B4B',
    },
  });
