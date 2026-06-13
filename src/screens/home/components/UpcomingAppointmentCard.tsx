import { Dimensions, ScrollView, TouchableOpacity, View } from 'react-native';

import AppImage from '../../../components/AppImage';
import AppText from '../../../components/AppText';
import Card from '../../../components/Card';
import { AppImages } from '../../../constants';
import type { Appointment } from '../../../domain/Appointments/models/Appointment';
import { useTranslation } from '../../../hooks/useTranslation';
import { useTheme } from '../../../theme';
import { Colors } from '../../../theme/colors';
import { createAppointmentStyles } from '../styles/HomeAppointment.styles';

const MAX_VISIBLE = 5;
const SCREEN_WIDTH = Dimensions.get('window').width;
const H_PADDING = 16;
const CARD_WIDTH = SCREEN_WIDTH - H_PADDING * 2;

interface Props {
  appointments: Appointment[];
  isLoading?: boolean;
  onViewAll?: () => void;
}

function AppointmentItem({
  appointment,
  styles,
}: {
  appointment: Appointment;
  styles: ReturnType<typeof createAppointmentStyles>;
}) {
  const theme = useTheme();

  // Icon colors that adapt to light/dark theme
  const headerIconColor = Colors.white;
  const detailIconColor = theme.isDark ? Colors.skyBlue : Colors.navyDark;
  const detailIconBgColor = theme.isDark
    ? `${Colors.skyBlue}15` // dimmer in dark
    : `${Colors.skyBlue}20`; // subtle in light

  return (
    <View>
      {/* Doctor header */}
      <View style={styles.doctorHeader}>
        <AppImage
          source={appointment.doctor.avatarSource ?? AppImages.onboarding2}
          containerStyle={styles.doctorAvatar}
          contentFit="cover"
          showLoader={false}
        />
        <View style={{ flex: 1 }}>
          <AppText style={styles.doctorName}>{appointment.doctor.name}</AppText>
          <AppText style={styles.doctorSpecialty}>{appointment.doctor.specialty}</AppText>
        </View>
        <View style={styles.iconButtonRow}>
          <TouchableOpacity style={[styles.iconButton, styles.iconButtonBlue]}>
            <AppImage
              source={AppImages.calendarAppt}
              containerStyle={styles.iconButtonImg}
              tintColor={headerIconColor}
            />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.iconButton, styles.iconButtonYellow]}>
            <AppImage
              source={AppImages.notification}
              containerStyle={styles.iconButtonImg}
              tintColor={headerIconColor}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Details section */}
      <View style={{ gap: 10, marginBottom: 16, paddingHorizontal: 16 }}>
        <View style={styles.apptRow}>
          <View style={[styles.apptIconWrap, { backgroundColor: detailIconBgColor }]}>
            <AppImage
              source={AppImages.calendarAppt}
              containerStyle={styles.apptIcon}
              tintColor={detailIconColor}
            />
          </View>
          <View style={styles.apptRowText}>
            <AppText style={styles.apptRowLabel}>Date &amp; Time</AppText>
            <View style={styles.apptRowValueRow}>
              <AppText style={styles.apptRowValue}>{appointment.displayDate}</AppText>
              <AppText style={styles.apptRowDot}>•</AppText>
              <AppText style={styles.apptRowValue}>{appointment.displayTime}</AppText>
            </View>
          </View>
        </View>

        <View style={styles.apptRow}>
          <View style={[styles.apptIconWrap, { backgroundColor: detailIconBgColor }]}>
            <AppImage
              source={AppImages.location}
              containerStyle={styles.apptIcon}
              tintColor={detailIconColor}
            />
          </View>
          <View style={styles.apptRowText}>
            <AppText style={styles.apptRowLabel}>{appointment.clinic.name}</AppText>
            <AppText style={styles.apptRowValue}>{appointment.clinic.address}</AppText>
          </View>
        </View>

        <View style={styles.apptRow}>
          <View style={[styles.apptIconWrap, { backgroundColor: detailIconBgColor }]}>
            <AppImage
              source={AppImages.doctorSethoscope}
              containerStyle={styles.apptIcon}
              tintColor={detailIconColor}
            />
          </View>
          <View style={styles.apptRowText}>
            <AppText style={styles.apptRowLabel}>Appointment Type</AppText>
            <AppText style={styles.apptRowValue}>{appointment.appointmentType}</AppText>
          </View>
        </View>
      </View>

      {/* Direction / Contact buttons */}
      <View style={[styles.actionRow, { paddingHorizontal: 16, paddingBottom: 16 }]}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => console.log('Direction →', appointment.clinic.address)}
        >
          <AppText style={styles.actionButtonText}>Direction</AppText>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => console.log('Contact →', appointment.doctor.name)}
        >
          <AppText style={styles.actionButtonText}>Contact</AppText>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function UpcomingAppointmentCard({ appointments, isLoading, onViewAll }: Props) {
  const theme = useTheme();
  const { t } = useTranslation();
  const styles = createAppointmentStyles(theme);

  const visible = appointments.slice(0, MAX_VISIBLE);
  const totalCount = appointments.length;

  return (
    <>
      <View style={styles.sectionHeader}>
        <View style={styles.sectionTitleRow}>
          <AppText style={styles.sectionTitle}>{t('home.upcomingAppointment')}</AppText>
          {totalCount > 0 && (
            <View style={styles.countBadge}>
              <AppText style={styles.countBadgeText}>{totalCount}</AppText>
            </View>
          )}
        </View>
        <TouchableOpacity onPress={onViewAll} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <AppText style={styles.viewAllText}>View All</AppText>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: H_PADDING,
          paddingVertical: 4,
          gap: 12,
          alignItems: 'flex-start',
        }}
        style={{ marginHorizontal: -H_PADDING }}
        decelerationRate="fast"
        snapToInterval={CARD_WIDTH + 12}
        snapToAlignment="start"
      >
        {visible.map((appt) => (
          <Card elevated key={appt.id} style={[styles.apptCard, { width: CARD_WIDTH }]}>
            <AppointmentItem appointment={appt} styles={styles} />
          </Card>
        ))}
      </ScrollView>
    </>
  );
}
