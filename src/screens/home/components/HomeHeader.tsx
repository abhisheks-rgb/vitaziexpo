import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import AppImage from '../../../components/AppImage';
import AppText from '../../../components/AppText';
import { AppImages } from '../../../constants';
import { useTranslation } from '../../../hooks/useTranslation';
import type { HomeScreenProps } from '../../../navigation/types';
import { useTheme } from '../../../theme';
import { Colors } from '../../../theme/colors';

import { createHeaderStyles } from '../styles/HomeHeader.styles';

interface Props {
  navigation: HomeScreenProps['navigation'];
}

export default function HomeHeader({ navigation }: Props) {
  const theme = useTheme();
  const { t } = useTranslation();

  const styles = createHeaderStyles(theme);

  return (
    <View style={styles.header}>
      <View>
        <AppText variant="caption" style={styles.greeting} color={Colors.muted}>
          {t('home.greetingMorning')}
        </AppText>

        <AppText variant="subtitle" color={theme.colors.text} style={styles.name}>
          Betty Steward
        </AppText>
      </View>

      <View style={styles.headerRight}>
        <TouchableOpacity>
          <AppImage source={AppImages.searchAi} containerStyle={styles.headerIcon} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
          <AppImage source={AppImages.notification} containerStyle={styles.headerIcon} />
        </TouchableOpacity>

        <AppImage
          source={AppImages.avatar ?? AppImages.logoDark}
          containerStyle={styles.avatar}
          contentFit="cover"
          showLoader={false}
        />
      </View>
    </View>
  );
}
