import { useKeyboard } from '@react-native-community/hooks';
import { BlurView } from 'expo-blur';
import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// ── Layout constants — exported for consumers that need to offset layout ──────
export const ICON_SIZE = 120;
export const HOLE_RADIUS = ICON_SIZE / 2 + 6;

const TOP_RADIUS = 24;
// Covers the button's upper half + breathing room above the card
const FROST_HEIGHT = ICON_SIZE / 2 + 20;

interface Props {
  children: React.ReactNode;
  cardTop: number;
  scanButton: React.ReactNode;
}

export default function CardWithCutout({ children, cardTop, scanButton }: Props) {
  const insets = useSafeAreaInsets();
  const { keyboardShown } = useKeyboard();

  const cx = SCREEN_WIDTH / 2;
  const svgHeight = SCREEN_HEIGHT;

  // SVG path: full-width white card with a circular cutout at the top center
  const d = [
    `M 0 ${TOP_RADIUS}`,
    `Q 0 0 ${TOP_RADIUS} 0`,
    `L ${cx - HOLE_RADIUS} 0`,
    `A ${HOLE_RADIUS} ${HOLE_RADIUS} 0 0 0 ${cx + HOLE_RADIUS} 0`,
    `L ${SCREEN_WIDTH - TOP_RADIUS} 0`,
    `Q ${SCREEN_WIDTH} 0 ${SCREEN_WIDTH} ${TOP_RADIUS}`,
    `L ${SCREEN_WIDTH} ${svgHeight}`,
    `L 0 ${svgHeight}`,
    `Z`,
  ].join(' ');

  // Scan button is always centered on the card's top edge:
  // - keyboard open → straddles the frost strip / card boundary
  // - keyboard closed → straddles air / card boundary
  const scanButtonTop = keyboardShown ? FROST_HEIGHT - ICON_SIZE / 2 : -ICON_SIZE / 2;

  return (
    <View style={styles.container}>
      {/* Frost strip — subtle blur, only visible when keyboard is open */}
      {keyboardShown && (
        <BlurView
          intensity={35}
          tint="dark"
          style={[styles.frostStrip, { height: FROST_HEIGHT }]}
          pointerEvents="none"
        />
      )}

      {/* White card body with SVG cutout */}
      <View style={styles.cardBody}>
        <Svg width={SCREEN_WIDTH} height={svgHeight} style={styles.svg} pointerEvents="none">
          <Path d={d} fill="#FFFFFF" />
        </Svg>

        <View
          style={[
            styles.content,
            {
              paddingTop: HOLE_RADIUS + 24,
              paddingBottom: insets.bottom + 16,
            },
          ]}
        >
          {children}
        </View>
      </View>

      {/* Scan button — floats at the card's top edge regardless of keyboard state */}
      <View style={[styles.scanWrapper, { top: scanButtonTop }]} pointerEvents="box-none">
        {scanButton}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // Relative container so scanWrapper can be absolutely positioned within it
  container: {
    width: '100%',
    position: 'relative',
  },

  // Frost strip sits above the card, clipped to rounded top corners
  frostStrip: {
    width: '100%',
    borderTopLeftRadius: TOP_RADIUS,
    borderTopRightRadius: TOP_RADIUS,
    overflow: 'hidden',
  },

  // Card body is relative so SVG and content stack correctly
  cardBody: {
    width: '100%',
    position: 'relative',
  },

  // SVG is the visual background — absolutely fills the card body
  svg: {
    position: 'absolute',
    top: 0,
    left: 0,
  },

  // Scrollable/padded content sits on top of SVG
  content: {
    paddingHorizontal: 16,
  },

  // Scan button wrapper — centered, floats above card top edge
  scanWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 20,
  },
});
