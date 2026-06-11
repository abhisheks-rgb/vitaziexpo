
import { View } from 'react-native';
import AppImage from '../../../components/AppImage';
import AppText from '../../../components/AppText';
import Card from '../../../components/Card';
import { AppImages } from '../../../constants';
import { useTranslation } from '../../../hooks/useTranslation';
import { Spacing, useTheme } from '../../../theme';
import { Colors } from '../../../theme/colors';
import { getAppointmentDetails } from '../data/home.data';
import { createAppointmentStyles } from '../styles/HomeAppointment.styles';

export default function EmptyUpcomingAppointmentCard() {
  const theme = useTheme();
  const { t } = useTranslation();

  const styles = createAppointmentStyles(theme);
  const details = getAppointmentDetails(t);

  return (
    <>
    <Card elevated style={{
          gap: Spacing.sm,
          padding: Spacing.md
    }}>
      <AppText
        variant="subtitle"
        color={theme.colors.text}
        style={{ marginBottom: 12, fontSize: 16, alignContent: 'flex-start' }}
      >
        {t('home.upcomingAppointment')}
      </AppText>
      <View style={{
          justifyContent: 'center',
          alignItems: 'center',
      }}>

        <AppImage source={AppImages.noUpcomingAppointments} containerStyle={{ width: 120,
    height:120,}}
            contentFit="contain"
            showLoader={false} />
        <AppText variant="body" color={Colors.muted} style={{ marginBottom: 12, fontSize: 14 }}>
          {t('home.noUpcomingAppointments')}
        </AppText>
      </View>
      </Card>
    </>
  );
}
