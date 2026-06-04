import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, Easing, Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppImages } from '../constants';
import { useTheme } from '../theme';

const { width, height } = Dimensions.get('window');

const PILL_W = 180;
const PILL_H = 64;
const PILL_LEFT_PAD = 28;

const BIG_DOT = PILL_H;
const SMALL_DOT = 14;

const LOGO_W = 280;
const LOGO_H = 90;

const LOGO_LEFT = (width - LOGO_W) / 2;
const LOGO_TOP = height / 2 - LOGO_H / 2;

const DOT_CX = LOGO_LEFT + 198;
const DOT_CY = LOGO_TOP + LOGO_H / 2;

const BIG_LAND_CX = DOT_CX + 16;
const BIG_LAND_L = BIG_LAND_CX - BIG_DOT / 2;
const BIG_LAND_T = DOT_CY - BIG_DOT / 2;

const SHRINK_L = BIG_LAND_CX + 12 - SMALL_DOT / 2;
const SHRINK_T = DOT_CY + 12 - SMALL_DOT / 2;

interface Props {
  onFinish: () => void;
}

export default function SplashScreen({ onFinish }: Props) {
  const theme = useTheme();

  const sL = useRef(new Animated.Value(0)).current;
  const sT = useRef(new Animated.Value(0)).current;
  const sW = useRef(new Animated.Value(width)).current;
  const sH = useRef(new Animated.Value(height)).current;
  const sR = useRef(new Animated.Value(0)).current;

  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.94)).current;

  const animateLayout = (value: Animated.Value, toValue: number, duration: number) =>
    Animated.timing(value, {
      toValue,
      duration,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    });

  const animateNative = (value: Animated.Value, toValue: number, duration: number) =>
    Animated.timing(value, {
      toValue,
      duration,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    });

  useEffect(() => {
    const pillTop = height / 2 - PILL_H / 2;
    const bigDotTop = height / 2 - BIG_DOT / 2;

    Animated.sequence([
      Animated.delay(700),

      Animated.parallel([
        animateLayout(sW, PILL_W, 600),
        animateLayout(sH, PILL_H, 600),
        animateLayout(sL, PILL_LEFT_PAD, 600),
        animateLayout(sT, pillTop, 600),
        animateLayout(sR, PILL_H / 2, 600),
      ]),

      Animated.parallel([animateLayout(sW, BIG_DOT, 420), animateLayout(sT, bigDotTop, 420)]),

      Animated.parallel([animateLayout(sL, BIG_LAND_L, 700), animateLayout(sT, BIG_LAND_T, 700)]),

      Animated.parallel([animateNative(logoOpacity, 1, 380), animateNative(logoScale, 1, 380)]),

      Animated.parallel([
        animateLayout(sW, SMALL_DOT, 480),
        animateLayout(sH, SMALL_DOT, 480),
        animateLayout(sL, SHRINK_L, 480),
        animateLayout(sT, SHRINK_T, 480),
        animateLayout(sR, SMALL_DOT / 2, 480),
      ]),

      Animated.parallel([animateLayout(sW, 0, 150), animateLayout(sH, 0, 150)]),

      Animated.delay(1600),

      animateNative(logoOpacity, 0, 500),
    ]).start(onFinish);
  }, []);

  return (
    <SafeAreaView
      style={[
        StyleSheet.absoluteFill,
        {
          backgroundColor: theme.colors.background,
        },
      ]}
    >
      <Animated.View
        style={[
          styles.centered,
          {
            opacity: logoOpacity,
            transform: [{ scale: logoScale }],
          },
        ]}
      >
        <Image
          source={theme.isDark ? AppImages.logoDark : AppImages.logoLight}
          style={styles.logo}
          resizeMode="contain"
        />
      </Animated.View>

      <Animated.View
        style={{
          position: 'absolute',
          left: sL,
          top: sT,
          width: sW,
          height: sH,
          borderRadius: sR,
          backgroundColor: theme.colors.accent,
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  centered: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,

    justifyContent: 'center',
    alignItems: 'center',
  },

  logo: {
    width: LOGO_W,
    height: LOGO_H,
  },
});
