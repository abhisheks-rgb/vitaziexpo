import { LinearGradient } from 'expo-linear-gradient';
import { useRef, useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { enableTwoFAUseCase } from '../../application/useCases/EnableTwoFAUseCase';
import AppHeader from '../../components/AppHeader';
import AppImage from '../../components/AppImage';
import AppText from '../../components/AppText';
import GradientText from '../../components/GradientText';
import { AppImages } from '../../constants';
import type { TwoFAEnableScreenProps } from '../../navigation/types';
import { useAuthStore } from '../../state/store/authStore';
import { useTheme } from '../../theme';
import { Colors } from '../../theme/colors';
import { Radius } from '../../theme/radius';
import { Spacing } from '../../theme/spacing';

const CODE_LENGTH = 6;

export default function TwoFAEnableScreen({ navigation, route }: TwoFAEnableScreenProps) {
  const theme = useTheme();
  const { session, user } = route.params;

  // One state string for the full 6-digit code; individual boxes are derived from it
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Single hidden TextInput drives all digit boxes
  const inputRef = useRef<TextInput>(null);

  const digits = code.padEnd(CODE_LENGTH, ' ').split('');

  const handleVerify = async () => {
    setError('');
    if (code.length !== CODE_LENGTH) {
      setError('Please enter all 6 digits.');
      return;
    }
    setIsLoading(true);
    try {
      await enableTwoFAUseCase({ accessToken: session.accessToken, verificationCode: code });
      
      // Successfully enabled! Log the user in now.
      useAuthStore.getState().setSession(session, user);
      // RootNavigator reacts to session being set — no manual navigate needed
    } catch (e: any) {
      setError(e.message ?? 'Verification failed. Please try again.');
      setCode('');
      inputRef.current?.focus();
    } finally {
      setIsLoading(false);
    }
  };

  const styles = createStyles(theme);

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* ── Hero (same pattern as LoginScreen) ─────────────────────── */}
      <View style={styles.heroContainer}>
        <AppImage
          source={AppImages.eyeHero}
          containerStyle={StyleSheet.absoluteFill}
          contentFit="cover"
          showLoader={false}
        />
        <LinearGradient
          colors={[
            theme.colors.gradientStart,
            `${theme.colors.gradientStart}CC`,
            `${theme.colors.gradientStart}44`,
          ]}
          style={StyleSheet.absoluteFill}
        />
        <SafeAreaView edges={['top']} style={styles.heroInner}>
          <AppHeader showLogo logoPosition="center" />
          <View style={styles.heroText}>
            <GradientText text="Enable Two-Factor Auth" style={styles.heroTitle} />
            <AppText variant="caption" style={styles.heroSubtitle}>
              Enter the 6-digit code from your authenticator app
            </AppText>
          </View>
        </SafeAreaView>
      </View>

      {/* ── Card ───────────────────────────────────────────────────── */}
      <View style={styles.card}>
        <AppText variant="caption" style={styles.label}>
          Verification Code
        </AppText>

        {/* Digit boxes — tap anywhere to open the hidden input */}
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => inputRef.current?.focus()}
          style={styles.boxRow}
          accessible={false}
        >
          {digits.map((d, i) => {
            const isFocused = i === code.length && i < CODE_LENGTH;
            return (
              <View
                key={i}
                style={[
                  styles.digitBox,
                  isFocused && styles.digitBoxFocused,
                  error && styles.digitBoxError,
                ]}
              >
                <AppText variant="body" style={styles.digitText}>
                  {d.trim()}
                </AppText>
                {isFocused && <View style={styles.cursor} />}
              </View>
            );
          })}
        </TouchableOpacity>

        {/* Hidden real input */}
        <TextInput
          ref={inputRef}
          value={code}
          onChangeText={(v) => {
            setError('');
            // Allow only digits, max 6 chars
            const clean = v.replace(/\D/g, '').slice(0, CODE_LENGTH);
            setCode(clean);
            if (clean.length === CODE_LENGTH) {
              // Auto-submit when all digits entered
              setTimeout(() => {
                handleVerify();
              }, 120);
            }
          }}
          keyboardType="number-pad"
          maxLength={CODE_LENGTH}
          style={styles.hiddenInput}
          autoFocus
          accessible
          accessibilityLabel="Enter 6-digit verification code"
        />

        {error ? (
          <AppText variant="caption" style={styles.errorText}>
            {error}
          </AppText>
        ) : null}

        <AppText variant="caption" style={styles.helperText}>
          Open Google Authenticator, Authy, or your preferred app to find the code for{' '}
          <AppText variant="caption" style={styles.emailHighlight}>
            {user.email}
          </AppText>
          .
        </AppText>

        {/* Verify button */}
        <TouchableOpacity
          style={[
            styles.btnPrimary,
            (isLoading || code.length !== CODE_LENGTH) && { opacity: 0.6 },
          ]}
          onPress={handleVerify}
          disabled={isLoading || code.length !== CODE_LENGTH}
          activeOpacity={0.85}
        >
          <LinearGradient
            colors={[Colors.navyDark, Colors.primaryGradientEnd]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.btnGradient}
          >
            {isLoading ? (
              <ActivityIndicator color={Colors.white} />
            ) : (
              <AppText variant="button" color={Colors.white}>
                Verify & Enable
              </AppText>
            )}
          </LinearGradient>
        </TouchableOpacity>

        {/* Back to setup */}
        <TouchableOpacity style={styles.backRow} onPress={() => navigation.goBack()}>
          <AppText variant="caption" color={Colors.navyDark} style={styles.backText}>
            ← Back to setup
          </AppText>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────

