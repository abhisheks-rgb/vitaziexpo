import React from 'react';
import { View } from 'react-native';

import AppImage from '../../../components/AppImage';
import AppText from '../../../components/AppText';
import Card from '../../../components/Card';
import { AppImages } from '../../../constants';
import { useTranslation } from '../../../hooks/useTranslation';
import { useTheme } from '../../../theme';
import { Colors } from '../../../theme/colors';
import { getAppointmentDetails } from '../data/home.data';
import { createAppointmentStyles } from '../styles/HomeAppointment.styles';

export default function UpcomingAppointmentCard() {
  const theme = useTheme();
  const { t } = useTranslation();

  const styles = createAppointmentStyles(theme);
  const details = getAppointmentDetails(t);

  return (
    <>
      <AppText
        variant="subtitle"
        color={theme.colors.text}
        style={{ marginBottom: 12, fontSize: 16 }}
      >
        {t('home.upcomingAppointment')}
      </AppText>

      <Card elevated style={styles.apptCard}>
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

        <View style={styles.divider} />

        {details.map((row, index) => (
          <View key={index} style={styles.apptRow}>
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
    </>
  );
}
