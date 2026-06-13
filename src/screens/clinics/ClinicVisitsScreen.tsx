import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Switch, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { getClinicDetails } from '../../application/clinics/getClinics';
import AppHeader from '../../components/AppHeader';
import BackgroundBlobs from '../../components/BackgroundBlobs';
import { useScrollStore } from '../../hooks/useScrollStore';
import { useTranslation } from '../../hooks/useTranslation';
import type { Clinic } from '../../infrastructure/Clinic/model/clinic';
import type { ClinicVisitsScreenProps } from '../../navigation/types';
import { useTheme } from '../../theme';

import EmptyClinicVisitsCard from './components/EmptyClinicVisitsCard';
import VisitGridItem from './components/visitGridItem';
import VisitListItem from './components/visitListItem';
import { createVisitStyles } from './styles/clinicVisits.styles';

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

export default function ClinicVisitsScreen({ route, navigation }: ClinicVisitsScreenProps) {
  const [error, setError] = useState('');
  const [clinic, setClient] = useState<Clinic>({} as Clinic);
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();
  const styles = createVisitStyles(theme);
  const { t } = useTranslation();
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [showImages, setShowImages] = useState(true);
  const handleScroll = useScrollStore((state) => state.handleScroll);

  useEffect(() => {
    fetchClinicDetails();
  }, []);
  const fetchClinicDetails = async () => {
    setError('');
    setIsLoading(true);
    setClient({} as Clinic);
    try {
      console.log('Clinic details fetched successfully');
      const clientDetails = await getClinicDetails('', route.params.clinicId);
      console.log('Clinic details fetched successfully');
      setClient(clientDetails);
    } catch (e: any) {
      console.log('e.message');
      setError(e.message ?? 'Not implemented');
    } finally {
      setIsLoading(false);
    }
  };

  const isGrid = viewMode === 'grid';
  const activeColor = theme.colors.textPrimary;
  const inactiveColor = theme.colors.textSecondary;

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
      <BackgroundBlobs />

      <AppHeader
        title={t('visits')}
        titlePosition="left"
        showBackButton
        onBackPress={() => navigation.goBack()}
        rightComponent={toggleRight}
      />
      {isLoading ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      ) : clinic.visits.length === 0 ? (
        <EmptyClinicVisitsCard />
      ) : (
        <ScrollView
          onScroll={handleScroll}
          style={styles.scroll}
          contentContainerStyle={isGrid ? styles.scrollContentGrid : styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Visit History heading + Images toggle */}
          <View style={styles.visitHistoryRow}>
            <Text style={styles.visitHistoryTitle}>{t('visitHistory')}</Text>
            <View style={styles.imagesToggleWrap}>
              <Switch
                style={{ transform: [{ scaleX: 0.75 }, { scaleY: 0.75 }] }}
                value={showImages}
                onValueChange={setShowImages}
                trackColor={{ false: '#D1D5DB', true: theme.colors.accent }}
                thumbColor={'#FFFFFF'}
                ios_backgroundColor={'#D1D5DB'}
              />
              <Text style={styles.imagesToggleLabel}>{t('images')}</Text>
            </View>
          </View>

          {isGrid ? (
            <View style={styles.visitGrid}>
              {clinic.visits.map((visit) => (
                <VisitGridItem key={visit.id} visit={visit} showImages={showImages} />
              ))}
            </View>
          ) : (
            clinic.visits.map((visit) => (
              <VisitListItem
                key={visit.id}
                visit={{ ...visit, clinicName: clinic.name }}
                showImages={showImages}
                onPress={() => {
                  navigation.navigate('ReportDetails', { reportId: visit.id });
                }}
              />
            ))
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
