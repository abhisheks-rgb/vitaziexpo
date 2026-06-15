import { useNavigationState } from '@react-navigation/native';
import { useEffect, useMemo, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { getClinics } from '../../application/clinics/getClinics';
import AppHeader from '../../components/AppHeader';
import BackgroundBlobs from '../../components/BackgroundBlobs';
import SmartList, {
  SmartListToggle,
  SmartListTogglePlacement,
  SmartListViewMode,
} from '../../components/SmartList/SmartList';
import { useInteractionReady } from '../../hooks/useInteractionReady';
import { useTranslation } from '../../hooks/useTranslation';
import type { Clinic } from '../../infrastructure/Clinic/model/clinic';
import type { ClinicListScreenProps } from '../../navigation/types';
import { useTheme } from '../../theme';

import ClinicGridItem from './components/clinicGridItem';
import ClinicListItem from './components/clinicListItem';
import EmptyClinicVisitsCard from './components/EmptyClinicVisitsCard';
import { createClinicListStyles } from './styles/clinicList.styles';

export default function ClinicListScreen({ navigation }: ClinicListScreenProps) {
  const theme = useTheme();
  const styles = useMemo(() => createClinicListStyles(theme), [theme]);
  const { t } = useTranslation();
  const [viewMode, setViewMode] = useState<SmartListViewMode>(SmartListViewMode.List);
  const isReady = useInteractionReady();

  const stackIndex = useNavigationState((state) => state.index);
  const showBackButton = stackIndex > 0;

  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchClinics = async () => {
    setIsLoading(true);
    try {
      const data = await getClinics('123');
      setClinics(data);
    } catch (e: any) {
      console.error(e.message ?? 'Failed to load clinics');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchClinics();
  }, []);

  const renderClinicItem = (clinic: Clinic, _index: number, currentViewMode: SmartListViewMode) => {
    if (currentViewMode === SmartListViewMode.Grid) {
      return (
        <ClinicGridItem
          clinic={clinic}
          onPress={() => navigation.navigate('ClinicVisits', { clinicId: clinic.id })}
        />
      );
    }

    return (
      <ClinicListItem
        clinic={clinic}
        onPress={() => navigation.navigate('ClinicVisits', { clinicId: clinic.id })}
      />
    );
  };

  const toggleRight = (
    <SmartListToggle
      viewMode={viewMode}
      onViewModeChange={setViewMode}
      activeColor={theme.colors.textPrimary}
      inactiveColor={theme.colors.textSecondary}
    />
  );

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      {isReady && <BackgroundBlobs />}

      <AppHeader
        title={t('yourClinics')}
        titlePosition="left"
        showBackButton={showBackButton}
        onBackPress={() => navigation.goBack()}
        rightComponent={toggleRight}
      />

      <SmartList
        data={clinics}
        keyExtractor={(clinic) => clinic.id}
        renderItem={renderClinicItem}
        isLoading={isLoading}
        onRefresh={fetchClinics}
        numColumns={2}
        gridGap={10}
        listPadding={16}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        togglePlacement={SmartListTogglePlacement.None}
        EmptyComponent={<EmptyClinicVisitsCard />}
      />
    </SafeAreaView>
  );
}
