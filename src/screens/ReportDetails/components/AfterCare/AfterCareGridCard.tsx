// File: components/AfterCare/AfterCareGridCard.tsx

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import AppImage from '../../../../components/AppImage';
import { AppImages } from '../../../../constants';
import { useTheme } from '../../../../theme';
import type { CareResource } from '../../types/reportDetails.types';

import { createStyles } from './styles';

interface Props {
  item: CareResource;
}

// ── Doc thumbnail header ──────────────────────────────────────────────────────
function DocThumbnail({ item, containerStyle }: { item: CareResource; containerStyle: any }) {
  const theme = useTheme();
  const { docStyles } = createStyles(theme);
  const fileName = item.resourceUrl
    ? (item.resourceUrl.split('/').pop() ?? item.title)
    : item.title;
  const displayName =
    item.type === 'pdf'
      ? `${fileName.replace(/\.[^.]+$/, '')}.pdf`
      : `${fileName.replace(/\.[^.]+$/, '')}.doc`;

  return (
    <View style={[containerStyle, docStyles.wrapper]}>
      {/* Dark header strip with filename */}
      <View style={docStyles.header}>
        <AppImage
          source={item.type === 'pdf' ? AppImages.pdf : AppImages.doc}
          containerStyle={docStyles.headerIcon}
        />
        <Text style={docStyles.headerName} numberOfLines={1}>
          {displayName}
        </Text>
      </View>
      {/* Document body preview — retinal image underneath */}
      <AppImage
        source={AppImages.retinalImage}
        containerStyle={StyleSheet.absoluteFill}
        contentFit="cover"
        showLoader={false}
      />
      {/* Frosted overlay to simulate document preview */}
      <View style={docStyles.frostedOverlay} />
    </View>
  );
}

// ── Video thumbnail ───────────────────────────────────────────────────────────
function VideoThumbnail({ item, containerStyle }: { item: CareResource; containerStyle: any }) {
  const theme = useTheme();
  const { videoStyles } = createStyles(theme);
  return (
    <View style={containerStyle}>
      <AppImage
        source={AppImages.retinalImage}
        containerStyle={StyleSheet.absoluteFill}
        contentFit="cover"
        showLoader={false}
      />
      {/* Dark scrim */}
      <View style={videoStyles.scrim} />
      {/* Circular play button */}
      <View style={videoStyles.playCircle}>
        <View style={videoStyles.playTriangle} />
      </View>
      {/* Duration pill — bottom left */}
      {item.duration && (
        <View style={videoStyles.durationPill}>
          <Text style={videoStyles.durationText}>{item.duration}</Text>
        </View>
      )}
    </View>
  );
}

// ── Main card ─────────────────────────────────────────────────────────────────
export default function AfterCareGridCard({ item }: Props) {
  const theme = useTheme();
  const { styles } = createStyles(theme);

  const isVideo = item.type === 'video';

  return (
    <TouchableOpacity style={styles.gridCard} activeOpacity={0.85}>
      {isVideo ? (
        <VideoThumbnail item={item} containerStyle={styles.gridThumbnail} />
      ) : (
        <DocThumbnail item={item} containerStyle={styles.gridThumbnail} />
      )}

      <View style={styles.gridBody}>
        <Text style={styles.gridTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.gridDesc} numberOfLines={2}>
          {item.desc}
        </Text>
        <Text style={styles.gridDate}>{item.date}</Text>
      </View>
    </TouchableOpacity>
  );
}
