import React from 'react';
import { View } from 'react-native';

import AppImage from '../../../components/AppImage';
import AppText from '../../../components/AppText';
import Card from '../../../components/Card';
import { AppImages } from '../../../constants';
import { useTranslation } from '../../../hooks/useTranslation';
import { useTheme } from '../../../theme';
import { Colors } from '../../../theme/colors';

import { clinicStyles } from '../styles/HomeClinic.styles';

export default function ClinicBanner() {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
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
  );
}
