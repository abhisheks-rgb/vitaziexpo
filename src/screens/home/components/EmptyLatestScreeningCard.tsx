import { View } from 'react-native';

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
    <>
    <Card elevated style={screeningStyles.eyeCareJourneyCard}>

      <View style={screeningStyles.screeningFooter}>
         <View style={screeningStyles.screeningFooterLeft}>
<AppText
        variant="subtitle"
        color={theme.colors.text}
        style={{ marginBottom: 5, fontSize: 16 }}
      >
        {t('home.welcomeText')}
      </AppText>
      <AppText
        variant="body"
        color={theme.colors.text}
        style={{ marginBottom: 5, fontSize: 12 }}
      >
        {t('home.eyeHealth')}
      </AppText>
      <AppText
        variant="body"
        color={theme.colors.text}
        style={{ marginBottom: 5, fontSize: 12 }}
      >
        {t('home.subtitleWelcomeText')}
      </AppText>
      </View>

   <AppImage source={AppImages.emptySchedule} containerStyle={{ width: 120,
    height:120,}}
            contentFit="contain"
            showLoader={false} />

      </View>


      </Card>
    </>
  );
}