const createStyles = (theme: any) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: theme.colors.gradientStart,
    },
    heroContainer: {
      flex: 1,
    },
    heroInner: {
      flex: 1,
      paddingHorizontal: Spacing.md,
    },
    heroText: {
      marginTop: Spacing.md,
    },
    heroTitle: {
      fontSize: 28,
      lineHeight: 32,
      fontWeight: '500',
    },
    heroSubtitle: {
      color: Colors.white,
      marginTop: Spacing.xs,
    },

    // Card — same shape as Login
    card: {
      backgroundColor: Colors.white,
      borderTopLeftRadius: Radius.xl,
      borderTopRightRadius: Radius.xl,
      paddingHorizontal: Spacing.md,
      paddingTop: Spacing.md,
      paddingBottom: Spacing.lg,
    },

    label: {
      color: Colors.navyDark,
      fontWeight: '600',
      marginBottom: Spacing.sm,
    },

    // OTP digit boxes
    boxRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: Spacing.xs,
    },
    digitBox: {
      flex: 1,
      aspectRatio: 1,
      maxWidth: 52,
      borderWidth: 1.5,
      borderColor: '#D0DAE8',
      borderRadius: Radius.md,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#F8FAFC',
      position: 'relative',
    },
    digitBoxFocused: {
      borderColor: Colors.primaryGradientEnd,
      backgroundColor: Colors.white,
    },
    digitBoxError: {
      borderColor: '#DC2626',
      backgroundColor: '#FFF5F5',
    },
    digitText: {
      fontSize: 22,
      fontWeight: '700',
      color: Colors.navyDark,
      lineHeight: 28,
    },
    // Blinking-cursor illusion for the active box
    cursor: {
      position: 'absolute',
      bottom: 8,
      width: 2,
      height: 16,
      backgroundColor: Colors.primaryGradientEnd,
      borderRadius: 1,
    },

    // The real input is positioned off-screen but still receives focus/events
    hiddenInput: {
      position: 'absolute',
      width: 1,
      height: 1,
      opacity: 0,
    },

    errorText: {
      color: '#DC2626',
      marginTop: Spacing.sm,
    },
    helperText: {
      color: '#6B7280',
      marginTop: Spacing.sm,
      lineHeight: 18,
    },
    emailHighlight: {
      color: Colors.navyDark,
      fontWeight: '600',
    },

    // Verify button — identical pattern to Login's btnPrimary
    btnPrimary: {
      marginTop: Spacing.md,
      borderRadius: Radius.lg,
      overflow: 'hidden',
    },
    btnGradient: {
      paddingVertical: 14,
      alignItems: 'center',
    },

    backRow: {
      marginTop: Spacing.md,
      alignItems: 'center',
    },
    backText: {
      fontWeight: '600',
    },
  });
