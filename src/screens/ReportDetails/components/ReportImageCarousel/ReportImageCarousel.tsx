// File: components/ReportImageCarousel/ReportImageCarousel.tsx

import { LinearGradient } from 'expo-linear-gradient';
import type { RefObject } from 'react';
import type {
  NativeScrollEvent,
  NativeSyntheticEvent} from 'react-native';
import {
  Dimensions,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import AppImage from '../../../../components/AppImage';
import type { ReportImage } from '../../types/reportDetails.types';

import { createStyles, IMAGE_H } from './styles';

const { width: SCREEN_W } = Dimensions.get('window');

interface Props {
  images: ReportImage[];
  imageIndex: number;
  date: string;
  listRef: RefObject<FlatList<any> | null>;
  onMomentumScrollEnd: (e: NativeSyntheticEvent<NativeScrollEvent>) => void;
  onArrowPress: (dir: -1 | 1) => void;
}

export default function ReportImageCarousel({
  images,
  imageIndex,
  date,
  listRef,
  onMomentumScrollEnd,
  onArrowPress,
}: Props) {
  const styles = createStyles();

  return (
    <View style={styles.container}>
      <FlatList
        ref={listRef}
        data={images}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onMomentumScrollEnd}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <AppImage
            source={item.source}
            containerStyle={{ width: SCREEN_W, height: IMAGE_H }}
            contentFit="cover"
            showLoader={false}
          />
        )}
      />

      <LinearGradient
        colors={['rgba(0,0,0,0.45)', 'transparent']}
        style={styles.topGradient}
        pointerEvents="none"
      >
        <Text style={styles.dateLabel}>{date}</Text>
      </LinearGradient>

      {imageIndex > 0 && (
        <TouchableOpacity
          style={[styles.arrowBase, styles.arrowLeft]}
          onPress={() => onArrowPress(-1)}
        >
          <Text style={styles.arrowText}>‹</Text>
        </TouchableOpacity>
      )}

      {imageIndex < images.length - 1 && (
        <TouchableOpacity
          style={[styles.arrowBase, styles.arrowRight]}
          onPress={() => onArrowPress(1)}
        >
          <Text style={styles.arrowText}>›</Text>
        </TouchableOpacity>
      )}

      <View style={styles.dotsWrap} pointerEvents="none">
        {images.map((_, i) => (
          <View key={i} style={[styles.dot, i === imageIndex && styles.dotActive]} />
        ))}
      </View>
    </View>
  );
}
