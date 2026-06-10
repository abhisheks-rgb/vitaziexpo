import { useState } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import AppHeader from '../../components/AppHeader';
import BackgroundBlobs from '../../components/BackgroundBlobs';
import { useTranslation } from '../../hooks/useTranslation';
import type { ClinicListScreenProps } from '../../navigation/types';
import { useTheme } from '../../theme';

import { useScrollStore } from '../../hooks/useScrollStore';
import ClinicGridItem from './components/clinicGridItem';
import ClinicListItem from './components/clinicListItem';
import { clinics } from './data';
import { createClinicListStyles } from './styles/clinicList.styles';

// Simple SVG-free icons via text — swap for your icon library if preferred
const ListIcon = ({ active, color }: { active: boolean; color: string }) => (
  // Using a Unicode approximation; replace with e.g. <Ionicons name="list" />
  // eslint-disable-next-line react-native/no-inline-styles
  <View style={{ gap: 3, paddingHorizontal: 2 }}>
    {[0, 1, 2].map((i) => (
      // eslint-disable-next-line react-native/no-inline-styles
      <View key={i} style={{ height: 2, width: 18, borderRadius: 1, backgroundColor: color }} />
    ))}
  </View>
);

const GridIcon = ({ color }: { color: string }) => (
  // eslint-disable-next-line react-native/no-inline-styles
  <View style={{ flexDirection: 'row', flexWrap: 'wrap', width: 18, gap: 3 }}>
    {[0, 1, 2, 3].map((i) => (
      // eslint-disable-next-line react-native/no-inline-styles
      <View key={i} style={{ width: 7, height: 7, borderRadius: 1.5, backgroundColor: color }} />
    ))}
  </View>
);

type ViewMode = 'list' | 'grid';

export default function ClinicListScreen({ navigation }: ClinicListScreenProps) {
  const theme = useTheme();
  const styles = createClinicListStyles(theme);
  const { t } = useTranslation();
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const handleScroll = useScrollStore((state) => state.handleScroll);

  const isGrid = viewMode === 'grid';
  const activeColor = theme.colors.text;
  const inactiveColor = theme.colors.textMuted;

  const toggleRight = (
    <View style={styles.toggleWrap}>
      <TouchableOpacity
        style={[styles.toggleBtn, !isGrid && styles.toggleBtnActive]}
        onPress={() => setViewMode('list')}
        activeOpacity={0.7}
      >
        <ListIcon active={!isGrid} color={!isGrid ? activeColor : inactiveColor} />
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
        title={t('yourClinics')}
        titlePosition="left"
        showBackButton
        onBackPress={() => navigation.goBack()}
        rightComponent={toggleRight}
      />

      <ScrollView
        onScroll={handleScroll}
        style={styles.scroll}
        contentContainerStyle={isGrid ? styles.scrollContentGrid : styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {isGrid ? (
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
