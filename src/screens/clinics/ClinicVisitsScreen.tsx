import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import AppHeader from '../../components/AppHeader';
import AppImage from '../../components/AppImage';
import BackgroundBlobs from '../../components/BackgroundBlobs';
import { useTranslation } from '../../hooks/useTranslation';
import type { ClinicVisitsScreenProps } from '../../navigation/types';
import { useTheme } from '../../theme';
import { clinics } from './data';
import { createStyles } from './styles';

export default function ClinicVisitsScreen({ route, navigation }: ClinicVisitsScreenProps) {
  const theme = useTheme();
  const styles = createStyles(theme);
  const { t } = useTranslation();

  const clinic = clinics.find((c) => c.id === route.params.clinicId);

  if (!clinic) return null;

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <BackgroundBlobs />
      {/* Header */}
      <AppHeader
        title={t('visits')}
        titlePosition="left"
        showBackButton
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Clinic name + address */}
        <Text style={styles.visitsClinicName}>{clinic.name}</Text>
        <Text style={styles.visitsClinicAddress}>{clinic.address}</Text>

        {/* 2-column visit grid */}
        <View style={styles.visitsGrid}>
          {clinic.visits.map((visit) => (
            <View key={visit.id} style={styles.visitCard}>
              <AppImage
                source={visit.image}
                containerStyle={styles.visitImage}
                contentFit="cover"
                showLoader={false}
              />
              <Text style={styles.visitDate}>{visit.date}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
