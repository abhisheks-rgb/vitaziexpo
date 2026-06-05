import { useKeyboard } from '@react-native-community/hooks';
import { BlurView } from 'expo-blur';
import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export const ICON_SIZE = 120;
export const HOLE_RADIUS = ICON_SIZE / 2 + 6;
const TOP_RADIUS = 24;
const FROST_HEIGHT = ICON_SIZE / 2 + 20; // covers the button's upper half + breathing room

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

  // When frost strip is present it adds FROST_HEIGHT px above the card.
  // Scan button must always be centered on the card's top edge,
  // which is at FROST_HEIGHT when frost is visible, or 0 when not.
  const scanButtonTop = keyboardShown
    ? FROST_HEIGHT - ICON_SIZE / 2 // straddles frost/card boundary
    : -ICON_SIZE / 2; // straddles air/card boundary (normal state)

  return (
    <View style={styles.container}>
      {/* ── FROST STRIP — only when keyboard is open ── */}
      {keyboardShown && (
        <BlurView
          intensity={35} // subtle — just enough to separate text from card
          tint="dark"
          style={[styles.frostStrip, { height: FROST_HEIGHT }]}
          pointerEvents="none"
        />
      )}

      {/* ── WHITE CARD BODY ── */}
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

      {/* ── SCAN BUTTON — always floats at card top edge ── */}
      <View style={[styles.scanWrapper, { top: scanButtonTop }]} pointerEvents="box-none">
        {scanButton}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'relative',
  },
  frostStrip: {
    width: '100%',
    borderTopLeftRadius: TOP_RADIUS,
    borderTopRightRadius: TOP_RADIUS,
    overflow: 'hidden',
  },
  cardBody: {
    width: '100%',
    position: 'relative',
  },
  svg: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  scanWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 20,
  },
  content: {
    paddingHorizontal: 16,
  },
});
