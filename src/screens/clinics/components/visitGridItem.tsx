import React from 'react';
import { Text, View } from 'react-native';

import AppImage from '../../../components/AppImage';
import { AppImages } from '../../../constants/AppImages';
import { useTheme } from '../../../theme';
import type { ClinicVisit } from '../data';
import { createVisitStyles } from '../styles/clinicVisits.styles';

type Props = {
  visit: ClinicVisit;
  showImages: boolean;
};

export default function VisitGridItem({ visit, showImages }: Props) {
  const theme = useTheme();
  const styles = createVisitStyles(theme);

  return (
    <View style={styles.visitGridCard}>
      <AppImage
        source={showImages ? visit.image : AppImages.visitPlaceholder}
        containerStyle={showImages ? styles.visitGridImage : styles.visitGridPlaceholder}
        contentFit={showImages ? 'cover' : 'contain'}
        showLoader={false}
      />
      <Text style={styles.visitGridDate}>{visit.date}</Text>
    </View>
  );
}
