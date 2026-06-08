// File: Education/components/MaterialDetails/MaterialDetailsScreen.tsx

import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppHeader from '../../../../components/AppHeader';
import AppImage from '../../../../components/AppImage';
import BackgroundBlobs from '../../../../components/BackgroundBlobs';
import { useTheme } from '../../../../theme';
import { EDUCATION_MATERIALS_MOCK } from '../../data/education.mock';
import type { EducationMaterial } from '../../types/education.types';
import { createStyles } from './styles';

interface Props {
  material: EducationMaterial;
  navigation: { goBack: () => void };
}

function SimilarCard({
  item,
  styles,
}: {
  item: EducationMaterial;
  styles: ReturnType<typeof createStyles>;
}) {
  const isVideo = item.type === 'video';
  return (
    <TouchableOpacity style={styles.similarCard} activeOpacity={0.85}>
      <View style={styles.similarThumbnail}>
        <AppImage
          source={item.thumbnailSource}
          containerStyle={StyleSheet.absoluteFill}
          contentFit="cover"
          showLoader={false}
        />
        {!isVideo && (
          <View style={styles.similarDocHeader}>
            <Text style={styles.similarDocIcon}>{item.type === 'pdf' ? '📄' : '📝'}</Text>
            <Text style={styles.similarDocName} numberOfLines={1}>
              {item.fileName ?? item.title}
            </Text>
          </View>
        )}
        {isVideo && item.duration && (
          <View style={styles.similarDurationPill}>
            <Text style={styles.similarDurationText}>{item.duration}</Text>
          </View>
        )}
      </View>
      <View style={styles.similarBody}>
        <Text style={styles.similarCardTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.similarCardDesc} numberOfLines={2}>
          {item.description}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export default function MaterialDetailsScreen({ material, navigation }: Props) {
  const theme = useTheme();
  const styles = createStyles(theme);
  const isVideo = material.type === 'video';

  const similarMaterials = EDUCATION_MATERIALS_MOCK.filter((m) => m.id !== material.id).slice(0, 6);

  const rightActions = (
    <TouchableOpacity activeOpacity={0.7}>
      <Text style={{ fontSize: 20, color: theme.colors.text }}>↗</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <BackgroundBlobs />

      <AppHeader
        title="Material Details"
        titlePosition="left"
        showBackButton
        onBackPress={navigation.goBack}
        rightComponent={rightActions}
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero */}
        <View style={styles.heroContainer}>
          <AppImage
            source={material.thumbnailSource}
            containerStyle={StyleSheet.absoluteFill}
            contentFit="cover"
            showLoader={false}
          />
          <View style={styles.heroScrim} />

          {!isVideo && (
            <View style={styles.heroDocHeader}>
              <Text style={styles.heroDocIcon}>{material.type === 'pdf' ? '📄' : '📝'}</Text>
              <Text style={styles.heroDocName} numberOfLines={1}>
                {material.fileName ?? material.title}
              </Text>
            </View>
          )}

          {isVideo && (
            <TouchableOpacity style={styles.playBtn} activeOpacity={0.85}>
              <Text style={styles.playBtnText}>▶ Play</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Content */}
        <View style={styles.content}>
          <Text style={styles.title}>{material.title}</Text>
          <Text style={styles.description}>{material.description}</Text>
          <Text style={styles.date}>{material.date}</Text>
        </View>

        {/* Similar Material */}
        <Text style={styles.similarTitle}>Similar Material</Text>
        <FlatList
          data={similarMaterials}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.similarList}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <SimilarCard item={item} styles={styles} />}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
