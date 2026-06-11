// screens/clinics/ClinicListScreen.tsx
import { useNavigationState } from '@react-navigation/native';
import { useEffect, useMemo, useState } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { fetchAppoinments } from '../../application/appoinments/FetchAppoinment';
import AppHeader from '../../components/AppHeader';
import BackgroundBlobs from '../../components/BackgroundBlobs';
import { useInteractionReady } from '../../hooks/useInteractionReady';
import { useScrollStore } from '../../hooks/useScrollStore';
import { useTranslation } from '../../hooks/useTranslation';
import type { ClinicListScreenProps } from '../../navigation/types';
import { useTheme } from '../../theme';

import ClinicGridItem from './components/clinicGridItem';
import ClinicListItem from './components/clinicListItem';
import EmptyClinicVisitsCard from './components/EmptyClinicVisitsCard';
import { clinics } from './data';
import { createClinicListStyles } from './styles/clinicList.styles';

const ListIcon = ({ color }: { color: string }) => (
  <View style={{ gap: 3, paddingHorizontal: 2 }}>
    {[0, 1, 2].map((i) => (
      <View key={i} style={{ height: 2, width: 18, borderRadius: 1, backgroundColor: color }} />
    ))}
  </View>
);

const GridIcon = ({ color }: { color: string }) => (
  <View style={{ flexDirection: 'row', flexWrap: 'wrap', width: 18, gap: 3 }}>
    {[0, 1, 2, 3].map((i) => (
      <View key={i} style={{ width: 7, height: 7, borderRadius: 1.5, backgroundColor: color }} />
    ))}
  </View>
);

type ViewMode = 'list' | 'grid';

export default function ClinicListScreen({ navigation }: ClinicListScreenProps) {
  const theme = useTheme();
  // Memoize styles so they don't recompute on every render
  const styles = useMemo(() => createClinicListStyles(theme), [theme]);
  const { t } = useTranslation();
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const handleScroll = useScrollStore((state) => state.handleScroll);
  const isReady = useInteractionReady();

  // index === 0 means this screen is the root of the stack (entered via tab)
  const stackIndex = useNavigationState((state) => state.index);
  const showBackButton = stackIndex > 0;

  const isGrid = viewMode === 'grid';
  const activeColor = theme.colors.text;
  const inactiveColor = theme.colors.textMuted;

  const [error, setError] = useState('');

  const [isLoading, setIsLoading] = useState(false);
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
  const toggleRight = (
    <View style={styles.toggleWrap}>
      <TouchableOpacity
        style={[styles.toggleBtn, !isGrid && styles.toggleBtnActive]}
        onPress={() => setViewMode('list')}
        activeOpacity={0.7}
      >
        <ListIcon color={!isGrid ? activeColor : inactiveColor} />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.toggleBtn, isGrid && styles.toggleBtnActive]}
        onPress={() => setViewMode('grid')}
        activeOpacity={0.7}
      >
        <GridIcon color={isGrid ? activeColor : inactiveColor} />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      {/* Defer heavy background render until after nav animation */}
      {isReady && <BackgroundBlobs />}

      <AppHeader
        title={t('yourClinics')}
        titlePosition="left"
        showBackButton={showBackButton}
        onBackPress={() => navigation.goBack()}
        rightComponent={toggleRight}
      />

      <ScrollView
        onScroll={handleScroll}
        style={styles.scroll}
        contentContainerStyle={[
          styles.scrollContent,
          error && {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {error ? (
          <EmptyClinicVisitsCard />
        ) : isGrid ? (
          <View style={styles.clinicGrid}>
            {clinics.map((clinic) => (
              <ClinicGridItem
                key={clinic.id}
                clinic={clinic}
                onPress={() => navigation.navigate('ClinicVisits', { clinicId: clinic.id })}
              />
            ))}
          </View>
        ) : (
          clinics.map((clinic) => (
            <ClinicListItem
              key={clinic.id}
              clinic={clinic}
              onPress={() => navigation.navigate('ClinicVisits', { clinicId: clinic.id })}
            />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
