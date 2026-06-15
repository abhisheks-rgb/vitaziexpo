import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { useTheme, type Theme } from '../../../theme';

const RADIUS_PILL = 100;

interface Props {
  label: string;
  onPress: () => void;
  isLoading?: boolean;
}

export function NextButton({ label, onPress, isLoading = false }: Props) {
  const theme = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, isLoading && styles.buttonDisabled]}
        onPress={onPress}
        disabled={isLoading}
        activeOpacity={0.85}
        accessibilityRole="button"
        accessibilityLabel={label}
        accessibilityState={{ disabled: isLoading }}
      >
        {isLoading ? (
          <ActivityIndicator color={theme.colors.accentLight} />
        ) : (
          <>
            <Text style={styles.label}>{label}</Text>
            <Text style={styles.icon}>{' ›'}</Text>
          </>
        )}
      </TouchableOpacity>
    </View>
  );
}

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      paddingHorizontal: theme.spacing.md,
      paddingBottom: theme.spacing.xl,
      paddingTop: theme.spacing.md,
      backgroundColor: theme.colors.background,
    },
    button: {
      backgroundColor: theme.colors.primary,
      borderRadius: RADIUS_PILL,
      paddingVertical: theme.spacing.md,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 2,
      borderColor: theme.colors.primary,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 4,
    },
    buttonDisabled: {
      opacity: 0.6,
    },
    label: {
      fontSize: 15,
      fontWeight: '700',
      color: theme.colors.accentLight,
      letterSpacing: 0.2,
    },
    icon: {
      marginLeft: theme.spacing.xs,
      fontSize: 15,
      fontWeight: '700',
      color: theme.colors.accentLight,
    },
  });
