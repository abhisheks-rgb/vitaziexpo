import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  TouchableOpacity,
  View,
} from 'react-native';
import PagerView from 'react-native-pager-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

import {
  createStyles,
  DOT_SIZE,
  STEP,
  PILL_WIDTH,
} from './styles';
import { useTheme } from '../../theme';
import GradientText from '../../components/GradientText';
import AppText from '../../components/AppText';
import AppImage, { AppImageSource } from '../../components/AppImage';
import { AppImages } from '../../constants';

interface Props {
  onFinish: () => void;
}

interface Slide {
  title: string;
  subtitle: string;
  image: AppImageSource;
  imageScale?: number;
}

const slides: Slide[] = [
  {
    title: 'Access images of your eye.',
    subtitle: 'Your eye holds many clues to your health.',
    image: AppImages.onboarding1,
    imageScale: 1.08,
  },
  {
    title: 'Connected Health Platform',
    subtitle:
      'Vitazi.ai connects eye images and health records to support a more complete view of your health.',
    image: AppImages.onboarding2,
    imageScale: 0.92,
  },
  {
    title: 'Digital Wallet',
    subtitle:
      'View encounters, track trends and share your data with health care professionals.',
    image: AppImages.onboarding3,
    imageScale: 0.96,
  },
];

// Center the pill over the dot at given index
const pillTargetX = (i: number) =>
  i * STEP + DOT_SIZE / 2 - PILL_WIDTH / 2;

export default function OnboardingScreen({ onFinish }: Props) {
  const theme = useTheme();
  const styles = createStyles(theme);

  const pagerRef = useRef<PagerView>(null);
  const [index, setIndex] = useState(0);

  const pillX = useRef(new Animated.Value(pillTargetX(0))).current;
  const pillScaleX = useRef(new Animated.Value(1)).current;

  const animateIndicator = (nextIndex: number) => {
    Animated.parallel([
      Animated.spring(pillX, {
        toValue: pillTargetX(nextIndex),
        damping: 18,
        stiffness: 180,
        mass: 0.7,
        useNativeDriver: true,
      }),
      Animated.sequence([
        Animated.timing(pillScaleX, {
          toValue: 1.6,
          duration: 140,
          useNativeDriver: true,
        }),
        Animated.spring(pillScaleX, {
          toValue: 1,
          damping: 14,
          stiffness: 200,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  };

  useEffect(() => {
    animateIndicator(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goNext = () => {
    if (index < slides.length - 1) {
      pagerRef.current?.setPage(index + 1);
      return;
    }
    onFinish();
  };

  const goBack = () => {
    if (index > 0) {
      pagerRef.current?.setPage(index - 1);
    }
  };

  const isLast = index === slides.length - 1;

  return (
    <LinearGradient
      colors={[theme.colors.gradientStart, theme.colors.gradientEnd]}
      style={styles.screen}
    >
      <SafeAreaView style={styles.screen}>
        <View style={styles.container}>
          {/* Header */}
          <View style={[styles.topBar, styles.paddedRow]}>
            <AppImage source={AppImages.logoDark} containerStyle={styles.logo} />
            <TouchableOpacity style={styles.skipButton} onPress={onFinish}>
              <AppText variant="body" style={styles.skip}>Skip</AppText>
            </TouchableOpacity>
          </View>

          {/* Slides — full width, no horizontal padding */}
          <PagerView
            ref={pagerRef}
            style={styles.content}
            initialPage={0}
            overScrollMode="never"
            onPageSelected={e => {
              const page = e.nativeEvent.position;
              setIndex(page);
              animateIndicator(page);
            }}
          >
            {slides.map((slide, idx) => (
              <View key={idx} style={styles.slide}>
                <View style={styles.imageWrap}>
                  <AppImage
                    source={slide.image}
                    containerStyle={[
                      styles.image,
                      { transform: [{ scale: slide.imageScale ?? 1 }] },
                    ]}
                  />
                </View>

                <View style={styles.textWrap}>
                  <GradientText text={slide.title} style={styles.title} />
                  <AppText variant="body" style={styles.subtitle}>
                    {slide.subtitle}
                  </AppText>
                </View>
              </View>
            ))}
          </PagerView>

          {/* Indicator */}
          <View style={[styles.pagination, styles.paddedRow]}>
            <View style={styles.indicatorRow}>
              {slides.map((_, i) => (
                <View key={i} style={styles.smallDot} />
              ))}
              <Animated.View
                style={[
                  styles.activePill,
                  { transform: [{ translateX: pillX }, { scaleX: pillScaleX }] },
                ]}
              />
            </View>
          </View>

          {/* Navigation */}
          <View style={[styles.nav, styles.paddedRow]}>
            {index > 0 ? (
              <TouchableOpacity onPress={goBack}>
                <AppText variant="body" style={styles.back}>{'< Back'}</AppText>
              </TouchableOpacity>
            ) : (
              <View style={{ width: 80 }} />
            )}
            <TouchableOpacity style={styles.nextBtn} onPress={goNext}>
              <AppText variant="button" style={styles.nextText}>
                {isLast ? 'Get Started >' : 'Next >'}
              </AppText>
            </TouchableOpacity>
          </View>
        </View>

      </SafeAreaView>
    </LinearGradient>
  );
}
