import { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { fetchAppoinments } from '../../application/appoinments/FetchAppoinment';
import BackgroundBlobs from '../../components/BackgroundBlobs';
import { useScrollStore } from '../../hooks/useScrollStore';
import { useTranslation } from '../../hooks/useTranslation';
import { HomeScreenProps } from '../../navigation/types';
import { useTheme } from '../../theme';
import { Spacing } from '../../theme/spacing';

import ClinicBanner from './components/ClinicBanner';
import EmptyLatestScreeningCard from './components/EmptyLatestScreeningCard';
import EmptyUpcomingAppointmentCard from './components/EmptyUpcomingAppointmentCard';
import HomeHeader from './components/HomeHeader';
import LatestScreeningCard from './components/LatestScreeningCard';
import QuickActionsSection from './components/QuickActionsSection';
import UpcomingAppointmentCard from './components/UpcomingAppointmentCard';
import { createHomeStyles } from './styles/Home.styles';

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const theme = useTheme();
  const { t } = useTranslation();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const styles = createHomeStyles(theme);
  const handleScroll = useScrollStore((state) => state.handleScroll);
  useEffect(() => {
    getAppoinments();
  }, []);
  const getAppoinments = async () => {
    setError('');
    setIsLoading(true);
    try {
      await fetchAppoinments();
      console.log('Appoinments fetched successfully');
    } catch (e: any) {
      console.log('e.message');
      setError(e.message ?? 'Not implemented');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <BackgroundBlobs />

      <ScrollView
        onScroll={handleScroll}
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <HomeHeader />
        {error === '' ? <ClinicBanner /> : <View></View>}

        <QuickActionsSection
          onVisitsPress={() => navigation.navigate('Visits', { screen: 'ClinicList' })}
          onAppointmentsPress={() => navigation.navigate('Appointments')}
          onChatHistoryPress={() => navigation.navigate('ChatHistory')}
        />
        {error === '' ? <LatestScreeningCard /> : <EmptyLatestScreeningCard />}

        {error === '' ? <UpcomingAppointmentCard /> : <EmptyUpcomingAppointmentCard />}

        <View style={{ height: Spacing.xl }} />
      </ScrollView>

      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
        }}
      ></View>
    </SafeAreaView>
  );
}
