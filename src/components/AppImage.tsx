import type { ImageSource } from 'expo-image';
import { Image } from 'expo-image';
import React, { useState } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import type { SvgProps } from 'react-native-svg';

export type AppImageSource = string | number | ImageSource | React.ComponentType<SvgProps>;

interface AppImageProps {
  source: AppImageSource;
  placeholder?: number;
  containerStyle?: StyleProp<ViewStyle>;
  contentFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  showLoader?: boolean;
  transition?: number;
  cachePolicy?: 'none' | 'disk' | 'memory' | 'memory-disk';
}

const AppImage: React.FC<AppImageProps> = ({
  source,
  placeholder,
  containerStyle,
  contentFit = 'cover',
  showLoader = true,
  transition = 300,
  cachePolicy = 'memory-disk',
}) => {
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  // SVG Support
  if (typeof source === 'function') {
    const SvgComponent = source;

    return (
      <View style={[styles.container, containerStyle]}>
        <SvgComponent width="100%" height="100%" />
      </View>
    );
  }

  const imageSource =
    hasError && placeholder ? placeholder : typeof source === 'string' ? { uri: source } : source;

  return (
    <View style={[styles.container, containerStyle]}>
      <Image
        source={imageSource}
        contentFit={contentFit}
        cachePolicy={cachePolicy}
        transition={transition}
        style={StyleSheet.absoluteFill}
        onLoadStart={() => {
          setLoading(true);
          setHasError(false);
        }}
        onLoad={() => {
          setLoading(false);
        }}
        onError={() => {
          setLoading(false);
          setHasError(true);
        }}
      />

      {loading && showLoader && (
        <View style={styles.loader}>
          <ActivityIndicator />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  loader: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AppImage;
