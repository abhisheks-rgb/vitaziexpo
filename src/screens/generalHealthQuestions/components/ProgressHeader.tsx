import { StyleSheet, Text, View } from 'react-native';

import { useTheme, type Theme } from '../../../theme';

const RADIUS_PILL = 100;

interface Props {
  title: string;
  currentStep: number; // 1-based
  totalSteps: number;
  stepLabel: string; // e.g. "1 out of 4"
}

export function ProgressHeader({ title, currentStep, totalSteps, stepLabel }: Props) {
  const theme = useTheme();
  const styles = createStyles(theme);
  const progressFraction = currentStep / totalSteps;

  return (
    <>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{title}</Text>
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressRow}>
          <View />
          <Text style={styles.progressLabel}>{stepLabel}</Text>
        </View>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${progressFraction * 100}%` }]} />
        </View>
      </View>
    </>
  );
}

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    header: {
      paddingHorizontal: theme.spacing.md,
      paddingTop: theme.spacing.md,
      paddingBottom: theme.spacing.sm,
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: '700',
      color: theme.colors.text,
      letterSpacing: -0.3,
    },
    progressContainer: {
      paddingHorizontal: theme.spacing.md,
      paddingBottom: theme.spacing.md,
    },
    progressRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: theme.spacing.xs,
    },
    progressLabel: {
      fontSize: 12,
      fontWeight: '500',
      color: theme.colors.textMuted,
    },
    progressTrack: {
      height: 5,
      backgroundColor: theme.colors.border,
      borderRadius: RADIUS_PILL,
      overflow: 'hidden',
    },
    progressFill: {
      height: '100%',
      backgroundColor: theme.colors.primary,
      borderRadius: RADIUS_PILL,
    },
  });
