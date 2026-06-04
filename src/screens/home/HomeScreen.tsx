import { Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import AppImage from '../../components/AppImage';
import AppText from '../../components/AppText';
import BackgroundBlobs from '../../components/BackgroundBlobs';
import Card from '../../components/Card';
import { AppImages } from '../../constants';
import { useTranslation } from '../../hooks/useTranslation';
import type { HomeScreenProps } from '../../navigation/types';
import { useTheme } from '../../theme';
import { Colors } from '../../theme/colors';
import { Spacing } from '../../theme/spacing';
import BottomTabBar, { TabKey } from '../home/components/BottomTabBar';
import { createHomeStyles } from './styles/Home.styles';
import { createAppointmentStyles } from './styles/HomeAppointment.styles';
import { clinicStyles } from './styles/HomeClinic.styles';
import { createHeaderStyles } from './styles/HomeHeader.styles';
import { quickActionsStyles } from './styles/HomeQuickActions.styles';
import { screeningStyles } from './styles/HomeScreening.styles';

// ─── Quick action data ─────────────────────────────────────────────────────────
const QUICK_ACTIONS = [
  { key: 'visits', label: 'Visits', icon: AppImages.report },
  { key: 'appts', label: 'Appts', icon: AppImages.calendar },
  { key: 'chat', label: 'Chat', icon: AppImages.chat },
  { key: 'ask_ai', label: 'Ask AI', icon: AppImages.aiChat },
] as const;

// ─── Appointment detail rows ───────────────────────────────────────────────────
const getApptDetails = (t: any) => [
  {
    icon: '🗓',
    label: t('home.dateTime'),
    value: 'Monday, 9 June 2026  •  12:30 PM',
  },
  {
    icon: '📍',
    label: t('home.location'),
    value: '3891 Ranchview, California 62839',
  },
  {
    icon: '⚕️',
    label: t('home.appointmentType'),
    value: 'Retinal screening — OD & OS',
  },
];

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const theme = useTheme();
  const { t } = useTranslation();
  const APPT_DETAILS = getApptDetails(t);

  const styles = createHomeStyles(theme);
  const headerStyles = createHeaderStyles(theme);
  const apptStyles = createAppointmentStyles(theme);
  const [activeTab, setActiveTab] = useState<TabKey>('home');

  const handleTabPress = (key: TabKey) => {
    setActiveTab(key);
    switch (key) {
      case 'visits':
        navigation.navigate('ClinicList');
        break;
      // future tabs wired here
      default:
        break;
    }
  };

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <BackgroundBlobs />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Header ── */}
        <View style={headerStyles.header}>
          <View>
            <AppText variant="caption" style={headerStyles.greeting} color={Colors.muted}>
              {t('home.greetingMorning')}
            </AppText>
            <AppText variant="subtitle" color={theme.colors.text}>
              Betty Steward
            </AppText>
          </View>
          <View style={headerStyles.headerRight}>
            <TouchableOpacity>
              <AppImage source={AppImages.searchAi} containerStyle={headerStyles.headerIcon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
              <AppImage source={AppImages.notification} containerStyle={headerStyles.headerIcon} />
            </TouchableOpacity>
            <AppImage
              source={AppImages.avatar ?? AppImages.logoDark}
              containerStyle={headerStyles.avatar}
              contentFit="cover"
              showLoader={false}
            />
          </View>
        </View>

        {/* ── Clinic banner ── */}
        <Card elevated style={clinicStyles.clinicCard}>
          <View style={clinicStyles.clinicRow}>
            <View style={clinicStyles.clinicIconWrap}>
              <AppImage
                source={AppImages.clinic}
                containerStyle={{ width: 40, height: 40 }}
                contentFit="contain"
                showLoader={false}
              />
            </View>
            <View style={clinicStyles.clinicInfo}>
              <AppText variant="caption" color={theme.colors.text} style={clinicStyles.clinicName}>
                Macula & Retina Center
              </AppText>
              <AppText variant="caption" color={Colors.muted} style={clinicStyles.clinicAddress}>
                3891 Ranchview, California 62839
              </AppText>
            </View>
            <AppText variant="caption" color={Colors.muted} style={clinicStyles.visitCount}>
              6 {t('visits')}
            </AppText>
          </View>
        </Card>

        {/* ── Quick Actions ── */}
        <View style={quickActionsStyles.quickActions}>
          {QUICK_ACTIONS.map((action) => (
            <TouchableOpacity
              key={action.key}
              style={quickActionsStyles.quickAction}
              onPress={() => {
                if (action.key === 'visits') navigation.navigate('ClinicList');
              }}
            >
              <Card elevated style={quickActionsStyles.quickActionCard} noPadding>
                <View style={quickActionsStyles.quickActionInner}>
                  <AppImage
                    source={action.icon}
                    containerStyle={quickActionsStyles.quickActionIcon}
                  />
                </View>
              </Card>
              <AppText
                variant="caption"
                color={theme.colors.text}
                style={quickActionsStyles.quickActionLabel}
              >
                {action.label}
              </AppText>
            </TouchableOpacity>
          ))}
        </View>

        {/* ── Latest Screening ── */}
        <AppText variant="subtitle" color={theme.colors.text} style={styles.sectionTitle}>
          {t('home.latestScreening')}
        </AppText>

        <Card elevated noPadding style={screeningStyles.screeningCard}>
          <AppImage
            source={AppImages.retinalImage ?? AppImages.onboarding1}
            containerStyle={screeningStyles.screeningImage}
            contentFit="cover"
            showLoader={false}
          />
          <View style={screeningStyles.screeningFooter}>
            <View style={screeningStyles.screeningFooterLeft}>
              <AppText
                variant="caption"
                color={theme.colors.text}
                style={screeningStyles.screeningClinic}
              >
                Macula & Retina Center
              </AppText>
              <AppText variant="caption" color={Colors.muted}>
                Monday Jan 20, 2026
              </AppText>
            </View>
            <TouchableOpacity
              style={screeningStyles.visitReviewBtn}
              onPress={() => {}}
              activeOpacity={0.8}
            >
              <AppText
                variant="caption"
                color={Colors.white}
                style={{ fontWeight: '600', marginRight: 6 }}
              >
                {t('home.visitReview')}
              </AppText>
              <View style={screeningStyles.visitReviewArrow}>
                <Feather name="chevron-right" size={12} color={Colors.navyDark} />
              </View>
            </TouchableOpacity>
          </View>
          <View style={screeningStyles.followUp}>
            <View style={screeningStyles.followUpIconCircle}>
              <Feather name="arrow-up-right" size={14} color={Colors.navyDark} />
            </View>
            <AppText variant="caption" color={theme.colors.text} style={{ fontWeight: '600' }}>
              {t('home.followUpRecommended')}
            </AppText>
          </View>
        </Card>

        {/* ── Upcoming Appointment ── */}
        <AppText variant="subtitle" color={theme.colors.text} style={styles.sectionTitle}>
          {t('home.upcomingAppointment')}
        </AppText>

        <Card elevated style={apptStyles.apptCard}>
          <View style={apptStyles.doctorRow}>
            <AppImage
              source={AppImages.doctorAvatar ?? AppImages.onboarding2}
              containerStyle={apptStyles.doctorAvatar}
              contentFit="cover"
              showLoader={false}
            />
            <View>
              <AppText variant="caption" color={theme.colors.text} style={apptStyles.doctorName}>
                Dr. Priya Patel
              </AppText>
              <AppText variant="caption" color={Colors.muted}>
                Ophthalmologist
              </AppText>
            </View>
          </View>
          <View style={apptStyles.divider} />
          {APPT_DETAILS.map((row, i) => (
            <View key={i} style={apptStyles.apptRow}>
              <View style={apptStyles.apptIconWrap}>
                <AppText style={apptStyles.apptIcon}>{row.icon}</AppText>
              </View>
              <View style={apptStyles.apptRowText}>
                <AppText variant="caption" color={Colors.muted} style={apptStyles.apptRowLabel}>
                  {row.label}
                </AppText>
                <AppText variant="caption" color={theme.colors.text}>
                  {row.value}
                </AppText>
              </View>
            </View>
          ))}
        </Card>

        <View style={{ height: Spacing.xl }} />
      </ScrollView>

      {/* ── Bottom Tab Bar ── */}
      <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
        <BottomTabBar active={activeTab} onPress={handleTabPress} />
      </View>
    </SafeAreaView>
  );
}
