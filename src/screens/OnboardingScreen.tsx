import React, { useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useTheme } from '../theme';

const { width } = Dimensions.get('window');

const slides = [
  {
    id: '1',
    title: 'Welcome to Vitazi',
    subtitle: 'Your AI-powered health companion designed to help you live better every day.',
    accent: 'Health',
  },
  {
    id: '2',
    title: 'Smart Insights',
    subtitle: 'Get personalised recommendations powered by advanced AI tailored just for you.',
    accent: 'Personalised',
  },
  {
    id: '3',
    title: 'Track & Improve',
    subtitle: 'Monitor your wellness journey and celebrate every milestone along the way.',
    accent: 'Wellness',
  },
];

interface Props {
  onFinish: () => void;
}

export default function OnboardingScreen({ onFinish }: Props) {
  const theme = useTheme();
  const [index, setIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;

  const goNext = () => {
    if (index < slides.length - 1) {
      Animated.parallel([
        Animated.timing(fadeAnim,  { toValue: 0, duration: 180, useNativeDriver: true }),
        Animated.timing(slideAnim, { toValue: -30, duration: 180, useNativeDriver: true }),
      ]).start(() => {
        setIndex(i => i + 1);
        slideAnim.setValue(30);
        Animated.parallel([
          Animated.timing(fadeAnim,  { toValue: 1, duration: 220, useNativeDriver: true }),
          Animated.timing(slideAnim, { toValue: 0, duration: 220, useNativeDriver: true }),
        ]).start();
      });
    } else {
      onFinish();
    }
  };

  const slide = slides[index];

  return (
    <View style={[styles.container, { backgroundColor: theme.bg }]}>

      {/* Logo */}
      <View style={styles.logoWrap}>
        <Image
          source={theme.isDark ? require('../../assets/logo-dark.png') : require('../../assets/logo-light.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Illustration placeholder — sphere with brand colors */}
      <View style={styles.illustrationWrap}>
        <View style={[styles.outerRing, { borderColor: theme.isDark ? '#1e3a5f' : '#d4eaf5' }]}>
          <View style={[styles.innerRing, { borderColor: theme.isDark ? '#2a5080' : '#8CC3E1' }]}>
            <View style={[styles.accentDot, { backgroundColor: '#C8F000' }]} />
          </View>
        </View>
      </View>

      {/* Slide content */}
      <Animated.View
        style={[
          styles.content,
          { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
        ]}
      >
        <Text style={[styles.accent, { color: '#C8F000' }]}>{slide.accent}</Text>
        <Text style={[styles.title, { color: theme.text }]}>{slide.title}</Text>
        <Text style={[styles.subtitle, { color: theme.textMuted }]}>{slide.subtitle}</Text>
      </Animated.View>

      {/* Dots indicator */}
      <View style={styles.dotsRow}>
        {slides.map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              {
                backgroundColor: i === index ? '#C8F000' : theme.border,
                width: i === index ? 24 : 8,
              },
            ]}
          />
        ))}
      </View>

      {/* CTA button */}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#C8F000' }]}
        onPress={goNext}
        activeOpacity={0.85}
      >
        <Text style={[styles.buttonText, { color: '#152644' }]}>
          {index === slides.length - 1 ? "Let's Get Started" : 'Next'}
        </Text>
      </TouchableOpacity>

      {/* Skip */}
      {index < slides.length - 1 && (
        <TouchableOpacity onPress={onFinish} style={styles.skip}>
          <Text style={[styles.skipText, { color: theme.textMuted }]}>Skip</Text>
        </TouchableOpacity>
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingTop: 60,
    paddingBottom: 48,
  },
  logoWrap: { marginBottom: 32 },
  logo: { width: 160, height: 50 },
  illustrationWrap: {
    width: 200,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  outerRing: {
    width: 190,
    height: 190,
    borderRadius: 95,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerRing: {
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  accentDot: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  accent: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 16,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
  dotsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 28,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
  button: {
    width: '100%',
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  skip: { paddingVertical: 8 },
  skipText: { fontSize: 15 },
});
