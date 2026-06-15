import { useEffect, useMemo, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { getEducationList } from '../../application/education/getEducation';
import AppHeader from '../../components/AppHeader';
import BackgroundBlobs from '../../components/BackgroundBlobs';
import SmartList, {
  SmartListToggle,
  SmartListTogglePlacement,
  SmartListViewMode,
} from '../../components/SmartList/SmartList';
import type { EducationMaterial } from '../../domain/education/models/educationMaterial';
import { useTranslation } from '../../hooks/useTranslation';
import { useTheme } from '../../theme';

import EmptyEducationListCard from './components/EmptyEducationListCard';
import ImagesToggle from './components/ImagesToggle/ImagesToggle';
import MaterialCard from './components/MaterialCard/MaterialCard';
import { useEducation } from './hooks/useEducation';
import { createEducationistStyles } from './styles/educationList.styles';

export default function EducationScreen({ navigation }: { navigation: any }) {
  const theme = useTheme();
  const { t } = useTranslation();
  const { viewMode, setViewMode, showImages, setShowImages } = useEducation();

  const [educationList, setEducationList] = useState<EducationMaterial[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const styles = useMemo(() => createEducationistStyles(theme), [theme]);

  // useEducation's viewMode is a plain 'list' | 'grid' string — map to/from
  // SmartListViewMode for the SmartList API.
  const smartViewMode = viewMode === 'grid' ? SmartListViewMode.Grid : SmartListViewMode.List;

  const handleViewModeChange = (mode: SmartListViewMode) => {
    setViewMode(mode === SmartListViewMode.Grid ? 'grid' : 'list');
  };

  const fetchEducationList = async () => {
    setIsLoading(true);
    try {
      const data = await getEducationList('123');
      setEducationList(data);
    } catch (e: any) {
      console.error(e.message ?? 'Failed to load education list');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEducationList();
  }, []);

  const renderMaterialItem = (
    item: EducationMaterial,
    _index: number,
    currentViewMode: SmartListViewMode,
  ) => (
    <MaterialCard
      material={item}
      viewMode={currentViewMode === SmartListViewMode.Grid ? 'grid' : 'list'}
      showImages={showImages}
      onPress={() => navigation.navigate('MaterialDetails', { material: item })}
    />
  );

  const toggleRight = (
    <SmartListToggle
      viewMode={smartViewMode}
      onViewModeChange={handleViewModeChange}
      activeColor={theme.colors.textPrimary}
      inactiveColor={theme.colors.textSecondary}
    />
  );

  return (
    <SafeAreaView
      style={[styles.screen, { backgroundColor: theme.colors.background }]}
      edges={['top']}
    >
      <BackgroundBlobs />

      <AppHeader
        title={t('educationTitle')}
        titlePosition="left"
        showBackButton={false}
        onBackPress={() => navigation.goBack()}
        rightComponent={toggleRight}
      />

      <SmartList
        data={educationList}
        keyExtractor={(item) => item.id}
        renderItem={renderMaterialItem}
        isLoading={isLoading}
        onRefresh={fetchEducationList}
        numColumns={2}
        gridGap={10}
        listPadding={16}
        viewMode={smartViewMode}
        onViewModeChange={handleViewModeChange}
        togglePlacement={SmartListTogglePlacement.External}
        stickySubHeader
        subHeaderElevation={4}
        EmptyComponent={<EmptyEducationListCard />}
        subHeaderLeft={<ImagesToggle value={showImages} onToggle={setShowImages} />}
      />
    </SafeAreaView>
  );
}
