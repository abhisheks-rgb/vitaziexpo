import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const ICON_SIZE = 120;
const HOLE_RADIUS = ICON_SIZE / 2 + 6;
const TOP_RADIUS = 24;
const CARD_TOP = 220;

interface Props {
  children: React.ReactNode;
}

export default function CardWithCutout({ children }: Props) {
  const cx = SCREEN_WIDTH / 2;

  const d = [
    `M 0 ${TOP_RADIUS}`,
    `Q 0 0 ${TOP_RADIUS} 0`,
    `L ${cx - HOLE_RADIUS} 0`,
    `A ${HOLE_RADIUS} ${HOLE_RADIUS} 0 0 0 ${cx + HOLE_RADIUS} 0`,
    `L ${SCREEN_WIDTH - TOP_RADIUS} 0`,
    `Q ${SCREEN_WIDTH} 0 ${SCREEN_WIDTH} ${TOP_RADIUS}`,
    `L ${SCREEN_WIDTH} ${SCREEN_HEIGHT}`,
    `L 0 ${SCREEN_HEIGHT}`,
    `Z`,
  ].join(' ');

  return (
    <View style={styles.container}>
      <Svg width={SCREEN_WIDTH} height={SCREEN_HEIGHT} style={styles.svg}>
        <Path d={d} fill="#FFFFFF" />
      </Svg>

      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  svg: {
    position: 'absolute',
    top: CARD_TOP,
    left: 0,
  },
  content: {
    marginTop: CARD_TOP,
    paddingTop: HOLE_RADIUS + 24,
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
});
