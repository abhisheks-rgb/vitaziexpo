import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

import { createStyles } from './styles';
import { useTheme } from '../../theme';
import AppImage from '../../components/AppImage';

import { notificationGroups, appointmentDetails } from './data';
import type { NotificationItem, AppointmentDetail } from './data';
import { NotificationsScreenProps } from '../../navigation/types';

// ─── i18n strings ──────────────────────────────────────────────────────────────
// Add these keys to your strings.json under "notifications"
const strings = {
  screenTitle: 'Notifications',
  appointmentDetails: 'Appointment Details',
  reschedule: 'Reschedule',
  confirm: 'Confirm',
  reminderNote: (days: number) =>
    `${days} days away. A reminder will be sent again 1 day before your appointment.`,
};

interface Props {
  onBack?: () => void;
}

// ─── Back button ───────────────────────────────────────────────────────────────

function BackButton({ onPress, styles }: { onPress: () => void; styles: any }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.backCircle}>
        <Text style={styles.backArrow}>{'‹'}</Text>
      </View>
    </TouchableOpacity>
  );
}

// ─── Notification card ─────────────────────────────────────────────────────────

function NotificationCard({
  item,
  onPress,
  styles,
}: {
  item: NotificationItem;
  onPress: () => void;
  styles: any;
}) {
  return (
    <TouchableOpacity
      style={[styles.card, item.bold && styles.cardBold]}
      onPress={onPress}
      activeOpacity={0.75}
    >
      <View style={styles.cardInner}>
        <View style={styles.bellWrap}>
          <Text style={styles.bellEmoji}>🔔</Text>
        </View>

        <View style={styles.cardText}>
          <Text style={[styles.cardMessage, item.bold && styles.cardMessageBold]}>
            {item.message}
          </Text>
          <Text style={styles.cardTime}>{item.time}</Text>
        </View>

        <View style={styles.chevronWrap}>
          <Text style={styles.chevron}>›</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

// ─── Detail row (icon + label + value) ────────────────────────────────────────

function DetailRow({
  icon,
  label,
  value,
  styles,
}: {
  icon: string;
  label: string;
  value: string;
  styles: any;
}) {
  return (
    <View style={styles.detailRow}>
      <Text style={styles.detailIcon}>{icon}</Text>
      <View style={styles.detailTextCol}>
        <Text style={styles.detailLabel}>{label}</Text>
        <Text style={styles.detailValue}>{value}</Text>
      </View>
    </View>
  );
}

// ─── Notification detail view ─────────────────────────────────────────────────

function NotificationDetailView({
  detail,
  onBack,
  styles,
  theme,
}: {
  detail: AppointmentDetail;
  onBack: () => void;
  styles: any;
  theme: any;
}) {
  return (
    <LinearGradient
      colors={[theme.colors.gradientStart, theme.colors.gradientEnd]}
      style={styles.screen}
    >
      <SafeAreaView style={styles.screen}>
        <StatusBar barStyle="dark-content" />

        <View style={styles.header}>
          <BackButton onPress={onBack} styles={styles} />
          <Text style={styles.headerTitle}>{strings.screenTitle}</Text>
        </View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.detailScrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.detailTitle}>{detail.title}</Text>
          <Text style={styles.detailBody}>{detail.body}</Text>

          <View style={styles.appointmentCard}>
            <Text style={styles.appointmentCardTitle}>
              {strings.appointmentDetails}
            </Text>

            {/* Doctor */}
            <View style={styles.doctorRow}>
              <View style={styles.doctorAvatar}>
                {detail.doctor.avatar ? (
                  <AppImage
                    source={detail.doctor.avatar}
                    containerStyle={{ width: 44, height: 44, borderRadius: 22 }}
                  />
                ) : (
                  <Text style={styles.doctorAvatarFallback}>👩‍⚕️</Text>
                )}
              </View>
              <View>
                <Text style={styles.doctorName}>{detail.doctor.name}</Text>
                <Text style={styles.doctorSpecialty}>{detail.doctor.specialty}</Text>
              </View>
            </View>

            <View style={styles.divider} />
            <DetailRow icon="📅" label="Date & Time" value={detail.dateTime} styles={styles} />
            <View style={styles.divider} />
            <DetailRow icon="📍" label={detail.location} value={detail.address} styles={styles} />
            <View style={styles.divider} />
            <DetailRow icon="🩺" label="Appointment Type" value={detail.type} styles={styles} />
          </View>

          {/* Reminder chip */}
          <View style={styles.reminderChip}>
            <Text style={styles.reminderBell}>🔔</Text>
            <Text style={styles.reminderText}>
              {strings.reminderNote(detail.daysAway)}
            </Text>
          </View>
        </ScrollView>

        {/* CTA */}
        <View style={styles.ctaRow}>
          <TouchableOpacity style={styles.rescheduleBtn} activeOpacity={0.8}>
            <Text style={styles.rescheduleText}>{strings.reschedule}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.confirmBtn} activeOpacity={0.8}>
            <Text style={styles.confirmText}>{strings.confirm}</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

// ─── Main screen ───────────────────────────────────────────────────────────────

export default function NotificationsScreen({ navigation }: NotificationsScreenProps) {
  const theme = useTheme();
  const styles = createStyles(theme);

  const [selectedDetail, setSelectedDetail] = useState<AppointmentDetail | null>(null);

  const handleCardPress = (id: string) => {
    if (appointmentDetails[id]) {
      setSelectedDetail(appointmentDetails[id]);
    }
  };

  if (selectedDetail) {
    return (
      <NotificationDetailView
        detail={selectedDetail}
        onBack={() => setSelectedDetail(null)}
        styles={styles}
        theme={theme}
      />
    );
  }

  return (
    <LinearGradient
      colors={[theme.colors.gradientStart, theme.colors.gradientEnd]}
      style={styles.screen}
    >
      <SafeAreaView style={styles.screen}>
        <StatusBar barStyle="dark-content" />

        <View style={styles.header}>
          <BackButton onPress={() => navigation.goBack()} styles={styles} />
          <Text style={styles.headerTitle}>{strings.screenTitle}</Text>
        </View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {notificationGroups.map((group) => (
            <View key={group.label}>
              <View style={styles.groupLabelWrap}>
                <Text style={styles.groupLabel}>{group.label}</Text>
              </View>
              {group.items.map((item) => (
                <NotificationCard
                  key={item.id}
                  item={item}
                  onPress={() => handleCardPress(item.id)}
                  styles={styles}
                />
              ))}
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}