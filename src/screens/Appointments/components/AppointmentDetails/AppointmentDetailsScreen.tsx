// File: Appointments/components/AppointmentDetails/AppointmentDetailsScreen.tsx

import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppHeader from '../../../../components/AppHeader';
import AppImage from '../../../../components/AppImage';
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
            <Text style={styles.doctorName}>{doctor.name}</Text>
            <Text style={styles.doctorSpecialty}>{doctor.specialty}</Text>
          </View>
        </View>

        {/* Appointment details card */}
        <View style={styles.infoCard}>
          <Text style={styles.infoCardTitle}>Appointment Details</Text>

          {/* Date & Time */}
          <View style={styles.infoRow}>
            <View style={styles.infoIconWrap}>
              <AppImage source={AppImages.calendarAppt} containerStyle={styles.infoIcon} />
            </View>
            <View style={styles.infoTextWrap}>
              <Text style={styles.infoLabel}>Date & Time</Text>
              <View style={styles.infoValueRow}>
                <Text style={styles.infoValue}>{displayDate}</Text>
                <Text style={styles.infoDot}>•</Text>
                <Text style={styles.infoValue}>{displayTime}</Text>
              </View>
            </View>
          </View>

          {/* Clinic */}
          <View style={styles.infoRow}>
            <View style={styles.infoIconWrap}>
              <AppImage source={AppImages.location} containerStyle={styles.infoIcon} />
            </View>
            <View style={styles.infoTextWrap}>
              <Text style={styles.infoLabel}>{clinic.name}</Text>
              <Text style={styles.infoValue}>{clinic.address}</Text>
            </View>
          </View>

          {/* Appointment Type */}
          <View style={[styles.infoRow, { marginBottom: 0 }]}>
            <View style={styles.infoIconWrap}>
              <AppImage source={AppImages.doctorSethoscope} containerStyle={styles.infoIcon} />
            </View>
            <View style={styles.infoTextWrap}>
              <Text style={styles.infoLabel}>Appointment Type</Text>
              <Text style={styles.infoValue}>{appointmentType}</Text>
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
            <Text style={styles.reminderText}>
              {`Appointment in ${status.daysUntil} ${
                status.daysUntil === 1 ? 'day' : 'days'
              }. A reminder will be sent again 1 day before your appointment.`}
            </Text>
          </View>
        )}

        {/* Prep instructions */}
        {prepInstructions.length > 0 && (
          <View style={styles.prepSection}>
            <Text style={styles.prepTitle}>How to Prepare for The Appointment</Text>
            {prepInstructions.map((instruction, index) => (
              <View key={index} style={styles.prepRow}>
                <Text style={styles.prepNumber}>{index + 1}.</Text>
                <Text style={styles.prepText}>{instruction}</Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
