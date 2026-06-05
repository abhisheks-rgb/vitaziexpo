import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import AppImage from '../../../components/AppImage';
import { useTheme } from '../../../theme';
import type { Clinic } from '../data';
import { createClinicListStyles } from '../styles/clinicList.styles';

type Props = {
  clinic: Clinic;
  onPress: () => void;
};

export default function ClinicListItem({ clinic, onPress }: Props) {
  const theme = useTheme();
  const styles = createClinicListStyles(theme);

  return (
    <TouchableOpacity style={styles.clinicCard} activeOpacity={0.75} onPress={onPress}>
      <View style={styles.clinicCardInner}>
        {/* Icon */}
        <View style={styles.clinicIconWrap}>
          <AppImage
            source={clinic.icon}
            containerStyle={{ width: 32, height: 32 }}
            contentFit="contain"
            showLoader={false}
          />
        </View>

        {/* Text */}
        <View style={styles.clinicTextWrap}>
          <Text style={styles.clinicName}>{clinic.name}</Text>
          <Text style={styles.clinicAddress}>{clinic.address}</Text>
        </View>

        {/* Chevron */}
        <View style={styles.chevronWrap}>
          <Text style={styles.chevron}>›</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
