import { Dimensions, StyleSheet } from 'react-native';
import { Theme } from '../../theme';

const { width } = Dimensions.get('window');

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    screen: {
      flex: 1,
    },

    container: {
      flex: 1,
      paddingHorizontal: theme.spacing.lg,
      paddingBottom: theme.spacing.xl,
    },

    topBar: {
      height: 44,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
    },

    logo: {
      width: 120,
      height: 36,
    },

    skipButton: {
      position: 'absolute',
      right: 0,
      justifyContent: 'center',
      alignItems: 'center',
    },

    skip: {
      color: theme.colors.textMuted,
    },

    /**
     * Main content section
     */
    content: {
        flex: 1,
    },

    slide: {
        flex: 1,
        justifyContent: 'center',
    },

    imageWrap: {
        height: 300,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: theme.spacing.lg,
    },

    image: {
        width: width * 0.82,
        height: 280,
    },

    textWrap: {
        alignItems: 'center',
        marginTop: theme.spacing.xl,
        paddingHorizontal: 32,
    },

    title: {
        ...theme.typography.title,
        textAlign: 'center',
        color: theme.colors.text,
        maxWidth: 320,
    },

    subtitle: {
        ...theme.typography.body,
        textAlign: 'center',
        color: theme.colors.textMuted,
        marginTop: theme.spacing.md,
        maxWidth: 340,
        lineHeight: 26,
    },

    dots: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: theme.spacing.lg,
    },

    dot: {
      height: 6,
      borderRadius: theme.radius.full,
      marginHorizontal: theme.spacing.xs,
    },

    nav: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },

    back: {
      ...theme.typography.body,
      color: theme.colors.accent,
    },

    nextBtn: {
      borderWidth: 1,
      borderColor: theme.colors.accent,
      borderRadius: theme.radius.xl,
      paddingHorizontal: 28,
      paddingVertical: 12,
    },

    nextText: {
      ...theme.typography.button,
      color: theme.colors.accent,
    },
  });