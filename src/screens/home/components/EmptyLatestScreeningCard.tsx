import { TouchableOpacity, View } from 'react-native';

import AppImage from '../../../components/AppImage';
import AppText from '../../../components/AppText';
import Card from '../../../components/Card';
import { AppImages } from '../../../constants';
import { useTranslation } from '../../../hooks/useTranslation';
import { useTheme } from '../../../theme';
import { screeningStyles } from '../styles/HomeScreening.styles';

export default function EmptyLatestScreeningCard() {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <Card elevated style={screeningStyles.eyeCareJourneyCard}>
      <View
        style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}
      >
        <View style={{ flex: 1, paddingRight: 12 }}>
          <AppText
            variant="subtitle"
            color={theme.colors.text}
            style={{ fontSize: 18, fontWeight: '700', marginBottom: 10 }}
          >
            {t('home.welcomeText')} 👋
          </AppText>
          <AppText
            variant="body"
            color={theme.colors.textMuted}
            style={{ fontSize: 13, marginBottom: 10 }}
          >
            {t('home.subtitleWelcomeText')}
          </AppText>
          <AppText
            variant="body"
            color={theme.colors.textMuted}
            style={{ fontSize: 13, marginBottom: 16 }}
          >
            {t('home.clinicNotification')}
          </AppText>
          <TouchableOpacity
            style={{
              backgroundColor: theme.colors.primary,
              borderRadius: 30,
              paddingVertical: 12,
              paddingHorizontal: 20,
              flexDirection: 'row',
              alignItems: 'center',
              alignSelf: 'flex-start',
              gap: 8,
            }}
          >
            <AppText style={{ color: '#fff', fontWeight: '700', fontSize: 14 }}>
              {t('home.learnHowItWorks')}
            </AppText>
            <View
              style={{ backgroundColor: 'rgba(255,255,255,0.25)', borderRadius: 99, padding: 4 }}
            >
              <AppText style={{ color: '#fff' }}>›</AppText>
            </View>
          </TouchableOpacity>
        </View>
        <AppImage
          source={AppImages.emptySchedule}
          containerStyle={{ width: 130, height: 150 }}
          contentFit="contain"
          showLoader={false}
        />
      </View>
    </Card>
  );
}
