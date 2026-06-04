// components/BackgroundBlobs.tsx
import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import Svg, { Circle, Defs, FeGaussianBlur, Filter } from 'react-native-svg';

const { width: W, height: H } = Dimensions.get('window');

export default function BackgroundBlobs() {
  return (
    <Svg width={W} height={H} style={StyleSheet.absoluteFill} pointerEvents="none">
      <Defs>
        <Filter id="blur1" x="-50%" y="-50%" width="200%" height="200%">
          <FeGaussianBlur stdDeviation="55" />
        </Filter>
        <Filter id="blur2" x="-50%" y="-50%" width="200%" height="200%">
          <FeGaussianBlur stdDeviation="45" />
        </Filter>
      </Defs>

      {/* Top-right blob — matches AI_Assistant.svg circle at cx=348 cy=123 r=191 */}
      <Circle
        cx={W * 0.92}
        cy={H * 0.1}
        r={170}
        fill="rgba(140,195,225,0.55)"
        filter="url(#blur1)"
      />

      {/* Bottom-left blob — matches AI_Assistant.svg circle at cx=97 cy=591 r=135 */}
      <Circle
        cx={W * 0.08}
        cy={H * 0.72}
        r={135}
        fill="rgba(140,195,225,0.45)"
        filter="url(#blur2)"
      />
    </Svg>
  );
}
