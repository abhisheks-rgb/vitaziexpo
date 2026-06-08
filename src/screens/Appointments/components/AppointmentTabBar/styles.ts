// File: Appointments/components/AppointmentTabBar/styles.ts

import { StyleSheet } from 'react-native';
import type { Theme } from '../../../../theme';

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      backgroundColor: '#EBF0F7',
      borderRadius: 50, // full pill container
      padding: 4,
      marginHorizontal: 16,
      marginBottom: 16,
    },
    tab: {
      flex: 1,
      paddingVertical: 12,
      borderRadius: 50, // full pill tab
      alignItems: 'center',
      justifyContent: 'center',
    },
    tabActive: {
      backgroundColor: '#1B2B4B',
    },
    tabText: {
      fontSize: 15,
      fontWeight: '600',
      color: '#1B2B4B',
    },
    tabTextActive: {
      color: '#FFFFFF',
      fontWeight: '700',
    },
  });
