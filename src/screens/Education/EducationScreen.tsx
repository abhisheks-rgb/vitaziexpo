// File: Education/EducationScreen.tsx

import { FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackgroundBlobs from '../../components/BackgroundBlobs';
import { useTheme } from '../../theme';
import EducationHeader from './components/EducationHeader/EducationHeader';
import ImagesToggle from './components/ImagesToggle/ImagesToggle';
import MaterialCard from './components/MaterialCard/MaterialCard';
import MaterialDetailsScreen from './components/MaterialDetails/MaterialDetailsScreen';
import { useEducation } from './hooks/useEducation';
import type { EducationMaterial } from './types/education.types';

export default function EducationScreen({ navigation }: { navigation: any }) {
  const theme = useTheme();
  const {
    viewMode,
    setViewMode,
    showImages,
    setShowImages,
    selectedMaterial,
    setSelectedMaterial,
    materials,
  } = useEducation();

  if (selectedMaterial) {
    return (
      <MaterialDetailsScreen
        material={selectedMaterial}
        navigation={{ goBack: () => setSelectedMaterial(null) }}
      />
    );
  }

  const isGrid = viewMode === 'grid';

  return (
    <SafeAreaView
      style={[styles.screen, { backgroundColor: theme.colors.background }]}
      edges={['top']}
    >
      <BackgroundBlobs />

      <EducationHeader viewMode={viewMode} onViewModeChange={setViewMode} />

      <ImagesToggle value={showImages} onToggle={setShowImages} />

      {isGrid ? (
        <FlatList
          data={materials}
          key="grid"
          numColumns={2}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.gridContent}
          columnWrapperStyle={styles.gridRow}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }: { item: EducationMaterial }) => (
            <MaterialCard
              material={item}
              viewMode="grid"
              showImages={showImages}
              onPress={setSelectedMaterial}
            />
          )}
        />
      ) : (
        <FlatList
          data={materials}
          key="list"
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }: { item: EducationMaterial }) => (
            <MaterialCard
              material={item}
              viewMode="list"
              showImages={showImages}
              onPress={setSelectedMaterial}
            />
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  gridContent: {
    paddingHorizontal: 16,
    paddingBottom: 32,
    gap: 12,
  },
  gridRow: {
    gap: 12,
    justifyContent: 'space-between',
  },
  listContent: {
    paddingBottom: 32,
  },
});
