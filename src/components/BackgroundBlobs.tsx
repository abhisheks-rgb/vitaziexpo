// components/BackgroundBlobs.tsx
import { Dimensions, StyleSheet } from 'react-native';
import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg';

const { width: W, height: H } = Dimensions.get('window');

export default function BackgroundBlobs() {
  return (
    <Svg width={W} height={H} style={StyleSheet.absoluteFill} pointerEvents="none">
      <Defs>
        {/* Top-right blob gradient */}
        <RadialGradient
          id="g1"
          cx="92%"
          cy="9%"
          r="45%"
          fx="92%"
          fy="9%"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0%" stopColor="rgb(160,210,232)" stopOpacity="0.55" />
          <Stop offset="100%" stopColor="rgb(160,210,232)" stopOpacity="0" />
        </RadialGradient>

        {/* Bottom-left blob gradient */}
        <RadialGradient
          id="g2"
          cx="8%"
          cy="76%"
          r="38%"
          fx="8%"
          fy="76%"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0%" stopColor="rgb(160,210,232)" stopOpacity="0.5" />
          <Stop offset="100%" stopColor="rgb(160,210,232)" stopOpacity="0" />
        </RadialGradient>
      </Defs>

      {/* Full-canvas rects filled with each gradient */}
      <Rect x={0} y={0} width={W} height={H} fill="url(#g1)" />
      <Rect x={0} y={0} width={W} height={H} fill="url(#g2)" />
    </Svg>
  );
}
