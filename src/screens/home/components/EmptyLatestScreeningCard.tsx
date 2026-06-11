import { TouchableOpacity, View } from 'react-native';

import AppImage from '../../../components/AppImage';
import AppText from '../../../components/AppText';
import Card from '../../../components/Card';
import { AppImages } from '../../../constants';
import { useTranslation } from '../../../hooks/useTranslation';
import { useTheme } from '../../../theme';
import { emptyScreeningStyles } from '../styles/EmptyLatestScreeningCard';

export default function EmptyLatestScreeningCard() {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <Card elevated style={emptyScreeningStyles.emptyScreeningCard}>
      <View
        style={emptyScreeningStyles.emptyScreeningBodyView}
      >
        <View style={{ flex: 1, paddingRight: 12 }}>
          <AppText
            variant="subtitle"
            color={theme.colors.text}
            style={emptyScreeningStyles.welcomeText}
          >
            {t('home.welcomeText')} 👋
          </AppText>
          <AppText
            variant="body"
            color={theme.colors.textMuted}
            style={emptyScreeningStyles.subtitleWelcomeText}
          >
            {t('home.subtitleWelcomeText')}
          </AppText>
          <AppText
            variant="body"
            color={theme.colors.textMuted}
            style={emptyScreeningStyles.clinicNotificationText}
          >
            {t('home.clinicNotification')}
          </AppText>
          <TouchableOpacity
            style={emptyScreeningStyles.learnHowItWorksButton}
          >
            <AppText style={emptyScreeningStyles.learnHowItWorksText}>
              {t('home.learnHowItWorks')}
            </AppText>
            <View
              style={emptyScreeningStyles.arrowCircle}
            >
              <AppText style={emptyScreeningStyles.arrowText}>›</AppText>
            </View>
          </TouchableOpacity>
        </View>
        <AppImage
          source={AppImages.emptySchedule}
          containerStyle={emptyScreeningStyles.emptyScheduleImage}
          contentFit="contain"
          showLoader={false}
        />
      </View>
    </Card>
  );
}
