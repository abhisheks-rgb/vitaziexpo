// File: AIAssistant/components/ChatBubble/styles.ts

import { Dimensions, StyleSheet } from 'react-native';

import { type Theme } from '../../../../theme';

const { width: SCREEN_W } = Dimensions.get('window');
const MAX_BUBBLE_W = SCREEN_W * 0.72;

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    rowUser: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      marginBottom: 10,
      paddingHorizontal: 16,
    },
    rowAssistant: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      marginBottom: 10,
      paddingHorizontal: 16,
      gap: 8,
    },
    robotIconWrap: {
      width: 35,
      height: 35,
      borderRadius: 50,
      backgroundColor: theme.colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 2,
      flexShrink: 0,
      borderColor: theme.colors.limeAccent,
      borderWidth: 2,
    },
    robotIcon: {
      fontSize: 14,
    },
    bubbleUser: {
      maxWidth: MAX_BUBBLE_W,
      backgroundColor: '#1B2B4B',
      borderRadius: 18,
      borderBottomRightRadius: 4,
      paddingHorizontal: 14,
      paddingVertical: 10,
    },
    bubbleAssistant: {
      maxWidth: MAX_BUBBLE_W,
      backgroundColor: theme.colors.background,
      borderRadius: 18,
      borderBottomLeftRadius: 4,
      paddingHorizontal: 14,
      paddingVertical: 10,
      shadowColor: '#000',
      shadowOpacity: 0.06,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 2 },
      elevation: 2,
    },
    textUser: {
      fontSize: 14,
      color: '#fff',
      lineHeight: 20,
    },
    textAssistant: {
      fontSize: 14,
      color: theme.colors.text,
      lineHeight: 20,
    },
    dateSeparatorWrap: {
      alignItems: 'center',
      marginVertical: 14,
    },
    dateSeparatorText: {
      fontSize: 12,
      color: theme.colors.primary,
      fontWeight: '500',
    },
  });
