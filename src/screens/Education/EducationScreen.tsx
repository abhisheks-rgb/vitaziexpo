// File: Education/EducationScreen.tsx

import { ActivityIndicator, FlatList, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import BackgroundBlobs from '../../components/BackgroundBlobs';
import { useScrollStore } from '../../hooks/useScrollStore';
import { useTheme } from '../../theme';

import { useEffect, useMemo, useState } from 'react';
import { getEducationList } from '../../application/education/getEducation';
import AppHeader from '../../components/AppHeader';
import { EducationMaterial } from '../../domain/education/models/educationMaterial';
import { useTranslation } from '../../hooks/useTranslation';
import EmptyEducationListCard from './components/EmptyEducationListCard';
import ImagesToggle from './components/ImagesToggle/ImagesToggle';
import MaterialCard from './components/MaterialCard/MaterialCard';
import { useEducation } from './hooks/useEducation';
import { createEducationistStyles } from './styles/educationList.styles';

export default function EducationScreen({ navigation }: { navigation: any }) {
  const theme = useTheme();
   const { t } = useTranslation();
  const { viewMode, setViewMode, showImages, setShowImages, } = useEducation();
  const handleScroll = useScrollStore((state) => state.handleScroll);
  const isGrid = viewMode === 'grid';

    const [educationList, setEducationList] = useState<EducationMaterial[]>([]);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const styles = useMemo(() => createEducationistStyles(theme), [theme]);
  const activeColor = theme.colors.textPrimary;
  const inactiveColor = theme.colors.textSecondary;

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

    const fetchEducationList = async (refresh = false) => {
      setError('');
      refresh ? setIsRefreshing(true) : setIsLoading(true);
      try {
        const data = await getEducationList('123');
        setEducationList(data);
      } catch (e: any) {
        setError(e.message ?? 'Something went wrong');
      } finally {
        refresh ? setIsRefreshing(false) : setIsLoading(false);
      }
    };

    useEffect(() => {
      fetchEducationList();
    }, []);

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

      <ImagesToggle value={showImages} onToggle={setShowImages} />

             {isLoading? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ActivityIndicator
            size="large"
            color={theme.colors.primary}
          />
        </View>): educationList.length=== 0? <EmptyEducationListCard/>:

      isGrid ? (
        <FlatList
          onScroll={handleScroll}
          data={educationList}
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
              onPress={() => navigation.navigate('MaterialDetails', { material: item })}
            />
          )}
        />
      ) : (
        <FlatList
          onScroll={handleScroll}
          data={educationList}
          key="list"
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }: { item: EducationMaterial }) => (
            <MaterialCard
              material={item}
              viewMode="list"
              showImages={showImages}
              onPress={() => navigation.navigate('MaterialDetails', { material: item })}
            />
          )}
        />
      )}
    </SafeAreaView>
  );
}

// const styles = StyleSheet.create({
//   screen: { flex: 1 },

  // listContent: {
  //   paddingBottom: 32,
  // },

// });
