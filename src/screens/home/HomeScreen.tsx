import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import BackgroundBlobs from '../../components/BackgroundBlobs';
import { useTranslation } from '../../hooks/useTranslation';
import { useTheme } from '../../theme';
import { Spacing } from '../../theme/spacing';

import { TabKey } from './components/BottomTabBar';
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

  const [activeTab, setActiveTab] = useState<TabKey>('Home');

  const handleTabPress = (key: TabKey) => {
    setActiveTab(key);

    if (key === 'Visits') {
      navigation.navigate('ClinicList');
    } else if (key === 'Education') {
      navigation.navigate('Education');
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

        <QuickActionsSection
          onVisitsPress={() => navigation.navigate('ClinicList')}
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
      >
        {/* <BottomTabBar active={activeTab} onPress={handleTabPress} /> */}
      </View>
    </SafeAreaView>
  );
}
