import { View } from 'react-native';

import AppImage from '../../../components/AppImage';
import AppText from '../../../components/AppText';
import Card from '../../../components/Card';
import { AppImages } from '../../../constants';
import { useTheme } from '../../../theme';
import { createEmptyStyles } from '../styles/emptyClinic.styles';

export default function EmptyClinicVisitsCard() {
  const theme = useTheme();
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
          No Visit Records Yet
        </AppText>

        <AppText style={emptyStyles.subtitle} color={theme.colors.textSecondary}>
          Your retinal screening visits will be listed here once a clinic submits your report.
        </AppText>
      </View>
    </Card>
  );
}
