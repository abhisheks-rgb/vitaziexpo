import { View } from 'react-native';

import AppImage from '../../../components/AppImage';
import AppText from '../../../components/AppText';
import Card from '../../../components/Card';
import { AppImages } from '../../../constants';
import { useTranslation } from '../../../hooks/useTranslation';
import { useTheme } from '../../../theme';
import { createEmptyStyles } from '../styles/emptyEducation.styles';

export default function EmptyEducationListCard() {
  const theme = useTheme();
  const { t } = useTranslation();
  const emptyStyles = createEmptyStyles(theme);

  return (
    <Card elevated style={emptyStyles.card}>
      <View style={emptyStyles.container}>
        <AppImage
          source={AppImages.noVisits} // use your illustration
          containerStyle={emptyStyles.image}
          contentFit="contain"
        />

        <AppText style={emptyStyles.title} color={theme.colors.textPrimary}>
          {t('noEducationList')}
        </AppText>

        <AppText style={emptyStyles.subtitle} color={theme.colors.textSecondary}>
          {t('noEducationListBody')}
        </AppText>
      </View>
    </Card>
  );
}
