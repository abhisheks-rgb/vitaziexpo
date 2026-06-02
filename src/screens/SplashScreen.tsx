import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  Image,
  StyleSheet,
  View,
} from 'react-native';
import { useTheme } from '../theme';

const { width, height } = Dimensions.get('window');

const PILL_W        = 180;
const PILL_H        = 64;
const PILL_LEFT_PAD = 28;
const BIG_DOT       = PILL_H;
const SMALL_DOT     = 14;

const LOGO_W    = 280;
const LOGO_H    = 90;
const LOGO_LEFT = (width - LOGO_W) / 2;
const LOGO_CY   = height / 2;
const DOT_CX    = LOGO_LEFT + 187;
const DOT_CY    = LOGO_CY + 3;

const BIG_LAND_L = DOT_CX - BIG_DOT / 2;
const BIG_LAND_T = DOT_CY - BIG_DOT / 2;
const SMALL_L    = DOT_CX - SMALL_DOT / 2;
const SMALL_T    = DOT_CY - SMALL_DOT / 2;

interface Props { onFinish: () => void; }

export default function SplashScreen({ onFinish }: Props) {
  const theme = useTheme();

  const sL = useRef(new Animated.Value(0)).current;
  const sT = useRef(new Animated.Value(0)).current;
  const sW = useRef(new Animated.Value(width)).current;
  const sH = useRef(new Animated.Value(height)).current;
  const sR = useRef(new Animated.Value(0)).current;
  const logoOp = useRef(new Animated.Value(0)).current;
  const logoSc = useRef(new Animated.Value(0.94)).current;

  const t = (val: Animated.Value, toValue: number, duration: number) =>
    Animated.timing(val, { toValue, duration, easing: Easing.out(Easing.cubic), useNativeDriver: false });

  const tn = (val: Animated.Value, toValue: number, duration: number) =>
    Animated.timing(val, { toValue, duration, easing: Easing.out(Easing.cubic), useNativeDriver: true });

  useEffect(() => {
    const pillTop   = height / 2 - PILL_H / 2;
    const bigDotTop = height / 2 - BIG_DOT / 2;

    Animated.sequence([
      // 1. Hold full green
      Animated.delay(500),

      // 2. Collapse to pill — all animating simultaneously, fluid
      Animated.parallel([
        t(sW, PILL_W,        380),
        t(sH, PILL_H,        380),
        t(sL, PILL_LEFT_PAD, 380),
        t(sT, pillTop,       380),
        t(sR, PILL_H / 2,    380),
      ]),

      // 3. Pill → circle (squeeze width only)
      Animated.parallel([
        t(sW, BIG_DOT,  260),
        t(sT, bigDotTop, 260),
      ]),

      // 4. Circle slides right → lands on logo dot — no pause, fluid
      Animated.parallel([
        t(sL, BIG_LAND_L, 460),
        t(sT, BIG_LAND_T, 460),
      ]),

      // 5. Logo appears NOW that circle is in position
      Animated.parallel([
        tn(logoOp, 1, 280),
        tn(logoSc, 1, 280),
      ]),

      // 6. Circle shrinks into logo dot
      Animated.parallel([
        t(sW, SMALL_DOT, 320),
        t(sH, SMALL_DOT, 320),
        t(sL, SMALL_L,   320),
        t(sT, SMALL_T,   320),
      ]),

      // 7. Dot disappears — logo dot takes over
      Animated.parallel([
        t(sW, 0, 100),
        t(sH, 0, 100),
      ]),

      // Hold
      Animated.delay(1400),

      // Fade out
      tn(logoOp, 0, 400),

    ]).start(() => onFinish());
  }, []);

  return (
    <View style={[StyleSheet.absoluteFill, { backgroundColor: theme.bg }]}>
      <Animated.View style={[styles.centred, { opacity: logoOp, transform: [{ scale: logoSc }] }]}>
        <Image
          source={theme.isDark ? require('../../assets/logo-dark.png') : require('../../assets/logo-light.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </Animated.View>
      <Animated.View
        style={{
          position: 'absolute',
          left: sL, top: sT,
          width: sW, height: sH,
          borderRadius: sR,
          backgroundColor: '#C8F000',
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  centred: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: { width: LOGO_W, height: LOGO_H },
});
