// File: Appointments/AppointmentsScreen.tsx
import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppHeader from '../../components/AppHeader';
import BackgroundBlobs from '../../components/BackgroundBlobs';
import { useInteractionReady } from '../../hooks/useInteractionReady';
import { useTheme } from '../../theme';
import AppointmentCard from './components/AppointmentCard/AppointmentCard';
import AppointmentDetailsScreen from './components/AppointmentDetails/AppointmentDetailsScreen';
import AppointmentTabBar from './components/AppointmentTabBar/AppointmentTabBar';
import { useAppointments } from './hooks/useAppointments';
import type { Appointment } from './types/appointments.types';

export default function AppointmentsScreen({ navigation }: { navigation: any }) {
  const theme = useTheme();
  const { activeTab, setActiveTab, appointments } = useAppointments();
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const isReady = useInteractionReady();

  const screenStyle = useMemo(() => [styles.screen, { backgroundColor: '#EBF0F7' }], []);

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
      <AppointmentTabBar activeTab={activeTab} onTabChange={setActiveTab} />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {appointments.map((appt) => (
          <AppointmentCard key={appt.id} appointment={appt} onPress={setSelectedAppointment} />
        ))}
        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 4,
  },
});
