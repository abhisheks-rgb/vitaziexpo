import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import {
  Image,
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
import AppText from '../../components/AppText';
import GradientText from '../../components/GradientText';
import { AppImages } from '../../constants';
import { useTranslation } from '../../hooks/useTranslation';
import type { CompleteFormScreenProps } from '../../navigation/types';
import { useTheme } from '../../theme';
import { Colors } from '../../theme/colors';
import { Spacing } from '../../theme/spacing';

import { createStyles } from './styles/CompleteForm.styles';

interface FormState {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  password: string;
  confirmPassword: string;
  consentGiven: boolean;
}

export default function CompleteFormScreen({ navigation, route }: CompleteFormScreenProps) {
  const theme = useTheme();
  const styles = createStyles(theme);
  const { t } = useTranslation();

  const { orgId } = route.params;

  const [completeForm, setCompleteForm] = useState<FormState>({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    password: '',
    confirmPassword: '',
    consentGiven: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const update = (key: keyof FormState) => (value: string) =>
    setCompleteForm((prev) => ({ ...prev, [key]: value }));

  const handleDateInput = (text: string) => {
    const digits = text.replace(/\D/g, '').slice(0, 8);
    let formatted = digits;
    if (digits.length > 4)
      {formatted = `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;}
    else if (digits.length > 2) {formatted = `${digits.slice(0, 2)}/${digits.slice(2)}`;}
    setCompleteForm((prev) => ({ ...prev, dateOfBirth: formatted }));
  };

  const isValid =
    completeForm.firstName.trim().length > 0 &&
    completeForm.lastName.trim().length > 0 &&
    completeForm.dateOfBirth.length === 10 &&
    completeForm.password.length >= 8 &&
    completeForm.password === completeForm.confirmPassword &&
    completeForm.consentGiven;

  const handleSubmit = () => {
    if (!isValid) {return;}
    // TODO: call completeRegistration use case here.
    // After successful registration, the user is authenticated but
    // has not yet answered the health questionnaire, so we go there next.
    // replace() so the back button doesn't return to the form.
    navigation.replace('GeneralHealthQuestions');
  };

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.heroContainer}>
        <Image source={AppImages.eyeHero} style={StyleSheet.absoluteFill} resizeMode="cover" />
        <LinearGradient
          colors={[
            theme.colors.gradientStart,
            `${theme.colors.gradientStart}CC`,
            `${theme.colors.gradientStart}44`,
          ]}
          style={StyleSheet.absoluteFill}
        />
        <SafeAreaView edges={['top']} style={styles.heroInner}>
          <AppHeader
            showBackButton
            showLogo
            logoPosition="center"
            onBackPress={() => navigation.goBack()}
          />
          <View style={styles.heroText}>
            <GradientText text={t('completeForm.title')} style={styles.heroTitle} />
            <AppText variant="caption" style={styles.heroSubtitle}>
              {t('completeForm.subtitle')}
            </AppText>
          </View>
        </SafeAreaView>
      </View>

      <View style={styles.card}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          bounces={false}
        >
          <AppText variant="caption" style={styles.label}>
            {t('completeForm.firstName')}
          </AppText>
          <TextInput
            style={styles.input}
            placeholder={t('completeForm.firstNamePlaceholder')}
            value={completeForm.firstName}
            onChangeText={update('firstName')}
            autoCapitalize="words"
            returnKeyType="next"
          />

          <AppText variant="caption" style={[styles.label, styles.labelGap]}>
            {t('completeForm.lastName')}
          </AppText>
          <TextInput
            style={styles.input}
            placeholder={t('completeForm.lastNamePlaceholder')}
            value={completeForm.lastName}
            onChangeText={update('lastName')}
            autoCapitalize="words"
            returnKeyType="next"
          />

          <AppText variant="caption" style={[styles.label, styles.labelGap]}>
            {t('completeForm.dob')}
          </AppText>
          <View style={styles.inputRow}>
            <TextInput
              style={[styles.input, styles.inputFlex]}
              placeholder={t('completeForm.dobPlaceholder')}
              value={completeForm.dateOfBirth}
              onChangeText={handleDateInput}
              maxLength={10}
            />
            <View style={styles.inputSuffix}>
              <AppText variant="caption" color={Colors.muted}>
                📅
              </AppText>
            </View>
          </View>

          <AppText variant="caption" style={[styles.label, styles.labelGap]}>
            {t('completeForm.password')}
          </AppText>
          <View style={styles.inputRow}>
            <TextInput
              style={[styles.input, styles.inputFlex]}
              placeholder={t('completeForm.passwordPlaceholder')}
              secureTextEntry={!showPassword}
              value={completeForm.password}
              onChangeText={update('password')}
              returnKeyType="next"
            />
            <TouchableOpacity style={styles.inputSuffix} onPress={() => setShowPassword((v) => !v)}>
              <AppText variant="caption" color={Colors.muted}>
                {showPassword ? '🙈' : '👁'}
              </AppText>
            </TouchableOpacity>
          </View>

          <AppText variant="caption" style={[styles.label, styles.labelGap]}>
            {t('completeForm.confirmPassword')}
          </AppText>
          <View style={styles.inputRow}>
            <TextInput
              style={[styles.input, styles.inputFlex]}
              placeholder={t('completeForm.confirmPasswordPlaceholder')}
              secureTextEntry={!showConfirm}
              value={completeForm.confirmPassword}
              onChangeText={update('confirmPassword')}
              returnKeyType="done"
            />
            <TouchableOpacity style={styles.inputSuffix} onPress={() => setShowConfirm((v) => !v)}>
              <AppText variant="caption" color={Colors.muted}>
                {showConfirm ? '🙈' : '👁'}
              </AppText>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.consentBox}
            onPress={() =>
              setCompleteForm((prev) => ({ ...prev, consentGiven: !prev.consentGiven }))
            }
            activeOpacity={0.8}
          >
            <View style={[styles.checkbox, completeForm.consentGiven && styles.checkboxActive]}>
              {completeForm.consentGiven && (
                <AppText variant="caption" color={Colors.white} style={styles.checkMark}>
                  ✓
                </AppText>
              )}
            </View>
            <AppText variant="caption" style={styles.consentText}>
              {t('completeForm.consent')}
            </AppText>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.btnPrimary, !isValid && styles.btnDisabled]}
            onPress={handleSubmit}
            activeOpacity={isValid ? 0.85 : 1}
          >
            <LinearGradient
              colors={
                isValid ? [Colors.navyDark, Colors.primaryGradientEnd] : ['#9CA3AF', '#9CA3AF']
              }
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.btnGradient}
            >
              <AppText variant="button" color={Colors.white}>
                {t('submit')}
              </AppText>
            </LinearGradient>
          </TouchableOpacity>
          <View style={{ height: Spacing.xl }} />
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}
