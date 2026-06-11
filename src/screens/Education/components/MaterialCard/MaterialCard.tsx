// File: Education/components/MaterialCard/MaterialCard.tsx

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import AppImage from '../../../../components/AppImage';
import { DurationChip } from '../../../../components/DurationChip';
import { PlayButton } from '../../../../components/PlayButton';
import { useTheme } from '../../../../theme';
import type { EducationMaterial, ViewMode } from '../../types/education.types';

import { createStyles } from './styles';

interface Props {
  material: EducationMaterial;
  viewMode: ViewMode;
  showImages: boolean;
  onPress: (material: EducationMaterial) => void;
}

function VideoThumbnail({ material, style }: { material: EducationMaterial; style: any }) {
  const theme = useTheme();
  const styles = createStyles(theme);
  return (
    <View style={style}>
      <AppImage
        source={material.thumbnailSource}
        containerStyle={StyleSheet.absoluteFill}
        contentFit="cover"
        showLoader={false}
      />
      <View style={styles.scrim} />
      {material.type === 'video' && <PlayButton onPress={() => {}} />}
      {material.duration && <DurationChip label={material.duration} />}
    </View>
  );
}

function DocThumbnail({ material, style }: { material: EducationMaterial; style: any }) {
  const theme = useTheme();
  const styles = createStyles(theme);
  return (
    <View style={[style, { overflow: 'hidden' }]}>
      <AppImage
        source={material.thumbnailSource}
        containerStyle={StyleSheet.absoluteFill}
        contentFit="cover"
        showLoader={false}
      />
      <View style={styles.docHeader}>
        <Text style={styles.docHeaderIcon}>{material.type === 'pdf' ? '📄' : '📝'}</Text>
        <Text style={styles.docHeaderName} numberOfLines={1}>
          {material.fileName ?? material.title}
        </Text>
      </View>
    </View>
  );
}

export default function MaterialCard({ material, viewMode, showImages, onPress }: Props) {
  const theme = useTheme();
  const styles = createStyles(theme);
  const isVideo = material.type === 'video';

  if (viewMode === 'list') {
    return (
      <TouchableOpacity
        style={styles.listCard}
        onPress={() => onPress(material)}
        activeOpacity={0.85}
      >
        {/* Icon or thumbnail */}
        {showImages ? (
          isVideo ? (
            <VideoThumbnail material={material} style={styles.listThumbnail} />
          ) : (
            <DocThumbnail material={material} style={styles.listThumbnail} />
          )
        ) : (
          <View style={styles.listIconWrap}>
            <Text style={isVideo ? styles.listVideoIcon : styles.listDocIcon}>
              {isVideo ? '▶️' : material.type === 'pdf' ? '📄' : '📝'}
            </Text>
          </View>
        )}

        <View style={styles.listInfo}>
          <Text style={styles.listTitle} numberOfLines={2}>
            {material.title}
          </Text>
          <Text style={styles.listDesc} numberOfLines={2}>
            {material.description}
          </Text>
          {material.duration && <Text style={styles.listMeta}>{material.duration}</Text>}
        </View>

        <View style={styles.listChevron}>
          <Text style={styles.listChevronText}>›</Text>
        </View>
      </TouchableOpacity>
    );
  }

  // Grid card
  return (
    <TouchableOpacity
      style={styles.gridCard}
      onPress={() => onPress(material)}
      activeOpacity={0.85}
    >
      {showImages &&
        (isVideo ? (
          <VideoThumbnail material={material} style={styles.gridThumbnail} />
        ) : (
          <DocThumbnail material={material} style={styles.gridThumbnail} />
        ))}

      <View style={styles.gridBody}>
        <Text style={styles.gridTitle} numberOfLines={2}>
          {material.title}
        </Text>
        <Text style={styles.gridDesc} numberOfLines={2}>
          {material.description}
        </Text>
        <Text style={styles.gridMeta}>{material.date}</Text>
      </View>
    </TouchableOpacity>
  );
}
