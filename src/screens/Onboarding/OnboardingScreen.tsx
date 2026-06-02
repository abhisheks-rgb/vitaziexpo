import React, { useRef, useState } from 'react';
import {
  Animated,
  Image,
  TouchableOpacity,
  View,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

import { createStyles } from './styles';

import { useTheme } from '../../theme';

import GradientText from '../../components/GradientText';
import AppText from '../../components/AppText';
import { AppImages } from '../../constants';

interface Props {
  onFinish: () => void;
}

interface Slide {
  title: string;
  subtitle: string;
  image: any;
}

const slides: Slide[] = [
  {
    title: 'Access images of your eye.',
    subtitle:
      'Your eye holds many clues to your health.',
    image: AppImages.onboarding1,
  },
  {
    title: 'Connected Health Platform',
    subtitle:
      'Vitazi.ai connects eye images and health records to support a more complete view of your health.',
    image: AppImages.onboarding2,
  },
  {
    title: 'Digital Wallet',
    subtitle:
      'View encounters, track trends and share your data with health care professionals.',
    image: AppImages.onboarding3,
  },
];

export default function OnboardingScreen({
  onFinish,
}: Props) {
  const theme = useTheme();
  const styles = createStyles(theme);

  const [index, setIndex] = useState(0);

  const fadeAnim = useRef(
    new Animated.Value(1),
  ).current;

  const slideX = useRef(
    new Animated.Value(0),
  ).current;

  const animateTo = (nextIndex: number) => {
    const direction =
      nextIndex > index ? -1 : 1;

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),

      Animated.timing(slideX, {
        toValue: direction * 40,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setIndex(nextIndex);

      slideX.setValue(
        -direction * 40,
      );

      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 220,
          useNativeDriver: true,
        }),

        Animated.timing(slideX, {
          toValue: 0,
          duration: 220,
          useNativeDriver: true,
        }),
      ]).start();
    });
  };

  const goNext = () => {
    if (index < slides.length - 1) {
      animateTo(index + 1);
      return;
    }

    onFinish();
  };

  const goBack = () => {
    if (index > 0) {
      animateTo(index - 1);
    }
  };

  const slide = slides[index];
  const isLast =
    index === slides.length - 1;

  return (
    <LinearGradient
      colors={[
        theme.colors.gradientStart,
        theme.colors.gradientEnd,
      ]}
      style={styles.screen}
    >
      <SafeAreaView style={styles.screen}>
        <View style={styles.container}>
          {/* Header */}

         <View style={styles.topBar}>
          <Image
            source={AppImages.logoDark}
            style={styles.logo}
            resizeMode="contain"
          />

          <TouchableOpacity
            style={styles.skipButton}
            onPress={onFinish}
          >
            <AppText
              variant="body"
              style={styles.skip}
            >
              Skip
            </AppText>
          </TouchableOpacity>
        </View>

          {/* Content */}

          <Animated.View
            style={{
              flex: 1,
              opacity: fadeAnim,
              transform: [
                {
                  translateX: slideX,
                },
              ],
            }}
          >
            <View style={styles.imageWrap}>
              <Image
                source={slide.image}
                style={styles.image}
              />
            </View>

            <View style={styles.textWrap}>
              <GradientText
                text={slide.title}
                style={styles.title}
              />

              <AppText
                variant="body"
                style={styles.subtitle}
              >
                {slide.subtitle}
              </AppText>
            </View>
          </Animated.View>

          {/* Pagination */}

          <View style={styles.dots}>
            {slides.map((_, i) => (
              <View
                key={i}
                style={[
                  styles.dot,
                  {
                    width:
                      i === index
                        ? 20
                        : 6,

                    backgroundColor:
                      i === index
                        ? theme.colors.accent
                        : 'rgba(255,255,255,0.2)',
                  },
                ]}
              />
            ))}
          </View>

          {/* Navigation */}

          <View style={styles.nav}>
            {index > 0 ? (
              <TouchableOpacity
                onPress={goBack}
              >
                <AppText
                  variant="body"
                  style={styles.back}
                >
                  {'< Back'}
                </AppText>
              </TouchableOpacity>
            ) : (
              <View
                style={{
                  width: 80,
                }}
              />
            )}

            <TouchableOpacity
              style={styles.nextBtn}
              onPress={goNext}
            >
              <AppText
                variant="button"
                style={styles.nextText}
              >
                {isLast
                  ? 'Get Started >'
                  : 'Next >'}
              </AppText>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}