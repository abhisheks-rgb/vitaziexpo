import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
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
import type { ConnectClinicScreenProps } from '../../navigation/types';
import { useTheme } from '../../theme';
import { Colors } from '../../theme/colors';

import CardWithCutout from './components/CardWithCutout';
import { createStyles, getCardTop } from './styles/ConnectClinic.styles';

export default function ConnectClinicScreen({ navigation, route }: ConnectClinicScreenProps) {
  const theme = useTheme();
  const { height: screenHeight } = useWindowDimensions();
  const cardTop = getCardTop(screenHeight);
  const styles = createStyles(theme, cardTop);
  const { t } = useTranslation();

  const orgId = route?.params?.orgId ?? '';

  // Staggered content reveal — each item fades + slides up after card arrives
  const fadeAnims = [
    useRef(new Animated.Value(0)).current, // org ID label + box
    useRef(new Animated.Value(0)).current, // continue button
    useRef(new Animated.Value(0)).current, // footer
  ];
  const slideAnims = fadeAnims.map(() => useRef(new Animated.Value(12)).current);

  useEffect(() => {
    const animations = fadeAnims.map((fade, i) =>
      Animated.parallel([
        Animated.timing(fade, {
          toValue: 1,
          duration: 280,
          delay: 180 + i * 80, // stagger: 180ms, 260ms, 340ms after mount
          useNativeDriver: true,
        }),
        Animated.timing(slideAnims[i], {
          toValue: 0,
          duration: 280,
          delay: 180 + i * 80,
          useNativeDriver: true,
        }),
      ]),
    );
    Animated.parallel(animations).start();
  }, []);

  const animatedStyle = (index: number) => ({
    opacity: fadeAnims[index],
    transform: [{ translateY: slideAnims[index] }],
  });

  const scanButtonNode = (
    <TouchableOpacity
      onPress={() => navigation.navigate('QRScanner', { source: 'connectClinic' })}
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
        {/* ── BACKGROUND ── */}
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

        {/* ── HERO ── */}
        <SafeAreaView edges={['top']} style={styles.heroInner} pointerEvents="none">
          <AppHeader
            showBackButton
            showLogo
            logoPosition="center"
            onBackPress={() => navigation.goBack()}
          />
          <View style={styles.heroText}>
            <GradientText text={t('connectClinic.title')} style={styles.heroTitle} />
            <AppText variant="caption" style={styles.heroSubtitle}>
              {t('connectClinic.subtitle')}
            </AppText>
          </View>
        </SafeAreaView>

        {/* ── KEYBOARD AVOIDING WRAPPER ── */}
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={[StyleSheet.absoluteFill, { justifyContent: 'flex-end' }]}
          pointerEvents="box-none"
        >
          <CardWithCutout cardTop={0} scanButton={scanButtonNode}>
            {/* Row 0 — org ID */}
            <Animated.View style={animatedStyle(0)}>
              <AppText variant="caption" style={styles.label}>
                {t('orgIdLabel')}
              </AppText>
              <View style={styles.orgIdBox}>
                <AppText variant="body" color={Colors.navyDark} style={styles.orgIdText}>
                  {orgId}
                </AppText>
              </View>
            </Animated.View>

            {/* Row 1 — continue button */}
            <Animated.View style={animatedStyle(1)}>
              <TouchableOpacity
                style={styles.btnPrimary}
                onPress={() => navigation.navigate('CompleteForm', { orgId })}
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
            </Animated.View>

            {/* Row 2 — footer */}
            <Animated.View style={[styles.footerLinks, animatedStyle(2)]}>
              <TouchableOpacity />
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <AppText variant="caption" color={Colors.navyDark}>
                  {t('haveAccount')}
                </AppText>
              </TouchableOpacity>
            </Animated.View>
          </CardWithCutout>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
}
