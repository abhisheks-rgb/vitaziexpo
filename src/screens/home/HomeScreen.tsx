import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import BackgroundBlobs from '../../components/BackgroundBlobs';
import { useTranslation } from '../../hooks/useTranslation';
import type { HomeScreenProps } from '../../navigation/types';
import { useTheme } from '../../theme';
import { Spacing } from '../../theme/spacing';

import BottomTabBar, { TabKey } from './components/BottomTabBar';
import ClinicBanner from './components/ClinicBanner';
import HomeHeader from './components/HomeHeader';
import LatestScreeningCard from './components/LatestScreeningCard';
import QuickActionsSection from './components/QuickActionsSection';
import UpcomingAppointmentCard from './components/UpcomingAppointmentCard';

import { createHomeStyles } from './styles/Home.styles';

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const theme = useTheme();
  const { t } = useTranslation();

  const styles = createHomeStyles(theme);

  const [activeTab, setActiveTab] = useState<TabKey>('home');

  const handleTabPress = (key: TabKey) => {
    setActiveTab(key);

    if (key === 'visits') {
      navigation.navigate('ClinicList');
    }
  };

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <BackgroundBlobs />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <HomeHeader navigation={navigation} />

        <ClinicBanner />

        <QuickActionsSection onVisitsPress={() => navigation.navigate('ClinicList')} />

        <LatestScreeningCard />

        <UpcomingAppointmentCard />

        <View style={{ height: Spacing.xl }} />
      </ScrollView>

      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
        }}
      >
        <BottomTabBar active={activeTab} onPress={handleTabPress} />
      </View>
    </SafeAreaView>
  );
}
