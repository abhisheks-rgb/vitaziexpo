import { StyleSheet } from 'react-native';
import { Theme } from '../../../theme/theme';
import { Colors } from '../../../theme/colors';
import { Spacing } from '../../../theme/spacing';
import { Radius } from '../../../theme/radius';

const VIEWFINDER_SIZE = 240;
const CORNER_SIZE = 28;
const CORNER_THICKNESS = 3;

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: '#000',
    },

    noCamera: {
      backgroundColor: '#1a2a1a',
      alignItems: 'center',
      justifyContent: 'center',
    },

    overlay: {
      ...StyleSheet.absoluteFill,
      backgroundColor: 'rgba(0,0,0,0.35)',
    },

    safeArea: {
      flex: 1,
    },

   topBar: {
        height: 44,
        justifyContent: 'center',
        marginTop: Spacing.sm,
    },

    logoAbsolute: {
        position: 'absolute',
        left: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },

    logo: {
        height: 32,
        width: 120,
    },

    viewfinderWrap: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      gap: Spacing.md,
    },

    viewfinder: {
      width: VIEWFINDER_SIZE,
      height: VIEWFINDER_SIZE,
      overflow: 'hidden',
    },

    hint: {
      opacity: 0.8,
    },

    corner: {
      position: 'absolute',
      width: CORNER_SIZE,
      height: CORNER_SIZE,
      borderColor: Colors.limeGreen,
    },

    corner_tl: {
      top: 0,
      left: 0,
      borderTopWidth: CORNER_THICKNESS,
      borderLeftWidth: CORNER_THICKNESS,
      borderTopLeftRadius: 3,
    },

    corner_tr: {
      top: 0,
      right: 0,
      borderTopWidth: CORNER_THICKNESS,
      borderRightWidth: CORNER_THICKNESS,
      borderTopRightRadius: 3,
    },

    corner_bl: {
      bottom: 0,
      left: 0,
      borderBottomWidth: CORNER_THICKNESS,
      borderLeftWidth: CORNER_THICKNESS,
      borderBottomLeftRadius: 3,
    },

    corner_br: {
      bottom: 0,
      right: 0,
      borderBottomWidth: CORNER_THICKNESS,
      borderRightWidth: CORNER_THICKNESS,
      borderBottomRightRadius: 3,
    },

    scanLine: {
      position: 'absolute',
      left: 0,
      right: 0,
      height: 2,
      backgroundColor: Colors.limeGreen,
      opacity: 0.75,
    },

    bottomBar: {
      alignItems: 'center',
      paddingBottom: Spacing.xl,
    },

    rescanBtn: {
      width: 100,
      height: 100,
      borderRadius: Radius.full,
      borderWidth: 2.5,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });