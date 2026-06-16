import { useEffect, useMemo, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  getPastAppointments,
  getUpcomingAppointments,
} from '../../application/appoinments/getUpcomingAppointments';
import AppHeader from '../../components/AppHeader';
import BackgroundBlobs from '../../components/BackgroundBlobs';
import SmartList, { SmartListTogglePlacement } from '../../components/SmartList/SmartList';
import type { Appointment } from '../../domain/Appointments/models/Appointment';
import { useInteractionReady } from '../../hooks/useInteractionReady';
import { useTheme } from '../../theme';
import { createCommonStyles } from '../../theme/styles';

import AppointmentCard from './components/AppointmentCard/AppointmentCard';
import AppointmentDetailsScreen from './components/AppointmentDetails/AppointmentDetailsScreen';
import AppointmentTabBar from './components/AppointmentTabBar/AppointmentTabBar';

// ─── Hook ─────────────────────────────────────────────────────────────────────

function useAppointments() {
  const [activeTab, setActiveTab] = useState<'Upcoming' | 'Past'>('Upcoming');
  const [upcoming, setUpcoming] = useState<Appointment[]>([]);
  const [past, setPast] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchAll = async () => {
    setIsLoading(true);
    setError('');
    try {
      const [upcomingData, pastData] = await Promise.all([
        getUpcomingAppointments(''),
        getPastAppointments(''),
      ]);
      setUpcoming(upcomingData);
      setPast(pastData);
    } catch (e: any) {
      setError(e.message ?? 'Failed to load appointments');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const appointments = activeTab === 'Upcoming' ? upcoming : past;

  return { activeTab, setActiveTab, appointments, isLoading, error, refresh: fetchAll };
}

// ─── Screen ───────────────────────────────────────────────────────────────────

export default function AppointmentsScreen({ navigation }: { navigation: any }) {
  const theme = useTheme();
  const common = createCommonStyles(theme);
  const { activeTab, setActiveTab, appointments, isLoading, error, refresh } = useAppointments();
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const isReady = useInteractionReady();

  const screenStyle = useMemo(() => [common.screen], [theme]);

  if (selectedAppointment) {
    return (
      <AppointmentDetailsScreen
        appointment={selectedAppointment}
        navigation={{ goBack: () => setSelectedAppointment(null) }}
      />
    );
  }

  return (
    <SafeAreaView style={screenStyle} edges={['top']}>
      {isReady && <BackgroundBlobs />}

      <AppHeader
        title="Appointments"
        titlePosition="left"
        showBackButton
        onBackPress={() => navigation.goBack()}
      />

      {/* Tab bar sits above the list, outside SmartList */}
      <AppointmentTabBar activeTab={activeTab} onTabChange={setActiveTab} />

      <SmartList
        data={appointments}
        keyExtractor={(appt) => appt.id}
        renderItem={(appt) => (
          <AppointmentCard appointment={appt} onPress={setSelectedAppointment} />
        )}
        isLoading={isLoading}
        onRefresh={refresh}
        togglePlacement={SmartListTogglePlacement.External}
        listPadding={0}
        emptyMessage={
          error
            ? error
            : activeTab === 'Upcoming'
              ? 'No upcoming appointments'
              : 'No past appointments'
        }
        contentContainerStyle={{ paddingTop: theme.spacing.xs }}
      />
    </SafeAreaView>
  );
}
