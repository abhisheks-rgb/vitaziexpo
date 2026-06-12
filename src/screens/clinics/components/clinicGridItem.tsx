import { Text, TouchableOpacity, View } from 'react-native';

import AppImage from '../../../components/AppImage';
import { Clinic } from '../../../infrastructure/Clinic/model/clinic';
import { useTheme } from '../../../theme';
import { createClinicListStyles } from '../styles/clinicList.styles';

type Props = {
  clinic: Clinic;
  onPress: () => void;
};

export default function ClinicGridItem({ clinic, onPress }: Props) {
  const theme = useTheme();
  const styles = createClinicListStyles(theme);

  return (
    <TouchableOpacity style={styles.clinicGridCard} activeOpacity={0.75} onPress={onPress}>
      {/* Icon area */}
      <View style={styles.clinicGridIconWrap}>
        <AppImage
          source={clinic.icon}
          containerStyle={{ width: 48, height: 48 }}
          contentFit="contain"
          showLoader={false}
        />
      </View>

      {/* Text */}
      <View style={styles.clinicGridTextWrap}>
        <Text style={styles.clinicGridName} numberOfLines={1}>
          {clinic.name}
        </Text>
        <Text style={styles.clinicGridAddress} numberOfLines={2}>
          {clinic.address}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
