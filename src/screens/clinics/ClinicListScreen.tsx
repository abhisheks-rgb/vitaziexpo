import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import AppHeader from '../../components/AppHeader';
import AppImage from '../../components/AppImage';
import BackgroundBlobs from '../../components/BackgroundBlobs';
import { useTranslation } from '../../hooks/useTranslation';
import type { ClinicListScreenProps } from '../../navigation/types';
import { useTheme } from '../../theme';
import { clinics } from './data';
import { createStyles } from './styles';

export default function ClinicListScreen({ navigation }: ClinicListScreenProps) {
  const theme = useTheme();
  const styles = createStyles(theme);
  const { t } = useTranslation();

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <BackgroundBlobs />
      {/* Header */}
      <AppHeader
        title={t('yourClinics')}
        titlePosition="left"
        showBackButton
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {clinics.map((clinic) => (
          <TouchableOpacity
            key={clinic.id}
            style={styles.clinicCard}
            activeOpacity={0.75}
            onPress={() =>
              navigation.navigate('ClinicVisits', {
                clinicId: clinic.id,
              })
            }
          >
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
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
