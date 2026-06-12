import { Feather } from '@expo/vector-icons';
import { TouchableOpacity, View } from 'react-native';

import AppImage from '../../../components/AppImage';
import AppText from '../../../components/AppText';
import ArrowButton from '../../../components/ArrowButton';
import Card from '../../../components/Card';
import { AppImages } from '../../../constants';
import { useTranslation } from '../../../hooks/useTranslation';
import { useTheme } from '../../../theme';
import { Colors } from '../../../theme/colors';
import { createScreeningStyles } from '../styles/HomeScreening.styles';

export default function LatestScreeningCard() {
  const theme = useTheme();
  const { t } = useTranslation();
  const screeningStyles = createScreeningStyles(theme);

  return (
    <>
      <AppText
        variant="subtitle"
        color={theme.colors.textPrimary}
        style={{ marginBottom: 12, fontSize: 16 }}
      >
        {t('home.latestScreening')}
      </AppText>

      <Card elevated noPadding style={screeningStyles.screeningCard}>
        <AppImage
          source={AppImages.retinalImage ?? AppImages.onboarding1}
          containerStyle={screeningStyles.screeningImage}
          contentFit="cover"
          showLoader={false}
        />

        <View style={screeningStyles.screeningFooter}>
          <View style={screeningStyles.screeningFooterLeft}>
            <AppText
              variant="caption"
              color={theme.colors.textPrimary}
              style={screeningStyles.screeningClinic}
            >
              Macula & Retina Center
            </AppText>

            <AppText variant="caption" color={Colors.muted}>
              Monday Jan 20, 2026
            </AppText>
          </View>

          <TouchableOpacity
            style={screeningStyles.visitReviewBtn}
            onPress={() => {}}
            activeOpacity={0.8}
          >
            <AppText
              variant="caption"
              color={Colors.white}
              style={{ fontWeight: '600', marginRight: 8 }}
            >
              {t('home.visitReview')}
            </AppText>

            <ArrowButton />
          </TouchableOpacity>
        </View>

        <View style={screeningStyles.followUp}>
          <View style={screeningStyles.followUpIconCircle}>
            <Feather name="arrow-up-right" size={14} color={Colors.navyDark} />
          </View>

          <AppText variant="caption" color={theme.colors.textPrimary} style={{ fontWeight: '600' }}>
            {t('home.followUpRecommended')}
          </AppText>
        </View>
      </Card>
    </>
  );
}
