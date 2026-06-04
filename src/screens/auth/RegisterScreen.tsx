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
import type { RegisterScreenProps } from '../../navigation/types';
import { useTheme } from '../../theme';
import { Colors } from '../../theme/colors';

import CardWithCutout from './components/CardWithCutout';
import { createStyles } from './styles/Register.styles';

export default function RegisterScreen({ navigation }: RegisterScreenProps) {
  const theme = useTheme();
  const styles = createStyles(theme);
  const { t } = useTranslation();
  const [orgId, setOrgId] = useState('');

  return (
    <View style={styles.screen}>
      {/* BACKGROUND */}
      <View style={StyleSheet.absoluteFill}>
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
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {/* CONTENT */}
            <SafeAreaView edges={['top']} style={styles.heroInner}>
              <AppHeader showLogo logoPosition="center" />

              <View style={styles.heroText}>
                <GradientText text={t('connectClinic.title')} style={styles.heroTitle} />
                <AppText variant="caption" style={styles.heroSubtitle}>
                  {t('connectClinic.subtitle')}
                </AppText>
              </View>
            </SafeAreaView>

            {/* SCAN BUTTON */}
            <View style={styles.scanAbsolute}>
              <TouchableOpacity
                onPress={() => navigation.navigate('QRScanner', { source: 'register' })}
                activeOpacity={0.85}
                style={styles.scanBtn}
              >
                <AppImage
                  source={AppImages.scanQRTextIcon}
                  containerStyle={styles.scanIcon}
                  showLoader={false}
                />
              </TouchableOpacity>
            </View>
            {/* ── Card with transparent cut-out notch ── */}
            <CardWithCutout>
              <AppText variant="caption" style={styles.label}>
                {t('orgIdLabel')}
              </AppText>

              <TextInput
                style={styles.input}
                placeholder={t('orgIdPlaceholder')}
                placeholderTextColor={theme.colors.textMuted}
                autoCapitalize="characters"
                value={orgId}
                onChangeText={setOrgId}
              />

              <TouchableOpacity
                style={styles.btnPrimary}
                onPress={() => navigation.navigate('ConnectClinic', { orgId })}
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
                <TouchableOpacity>
                  <View style={styles.footerIconText}>
                    <AppImage
                      source={AppImages.needHelp}
                      containerStyle={{ width: 24, height: 24 }}
                    />
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
            </CardWithCutout>
          </ScrollView>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </View>
  );
}
