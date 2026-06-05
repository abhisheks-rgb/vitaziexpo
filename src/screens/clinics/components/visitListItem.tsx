import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import AppImage from '../../../components/AppImage';
import { AppImages } from '../../../constants';
import { useTheme } from '../../../theme';
import type { ClinicVisit } from '../data';
import { createVisitStyles } from '../styles/clinicVisits.styles';

type Props = {
  visit: ClinicVisit & { clinicName?: string };
  showImages: boolean;
  onPress?: () => void;
};

export default function VisitListItem({ visit, showImages, onPress }: Props) {
  const theme = useTheme();
  const styles = createVisitStyles(theme);

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

        <TouchableOpacity style={styles.visitReviewBtn} activeOpacity={0.8} onPress={onPress}>
          <Text style={styles.visitReviewBtnText}>Visit Review</Text>
          <View style={styles.visitReviewChevron}>
            <Text style={styles.visitReviewChevronText}>›</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
