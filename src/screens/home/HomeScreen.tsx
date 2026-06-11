import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import BackgroundBlobs from '../../components/BackgroundBlobs';
import { useScrollStore } from '../../hooks/useScrollStore';
import { useTranslation } from '../../hooks/useTranslation';
import { useTheme } from '../../theme';
import { Spacing } from '../../theme/spacing';

import ClinicBanner from './components/ClinicBanner';
import HomeHeader from './components/HomeHeader';
import LatestScreeningCard from './components/LatestScreeningCard';
import QuickActionsSection from './components/QuickActionsSection';
import UpcomingAppointmentCard from './components/UpcomingAppointmentCard';
import { createHomeStyles } from './styles/Home.styles';

export default function HomeScreen({ navigation }: { navigation: any }) {
  const theme = useTheme();
  const { t } = useTranslation();

  const styles = createHomeStyles(theme);
  const handleScroll = useScrollStore((state) => state.handleScroll);

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <BackgroundBlobs />

      <ScrollView
        onScroll={handleScroll}
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <HomeHeader navigation={navigation} />

        <ClinicBanner />

        <QuickActionsSection
          onVisitsPress={() => navigation.navigate('Visits', { screen: 'ClinicList' })}
          onAppointmentsPress={() => navigation.navigate('Appointments')}
          onChatHistoryPress={() => navigation.navigate('ChatHistory')}
        />

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
      ></View>
    </SafeAreaView>
  );
}
