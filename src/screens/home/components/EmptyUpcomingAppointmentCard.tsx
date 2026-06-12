import { View } from 'react-native';

import AppImage from '../../../components/AppImage';
import AppText from '../../../components/AppText';
import Card from '../../../components/Card';
import { AppImages } from '../../../constants';
import { useTranslation } from '../../../hooks/useTranslation';
import { Spacing, useTheme } from '../../../theme';

// EmptyUpcomingAppointmentCard.tsx
export default function EmptyUpcomingAppointmentCard() {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <Card elevated style={{ padding: Spacing.md, marginBottom: Spacing.md }}>
      <AppText variant="subtitle" style={{ fontSize: 16, fontWeight: '700', marginBottom: 16 }}>
        {t('home.appointmentsTitle')}
      </AppText>
      <View style={{ alignItems: 'center', paddingVertical: 16 }}>
        <AppImage
          source={AppImages.noUpcomingAppointments}
          containerStyle={{ width: 100, height: 100 }}
          contentFit="contain"
          showLoader={false}
        />
        <AppText
          style={{
            fontSize: 14,
            color: theme.colors.textPrimary,
            marginTop: 12,
            textAlign: 'center',
          }}
        >
          {t('home.noAppointmentsYet')}
        </AppText>
        <AppText
          style={{
            fontSize: 13,
            color: theme.colors.textSecondary,
            textAlign: 'center',
            marginTop: 4,
          }}
        >
          {t('home.noAppointmentsClinicNote')}
        </AppText>
      </View>
    </Card>
  );
}
