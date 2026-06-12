import { useMemo, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppHeader from '../../components/AppHeader';
import BackgroundBlobs from '../../components/BackgroundBlobs';
import { useInteractionReady } from '../../hooks/useInteractionReady';
import { useTheme } from '../../theme';
import { createCommonStyles } from '../../theme/styles';
import AppointmentCard from './components/AppointmentCard/AppointmentCard';
import AppointmentDetailsScreen from './components/AppointmentDetails/AppointmentDetailsScreen';
import AppointmentTabBar from './components/AppointmentTabBar/AppointmentTabBar';
import { useAppointments } from './hooks/useAppointments';
import type { Appointment } from './types/appointments.types';

export default function AppointmentsScreen({ navigation }: { navigation: any }) {
  const theme = useTheme();
  const common = createCommonStyles(theme);
  const { activeTab, setActiveTab, appointments } = useAppointments();
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const isReady = useInteractionReady();

  // Light blue tint — specific to this screen, same as AI Assistant
  const screenStyle = useMemo(() => [common.screen, { backgroundColor: '#EBF0F7' }], [theme]);

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
        style={common.scroll}
        contentContainerStyle={{ paddingTop: theme.spacing.xs }}
        showsVerticalScrollIndicator={false}
      >
        {appointments.map((appt) => (
          <AppointmentCard key={appt.id} appointment={appt} onPress={setSelectedAppointment} />
        ))}
        <View style={{ height: theme.spacing.lg }} />
      </ScrollView>
    </SafeAreaView>
  );
}
