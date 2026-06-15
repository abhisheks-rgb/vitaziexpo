import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  useWindowDimensions,
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
import { createStyles, getCardTop } from './styles/Register.styles';

export default function RegisterScreen({ navigation }: RegisterScreenProps) {
  const theme = useTheme();
  const { height: screenHeight } = useWindowDimensions();
  const cardTop = getCardTop(screenHeight);
  const styles = createStyles(theme, cardTop);
  const { t } = useTranslation();
  const [orgId, setOrgId] = useState('');

  const scanButtonNode = (
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
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.screen}>
        {/* ── BACKGROUND ── fills entire screen always */}
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

        {/* ── HERO ── absolutely positioned, never moves with keyboard */}
        <SafeAreaView edges={['top']} style={styles.heroInner} pointerEvents="none">
          <AppHeader showLogo logoPosition="center" />
          <View style={styles.heroText}>
            <GradientText text={t('register.title')} style={styles.heroTitle} />
            <AppText variant="caption" style={styles.heroSubtitle}>
              {t('register.subtitle')}
            </AppText>
          </View>
        </SafeAreaView>

        {/*
          ── KEYBOARD AVOIDING WRAPPER ──
          Fills full screen so KAV knows the total available height.
          behavior="padding" adds bottom padding equal to keyboard height,
          pushing the card (justified to flex-end) upward as keyboard opens.
          pointerEvents="box-none" lets taps pass through to the hero behind it.
        */}
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={[StyleSheet.absoluteFill, { justifyContent: 'flex-end' }]}
          pointerEvents="box-none"
        >
          <CardWithCutout cardTop={cardTop} scanButton={scanButtonNode}>
            <AppText variant="caption" style={styles.label}>
              {t('orgIdLabel')}
            </AppText>

            <TextInput
              style={styles.input}
              placeholder={t('orgIdPlaceholder')}
              placeholderTextColor={theme.colors.textSecondary}
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
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
}
