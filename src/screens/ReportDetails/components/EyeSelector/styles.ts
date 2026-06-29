// File: components/EyeSelector/styles.ts

import { StyleSheet } from 'react-native';

const NAVY = '#1B2B4B';
export const EYE_PILL_H = 48;

export const createStyles = () =>
  StyleSheet.create({
    container: {
      position: 'absolute',
      bottom: -(EYE_PILL_H / 2),
      left: 20,
      right: 20,
      zIndex: 20,
      alignItems: 'center',
    },
    pill: {
      flexDirection: 'row',
      width: '100%',
      height: EYE_PILL_H,
      backgroundColor: '#fff',
      borderRadius: EYE_PILL_H / 2,
      padding: 4,
      shadowColor: '#000',
      shadowOpacity: 0.14,
      shadowRadius: 16,
      shadowOffset: { width: 0, height: 4 },
      elevation: 10,
    },
    option: {
      flex: 1,
      borderRadius: EYE_PILL_H / 2,
      alignItems: 'center',
      justifyContent: 'center',
    },
    optionActive: {
      backgroundColor: NAVY,
    },
    optionText: {
      fontSize: 15,
      fontWeight: '600',
      color: '#9CA3AF',
    },
    optionTextActive: {
      color: '#fff',
      fontWeight: '700',
    },
  });
