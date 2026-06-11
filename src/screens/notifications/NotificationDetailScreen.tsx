import { useMemo } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import AppHeader from '../../components/AppHeader';
import AppImage from '../../components/AppImage';
import AppText from '../../components/AppText';
import BackgroundBlobs from '../../components/BackgroundBlobs';
import { AppImages } from '../../constants';
import { useTranslation } from '../../hooks/useTranslation';
import { NotificationDetailScreenProps } from '../../navigation/types';
import { useTheme } from '../../theme';

import DetailRow from './components/DetailRow';
import { appointmentDetails } from './data';
import { createDetailStyles } from './styles/NotificationDetail.styles';

export default function NotificationDetailScreen({
  route,
  navigation,
}: NotificationDetailScreenProps) {
  const theme = useTheme();
  const styles = useMemo(() => createDetailStyles(theme), [theme]);
  const { t } = useTranslation();

  const strings = {
    screenTitle: t('notifications.screenTitle'),
    appointmentDetails: t('notifications.appointmentDetails'),
    reschedule: t('notifications.reschedule'),
    confirm: t('notifications.confirm'),
    reminderNote: t('notifications.reminderNote'),
  };

  const { notificationId } = route.params;

  const detail = appointmentDetails[notificationId];

  if (!detail) {
    return null;
  }

  return (
    <SafeAreaView style={styles.screen} edges={['top', 'left', 'right']}>
      <BackgroundBlobs />
      <AppHeader
        title={strings.screenTitle}
        titlePosition="left"
        showBackButton
        onBackPress={() => navigation.goBack()}
      />
      <ScrollView contentContainerStyle={styles.detailScrollContent}>
        <AppText style={styles.detailTitle}>{detail.title}</AppText>

        <AppText style={styles.detailBody}>{detail.body}</AppText>

        <View style={styles.appointmentCard}>
          <AppText style={styles.appointmentCardTitle}>{strings.appointmentDetails}</AppText>

          <View style={styles.doctorRow}>
            <View style={styles.doctorAvatar}>
              <AppImage
                source={detail.doctor.avatar}
                containerStyle={{
                  width: 44,
                  height: 44,
                }}
              />
            </View>

            <View>
              <AppText style={styles.doctorName}>{detail.doctor.name}</AppText>

              <AppText style={styles.doctorSpecialty}>{detail.doctor.specialty}</AppText>
            </View>
          </View>

          <DetailRow icon={AppImages.calendarAppt} label="Date & Time" value={detail.dateTime} />

          <DetailRow icon={AppImages.location} label={detail.location} value={detail.address} />

          <DetailRow
            icon={AppImages.doctorSethoscope}
            label="Appointment Type"
            value={detail.type}
          />
        </View>
        <View style={styles.reminderChip}>
          <AppImage containerStyle={styles.reminderBell} source={AppImages.notificationYellow} />
          <AppText style={styles.reminderText}>
            {t('notifications.reminderNote', { days: detail.daysAway })}
          </AppText>
        </View>
      </ScrollView>
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.rescheduleBtn}>
          <AppText style={styles.rescheduleText}>{strings.reschedule}</AppText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.confirmBtn}>
          <AppText style={styles.confirmText}>{strings.confirm}</AppText>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
