import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { Image, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
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
import { Radius } from '../../theme/radius';
import { Spacing } from '../../theme/spacing';

import { createStyles } from './styles/Register.styles';

const ICON_SIZE = 120;
const OVERLAP = ICON_SIZE / 2;

export default function RegisterScreen({ navigation }: RegisterScreenProps) {
  const theme = useTheme();
  const styles = createStyles(theme);
  const { t } = useTranslation();
  const [orgId, setOrgId] = useState('');

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
          <AppHeader showLogo logoPosition="center" />
          <View style={styles.heroText}>
            <GradientText text={t('connectClinic.title')} style={styles.heroTitle} />
            <AppText variant="caption" style={styles.heroSubtitle}>
              {t('connectClinic.subtitle')}
            </AppText>
          </View>
        </SafeAreaView>
      </View>

      {/* ── Overlap zone: icon straddles hero/card boundary ── */}
      <View style={styles.overlapZone}>
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

      {/* ── Card ── */}
      <View style={styles.card}>
        {/* Pushes content below the overlapping icon */}
        <View style={{ height: OVERLAP + Spacing.md }} />

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

        <View style={styles.footerLinks}>
          <TouchableOpacity>
            <AppText variant="caption" color={Colors.navyDark}>
              {t('needHelp')}
            </AppText>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <AppText variant="caption" color={Colors.navyDark}>
              {t('haveAccount')}
            </AppText>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
