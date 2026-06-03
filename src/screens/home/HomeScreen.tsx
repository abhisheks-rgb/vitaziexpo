import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useTheme } from '../../theme';
import AppText from '../../components/AppText';
import AppImage from '../../components/AppImage';
import AppButton from '../../components/AppButton';
import Card from '../../components/Card';
import BottomTabBar, { TabKey } from '../home/components/BottomTabBar';
import { AppImages } from '../../constants';
import { Colors } from '../../theme/colors';
import { Spacing } from '../../theme/spacing';
import { Radius } from '../../theme/radius';
import type { HomeScreenProps } from '../../navigation/types';

// ─── Quick action data ─────────────────────────────────────────────────────────
const QUICK_ACTIONS = [
  { key: 'visits',    label: 'Visits',  icon: '📋' },
  { key: 'appts',     label: 'Appts',   icon: '📅' },
  { key: 'chat',      label: 'Chat',    icon: '💬' },
  { key: 'ask_ai',    label: 'Ask AI',  icon: '🤖' },
] as const;

// ─── Appointment detail rows ───────────────────────────────────────────────────
const APPT_DETAILS = [
  { icon: '🗓', label: 'Date & Time',       value: 'Monday, 9 June 2026  •  12:30 PM' },
  { icon: '📍', label: 'Macula & Retina Center', value: '3891 Ranchview, California 62839' },
  { icon: '⚕️', label: 'Appointment Type',  value: 'Retinal screening — OD & OS' },
] as const;

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const theme  = useTheme();
  const styles = createStyles(theme);
  const [activeTab, setActiveTab] = useState<TabKey>('home');

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >

        {/* ── Header ── */}
        <View style={styles.header}>
          <View>
            <AppText variant="caption" style={styles.greeting} color={Colors.muted}>
              Good Morning,
            </AppText>
            <AppText variant="subtitle" color={theme.colors.text}>
              Betty Steward
            </AppText>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.iconBtn}>
              <AppText style={styles.headerIcon}>🔍</AppText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconBtn}>
              <AppText style={styles.headerIcon}>🔔</AppText>
            </TouchableOpacity>
            {/* Avatar */}
            <AppImage
              source={AppImages.avatar ?? AppImages.logoDark}
              containerStyle={styles.avatar}
              contentFit="cover"
              showLoader={false}
            />
          </View>
        </View>

        {/* ── Clinic banner ── */}
        <Card elevated style={styles.clinicCard}>
          <View style={styles.clinicRow}>
            <View style={styles.clinicIconWrap}>
              <AppText style={{ fontSize: 20 }}>🏥</AppText>
            </View>
            <View style={styles.clinicInfo}>
              <AppText variant="caption" color={theme.colors.text} style={styles.clinicName}>
                Macula & Retina Center
              </AppText>
              <AppText variant="caption" color={Colors.muted} style={styles.clinicAddress}>
                3891 Ranchview, California 62839
              </AppText>
            </View>
            <AppText variant="caption" color={Colors.muted} style={styles.visitCount}>
              6 Visits
            </AppText>
          </View>
        </Card>

        {/* ── Quick Actions ── */}
        <View style={styles.quickActions}>
          {QUICK_ACTIONS.map(action => (
            <TouchableOpacity key={action.key} style={styles.quickAction}>
              <Card elevated style={styles.quickActionCard} noPadding>
                <View style={styles.quickActionInner}>
                  <AppText style={styles.quickActionIcon}>{action.icon}</AppText>
                </View>
              </Card>
              <AppText variant="caption" color={theme.colors.text} style={styles.quickActionLabel}>
                {action.label}
              </AppText>
            </TouchableOpacity>
          ))}
        </View>

        {/* ── Latest Screening ── */}
        <AppText variant="subtitle" color={theme.colors.text} style={styles.sectionTitle}>
          Latest Screening
        </AppText>

        <Card elevated noPadding style={styles.screeningCard}>
          {/* Retinal scan image */}
          <AppImage
            source={AppImages.retinalImage ?? AppImages.onboarding1}
            containerStyle={styles.screeningImage}
            contentFit="cover"
            showLoader={false}
          />

          {/* Clinic + Visit Review row */}
          <View style={styles.screeningFooter}>
            <View style={styles.screeningFooterLeft}>
              <AppText variant="caption" color={theme.colors.text} style={styles.screeningClinic}>
                Macula & Retina Center
              </AppText>
              <AppText variant="caption" color={Colors.muted}>
                Monday Jan 20, 2026
              </AppText>
            </View>

            {/* Visit Review — rounded button with right-arrow icon */}
            <AppButton
              title="Visit Review"
              variant="rounded"
              size="sm"
              onPress={() => {}}
              rightIcon={
                <View style={styles.arrowCircle}>
                  <AppText style={styles.arrowText} color={Colors.navyDark}>›</AppText>
                </View>
              }
            />
          </View>

          {/* Follow-up recommendation */}
          <View style={styles.followUp}>
            <AppText style={styles.followUpArrow}>↗</AppText>
            <AppText variant="caption" color={theme.colors.text}>
              Follow-up recommended in 6 months
            </AppText>
          </View>
        </Card>

        {/* ── Upcoming Appointment ── */}
        <AppText variant="subtitle" color={theme.colors.text} style={styles.sectionTitle}>
          Upcoming Appointment
        </AppText>

        <Card elevated style={styles.apptCard}>
          {/* Doctor row */}
          <View style={styles.doctorRow}>
            <AppImage
              source={AppImages.doctorAvatar ?? AppImages.onboarding2}
              containerStyle={styles.doctorAvatar}
              contentFit="cover"
              showLoader={false}
            />
            <View>
              <AppText variant="caption" color={theme.colors.text} style={styles.doctorName}>
                Dr. Priya Patel
              </AppText>
              <AppText variant="caption" color={Colors.muted}>
                Ophthalmologist
              </AppText>
            </View>
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Detail rows */}
          {APPT_DETAILS.map((row, i) => (
            <View key={i} style={styles.apptRow}>
              <View style={styles.apptIconWrap}>
                <AppText style={styles.apptIcon}>{row.icon}</AppText>
              </View>
              <View style={styles.apptRowText}>
                <AppText variant="caption" color={Colors.muted} style={styles.apptRowLabel}>
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
      <BottomTabBar active={activeTab} onPress={setActiveTab} />

    </SafeAreaView>
  );
}

// ─── Styles ────────────────────────────────────────────────────────────────────
function createStyles(theme: ReturnType<typeof useTheme>) {
  return StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    scroll: {
      flex: 1,
    },
    scrollContent: {
      paddingHorizontal: Spacing.md,
      paddingTop: Spacing.sm,
    },

    // Header
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: Spacing.md,
    },
    greeting: {
      fontSize: 13,
    },
    headerRight: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: Spacing.xs,
    },
    iconBtn: {
      width: 36,
      height: 36,
      borderRadius: Radius.full,
      backgroundColor: theme.colors.surface,
      alignItems: 'center',
      justifyContent: 'center',
    },
    headerIcon: {
      fontSize: 16,
    },
    avatar: {
      width: 36,
      height: 36,
      borderRadius: Radius.full,
      marginLeft: Spacing.xs,
    },

    // Clinic card
    clinicCard: {
      marginBottom: Spacing.md,
    },
    clinicRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: Spacing.sm,
    },
    clinicIconWrap: {
      width: 40,
      height: 40,
      borderRadius: Radius.md,
      backgroundColor: `${Colors.skyBlue}22`,
      alignItems: 'center',
      justifyContent: 'center',
    },
    clinicInfo: {
      flex: 1,
    },
    clinicName: {
      fontWeight: '600',
    },
    clinicAddress: {
      fontSize: 11,
      marginTop: 1,
    },
    visitCount: {
      fontSize: 11,
    },

    // Quick actions
    quickActions: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: Spacing.md,
    },
    quickAction: {
      alignItems: 'center',
      gap: Spacing.xs,
    },
    quickActionCard: {
      width: 60,
      height: 60,
      borderRadius: Radius.lg,
    },
    quickActionInner: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    quickActionIcon: {
      fontSize: 24,
    },
    quickActionLabel: {
      fontSize: 11,
    },

    // Section titles
    sectionTitle: {
      marginBottom: Spacing.sm,
      fontSize: 16,
    },

    // Latest screening card
    screeningCard: {
      marginBottom: Spacing.md,
      overflow: 'hidden',
    },
    screeningImage: {
      width: '100%',
      height: 160,
      backgroundColor: '#111',
    },
    screeningFooter: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: Spacing.md,
    },
    screeningFooterLeft: {
      flex: 1,
      gap: 2,
    },
    screeningClinic: {
      fontWeight: '600',
    },
    arrowCircle: {
      width: 18,
      height: 18,
      borderRadius: Radius.full,
      backgroundColor: Colors.navyDark,
      alignItems: 'center',
      justifyContent: 'center',
    },
    arrowText: {
      fontSize: 14,
      lineHeight: 18,
      fontWeight: '600',
    },

    // Follow-up banner
    followUp: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: Spacing.xs,
      backgroundColor: `${Colors.skyBlue}22`,
      marginHorizontal: Spacing.md,
      marginBottom: Spacing.md,
      paddingHorizontal: Spacing.sm,
      paddingVertical: Spacing.xs,
      borderRadius: Radius.md,
    },
    followUpArrow: {
      fontSize: 14,
      color: Colors.navyDark,
    },

    // Upcoming appointment
    apptCard: {
      gap: Spacing.sm,
    },
    doctorRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: Spacing.sm,
    },
    doctorAvatar: {
      width: 44,
      height: 44,
      borderRadius: Radius.full,
    },
    doctorName: {
      fontWeight: '700',
      fontSize: 14,
    },
    divider: {
      height: 1,
      backgroundColor: theme.colors.border,
      marginVertical: Spacing.xs,
    },
    apptRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: Spacing.sm,
    },
    apptIconWrap: {
      width: 32,
      height: 32,
      borderRadius: Radius.md,
      backgroundColor: theme.colors.surface,
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    },
    apptIcon: {
      fontSize: 14,
    },
    apptRowText: {
      flex: 1,
      gap: 1,
    },
    apptRowLabel: {
      fontSize: 11,
    },
  });
}