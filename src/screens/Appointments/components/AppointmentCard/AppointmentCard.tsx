import { memo, useMemo } from 'react';
import { TouchableOpacity, View } from 'react-native';

import AppImage from '../../../../components/AppImage';
import AppText from '../../../../components/AppText';
import { AppImages } from '../../../../constants';
import type { Appointment } from '../../../../domain/Appointments/models/Appointment';
import { useTheme } from '../../../../theme';

import { createStyles } from './styles';

interface Props {
  appointment: Appointment;
  onPress: (appointment: Appointment) => void;
}

function AppointmentCard({ appointment, onPress }: Props) {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const { doctor, clinic, status } = appointment;

  const statusBanner = useMemo(() => {
    if (status.kind === 'reminder') {
      const label =
        status.daysUntil === 1
          ? 'Appointment in 1 day.'
          : `Appointment in ${status.daysUntil} days.`;
      return (
        <View style={styles.reminderBanner}>
          <AppImage source={AppImages.notificationYellow} containerStyle={styles.reminderIcon} />
          <AppText style={styles.reminderText}>{label}</AppText>
        </View>
      );
    }

    if (status.kind === 'report_ready') {
      return (
        <View style={styles.reportBanner}>
          <AppImage source={AppImages.doc} containerStyle={styles.reportIcon} />
          <AppText style={styles.reportText}>Your appointment report is ready to view.</AppText>
        </View>
      );
    }

    return null;
  }, [status, styles]);

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
          <AppText style={styles.doctorName}>{doctor.name}</AppText>
          <AppText style={styles.doctorSpecialty} numberOfLines={2}>
            {doctor.specialty}
          </AppText>
        </View>
        <TouchableOpacity
          style={styles.chevronBtn}
          onPress={() => onPress(appointment)}
          activeOpacity={0.7}
        >
          <AppText style={styles.chevronText}>›</AppText>
        </TouchableOpacity>
      </View>

      {/* Location row */}
      <View style={styles.locationRow}>
        <AppImage source={AppImages.location} containerStyle={styles.locationIcon} />
        <View style={styles.locationInfo}>
          <AppText style={styles.clinicName}>{clinic.name}</AppText>
          <AppText style={styles.clinicAddress}>{clinic.address}</AppText>
        </View>
      </View>

      {/* Status banner */}
      {statusBanner}
    </View>
  );
}

export default memo(AppointmentCard);
