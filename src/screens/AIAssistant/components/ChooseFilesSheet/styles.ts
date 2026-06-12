// File: AIAssistant/components/ChooseFilesSheet/styles.ts

import { Dimensions, StyleSheet } from 'react-native';

import type { Theme } from '../../../../theme';

const { width: SCREEN_W } = Dimensions.get('window');
const PHOTO_SIZE = (SCREEN_W - 40 - 16) / 3;

export { PHOTO_SIZE };

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    overlay: {
      ...StyleSheet.absoluteFill,
      backgroundColor: 'rgba(0,0,0,0.35)',
      justifyContent: 'flex-end',
      zIndex: 100,
    },
    sheet: {
      backgroundColor: theme.colors.background,
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      paddingBottom: 32,
    },
    handle: {
      width: 36,
      height: 4,
      borderRadius: 2,
      backgroundColor: theme.colors.border,
      alignSelf: 'center',
      marginTop: 12,
      marginBottom: 16,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 20,
      marginBottom: 8,
    },
    headerTitle: {
      flex: 1,
      fontSize: 16,
      fontWeight: '700',
      color: theme.colors.textPrimary,
    },
    confirmBtn: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: '#1B2B4B',
      alignItems: 'center',
      justifyContent: 'center',
    },
    confirmIcon: { fontSize: 14, color: '#fff' },
    permissionText: {
      fontSize: 12,
      color: theme.colors.textSecondary,
      paddingHorizontal: 20,
      marginBottom: 14,
      lineHeight: 18,
    },
    permissionLink: {
      fontWeight: '700',
      color: '#1B2B4B',
    },
    grid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      paddingHorizontal: 20,
      gap: 8,
    },
    photoWrap: {
      width: PHOTO_SIZE,
      height: PHOTO_SIZE,
      borderRadius: 10,
      overflow: 'hidden',
      backgroundColor: theme.colors.surface,
    },
    photoSelected: {
      borderWidth: 3,
      borderColor: '#1B2B4B',
    },
    selectedBadge: {
      position: 'absolute',
      top: 5,
      right: 5,
      width: 20,
      height: 20,
      borderRadius: 10,
      backgroundColor: '#1B2B4B',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 5,
    },
    selectedBadgeText: { fontSize: 10, color: '#fff', fontWeight: '700' },
  });
