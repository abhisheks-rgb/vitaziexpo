import { Ionicons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { SafeAreaView } from 'react-native-safe-area-context';

import AppHeader from '../../components/AppHeader';
import AppImage from '../../components/AppImage';
import AppText from '../../components/AppText';
import GradientText from '../../components/GradientText';
import { AppImages } from '../../constants';
import type { TwoFASetupScreenProps } from '../../navigation/types';
import { useAuthStore } from '../../state/store/authStore';
import { useTheme } from '../../theme';
import { Colors } from '../../theme/colors';
import { Radius } from '../../theme/radius';
import { Spacing } from '../../theme/spacing';

export default function TwoFASetupScreen({ navigation, route }: TwoFASetupScreenProps) {
  const theme = useTheme();
  const { secret, qrCode, session, user } = route.params;

  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleContinue = () => {
    setIsLoading(true);
    useAuthStore.getState().setSession(session, user);
  };

  const handleSkip = () => {
    setIsLoading(true);
    useAuthStore.getState().setSession(session, user);
  };

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(secret);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const styles = createStyles(theme);

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
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
            <GradientText text="Setup Two-Factor Auth" style={styles.heroTitle} />
            <AppText variant="caption" style={styles.heroSubtitle}>
              Secure your account using an authenticator app
            </AppText>
          </View>
        </SafeAreaView>
      </View>

      <View style={styles.card}>
        <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
          <AppText variant="caption" style={styles.helperText}>
            1. Download Google Authenticator, Authy, or any other authenticator app.
          </AppText>
          
          <AppText variant="caption" style={styles.helperText}>
            2. Scan the QR code below using your app.
          </AppText>

          <View style={styles.qrContainer}>
            <QRCode
              value={qrCode}
              size={180}
              backgroundColor={Colors.white}
              color={Colors.navyDark}
            />
          </View>

          <AppText variant="caption" style={styles.helperText}>
            Or enter this setup key manually:
          </AppText>
          
          <TouchableOpacity
            style={styles.secretBox}
            activeOpacity={0.7}
            onPress={copyToClipboard}
          >
            <AppText variant="body" style={styles.secretText}>
              {secret}
            </AppText>
            <View style={styles.copyContainer}>
              <Ionicons 
                name={copied ? "checkmark-circle" : "copy-outline"} 
                size={20} 
                color={copied ? Colors.success : Colors.navyDark} 
              />
              {copied && <AppText variant="caption" style={styles.copiedText}>Copied!</AppText>}
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.btnPrimary, isLoading && { opacity: 0.6 }]}
            onPress={handleContinue}
            disabled={isLoading}
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
                  I've set it up
                </AppText>
              )}
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.btnSecondary, isLoading && { opacity: 0.6 }]}
            onPress={handleSkip}
            disabled={isLoading}
            activeOpacity={0.85}
          >
            <AppText variant="button" color={Colors.navyDark}>
              Skip for now
            </AppText>
          </TouchableOpacity>

          <TouchableOpacity style={styles.backRow} onPress={() => navigation.goBack()}>
            <AppText variant="caption" color={Colors.navyDark} style={styles.backText}>
              ← Back to login
            </AppText>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}

const createStyles = (theme: any) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: theme.colors.gradientStart,
    },
    heroContainer: {
      flex: 0.7,
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
    card: {
      backgroundColor: Colors.white,
      borderTopLeftRadius: Radius.xl,
      borderTopRightRadius: Radius.xl,
      paddingHorizontal: Spacing.md,
      paddingTop: Spacing.md,
      paddingBottom: Spacing.lg,
      flex: 2.5,
    },
    helperText: {
      color: '#6B7280',
      marginTop: Spacing.sm,
      lineHeight: 18,
    },
    qrContainer: {
      alignItems: 'center',
      marginVertical: Spacing.md,
      padding: Spacing.sm,
      backgroundColor: Colors.white,
      borderWidth: 1,
      borderColor: '#D0DAE8',
      borderRadius: Radius.md,
      alignSelf: 'center',
    },
    secretBox: {
      backgroundColor: '#F8FAFC',
      borderWidth: 1,
      borderColor: '#D0DAE8',
      borderRadius: Radius.md,
      paddingVertical: Spacing.md,
      paddingHorizontal: Spacing.md,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: Spacing.xs,
      marginBottom: Spacing.sm,
    },
    secretText: {
      fontWeight: '700',
      color: Colors.navyDark,
      letterSpacing: 1.5,
      flex: 1,
    },
    copyContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    copiedText: {
      color: Colors.success,
      fontSize: 12,
      fontWeight: '600',
    },
    btnPrimary: {
      marginTop: Spacing.md,
      borderRadius: Radius.lg,
      overflow: 'hidden',
    },
    btnGradient: {
      paddingVertical: 14,
      alignItems: 'center',
    },
    btnSecondary: {
      marginTop: Spacing.md,
      borderRadius: Radius.lg,
      paddingVertical: 14,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: Colors.navyDark,
    },
    backRow: {
      marginTop: Spacing.md,
      alignItems: 'center',
    },
    backText: {
      fontWeight: '600',
    },
  });
