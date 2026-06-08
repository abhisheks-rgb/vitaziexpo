// File: components/AfterCare/AfterCareSection.tsx

import { useState } from 'react';
import { Text, View } from 'react-native';
import { useTheme } from '../../../../theme';
import type { CareResource, ViewMode } from '../../types/reportDetails.types';
import AfterCareGridCard from './AfterCareGridCard';
import AfterCareListCard from './AfterCareListCard';
import { createStyles } from './styles';
import ViewToggle from './ViewToggle';

interface Props {
  resources: CareResource[];
}

export default function AfterCareSection({ resources }: Props) {
  const theme = useTheme();
  const { styles } = createStyles(theme);
  const [viewMode, setViewMode] = useState<ViewMode>('list');

  return (
    <>
      <Text style={styles.sectionTitle}>After Care Instructions</Text>

      <ViewToggle viewMode={viewMode} onToggle={setViewMode} />

      {viewMode === 'grid' ? (
        <View style={styles.gridContainer}>
          {resources.map((item) => (
            <AfterCareGridCard key={item.id} item={item} />
          ))}
        </View>
      ) : (
        <View style={styles.listContainer}>
          {resources.map((item) => (
            <AfterCareListCard key={item.id} item={item} />
          ))}
        </View>
      )}
    </>
  );
}
