// File: Education/components/ImagesToggle/styles.ts

import { StyleSheet } from 'react-native';
import type { Theme } from '../../../../theme';

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      marginBottom: 16,
      gap: 10,
    },
    track: {
      width: 44,
      height: 26,
      borderRadius: 13,
      padding: 3,
      justifyContent: 'center',
    },
    trackOn: {
      backgroundColor: '#1B2B4B',
    },
    trackOff: {
      backgroundColor: theme.colors.border,
    },
    thumb: {
      width: 20,
      height: 20,
      borderRadius: 10,
      backgroundColor: '#fff',
    },
    thumbOn: {
      alignSelf: 'flex-end',
    },
    thumbOff: {
      alignSelf: 'flex-start',
    },
    label: {
      fontSize: 15,
      fontWeight: '600',
      color: theme.colors.text,
    },
  });
