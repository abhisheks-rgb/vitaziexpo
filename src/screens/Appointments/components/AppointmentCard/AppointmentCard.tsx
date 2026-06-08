// File: Appointments/components/AppointmentCard/AppointmentCard.tsx

import { Text, TouchableOpacity, View } from 'react-native';
import AppImage from '../../../../components/AppImage';
import { AppImages } from '../../../../constants';
import { useTheme } from '../../../../theme';
import type { Appointment } from '../../types/appointments.types';
import { createStyles } from './styles';

interface Props {
  appointment: Appointment;
  onPress: (appointment: Appointment) => void;
}

export default function AppointmentCard({ appointment, onPress }: Props) {
  const theme = useTheme();
  const styles = createStyles(theme);
  const { doctor, clinic, status } = appointment;

  const renderStatusBanner = () => {
    if (status.kind === 'reminder') {
      const label =
        status.daysUntil === 1
          ? 'Appointment in 1 day.'
          : `Appointment in ${status.daysUntil} days.`;
      return (
        <View style={styles.reminderBanner}>
          <AppImage source={AppImages.notificationYellow} containerStyle={styles.reminderIcon} />
          <Text style={styles.reminderText}>{label}</Text>
        </View>
      );
    }
    if (status.kind === 'report_ready') {
      return (
        <View style={styles.reportBanner}>
          <AppImage source={AppImages.doc} containerStyle={styles.reportIcon} />
          <Text style={styles.reportText}>Your appointment report is ready to view.</Text>
        </View>
      );
    }
    return null;
  };

  return (
    <View style={styles.card}>
      {/* Doctor row */}
      <View style={styles.doctorRow}>
        <View style={styles.avatar}>
          <AppImage
            source={doctor.avatarSource}
            containerStyle={{ width: 52, height: 52 }}
            contentFit="cover"
            showLoader={false}
          />
        </View>

        <View style={styles.doctorInfo}>
          <Text style={styles.doctorName}>{doctor.name}</Text>
          <Text style={styles.doctorSpecialty} numberOfLines={2}>
            {doctor.specialty}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.chevronBtn}
          onPress={() => onPress(appointment)}
          activeOpacity={0.7}
        >
          <Text style={styles.chevronText}>›</Text>
        </TouchableOpacity>
      </View>

      {/* Location row */}
      <View style={styles.locationRow}>
        <AppImage source={AppImages.location} containerStyle={styles.locationIcon} />
        <View style={styles.locationInfo}>
          <Text style={styles.clinicName}>{clinic.name}</Text>
          <Text style={styles.clinicAddress}>{clinic.address}</Text>
        </View>
      </View>

      {/* Status banner — flush to card edges */}
      {renderStatusBanner()}
    </View>
  );
}
