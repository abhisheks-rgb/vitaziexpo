import { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { getUpcomingAppointments } from '../../application/appoinments/getUpcomingAppointments';
import BackgroundBlobs from '../../components/BackgroundBlobs';
import type { Appointment } from '../../domain/Appointments/models/Appointment';
import { useScrollStore } from '../../hooks/useScrollStore';
import { apiClient } from '../../infrastructure/api/apiClient';
import type { HomeScreenProps } from '../../navigation/types';
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
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [debugData, setDebugData] = useState<any>(null);

  const styles = createHomeStyles(theme);
  const handleScroll = useScrollStore((state) => state.handleScroll);

  useEffect(() => {
    getAppoinments();
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      // 1. Fetch /users/me
      const meRes = await apiClient.get('/users/me');
      const meData = meRes.data?.data || meRes.data;

      if (meData?.email) {
        // 2. Fetch /users/profile with the email
        const profileRes = await apiClient.get('/users/profile', {
          params: { email: meData.email },
        });
        const profileData = profileRes.data?.body || profileRes.data?.data?.body || profileRes.data;

        setDebugData({
          me: meData,
          profile: profileData,
        });
      } else {
        setDebugData({ me: meData, error: 'No email found in /users/me' });
      }
    } catch (e: any) {
      setDebugData({ error: e.message || 'Failed to fetch user data' });
    }
  };

  const getAppoinments = async () => {
    setError('');
    setIsLoading(true);
    try {
      const data = await getUpcomingAppointments('');
      setAppointments(data);
    } catch (e: any) {
      setError(e.message ?? 'Not implemented');
    } finally {
      setIsLoading(false);
    }
  };

  const hasAppointments = error === '' && appointments.length > 0;

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

        {/* {debugData && (
          <View style={{ margin: 16, padding: 16, backgroundColor: 'rgba(0,0,0,0.05)', borderRadius: 12 }}>
            <AppText variant="caption" style={{ fontWeight: 'bold', marginBottom: 8 }}>
              Debug: User Data
            </AppText>
            <AppText variant="caption" style={{ fontFamily: 'monospace' }}>
              {JSON.stringify(debugData, null, 2)}
            </AppText>
          </View>
        )} */}

        {error === '' ? <ClinicBanner /> : <View />}

        <QuickActionsSection
          onVisitsPress={() => navigation.navigate('Visits', { screen: 'ClinicList' })}
          onAppointmentsPress={() => navigation.navigate('Appointments')}
          onChatHistoryPress={() => navigation.navigate('ChatHistory')}
        />

        {error === '' ? <LatestScreeningCard /> : <EmptyLatestScreeningCard />}

        {hasAppointments ? (
          <UpcomingAppointmentCard
            appointments={appointments}
            isLoading={isLoading}
            onViewAll={() => navigation.navigate('Appointments')}
          />
        ) : (
          <EmptyUpcomingAppointmentCard />
        )}

        <View style={{ height: Spacing.xl }} />
      </ScrollView>

      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
        }}
      />
    </SafeAreaView>
  );
}
