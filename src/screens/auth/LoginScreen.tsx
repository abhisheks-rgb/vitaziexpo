import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import AppHeader from '../../components/AppHeader';
import AppImage from '../../components/AppImage';
import AppText from '../../components/AppText';
import GradientText from '../../components/GradientText';
import { AppImages } from '../../constants';
import { useTranslation } from '../../hooks/useTranslation';
import type { LoginScreenProps } from '../../navigation/types';
import { useTheme } from '../../theme';
import { Colors } from '../../theme/colors';

import { createStyles } from './styles/Login.styles';

export default function LoginScreen({ navigation }: LoginScreenProps) {
  const theme = useTheme();
  const styles = createStyles(theme);
  const { t } = useTranslation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    // KeyboardAvoidingView wraps everything so the card slides up on keyboard open
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Hero — sits behind, shrinks naturally as keyboard pushes card up */}
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
            <GradientText text={t('login.title')} style={styles.heroTitle} />

            <AppText variant="caption" style={styles.heroSubtitle}>
              {t('login.subtitle')}
            </AppText>
          </View>
        </SafeAreaView>
      </View>

      {/* Card — anchored to bottom, scrollable so fields stay visible */}
      <View style={styles.card}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          bounces={false}
        >
          <AppText variant="caption" style={styles.label}>
            {t('login.emailLabel')}
          </AppText>
          <TextInput
            style={styles.input}
            placeholder={t('login.emailPlaceholder')}
            placeholderTextColor={theme.colors.textMuted}
            keyboardType="email-address"
            autoCapitalize="none"
            returnKeyType="next"
            value={email}
            onChangeText={setEmail}
          />

          <AppText variant="caption" style={[styles.label, styles.labelGap]}>
            {t('login.passwordLabel')}
          </AppText>
          <View style={styles.inputRow}>
            <TextInput
              style={[styles.input, styles.inputFlex]}
              placeholder={t('login.passwordPlaceholder')}
              placeholderTextColor={theme.colors.textMuted}
              secureTextEntry={!showPassword}
              returnKeyType="done"
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity style={styles.eyeBtn} onPress={() => setShowPassword((v) => !v)}>
              <AppText variant="caption" color={Colors.muted}>
                {showPassword ? '🙈' : '👁'}
              </AppText>
            </TouchableOpacity>
          </View>

          <View style={styles.row}>
            <TouchableOpacity style={styles.checkRow} onPress={() => setRememberMe((v) => !v)}>
              <View style={[styles.checkbox, rememberMe && styles.checkboxActive]}>
                {rememberMe && (
                  <AppText variant="caption" color={Colors.white} style={styles.checkMark}>
                    ✓
                  </AppText>
                )}
              </View>
              <AppText variant="caption" style={styles.rememberText}>
                {t('login.rememberMe')}
              </AppText>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                /* TODO: ForgotPassword screen */
              }}
            >
              <AppText variant="caption" color={Colors.navyDark} style={styles.forgot}>
                {t('login.forgotPassword')}
              </AppText>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.btnPrimary}
            onPress={() => navigation.navigate('App')} // valid: CompositeScreenProps includes RootStackParamList
            activeOpacity={0.85}
          >
            <LinearGradient
              colors={[Colors.navyDark, Colors.primaryGradientEnd]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.btnGradient}
            >
              <AppText variant="button" color={Colors.white}>
                {t('continue')}
              </AppText>
            </LinearGradient>
          </TouchableOpacity>

          <View style={[styles.row, styles.footerLinks]}>
            <TouchableOpacity
              onPress={() => {
                /* TODO: NeedHelp modal */
              }}
            >
              <View style={styles.footerIconText}>
                <AppImage source={AppImages.needHelp} containerStyle={{ width: 24, height: 24 }} />
                <AppText variant="caption" color={Colors.navyDark}>
                  {t('needHelp')}
                </AppText>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <View style={styles.footerIconText}>
                <AppImage
                  source={AppImages.haveAccount}
                  containerStyle={{ width: 24, height: 24 }}
                />
                <AppText variant="caption" color={Colors.navyDark}>
                  {t('haveAccount')}
                </AppText>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}
