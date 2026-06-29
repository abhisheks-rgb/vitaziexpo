import { useEffect, useState } from 'react';
import { Switch, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { getClinicDetails } from '../../application/clinics/getClinics';
import AppHeader from '../../components/AppHeader';
import BackgroundBlobs from '../../components/BackgroundBlobs';
import SmartList, {
  SmartListTogglePlacement,
  SmartListViewMode,
} from '../../components/SmartList/SmartList';
import { useTranslation } from '../../hooks/useTranslation';
import type { Clinic, ClinicVisit } from '../../infrastructure/Clinic/model/clinic';
import type { ClinicVisitsScreenProps } from '../../navigation/types';
import { useTheme } from '../../theme';

import EmptyClinicVisitsCard from './components/EmptyClinicVisitsCard';
import VisitGridItem from './components/visitGridItem';
import VisitListItem from './components/visitListItem';
import { createVisitStyles } from './styles/clinicVisits.styles';

export default function ClinicVisitsScreen({ route, navigation }: ClinicVisitsScreenProps) {
  const [clinic, setClinic] = useState<Clinic>({} as Clinic);
  const [isLoading, setIsLoading] = useState(false);
  const [showImages, setShowImages] = useState(true);

  const [viewMode, setViewMode] = useState<SmartListViewMode>(SmartListViewMode.List);

  const theme = useTheme();
  const styles = createVisitStyles(theme);
  const { t } = useTranslation();

  useEffect(() => {
    fetchClinicDetails();
  }, []);

  const fetchClinicDetails = async () => {
    setIsLoading(true);
    setClinic({} as Clinic);

    try {
      const details = await getClinicDetails('', route.params.clinicId);
      setClinic(details);
    } catch (e: any) {
      console.error(e.message ?? 'Failed to load clinic');
    } finally {
      setIsLoading(false);
    }
  };

  const renderVisitItem = (
    visit: ClinicVisit,
    _index: number,
    currentViewMode: SmartListViewMode,
  ) => {
    if (currentViewMode === SmartListViewMode.Grid) {
      return <VisitGridItem visit={visit} showImages={showImages} />;
    }

    return (
      <VisitListItem
        visit={{
          ...visit,
          clinicName: clinic.name,
        }}
        showImages={showImages}
        onPress={() =>
          navigation.navigate('ReportDetails', {
            reportId: visit.id,
          })
        }
      />
    );
  };

  const ImagesSwitch = (
    <View style={styles.imagesToggleWrap}>
      <Switch
        style={{
          transform: [{ scaleX: 0.75 }, { scaleY: 0.75 }],
        }}
        value={showImages}
        onValueChange={setShowImages}
        trackColor={{
          false: '#D1D5DB',
          true: theme.colors.accent,
        }}
        thumbColor="#FFFFFF"
        ios_backgroundColor="#D1D5DB"
      />
      <Text style={styles.imagesToggleLabel}>{t('images')}</Text>
    </View>
  );

  const isGrid = viewMode === SmartListViewMode.Grid;

  const activeColor = theme.colors.textPrimary;
  const inactiveColor = theme.colors.textSecondary;

  function ListIcon({ color }: { color: string }) {
    return (
      <View style={{ gap: 3, paddingHorizontal: 2 }}>
        {[0, 1, 2].map((i) => (
          <View
            key={i}
            style={{
              height: 2,
              width: 18,
              borderRadius: 1,
              backgroundColor: color,
            }}
          />
        ))}
      </View>
    );
  }

  function GridIcon({ color }: { color: string }) {
    return (
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          width: 18,
          gap: 3,
        }}
      >
        {[0, 1, 2, 3].map((i) => (
          <View
            key={i}
            style={{
              width: 7,
              height: 7,
              borderRadius: 1.5,
              backgroundColor: color,
            }}
          />
        ))}
      </View>
    );
  }

  const toggleRight = (
    <View style={styles.toggleWrap}>
      <TouchableOpacity
        style={[styles.toggleBtn, !isGrid && styles.toggleBtnActive]}
        onPress={() => setViewMode(SmartListViewMode.List)}
        activeOpacity={0.7}
        accessibilityLabel="List View"
      >
        <ListIcon color={!isGrid ? activeColor : inactiveColor} />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.toggleBtn, isGrid && styles.toggleBtnActive]}
        onPress={() => setViewMode(SmartListViewMode.Grid)}
        activeOpacity={0.7}
        accessibilityLabel="Grid View"
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

      <SmartList
        data={clinic.visits ?? []}
        keyExtractor={(visit) => visit.id}
        renderItem={renderVisitItem}
        isLoading={isLoading}
        onRefresh={fetchClinicDetails}
        numColumns={2}
        gridGap={10}
        listPadding={16}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        subHeaderPaddingHorizontal={16}
        subHeaderBlurIntensity={80}
        subHeaderBlurFadeDistance={60}
        togglePlacement={SmartListTogglePlacement.External}
        stickySubHeader
        subHeaderElevation={4}
        EmptyComponent={<EmptyClinicVisitsCard />}
        subHeaderLeft={<Text style={styles.visitHistoryTitle}>{t('visitHistory')}</Text>}
        subHeaderRight={ImagesSwitch}
      />
    </SafeAreaView>
  );
}
