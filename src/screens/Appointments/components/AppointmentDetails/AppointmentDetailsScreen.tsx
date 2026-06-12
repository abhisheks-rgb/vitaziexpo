import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import AppHeader from '../../../../components/AppHeader';
import AppImage from '../../../../components/AppImage';
import AppText from '../../../../components/AppText';
import BackgroundBlobs from '../../../../components/BackgroundBlobs';
import { AppImages } from '../../../../constants';
import { useTheme } from '../../../../theme';
import type { Appointment } from '../../types/appointments.types';
import { createStyles } from './styles';

interface Props {
  appointment: Appointment;
  navigation: any;
}

export default function AppointmentDetailsScreen({ appointment, navigation }: Props) {
  const theme = useTheme();
  const styles = createStyles(theme);
  const { doctor, clinic, displayDate, displayTime, appointmentType, status, prepInstructions } =
    appointment;

  const showReminder = status.kind === 'reminder';

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <BackgroundBlobs />

      <AppHeader
        title="Appointment Details"
        titlePosition="left"
        showBackButton
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Doctor header card */}
        <View style={styles.doctorCard}>
          <View style={styles.doctorAvatar}>
            <AppImage
              source={doctor.avatarSource}
              containerStyle={{ width: 64, height: 64 }}
              contentFit="cover"
              showLoader={false}
            />
          </View>
          <View style={{ flex: 1 }}>
            <AppText style={styles.doctorName}>{doctor.name}</AppText>
            <AppText style={styles.doctorSpecialty}>{doctor.specialty}</AppText>
          </View>
        </View>

        {/* Appointment details card */}
        <View style={styles.infoCard}>
          <AppText style={styles.infoCardTitle}>Appointment Details</AppText>

          {/* Date & Time */}
          <View style={styles.infoRow}>
            <View style={styles.infoIconWrap}>
              <AppImage source={AppImages.calendarAppt} containerStyle={styles.infoIcon} />
            </View>
            <View style={styles.infoTextWrap}>
              <AppText style={styles.infoLabel}>Date & Time</AppText>
              <View style={styles.infoValueRow}>
                <AppText style={styles.infoValue}>{displayDate}</AppText>
                <AppText style={styles.infoDot}>•</AppText>
                <AppText style={styles.infoValue}>{displayTime}</AppText>
              </View>
            </View>
          </View>

          {/* Clinic */}
          <View style={styles.infoRow}>
            <View style={styles.infoIconWrap}>
              <AppImage source={AppImages.location} containerStyle={styles.infoIcon} />
            </View>
            <View style={styles.infoTextWrap}>
              <AppText style={styles.infoLabel}>{clinic.name}</AppText>
              <AppText style={styles.infoValue}>{clinic.address}</AppText>
            </View>
          </View>

          {/* Appointment Type */}
          <View style={[styles.infoRow, { marginBottom: 0 }]}>
            <View style={styles.infoIconWrap}>
              <AppImage source={AppImages.doctorSethoscope} containerStyle={styles.infoIcon} />
            </View>
            <View style={styles.infoTextWrap}>
              <AppText style={styles.infoLabel}>Appointment Type</AppText>
              <AppText style={styles.infoValue}>{appointmentType}</AppText>
            </View>
          </View>
        </View>

        {/* Reminder banner */}
        {showReminder && status.kind === 'reminder' && (
          <View style={styles.reminderBanner}>
            <View style={styles.reminderIconWrap}>
              <AppImage
                source={AppImages.notificationYellow}
                containerStyle={styles.reminderIcon}
              />
            </View>
            <AppText style={styles.reminderText}>
              {`Appointment in ${status.daysUntil} ${
                status.daysUntil === 1 ? 'day' : 'days'
              }. A reminder will be sent again 1 day before your appointment.`}
            </AppText>
          </View>
        )}

        {/* Prep instructions */}
        {prepInstructions.length > 0 && (
          <View style={styles.prepSection}>
            <AppText style={styles.prepTitle}>How to Prepare for The Appointment</AppText>
            {prepInstructions.map((instruction, index) => (
              <View key={index} style={styles.prepRow}>
                <AppText style={styles.prepNumber}>{index + 1}.</AppText>
                <AppText style={styles.prepText}>{instruction}</AppText>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
