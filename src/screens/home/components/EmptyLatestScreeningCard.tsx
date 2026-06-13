import { useMemo } from 'react';
import { TouchableOpacity, View } from 'react-native';

import AppImage from '../../../components/AppImage';
import AppText from '../../../components/AppText';
import ArrowButton from '../../../components/ArrowButton';
import Card from '../../../components/Card';
import { AppImages, getLogoByTheme } from '../../../constants';
import { useTranslation } from '../../../hooks/useTranslation';
import { Colors, useTheme } from '../../../theme';
import { createEmptyScreeningStyles } from '../styles/EmptyLatestScreeningCard';

export default function EmptyLatestScreeningCard() {
  const theme = useTheme();
  const { t } = useTranslation();
  const emptyScreeningStyles = useMemo(() => createEmptyScreeningStyles(theme), [theme]);

  return (
    <Card elevated style={emptyScreeningStyles.emptyScreeningCard}>
      <View style={emptyScreeningStyles.emptyScreeningBodyView}>
        <View style={{ flex: 1, paddingRight: 12, justifyContent: 'space-between' }}>
          {/* TEXT BLOCK */}
          <View>
            <View style={emptyScreeningStyles.welcomeRow}>
              <AppText
                variant="subtitle"
                color={theme.colors.textPrimary}
                style={emptyScreeningStyles.welcomeText}
              >
                {t('home.welcomeText')}
              </AppText>

              <AppImage
                source={getLogoByTheme(theme.isDark)}
                containerStyle={emptyScreeningStyles.aiIcon}
                contentFit="contain"
              />
            </View>

            <AppText
              variant="body"
              color={theme.colors.textSecondary}
              style={emptyScreeningStyles.subtitleWelcomeText}
            >
              {t('home.subtitleWelcomeText')}
            </AppText>

            <AppText
              variant="body"
              color={theme.colors.textSecondary}
              style={emptyScreeningStyles.clinicNotificationText}
            >
              {t('home.clinicNotification')}
            </AppText>
          </View>

          {/* BUTTON */}
          <TouchableOpacity style={emptyScreeningStyles.learnHowItWorksButton} activeOpacity={0.8}>
            <AppText
              variant="caption"
              color={Colors.white}
              style={{ fontWeight: '600', marginRight: 8 }}
            >
              {t('home.learnHowItWorks')}
            </AppText>

            <ArrowButton />
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
