import { Text, TouchableOpacity, View } from 'react-native';

import AppImage from '../../../components/AppImage';
import AppText from '../../../components/AppText';
import ArrowButton from '../../../components/ArrowButton';
import { AppImages } from '../../../constants';
import { useTranslation } from '../../../hooks/useTranslation';
import type { ClinicVisit } from '../../../infrastructure/Clinic/model/clinic';
import { Colors, useTheme } from '../../../theme';
import { createVisitStyles } from '../styles/clinicVisits.styles';

type Props = {
  visit: ClinicVisit & { clinicName?: string };
  showImages: boolean;
  onPress?: () => void;
};

export default function VisitListItem({ visit, showImages, onPress }: Props) {
  const theme = useTheme();
  const styles = createVisitStyles(theme);
  const { t } = useTranslation();

  return (
    <View style={styles.visitListCard}>
      {/* Image or placeholder */}
      <AppImage
        source={showImages ? visit.image : AppImages.visitPlaceholder}
        containerStyle={showImages ? styles.visitListImage : styles.visitListPlaceholder}
        contentFit={showImages ? 'cover' : 'contain'}
        showLoader={false}
      />

      {/* Footer row */}
      <View style={styles.visitListFooter}>
        <View style={styles.visitListTextWrap}>
          {visit.clinicName ? (
            <Text style={styles.visitListClinicName}>{visit.clinicName}</Text>
          ) : null}
          <Text style={styles.visitListDate}>{visit.date}</Text>
        </View>

        <TouchableOpacity style={styles.visitReviewBtn} onPress={onPress} activeOpacity={0.8}>
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
    </View>
  );
}
