// File: components/AfterCare/AfterCareListCard.tsx

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import AppImage from '../../../../components/AppImage';
import { DurationChip } from '../../../../components/DurationChip';
import { PlayButton } from '../../../../components/PlayButton';
import { AppImages } from '../../../../constants';
import { useTheme } from '../../../../theme';
import type { CareResource } from '../../types/reportDetails.types';

import { createStyles } from './styles';

interface Props {
  item: CareResource;
}

// ── Doc thumbnail (list variant) ──────────────────────────────────────────────
function DocThumbnailList({ item, containerStyle }: { item: CareResource; containerStyle: any }) {
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
      {/* Dark header */}
      <View style={docStyles.header}>
        <AppImage
          source={item.type === 'pdf' ? AppImages.pdf : AppImages.doc}
          containerStyle={docStyles.headerIcon}
        />
        <Text style={docStyles.headerName} numberOfLines={1}>
          {displayName}
        </Text>
      </View>
      {/* Preview image underneath */}
      <AppImage
        source={AppImages.retinalImage}
        containerStyle={StyleSheet.absoluteFill}
        contentFit="cover"
        showLoader={false}
      />
      <View style={docStyles.frostedOverlay} />
    </View>
  );
}

// ── Video thumbnail (list variant) ────────────────────────────────────────────
function VideoThumbnailList({ item, containerStyle }: { item: CareResource; containerStyle: any }) {
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
      <View style={videoStyles.scrim} />
      {/* Circular play button */}
      <PlayButton onPress={() => {}} isLoading={false} />
      {/* Duration pill */}
      {item.duration && <DurationChip label={item.duration} />}
    </View>
  );
}

// ── Main card ─────────────────────────────────────────────────────────────────
export default function AfterCareListCard({ item }: Props) {
  const theme = useTheme();
  const { styles } = createStyles(theme);

  const isVideo = item.type === 'video';

  return (
    <TouchableOpacity style={styles.listCard} activeOpacity={0.85}>
      {isVideo ? (
        <VideoThumbnailList item={item} containerStyle={styles.listThumbnail} />
      ) : (
        <DocThumbnailList item={item} containerStyle={styles.listThumbnail} />
      )}

      <View style={styles.listBody}>
        <Text style={styles.listTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.listDesc} numberOfLines={2}>
          {item.desc}
        </Text>
        <Text style={styles.listDate}>{item.date}</Text>
      </View>
    </TouchableOpacity>
  );
}
