import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const PILL_H    = 60;
const BIG_DOT   = 60;
const SMALL_DOT = 12;
const PILL_W    = 160;

const LOGO_LEFT    = (width - 280) / 2;
const DOT_CENTER_X = LOGO_LEFT + 175;

function SplashScreen({ onFinish }: { onFinish: () => void }) {
  const isDark = useColorScheme() === 'dark';

  const shapeW    = useRef(new Animated.Value(width)).current;
  const shapeH    = useRef(new Animated.Value(height)).current;
  const shapeR    = useRef(new Animated.Value(0)).current;
  const shapeLeft = useRef(new Animated.Value(0)).current;
  const shapeTop  = useRef(new Animated.Value(0)).current;

  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoScale   = useRef(new Animated.Value(0.95)).current;

  const centreTop = (h: number) => height / 2 - h / 2;

  useEffect(() => {
    Animated.sequence([

      // 1. Hold full green — longer
      Animated.delay(800),

      // 2. Collapse to capsule on left — slower spring
      Animated.parallel([
        Animated.spring(shapeW,   { toValue: PILL_W,           friction: 10, tension: 30, useNativeDriver: false }),
        Animated.spring(shapeH,   { toValue: PILL_H,           friction: 10, tension: 30, useNativeDriver: false }),
        Animated.timing(shapeR,   { toValue: PILL_H / 2,       duration: 700, useNativeDriver: false }),
        Animated.spring(shapeTop, { toValue: centreTop(PILL_H), friction: 10, tension: 30, useNativeDriver: false }),
      ]),

      // Pause on capsule
      Animated.delay(300),

      // 3. Capsule squeezes to big circle — slower
      Animated.spring(shapeW, { toValue: BIG_DOT, friction: 10, tension: 30, useNativeDriver: false }),

      // Pause on big circle
      Animated.delay(300),

      // 4. Big circle slides right shrinking to small dot — slower travel
      Animated.parallel([
        Animated.spring(shapeLeft, {
          toValue: DOT_CENTER_X - SMALL_DOT / 2,
          friction: 8,
          tension: 25,
          useNativeDriver: false,
        }),
        Animated.spring(shapeW, { toValue: SMALL_DOT, friction: 8, tension: 25, useNativeDriver: false }),
        Animated.spring(shapeH, { toValue: SMALL_DOT, friction: 8, tension: 25, useNativeDriver: false }),
        Animated.spring(shapeTop, {
          toValue: centreTop(SMALL_DOT),
          friction: 8,
          tension: 25,
          useNativeDriver: false,
        }),
      ]),

      // 5. Logo fades in
      Animated.parallel([
        Animated.timing(logoOpacity, { toValue: 1, duration: 550, useNativeDriver: true }),
        Animated.spring(logoScale,   { toValue: 1, friction: 8,   useNativeDriver: true }),
        Animated.timing(shapeW,      { toValue: 0, duration: 250, useNativeDriver: false }),
        Animated.timing(shapeH,      { toValue: 0, duration: 250, useNativeDriver: false }),
      ]),

      // Hold logo longer
      Animated.delay(1800),

      // Fade out
      Animated.timing(logoOpacity, { toValue: 0, duration: 500, useNativeDriver: true }),

    ]).start(() => onFinish());
  }, []);

  return (
    <View style={[StyleSheet.absoluteFill, { backgroundColor: isDark ? '#000' : '#fff' }]}>
      <Animated.View
        style={{
          position: 'absolute',
          left: shapeLeft,
          top: shapeTop,
          width: shapeW,
          height: shapeH,
          borderRadius: shapeR,
          backgroundColor: '#C8F000',
        }}
      />
      <Animated.View
        style={[styles.centred, { opacity: logoOpacity, transform: [{ scale: logoScale }] }]}
      >
        <Image
          source={isDark ? require('./assets/logo-dark.png') : require('./assets/logo-light.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </Animated.View>
    </View>
  );
}

function HomeScreen() {
  const isDark = useColorScheme() === 'dark';
  return (
    <View style={[StyleSheet.absoluteFill, styles.centred, { backgroundColor: isDark ? '#000' : '#fff' }]}>
      <Image
        source={isDark ? require('./assets/logo-dark.png') : require('./assets/logo-light.png')}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
}

export default function App() {
  const [splashDone, setSplashDone] = useState(false);
  if (!splashDone) return <SplashScreen onFinish={() => setSplashDone(true)} />;
  return <HomeScreen />;
}

const styles = StyleSheet.create({
  centred: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: { width: 280, height: 90 },
});
