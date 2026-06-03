import React from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

import { useTheme } from '../../theme';
import AppText from '../../components/AppText';
import AppImage from '../../components/AppImage';
import { AppImages } from '../../constants';
import { Colors } from '../../theme/colors';
import { Spacing } from '../../theme/spacing';
import { Radius } from '../../theme/radius';
import type { ConnectClinicScreenProps } from '../../navigation/types';
import { useTranslation } from '../../hooks/useTranslation';
import { createStyles } from './styles/ConnectClinic.styles';
import GradientText from '../../components/GradientText';
import BackButton from '../../components/BackButton';

const ICON_SIZE = 120;
const OVERLAP   = ICON_SIZE / 2;

export default function ConnectClinicScreen({ navigation, route }: ConnectClinicScreenProps) {
  const theme  = useTheme();
  const styles = createStyles(theme);
  const { t } = useTranslation();
  const { orgId } = route.params;

  return (
    <View style={styles.screen}>

      {/* ── Hero ── */}
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
          <View style={styles.topBar}>
            <BackButton onPress={() => navigation.goBack()} />

            {/* Absolute Center Logo */}
            <View style={styles.logoAbsolute}>
              <AppImage
                source={AppImages.logoDark}
                containerStyle={styles.logo}
                contentFit="contain"
                showLoader={false}
              />
            </View>
          </View>
          
          <View style={styles.heroText}>
            <GradientText text={t('connectClinic.title')} style={styles.heroTitle}/>
             
            
            <AppText variant="caption" style={styles.heroSubtitle}>
              {t('connectClinic.subtitle')}
            </AppText>
          </View>
        </SafeAreaView>
      </View>

      {/* ── Overlap zone ── */}
      <View style={styles.overlapZone}>
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
      </View>

      {/* ── Card ── */}
      <View style={styles.card}>
        <View style={{ height: OVERLAP + Spacing.md }} />

        <AppText variant="caption" style={styles.label}>
          {t('orgIdLabel')}
        </AppText>
        <View style={styles.orgIdBox}>
          <AppText variant="body" color={Colors.navyDark} style={styles.orgIdText}>
            {orgId}
          </AppText>
        </View>

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
            <AppText variant="button" color={Colors.white}>{t('continue')}</AppText>
          </LinearGradient>
        </TouchableOpacity>

        <View style={styles.footerLinks}>
          <TouchableOpacity>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <AppText variant="caption" color={Colors.navyDark}>{t('haveAccount')}</AppText>
          </TouchableOpacity>
        </View>
      </View>

    </View>
  );
}